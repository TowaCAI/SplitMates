// scripts/app.js

// ==== Estado base ====
let participants = [];
let expenses = [];

const participantForm = document.getElementById('add-participant-form');
const participantInput = document.getElementById('participant-name');
const participantsList = document.getElementById('participants-list');

const expenseForm = document.getElementById('add-expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expensePayerSelect = document.getElementById('expense-payer');
const expensesList = document.getElementById('expenses-list');

const calculateBtn = document.getElementById('calculate-btn');
const resultsSection = document.getElementById('results-section');
const summaryDiv = document.getElementById('summary');
const balancesDiv = document.getElementById('balances');
const resetBtn = document.getElementById('reset-btn');

// Devuelve true si el color es oscuro, false si es claro
function isColorDark(hex) {
    // Quita el "#"
    hex = hex.replace('#', '');
    // Convierte a RGB
    let r = parseInt(hex.substring(0,2),16);
    let g = parseInt(hex.substring(2,4),16);
    let b = parseInt(hex.substring(4,6),16);
    // Calcula luminancia (fórmula estándar)
    let luminance = 0.299*r + 0.587*g + 0.114*b;
    // Menor a 160 se considera oscuro (ajustá el umbral si querés)
    return luminance < 160;
}

// ==== PARTICIPANTES ====

// Emoji selector
let participantEmoji = "🧑‍🤝‍🧑";
const emojiButtons = document.querySelectorAll('.emoji-option');
emojiButtons.forEach(btn => {
  btn.onclick = () => {
    emojiButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    participantEmoji = btn.dataset.emoji;
    document.getElementById('participant-emoji').value = participantEmoji;
  }
});
emojiButtons[0].classList.add('selected');

// Agregar participante
participantForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = participantInput.value.trim();
    let emoji = document.getElementById('participant-emoji').value || "🧑‍🤝‍🧑";
    let color = pickRandomColor();

    if (!name || participants.some(p => p.nombre === name)) {
        participantInput.value = '';
        return;
    }
    participants.push({ nombre: name, emoji, color });
    participantInput.value = '';
    emojiButtons.forEach(b => b.classList.remove('selected'));
    emojiButtons[0].classList.add('selected');
    document.getElementById('participant-emoji').value = "🧑‍🤝‍🧑";
    renderParticipants();
    updatePayerOptions();
    checkCalculateEnabled();
    saveData();
});

// Funcion colores aleatorios
function pickRandomColor() {
  const colores = ["#1976d2","#ffb300","#43a047","#e53935","#8e24aa","#fbc02d","#00838f","#d84315","#388e3c","#f06292"];
  return colores[Math.floor(Math.random() * colores.length)];
}

// Mostrar participantes
function renderParticipants() {
    participantsList.innerHTML = '';
    participants.forEach((p, idx) => {
        const chip = document.createElement('div');
        chip.className = 'chip animated-popin';
        chip.style.background = p.color || "#e3edfa";
        chip.style.color = isColorDark((p.color || "#e3edfa")) ? "#fff" : "#202124";
        chip.innerHTML = `<span style="font-size:1.15em;margin-right:3px;">${p.emoji}</span>`;

        // Nombre (editable)
        const nameSpan = document.createElement('span');
        nameSpan.textContent = p.nombre;
        nameSpan.style.cursor = 'pointer';
        nameSpan.title = "Haz doble clic para editar";
        nameSpan.ondblclick = () => startEditParticipant(idx, nameSpan, p.nombre);
        chip.appendChild(nameSpan);

        // Botón eliminar
        const remove = document.createElement('span');
        remove.className = 'remove';
        remove.title = "Eliminar participante";
        remove.textContent = '×';
        remove.onclick = () => removeParticipant(idx);
        chip.appendChild(remove);

        participantsList.appendChild(chip);
    });
}

