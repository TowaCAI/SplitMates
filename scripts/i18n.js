const TRANSLATIONS = {
  es: {
    // General y app
    title: "SplitMates - División de Gastos entre Amigos",
    description: "Divide gastos fácil entre amigos y equilibra las cuentas de cualquier juntada.",
    participants: "Participantes",
    addParticipant: "Agregar",
    expenses: "Gastos",
    expenseName: "¿Qué compraron?",
    expenseAmount: "Monto ($)",
    expensePayer: "Pagado por",
    addExpense: "Agregar gasto",
    edit: "Editar",
    remove: "Eliminar",
    calculate: "Calcular división",
    results: "Resultados",
    summaryTotal: "Total gastado:",
    summaryEach: "Cada uno debería aportar:",
    spent: "Gastó:",
    balance: "Saldo:",
    owesTo: '{from} debe darle <b>{amount}</b> a {to}',
    currency: "$",
    positiveSign: "+",
    negativeSign: "-",
    transferTitle: "Transferencias sugeridas:",
    noTransfer: "No hay transferencias pendientes: todos gastaron lo mismo. 🎉",
    reset: "Nuevo grupo",
    dark: "Cambiar modo claro/oscuro",
    reportWho: "¿Quién gastó más?",
    reportDistrib: "Distribución de gastos",
    footer: "💡 SplitMates • Hecho con ♥ por TowaCAI",
    confirmReset: "¿Seguro que quieres empezar un nuevo grupo y borrar todos los datos actuales?",
    editParticipantHint: "Haz doble clic para editar",
    defaultGroup: "Juntada",
    confirmDeleteGroup: '¿Seguro que quieres eliminar el grupo "{group}"?',
    cannotDeleteLastGroup: "No se puede eliminar el último grupo.",
    newGroupPrompt: "Nombre del nuevo grupo/juntada:",
    iosInstallTip: '👉 <b>Para instalar:</b> tocá <img src="/assets/share-ios.svg" width="20" style="vertical-align:middle"> y luego "Agregar a pantalla de inicio". <span style="margin-left:auto;cursor:pointer;font-weight:700;font-size:1.3em" id="close-tip">×</span>',
    groupCreatedSuccess: '¡Grupo "{group}" creado exitosamente!',
  },
  en: {
    title: "SplitMates - Split Expenses with Friends",
    description: "Easily split expenses among friends and balance everyone's account.",
    participants: "Participants",
    addParticipant: "Add",
    expenses: "Expenses",
    expenseName: "What did you buy?",
    expenseAmount: "Amount ($)",
    expensePayer: "Paid by",
    addExpense: "Add expense",
    edit: "Edit",
    remove: "Remove",
    calculate: "Split expenses",
    results: "Results",
    summaryTotal: "Total spent:",
    summaryEach: "Each should pay:",
    spent: "Spent:",
    balance: "Balance:",
    owesTo: '{from} should pay <b>{amount}</b> to {to}',
    currency: "$",
    positiveSign: "+",
    negativeSign: "-",
    transferTitle: "Suggested transfers:",
    noTransfer: "No pending transfers: everyone paid the same. 🎉",
    reset: "New group",
    dark: "Switch dark/light mode",
    reportWho: "Who spent more?",
    reportDistrib: "Expense distribution",
    footer: "💡 SplitMates • Made with ♥ by TowaCAI",
    confirmReset: "Are you sure you want to start a new group and delete all current data?",
    editParticipantHint: "Double click to edit",
    defaultGroup: "Hangout",
    confirmDeleteGroup: 'Are you sure you want to delete the group "{group}"?',
    cannotDeleteLastGroup: "You cannot delete the last group.",
    newGroupPrompt: "Name of the new group/hangout:",
    iosInstallTip: '👉 <b>To install:</b> tap <img src="/assets/share-ios.svg" width="20" style="vertical-align:middle"> and then "Add to Home Screen". <span style="margin-left:auto;cursor:pointer;font-weight:700;font-size:1.3em" id="close-tip">×</span>',
    groupCreatedSuccess: 'Group "{group}" created successfully!',
  },
  fr: {
    title: "SplitMates - Répartition des Dépenses entre Amis",
    description: "Divisez facilement les dépenses entre amis et équilibrez les comptes.",
    participants: "Participants",
    addParticipant: "Ajouter",
    expenses: "Dépenses",
    expenseName: "Qu'avez-vous acheté ?",
    expenseAmount: "Montant (€)",
    expensePayer: "Payé par",
    addExpense: "Ajouter une dépense",
    edit: "Modifier",
    remove: "Supprimer",
    calculate: "Calculer la répartition",
    results: "Résultats",
    summaryTotal: "Total dépensé :",
    summaryEach: "Chacun doit payer :",
    spent: "Dépensé :",
    balance: "Solde :",
    owesTo: '{from} doit payer <b>{amount}</b> à {to}',
    currency: "€",
    positiveSign: "+",
    negativeSign: "-",
    transferTitle: "Transferts suggérés :",
    noTransfer: "Aucun transfert à effectuer : tout le monde a dépensé la même chose. 🎉",
    reset: "Nouveau groupe",
    dark: "Changer mode clair/sombre",
    reportWho: "Qui a le plus dépensé ?",
    reportDistrib: "Répartition des dépenses",
    footer: "💡 SplitMates • Réalisé avec ♥ par TowaCAI",
    confirmReset: "Êtes-vous sûr de vouloir commencer un nouveau groupe et supprimer toutes les données actuelles ?",
    editParticipantHint: "Double-cliquez pour modifier",
    defaultGroup: "Soirée",
    confirmDeleteGroup: 'Êtes-vous sûr de vouloir supprimer le groupe « {group} » ?',
    cannotDeleteLastGroup: "Impossible de supprimer le dernier groupe.",
    newGroupPrompt: "Nom du nouveau groupe/soirée :",
    iosInstallTip: '👉 <b>Pour installer :</b> appuyez sur <img src="/assets/share-ios.svg" width="20" style="vertical-align:middle"> puis « Ajouter à l\'écran d\'accueil ». <span style="margin-left:auto;cursor:pointer;font-weight:700;font-size:1.3em" id="close-tip">×</span>',
    groupCreatedSuccess: 'Groupe « {group} » créé avec succès !',
  },
  pt: {
    title: "SplitMates - Divisão de Despesas entre Amigos",
    description: "Divida despesas facilmente entre amigos e equilibre as contas.",
    participants: "Participantes",
    addParticipant: "Adicionar",
    expenses: "Despesas",
    expenseName: "O que compraram?",
    expenseAmount: "Valor (R$)",
    expensePayer: "Pago por",
    addExpense: "Adicionar despesa",
    edit: "Editar",
    remove: "Remover",
    calculate: "Calcular divisão",
    results: "Resultados",
    summaryTotal: "Total gasto:",
    summaryEach: "Cada um deve pagar:",
    spent: "Gasto:",
    balance: "Saldo:",
    owesTo: '{from} deve pagar <b>{amount}</b> para {to}',
    currency: "R$",
    positiveSign: "+",
    negativeSign: "-",
    transferTitle: "Transferências sugeridas:",
    noTransfer: "Nenhuma transferência pendente: todos gastaram o mesmo. 🎉",
    reset: "Novo grupo",
    dark: "Alternar modo claro/escuro",
    reportWho: "Quem gastou mais?",
    reportDistrib: "Distribuição de despesas",
    footer: "💡 SplitMates • Feito com ♥ por TowaCAI",
    confirmReset: "Tem certeza de que deseja iniciar um novo grupo e excluir todos os dados atuais?",
    editParticipantHint: "Clique duas vezes para editar",
    defaultGroup: "Encontro",
    confirmDeleteGroup: 'Tem certeza de que deseja excluir o grupo "{group}"?',
    cannotDeleteLastGroup: "Não é possível excluir o último grupo.",
    newGroupPrompt: "Nome do novo grupo/encontro:",
    iosInstallTip: '👉 <b>Para instalar:</b> toque em <img src="/assets/share-ios.svg" width="20" style="vertical-align:middle"> e depois em "Adicionar à tela inicial". <span style="margin-left:auto;cursor:pointer;font-weight:700;font-size:1.3em" id="close-tip">×</span>',
    groupCreatedSuccess: 'Grupo "{group}" criado com sucesso!',
  },
  it: {
    title: "SplitMates - Divisione delle Spese tra Amici",
    description: "Dividi facilmente le spese tra amici e bilancia i conti.",
    participants: "Partecipanti",
    addParticipant: "Aggiungi",
    expenses: "Spese",
    expenseName: "Cosa avete comprato?",
    expenseAmount: "Importo (€)",
    expensePayer: "Pagato da",
    addExpense: "Aggiungi spesa",
    edit: "Modifica",
    remove: "Rimuovi",
    calculate: "Calcola divisione",
    results: "Risultati",
    summaryTotal: "Totale speso:",
    summaryEach: "Ciascuno dovrebbe pagare:",
    spent: "Speso:",
    balance: "Saldo:",
    owesTo: '{from} deve dare <b>{amount}</b> a {to}',
    currency: "€",
    positiveSign: "+",
    negativeSign: "-",
    transferTitle: "Trasferimenti suggeriti:",
    noTransfer: "Nessun trasferimento necessario: tutti hanno speso la stessa cifra. 🎉",
    reset: "Nuovo gruppo",
    dark: "Cambia modalità chiara/scura",
    reportWho: "Chi ha speso di più?",
    reportDistrib: "Distribuzione delle spese",
    footer: "💡 SplitMates • Fatto con ♥ da TowaCAI",
    confirmReset: "Sei sicuro di voler iniziare un nuovo gruppo e cancellare tutti i dati attuali?",
    editParticipantHint: "Doppio click per modificare",
    defaultGroup: "Ritrovo",
    confirmDeleteGroup: 'Sei sicuro di voler eliminare il gruppo "{group}"?',
    cannotDeleteLastGroup: "Impossibile eliminare l'ultimo gruppo.",
    newGroupPrompt: "Nome del nuovo gruppo/ritrovo:",
    iosInstallTip: '👉 <b>Per installare:</b> tocca <img src="/assets/share-ios.svg" width="20" style="vertical-align:middle"> e poi "Aggiungi a Home". <span style="margin-left:auto;cursor:pointer;font-weight:700;font-size:1.3em" id="close-tip">×</span>',
    groupCreatedSuccess: 'Gruppo "{group}" creato con successo!',
  },
  de: {
    title: "SplitMates - Aufteilung der Ausgaben unter Freunden",
    description: "Teile Ausgaben einfach unter Freunden auf und gleiche die Konten aus.",
    participants: "Teilnehmer",
    addParticipant: "Hinzufügen",
    expenses: "Ausgaben",
    expenseName: "Was wurde gekauft?",
    expenseAmount: "Betrag (€)",
    expensePayer: "Bezahlt von",
    addExpense: "Ausgabe hinzufügen",
    edit: "Bearbeiten",
    remove: "Entfernen",
    calculate: "Aufteilen",
    results: "Ergebnisse",
    summaryTotal: "Gesamtausgaben:",
    summaryEach: "Jeder sollte zahlen:",
    spent: "Ausgegeben:",
    balance: "Saldo:",
    owesTo: '{from} sollte <b>{amount}</b> an {to} zahlen',
    currency: "€",
    positiveSign: "+",
    negativeSign: "-",
    transferTitle: "Vorgeschlagene Überweisungen:",
    noTransfer: "Keine ausstehenden Überweisungen: Jeder hat gleich viel ausgegeben. 🎉",
    reset: "Neue Gruppe",
    dark: "Hellen/dunklen Modus wechseln",
    reportWho: "Wer hat am meisten ausgegeben?",
    reportDistrib: "Ausgabenverteilung",
    footer: "💡 SplitMates • Erstellt mit ♥ von TowaCAI",
    confirmReset: "Sind Sie sicher, dass Sie eine neue Gruppe starten und alle aktuellen Daten löschen möchten?",
    editParticipantHint: "Doppelklick zum Bearbeiten",
    defaultGroup: "Treffen",
    confirmDeleteGroup: 'Sind Sie sicher, dass Sie die Gruppe "{group}" löschen möchten?',
    cannotDeleteLastGroup: "Die letzte Gruppe kann nicht gelöscht werden.",
    newGroupPrompt: "Name der neuen Gruppe/Treffen:",
    iosInstallTip: '👉 <b>Zum Installieren:</b> tippen Sie auf <img src="/assets/share-ios.svg" width="20" style="vertical-align:middle"> und dann auf "Zum Startbildschirm hinzufügen". <span style="margin-left:auto;cursor:pointer;font-weight:700;font-size:1.3em" id="close-tip">×</span>',
    groupCreatedSuccess: 'Gruppe "{group}" erfolgreich erstellt!',
  },
  ru: {
    title: "SplitMates – Разделение расходов с друзьями",
    description: "Легко делите расходы с друзьями и уравновешивайте счета.",
    participants: "Участники",
    addParticipant: "Добавить",
    expenses: "Расходы",
    expenseName: "Что купили?",
    expenseAmount: "Сумма (₽)",
    expensePayer: "Заплатил",
    addExpense: "Добавить расход",
    edit: "Редактировать",
    remove: "Удалить",
    calculate: "Рассчитать деление",
    results: "Результаты",
    summaryTotal: "Всего потрачено:",
    summaryEach: "Каждый должен заплатить:",
    spent: "Потратил:",
    balance: "Баланс:",
    owesTo: '{from} должен отдать <b>{amount}</b> {to}',
    currency: "₽",
    positiveSign: "+",
    negativeSign: "-",
    transferTitle: "Рекомендуемые переводы:",
    noTransfer: "Нет необходимых переводов: все потратили одинаково. 🎉",
    reset: "Новая группа",
    dark: "Переключить светлый/тёмный режим",
    reportWho: "Кто потратил больше?",
    reportDistrib: "Распределение расходов",
    footer: "💡 SplitMates • Сделано с ♥ от TowaCAI",
    confirmReset: "Вы уверены, что хотите начать новую группу и удалить все текущие данные?",
    editParticipantHint: "Двойной клик для редактирования",
    defaultGroup: "Встреча",
    confirmDeleteGroup: 'Вы уверены, что хотите удалить группу «{group}»?',
    cannotDeleteLastGroup: "Нельзя удалить последнюю группу.",
    newGroupPrompt: "Название новой группы/встречи:",
    iosInstallTip: '👉 <b>Для установки:</b> нажмите <img src="/assets/share-ios.svg" width="20" style="vertical-align:middle">, затем "Добавить на главный экран". <span style="margin-left:auto;cursor:pointer;font-weight:700;font-size:1.3em" id="close-tip">×</span>',
    groupCreatedSuccess: 'Группа «{group}» успешно создана!',
  }
};

