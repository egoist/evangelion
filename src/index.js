import morphdom from 'morphdom'
import html from 'bel'

function extend(vm) {
	const data = typeof vm.data === 'function' ?
		vm.data() :
		vm.data

	const newVm = vm

	// initial reative data
	newVm.$data = data
	for (const key in data) {
		Object.defineProperty(newVm, key, {
			get() {
				return newVm.$data[key]
			},
			set(val) {
				newVm.$data[key] = val
				newVm.$update()
			}
		})
	}

	// bind methods
	for (const key in newVm.methods) {
		newVm[key] = newVm.methods[key].bind(newVm)
	}

	newVm.render = newVm.render.bind(newVm)

	newVm.$id = ramdomId()
	const html = newVm.render()
	html.setAttribute('data-eva-id', newVm.$id)
	newVm.$html = html

	// update when change data
	newVm.$update = () => {
		const html = newVm.render()
		html.setAttribute('data-eva-id', newVm.$id)
		newVm.$html = html
		const oldHtml = document.querySelector(`[data-eva-id="${newVm.$id}"]`)
		morphdom(oldHtml, newVm.$html)
	}

	return newVm
}

function ramdomId() {
	return Math.random()
}

export default extend
export {html}
