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

export const responsibles = (state, responsibles) => {
	state.responsibles = responsibles
}