// Lista de idiomas disponibles y banderas
const LANGUAGES = [
  { code: 'es', label: 'Español', flag: '🇦🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

// Llenar el select al cargar
// Rellena el selector de idiomas
function fillLangSelect() {
  const select = document.getElementById('lang-select');
  select.innerHTML = '';
  LANGUAGES.forEach(lang => {
    const opt = document.createElement('option');
    opt.value = lang.code;
    opt.textContent = `${lang.flag} ${lang.label}`;
    select.appendChild(opt);
  });
  // Setea el seleccionado
  select.value = currentLang;
}

// === Lógica de cambio de idioma ===
let currentLang = localStorage.getItem('splitmates_lang') || 'es';

// Cambia el idioma activo y guarda la preferencia
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('splitmates_lang', lang);
  applyTranslations();
  // Actualiza el selector si existe
  const select = document.getElementById('lang-select');
  if (select) select.value = lang;
}

// Aplica los textos según el idioma actual
function applyTranslations() {
  const t = TRANSLATIONS[currentLang];

  // Título y descripción
  document.title = t.title;
  document.querySelector('meta[name="description"]').setAttribute('content', t.description);

  // Header
  document.querySelector('.header h1').textContent = '🧑‍🤝‍🧑 SplitMates';
  document.querySelector('.header p').textContent = t.description;

  // Participantes
  document.querySelector('#participants-section h2').textContent = t.participants;
  document.getElementById('add-participant-btn').textContent = t.addParticipant;
  document.querySelector('#participant-name').setAttribute('placeholder', t.participants);

  // Gastos
  document.querySelector('#expenses-section h2').textContent = t.expenses;
  document.querySelector('#expense-name').setAttribute('placeholder', t.expenseName);
  document.querySelector('#expense-amount').setAttribute('placeholder', t.expenseAmount);
  document.querySelector('#expense-payer').options[0].textContent = t.expensePayer;
  document.querySelector('#add-expense-form button').textContent = t.addExpense;

  // Botón calcular
  document.querySelector('#calculate-btn').textContent = t.calculate;

  // Resultados
  document.querySelector('#results-section h2').textContent = t.results;
  document.querySelector('#reset-btn').textContent = t.reset;

  // Botón modo oscuro
  document.querySelector('#toggle-dark').setAttribute('title', t.dark);
  document.querySelector('#toggle-dark').setAttribute('aria-label', t.dark);

  // Footer
  document.querySelector('.footer small').innerHTML =
    t.footer
      .replace('♥', `<span style="color:#e53935;">♥</span>`)
      .replace('TowaCAI', `<a href="https://github.com/TowaCAI" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;">TowaCAI</a>`);
}

// Evento para los botones de idioma
document.querySelectorAll('.flag-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

// Aplica traducciones al cargar
window.addEventListener('DOMContentLoaded', applyTranslations);

// Evento para el cambio de idioma con el select
document.addEventListener('DOMContentLoaded', () => {
  fillLangSelect();
  document.getElementById('lang-select').addEventListener('change', (e) => setLang(e.target.value));
});
