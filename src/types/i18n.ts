// Translation resource interfaces
export interface CommonTranslations {
  loading: string;
  error: string;
  success: string;
  cancel: string;
  confirm: string;
  back: string;
  next: string;
  save: string;
  delete: string;
  edit: string;
  create: string;
  close: string;
  open: string;
  refresh: string;
  search: string;
  filter: string;
  sort: string;
  clear: string;
  reset: string;
  submit: string;
  apply: string;
  remove: string;
  add: string;
  update: string;
  view: string;
  download: string;
  upload: string;
  copy: string;
  paste: string;
  cut: string;
  undo: string;
  redo: string;
  select: string;
  selectAll: string;
  deselect: string;
  expand: string;
  collapse: string;
  maximize: string;
  minimize: string;
  fullscreen: string;
  exitFullscreen: string;
}

export interface NavigationTranslations {
  welcome: {
    title: string;
    subtitle: string;
  };
  projects: {
    title: string;
    subtitle: string;
  };
  agents: {
    title: string;
    subtitle: string;
  };
  settings: {
    title: string;
    subtitle: string;
  };
  usage: {
    title: string;
    subtitle: string;
  };
  mcp: {
    title: string;
    subtitle: string;
  };
  backToHome: string;
  goBack: string;
  goForward: string;
}

export interface ProjectTranslations {
  list: {
    title: string;
    empty: string;
    loadError: string;
    noProjects: string;
  };
  session: {
    new: string;
    running: string;
    loadError: string;
    create: string;
    open: string;
    delete: string;
    rename: string;
  };
  actions: {
    createProject: string;
    deleteProject: string;
    openProject: string;
    projectSettings: string;
  };
}

export interface SessionTranslations {
  list: {
    title: string;
    empty: string;
    loadError: string;
  };
  actions: {
    newSession: string;
    openSession: string;
    deleteSession: string;
    renameSession: string;
  };
  status: {
    running: string;
    stopped: string;
    error: string;
    completed: string;
  };
}

export interface SettingsTranslations {
  title: string;
  general: {
    title: string;
    language: string;
    theme: string;
    autoSave: string;
  };
  claude: {
    title: string;
    binaryPath: string;
    version: string;
    checkVersion: string;
  };
  advanced: {
    title: string;
    debugMode: string;
    logLevel: string;
    clearCache: string;
  };
}

export interface AgentTranslations {
  title: string;
  list: {
    title: string;
    empty: string;
    loadError: string;
  };
  actions: {
    createAgent: string;
    editAgent: string;
    deleteAgent: string;
    runAgent: string;
    stopAgent: string;
  };
  status: {
    idle: string;
    running: string;
    completed: string;
    error: string;
    stopped: string;
  };
}

export interface ErrorTranslations {
  system: {
    fileNotFound: string;
    networkError: string;
    permissionDenied: string;
    unknownError: string;
  };
  validation: {
    required: string;
    invalidFormat: string;
    tooShort: string;
    tooLong: string;
    invalidEmail: string;
    invalidUrl: string;
  };
  user: {
    permissionDenied: string;
    operationFailed: string;
    sessionExpired: string;
  };
  loading: {
    projectsFailed: string;
    sessionsFailed: string;
    agentsFailed: string;
    settingsFailed: string;
  };
}

export interface ActionTranslations {
  confirm: {
    delete: string;
    clear: string;
    reset: string;
    logout: string;
    exit: string;
  };
  success: {
    saved: string;
    deleted: string;
    created: string;
    updated: string;
    copied: string;
  };
  buttons: {
    tryAgain: string;
    learnMore: string;
    getStarted: string;
    continue: string;
    finish: string;
    skip: string;
  };
}

// Main translation resource interface
export interface TranslationResource {
  common: CommonTranslations;
  navigation: NavigationTranslations;
  projects: ProjectTranslations;
  sessions: SessionTranslations;
  settings: SettingsTranslations;
  agents: AgentTranslations;
  errors: ErrorTranslations;
  actions: ActionTranslations;
}

// Type for translation keys (for type safety)
export type TranslationKey = 
  | `common.${keyof CommonTranslations}`
  | `navigation.${string}`
  | `projects.${string}`
  | `sessions.${string}`
  | `settings.${string}`
  | `agents.${string}`
  | `errors.${string}`
  | `actions.${string}`;