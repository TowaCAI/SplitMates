// ==== MULTI-GRUPOS SPLITMATES ====

// Carga grupos desde localStorage o crea uno por defecto
let grupos = JSON.parse(localStorage.getItem('splitmates_grupos')) || {};
let grupoActivoId = localStorage.getItem('splitmates_grupo_activo') || null;

// Crea un nuevo grupo y devuelve su ID
function crearGrupo(nombre) {
    // Generar ID "slug" único
    let id = nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '').slice(0, 32);
    let base = id, i = 1;
    while (grupos[id]) id = base + '-' + (i++);
    grupos[id] = { nombre, participants: [], expenses: [] };
    guardarGrupos();
    return id;
}

// Elimina un grupo por ID
function eliminarGrupo(id) {
    if (Object.keys(grupos).length <= 1) {
        alert(TRANSLATIONS[currentLang].cannotDeleteLastGroup);
        return;
    }
    if (confirm(
  TRANSLATIONS[currentLang].confirmDeleteGroup.replace('{group}', grupos[id].nombre)
)) {
        delete grupos[id];
        if (grupoActivoId === id) grupoActivoId = Object.keys(grupos)[0];
        guardarGrupos();
        cargarGrupoActivo();
    }
}

// Guarda los grupos en localStorage
function guardarGrupos() {
    localStorage.setItem('splitmates_grupos', JSON.stringify(grupos));
    localStorage.setItem('splitmates_grupo_activo', grupoActivoId);
}

// Carga el grupo activo en memoria
function cargarGrupoActivo() {
    if (!grupoActivoId || !grupos[grupoActivoId]) grupoActivoId = Object.keys(grupos)[0];
    const grupo = grupos[grupoActivoId];
    participants = [...grupo.participants];
    expenses = [...grupo.expenses];
    renderParticipants();
    updatePayerOptions();
    renderExpenses();
    checkCalculateEnabled();
    resultsSection.style.display = 'none';
    actualizarSelectGrupos();
}

// Actualiza el selector de grupos
function actualizarSelectGrupos() {
    const select = document.getElementById('grupos-select');
    select.innerHTML = '';
    Object.entries(grupos).forEach(([id, g]) => {
        let opt = document.createElement('option');
        opt.value = id;
        opt.textContent = g.nombre;
        if (id === grupoActivoId) opt.selected = true;
        select.appendChild(opt);
    });
}

// Sincroniza los datos del grupo activo con localStorage
function sincronizarGrupoActivo() {
    if (!grupoActivoId || !grupos[grupoActivoId]) return;
    grupos[grupoActivoId].participants = [...participants];
    grupos[grupoActivoId].expenses = [...expenses];
    guardarGrupos();
}

// ==== UI eventos para grupos ====
document.getElementById('nuevo-grupo-btn').onclick = () => {
    let nombre = prompt(TRANSLATIONS[currentLang].newGroupPrompt, '');
    if (nombre && nombre.trim().length > 1) {
        let id = crearGrupo(nombre.trim());
        grupoActivoId = id;
        cargarGrupoActivo();
        alert(
            TRANSLATIONS[currentLang].groupCreatedSuccess
                ? TRANSLATIONS[currentLang].groupCreatedSuccess.replace('{group}', nombre.trim())
                : `¡Grupo "${nombre.trim()}" creado exitosamente!`
        );
    }
};
document.getElementById('eliminar-grupo-btn').onclick = () => {
    eliminarGrupo(grupoActivoId);
};
document.getElementById('grupos-select').onchange = function() {
    grupoActivoId = this.value;
    cargarGrupoActivo();
};

// ==== INTEGRACIÓN CON LA LÓGICA EXISTENTE ====
// Cada vez que cambian participantes o gastos, sincroniza el grupo activo:
function saveData() {
    sincronizarGrupoActivo();
}
// Cuando inicia la app:
if (!Object.keys(grupos).length) {
    // Crea uno inicial
    let id = crearGrupo(TRANSLATIONS[currentLang].defaultGroup);
    grupoActivoId = id;
}
cargarGrupoActivo();