// Iniciar edición de nombre de participante
function startEditParticipant(idx, nameSpan, oldName) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = oldName;
    input.style.fontSize = "1em";
    input.style.padding = "2px 8px";
    input.style.borderRadius = "8px";
    input.style.border = "1px solid #ccc";
    input.style.width = "88px";
    input.maxLength = 20;
    nameSpan.replaceWith(input);
    input.focus();
    input.select();

    // Guardar cambios
    input.onblur = input.onkeydown = (e) => {
        if (e.type === "keydown" && e.key !== "Enter" && e.key !== "Escape") return;
        if (e.key === "Escape") {
            input.replaceWith(nameSpan);
            return;
        }
        let newName = input.value.trim();
        if (!newName || participants.some((p, i) => p.nombre === newName && i !== idx)) {
            input.style.borderColor = "#d60000";
            input.style.background = "#ffe5ec";
            return;
        }
        let oldObj = participants[idx];
        participants[idx].nombre = newName;
        // Cambiar también en gastos existentes
        expenses.forEach(g => { if (g.payer === oldObj.nombre) g.payer = newName; });
        renderParticipants();
        updatePayerOptions();
        renderExpenses();
        checkCalculateEnabled();
        saveData();
    };
}

// Eliminar participante (y sus gastos)
function removeParticipant(idx) {
    const removed = participants[idx];
    participants.splice(idx, 1);
    expenses = expenses.filter(g => g.payer !== removed.nombre);
    renderParticipants();
    updatePayerOptions();
    renderExpenses();
    checkCalculateEnabled();
    saveData();
    if (window.navigator.vibrate) window.navigator.vibrate(90);
}

// Actualizar opciones de pagador
function updatePayerOptions() {
    expensePayerSelect.innerHTML = `<option value="" disabled selected>Pagado por</option>`;
    participants.forEach(p => {
        let opt = document.createElement('option');
        opt.value = p.nombre;
        opt.textContent = `${p.emoji} ${p.nombre}`;
        expensePayerSelect.appendChild(opt);
    });
}

// ==== GASTOS ====

// Agregar gasto
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = expenseNameInput.value.trim();
    let amount = Number(expenseAmountInput.value);
    let payer = expensePayerSelect.value;

    if (!name || !amount || amount <= 0 || !payer) return;

    expenses.push({ name, amount, payer });
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
    expensePayerSelect.selectedIndex = 0;
    renderExpenses();
    checkCalculateEnabled();
    saveData();
});

// Mostrar gastos
function renderExpenses() {
    expensesList.innerHTML = '';
    if (!expenses.length) return;
    expenses.forEach((g, idx) => {
        // Buscar participante correspondiente al pagador
        const pagador = participants.find(p => p.nombre === g.payer);
        let emoji = pagador ? pagador.emoji : "";
        let color = pagador ? pagador.color : "#e3edfa";

        const row = document.createElement('div');
        row.className = 'expense-item animated-popin';
        row.innerHTML = `
            <span title="${g.name}">${emoji} ${g.payer}</span>
            <span>$${g.amount.toLocaleString()}</span>
            <span>${g.name}</span>
            <span style="display:flex;gap:7px;">
                <span class="edit" title="Editar gasto" style="cursor:pointer;">✏️</span>
                <span class="remove" title="Eliminar gasto">🗑️</span>
            </span>
        `;
        row.querySelector('.remove').onclick = () => removeExpense(idx);
        row.querySelector('.edit').onclick = () => startEditExpense(idx, row);
        expensesList.appendChild(row);
    });
}

