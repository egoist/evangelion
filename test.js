import eva, {html} from './'

const app = eva({
	data: {count: 0},
	methods: {
		increment() {
			console.log('increment')
			this.count++
		}
	},
	render() {
		return html`
			<div class="count" onclick=${this.increment}>
				${this.count}
			</div>
		`
	}
})

app.$mount(document.body)
window.app = app
console.log(app)
