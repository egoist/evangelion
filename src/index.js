import morphdom from 'morphdom'
import html from 'bel'

function eva(vm) {
	const data = typeof vm.data === 'function' ?
		vm.data() :
		vm.data

	// initial reactive data
	vm.$data = data
	for (const key in data) {
		Object.defineProperty(vm, key, {
			get() {
				return vm.$data[key]
			},
			set(val) {
				vm.$data[key] = val
				vm.$update()
			}
		})
	}

	// bind methods
	for (const key in vm.methods) {
		vm[key] = vm.methods[key].bind(vm)
	}

	vm.render = vm.render.bind(vm)

	vm.$id = ramdomId()
	const html = vm.render()
	html.setAttribute('data-eva-id', vm.$id)
	vm.$html = html

	// update when change data
	vm.$update = () => {
		const html = vm.render()
		html.setAttribute('data-eva-id', vm.$id)
		vm.$html = html
		const oldHtml = document.querySelector(`[data-eva-id="${vm.$id}"]`)
		morphdom(oldHtml, vm.$html)
	}

	// add $mount
	vm.$mount = toNode => {
		toNode.appendChild(vm.$html)
	}

	return vm
}

function ramdomId() {
	return Math.random()
}

function mount(vm, toNode) {
	toNode.appendChild(vm.$html)
}

export default eva
export {html, mount}