// Editar gasto
function startEditExpense(idx, row) {
    const g = expenses[idx];
    // Arma formulario inline
    row.innerHTML = `
        <input type="text" value="${g.name}" style="width:90px;font-size:1em;" id="edit-name">
        <input type="number" value="${g.amount}" min="1" style="width:70px;font-size:1em;" id="edit-amount">
        <select id="edit-payer" style="font-size:1em;width:86px;">
            ${participants.map(p => `<option value="${p.nombre}" ${g.payer === p.nombre ? "selected" : ""}>${p.emoji} ${p.nombre}</option>`).join("")}
        </select>
        <span style="display:flex;gap:7px;">
            <span class="remove" title="Cancelar edición" style="cursor:pointer;">❌</span>
            <span class="edit" title="Guardar" style="cursor:pointer;">💾</span>
        </span>
    `;
    const nameInput = row.querySelector('#edit-name');
    const amountInput = row.querySelector('#edit-amount');
    const payerSelect = row.querySelector('#edit-payer');
    const cancelBtn = row.querySelector('.remove');
    const saveBtn = row.querySelector('.edit');

    cancelBtn.onclick = renderExpenses; // Restaura fila
    saveBtn.onclick = saveEdit;

    // Enter/ESC support
    [nameInput, amountInput, payerSelect].forEach(el => {
        el.onkeydown = (e) => {
            if (e.key === "Enter") saveEdit();
            if (e.key === "Escape") renderExpenses();
        };
    });

    function saveEdit() {
        let name = nameInput.value.trim();
        let amount = Number(amountInput.value);
        let payer = payerSelect.value;
        if (!name || !payer || !(amount > 0)) {
            nameInput.style.borderColor = "#d60000";
            amountInput.style.borderColor = "#d60000";
            return;
        }
        expenses[idx] = { name, amount, payer };
        renderExpenses();
        checkCalculateEnabled();
        saveData();
        if (window.navigator.vibrate) window.navigator.vibrate(90);
    }
}

// Eliminar gasto
function removeExpense(idx) {
    expenses.splice(idx, 1);
    renderExpenses();
    checkCalculateEnabled();
    saveData();
}

// ==== CÁLCULO DE DIVISIÓN ====

// Habilitar botón calcular sólo si hay al menos 2 participantes y 1 gasto
function checkCalculateEnabled() {
    calculateBtn.disabled = !(participants.length > 1 && expenses.length > 0);
}

// Al hacer clic en Calcular
calculateBtn.addEventListener('click', () => {
    const t = TRANSLATIONS[currentLang];
    resultsSection.style.display = '';
    // Calcular total gastado por cada uno
    let spent = {};
    participants.forEach(p => spent[p.nombre] = 0);
    expenses.forEach(g => spent[g.payer] += g.amount);
    // Suma total y cuanto debería poner cada uno
    let total = expenses.reduce((a, b) => a + b.amount, 0);
    let shouldPay = total / participants.length;
    // Calcular saldo de cada uno
    let balances = {};
    participants.forEach(p => {
        balances[p.nombre] = +(spent[p.nombre] - shouldPay).toFixed(2);
    });

    // Mostrar resumen
    summaryDiv.innerHTML = `
        <b>${t.summaryTotal}</b> ${t.currency}${total.toLocaleString()}<br>
        ${t.summaryEach} <b>${t.currency}${shouldPay.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</b>
        <br>
    `;
    // Mostrar cuánto gastó cada uno y su saldo
    balancesDiv.innerHTML = '';
    participants.forEach(p => {
        let saldo = balances[p.nombre];
        let clase = saldo === 0 ? '' : saldo > 0 ? 'positive' : 'negative';
        balancesDiv.innerHTML += `
            <div class="balance-row ${clase}">
                <span>${p.emoji} ${p.nombre}</span>
                <span>
                    ${t.spent} ${t.currency}${spent[p.nombre].toLocaleString()}
                    &nbsp; | &nbsp; ${t.balance} <b>${saldo > 0 ? t.positiveSign : t.negativeSign}${t.currency}${Math.abs(saldo).toLocaleString(undefined, {minimumFractionDigits:2})}</b>
                </span>
            </div>
        `;
    });

    // Calcular quién le debe a quién (minimiza transferencias)
    let deudores = participants.map(p => ({ nombre: p.nombre, emoji: p.emoji, saldo: balances[p.nombre] })).filter(x => x.saldo < 0);
    let acreedores = participants.map(p => ({ nombre: p.nombre, emoji: p.emoji, saldo: balances[p.nombre] })).filter(x => x.saldo > 0);

    // Resolución de transferencias (simple greedy)
    let detalles = [];
    deudores.forEach(d => {
        let deuda = -d.saldo;
        acreedores.forEach(a => {
            if (deuda > 0 && a.saldo > 0) {
                let pago = Math.min(deuda, a.saldo);
                if (pago > 0.009) {
                    detalles.push(
                        t.owesTo
                            .replace('{from}', `<b>${d.emoji} ${d.nombre}</b>`)
                            .replace('{amount}', `${t.currency}${pago.toLocaleString(undefined, {minimumFractionDigits:2})}`)
                            .replace('{to}', `<b>${a.emoji} ${a.nombre}</b>`)
                    );
                    deuda -= pago;
                    a.saldo -= pago;
                }
            }
        });
    });

    // Mostrar transferencias necesarias
    if (detalles.length) {
        balancesDiv.innerHTML += `<div style="margin:1.2em 0 0.4em 0; font-weight:600;">${t.transferTitle || ''}</div>
        <div style="text-align:left; margin-bottom:1em;">
            ${detalles.map(x => `<div style="margin-bottom:0.5em;">${x}</div>`).join('')}
        </div>`;
    } else {
        balancesDiv.innerHTML += `<div style="margin:1.2em 0 1em 0; font-weight:600;">${t.noTransfer || ''}</div>`;
    }

    const todosSaldoCero = participants.every(p => balances[p.nombre] === 0);
    if (todosSaldoCero && participants.length > 1 && expenses.length > 0) showConfetti();

    // Scroll a resultados
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: "smooth" });
    }, 200);

    renderCharts();
});

