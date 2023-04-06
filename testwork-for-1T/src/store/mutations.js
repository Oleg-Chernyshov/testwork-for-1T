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

export const setResponsibles = (state, { responsibles, options, refetch }) => {
	state.responsibles = responsibles
	state.options = options
	state.refetchQueryResponsible = refetch
}