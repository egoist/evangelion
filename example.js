import eva, {html, mount} from './src'
import './example/style.css'

const app = eva({
    data() {
        return {count: 0}
    },
    methods: {
        increment() {
            this.count++
        }
    },
    render() {
        return html`
			<div>
				<logo></logo>
            	<div class="count" onclick=${this.increment}>${this.count}</div>
			</div>
        `
    }
})
window.app = app
mount(app, document.body)