// ==== GRÁFICOS ====
let pieChart, barChart;

function renderCharts() {
    // Si ya existen los gráficos, destruirlos para evitar errores de duplicado
    if (pieChart) { pieChart.destroy(); }
    if (barChart) { barChart.destroy(); }

    // Si no hay participantes o gastos, no muestra nada
    if (!participants.length || !expenses.length) {
        document.getElementById('charts-section').style.display = "none";
        return;
    }

    document.getElementById('charts-section').style.display = "";

    // Calcular totales por persona
    let spent = {};
    participants.forEach(p => spent[p.nombre] = 0);
    expenses.forEach(g => spent[g.payer] += g.amount);

    // Los labels ahora son "emoji nombre"
    const labels = participants.map(p => `${p.emoji} ${p.nombre}`);
    const values = participants.map(p => spent[p.nombre]);

    // Colores automáticos
    const colors = [
        "#1976d2", "#ffb300", "#43a047", "#e53935", "#8e24aa", "#fbc02d", "#00838f", "#d84315", "#388e3c", "#f06292"
    ];

    // Pie Chart
    const ctxPie = document.getElementById('pie-chart').getContext('2d');
    pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: labels.map((_, i) => colors[i % colors.length]),
                borderWidth: 2,
                borderColor: "#fff"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: getComputedStyle(document.body).getPropertyValue('--text') }
                },
                title: {
                    display: true,
                    text: '¿Quién gastó más?',
                    color: getComputedStyle(document.body).getPropertyValue('--text')
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let total = values.reduce((a,b) => a+b,0);
                            let percent = ((context.raw/total)*100).toFixed(1);
                            return `${context.label}: $${context.raw} (${percent}%)`;
                        }
                    }
                }
            }
        }
    });

    // Bar Chart
    const ctxBar = document.getElementById('bar-chart').getContext('2d');
    barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total gastado ($)',
                data: values,
                backgroundColor: labels.map((_, i) => colors[i % colors.length] + "cc"),
                borderRadius: 9
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Distribución de gastos',
                    color: getComputedStyle(document.body).getPropertyValue('--text')
                }
            },
            scales: {
                x: {
                    ticks: { color: getComputedStyle(document.body).getPropertyValue('--text') }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: getComputedStyle(document.body).getPropertyValue('--text') }
                }
            }
        }
    });
}

