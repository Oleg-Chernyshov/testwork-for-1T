export const setModules = (state, { modules, refetch }) => {
	state.refetchModules = refetch
	state.modules = modules
}

export const setModuleIndex = (state, index) => {
	state.module_index = index
}

export const SetId = (state, id) => {
	state.id = id
}

export const setSubjects = (state, subjects) => {
	state.subjects = subjects
}

export const setResponsibles = (state, { responsibles, optionsForResponsibles, refetch }) => {
	state.responsibles = responsibles
	state.optionsForResponsibles = optionsForResponsibles
	state.refetchQueryResponsible = refetch
}

export const setExecutors = (state, { executors, optionsForExecutors, refetch }) => {
	state.executors = executors
	state.optionsForExecutors = optionsForExecutors
	state.refetchQueryExecutors = refetch
}