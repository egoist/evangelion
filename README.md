# Evangelion

View layer done right, using ES6 template string.

## Quick Glance

Preview the example online: https://egoistian.com/evangelion/

```js
import eva, {html, mount} from 'evangelion'

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
			<div onclick=${this.increment}>${this.count}</div>
		`
	}
})

mount(app, document.body)
```

## Roadmap

- [x] Rerender view after update state
- [ ] Consider Virtual-Dom
- [ ] Recursive getter/setter, like `this.foo.count++`
- [ ] Component system

## Development

- `npm run build` - build cjs/umd/umd:minify

Check out [package.json](/package.json) for more.

## License

MIT &copy; [EGOIST](https://github.com/egoist)