// Mostrar confeti al calcular
function showConfetti() {
    const confettiColors = ["#43a047","#ffb300","#1976d2","#e53935","#fbc02d","#8e24aa"];
    for(let i=0;i<64;i++){
        let conf = document.createElement('div');
        conf.style.position = "fixed";
        conf.style.left = (10 + Math.random()*80) + "vw";
        conf.style.top = (-5 + Math.random()*12) + "vh";
        conf.style.width = conf.style.height = (10+Math.random()*14)+"px";
        conf.style.background = confettiColors[Math.floor(Math.random()*confettiColors.length)];
        conf.style.borderRadius = "6px";
        conf.style.zIndex = 2000;
        conf.style.opacity = 0.76 + Math.random()*0.21;
        conf.style.transform = "rotate("+(Math.random()*360)+"deg)";
        conf.style.transition = "top 1.3s cubic-bezier(.25,1.85,.47,1), opacity 1.3s";
        document.body.appendChild(conf);
        setTimeout(()=>{conf.style.top=(66+Math.random()*30)+"vh"; conf.style.opacity=0.15},120);
        setTimeout(()=>{conf.remove()},1600+Math.random()*500);
    }
}

// ==== REINICIAR ====

resetBtn.addEventListener('click', () => {
    if (confirm("¿Seguro que quieres empezar un nuevo grupo y borrar todos los datos actuales?")) {
        participants = [];
        expenses = [];
        renderParticipants();
        updatePayerOptions();
        renderExpenses();
        checkCalculateEnabled();
        resultsSection.style.display = 'none';
        saveData();
    }
});

// ==== INICIALIZACIÓN ====
renderParticipants();
updatePayerOptions();
renderExpenses();
checkCalculateEnabled();
resultsSection.style.display = 'none';

// ==== MODO OSCURO AUTOMÁTICO Y MANUAL ====

// Detecta preferencia de sistema al cargar, salvo que el usuario ya haya elegido
function detectDarkMode() {
    if (localStorage.getItem('splitmates_theme')) {
        return localStorage.getItem('splitmates_theme');
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Aplica el tema (agrega o quita .dark al body)
function applyTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    document.getElementById('dark-icon').textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Alterna el tema y guarda preferencia
function toggleDarkMode() {
    let theme = document.body.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('splitmates_theme', theme);
    applyTheme(theme);
    setTimeout(renderCharts, 120)
}

// Evento botón
document.getElementById('toggle-dark').addEventListener('click', toggleDarkMode);

// Al cargar la app, aplica el tema correcto
applyTheme(detectDarkMode());

// Si cambia el sistema operativo (en vivo), cambia el tema salvo que usuario haya elegido manualmente
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('splitmates_theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// ==== REGISTRAR SERVICE WORKER PWA ====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log("Service Worker registrado!", reg))
      .catch(err => console.warn("Error registrando el SW:", err));
  });
}

// ==== PWA INSTALLATION TIP FOR iOS ====
// Muestra un mensaje para instalar en iOS si no está en modo standalone
function isIosStandalone() {
  return window.navigator.standalone === true;
}
function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

window.addEventListener("load", () => {
  if (isIos() && !isIosStandalone()) {
    setTimeout(() => {
      const div = document.createElement("div");
      div.style = "position:fixed;bottom:16px;left:10px;right:10px;z-index:3000;padding:11px 14px;background:#222;color:#fff;border-radius:13px;font-size:1em;box-shadow:0 4px 32px 0 rgba(25,118,210,0.14);display:flex;align-items:center;gap:10px;opacity:0.97;";
      div.innerHTML = TRANSLATIONS[currentLang].iosInstallTip;
      document.body.appendChild(div);
      document.getElementById("close-tip").onclick = () => div.remove();
    }, 800);
  }
});
