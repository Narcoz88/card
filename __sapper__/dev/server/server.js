'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sirv = _interopDefault(require('sirv'));
var polka = _interopDefault(require('polka'));
var compression = _interopDefault(require('compression'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var Stream = _interopDefault(require('stream'));
var http = _interopDefault(require('http'));
var Url = _interopDefault(require('url'));
var https = _interopDefault(require('https'));
var zlib = _interopDefault(require('zlib'));

// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
	{
		title: 'What is Sapper?',
		slug: 'what-is-sapper',
		html: `
			<p>First, you have to know what <a href='https://svelte.dev'>Svelte</a> is. Svelte is a UI framework with a bold new idea: rather than providing a library that you write code with (like React or Vue, for example), it's a compiler that turns your components into highly optimized vanilla JavaScript. If you haven't already read the <a href='https://svelte.dev/blog/frameworks-without-the-framework'>introductory blog post</a>, you should!</p>

			<p>Sapper is a Next.js-style framework (<a href='blog/how-is-sapper-different-from-next'>more on that here</a>) built around Svelte. It makes it embarrassingly easy to create extremely high performance web apps. Out of the box, you get:</p>

			<ul>
				<li>Code-splitting, dynamic imports and hot module replacement, powered by webpack</li>
				<li>Server-side rendering (SSR) with client-side hydration</li>
				<li>Service worker for offline support, and all the PWA bells and whistles</li>
				<li>The nicest development experience you've ever had, or your money back</li>
			</ul>

			<p>It's implemented as Express middleware. Everything is set up and waiting for you to get started, but you keep complete control over the server, service worker, webpack config and everything else, so it's as flexible as you need it to be.</p>
		`
	},

	{
		title: 'How to use Sapper',
		slug: 'how-to-use-sapper',
		html: `
			<h2>Step one</h2>
			<p>Create a new project, using <a href='https://github.com/Rich-Harris/degit'>degit</a>:</p>

			<pre><code>npx degit "sveltejs/sapper-template#rollup" my-app
			cd my-app
			npm install # or yarn!
			npm run dev
			</code></pre>

			<h2>Step two</h2>
			<p>Go to <a href='http://localhost:3000'>localhost:3000</a>. Open <code>my-app</code> in your editor. Edit the files in the <code>src/routes</code> directory or add new ones.</p>

			<h2>Step three</h2>
			<p>...</p>

			<h2>Step four</h2>
			<p>Resist overdone joke formats.</p>
		`
	},

	{
		title: 'Why the name?',
		slug: 'why-the-name',
		html: `
			<p>In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as <em>sappers</em>.</p>

			<p>For web developers, the stakes are generally lower than those for combat engineers. But we face our own hostile environment: underpowered devices, poor network connections, and the complexity inherent in front-end engineering. Sapper, which is short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong>, is your courageous and dutiful ally.</p>
		`
	},

	{
		title: 'How is Sapper different from Next.js?',
		slug: 'how-is-sapper-different-from-next',
		html: `
			<p><a href='https://github.com/zeit/next.js'>Next.js</a> is a React framework from <a href='https://zeit.co'>Zeit</a>, and is the inspiration for Sapper. There are a few notable differences, however:</p>

			<ul>
				<li>It's powered by <a href='https://svelte.dev'>Svelte</a> instead of React, so it's faster and your apps are smaller</li>
				<li>Instead of route masking, we encode route parameters in filenames. For example, the page you're looking at right now is <code>src/routes/blog/[slug].html</code></li>
				<li>As well as pages (Svelte components, which render on server or client), you can create <em>server routes</em> in your <code>routes</code> directory. These are just <code>.js</code> files that export functions corresponding to HTTP methods, and receive Express <code>request</code> and <code>response</code> objects as arguments. This makes it very easy to, for example, add a JSON API such as the one <a href='blog/how-is-sapper-different-from-next.json'>powering this very page</a></li>
				<li>Links are just <code>&lt;a&gt;</code> elements, rather than framework-specific <code>&lt;Link&gt;</code> components. That means, for example, that <a href='blog/how-can-i-get-involved'>this link right here</a>, despite being inside a blob of HTML, works with the router as you'd expect.</li>
			</ul>
		`
	},

	{
		title: 'How can I get involved?',
		slug: 'how-can-i-get-involved',
		html: `
			<p>We're so glad you asked! Come on over to the <a href='https://github.com/sveltejs/svelte'>Svelte</a> and <a href='https://github.com/sveltejs/sapper'>Sapper</a> repos, and join us in the <a href='https://svelte.dev/chat'>Discord chatroom</a>. Everyone is welcome, especially you!</p>
		`
	}
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug
	};
}));

function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}

var route_0 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get
});

const lookup = new Map();
posts.forEach(post => {
	lookup.set(post.slug, JSON.stringify(post));
});

function get$1(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

var route_1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get$1
});

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

/* src\components\Card.svelte generated by Svelte v3.12.1 */

const css = {
	code: ".wrap-card.svelte-14uywbf{position:relative}.card.svelte-14uywbf{display:flex;width:450px;height:270px;background-image:url(/mir-details-01.png), url(/color.jpg);background-position:left 30px top 30px, center center;background-repeat:no-repeat, no-repeat;-webkit-background-size:15%, 100%;background-size:15%, 100%;-webkit-border-radius:20px;-moz-border-radius:20px;border-radius:20px;padding:170px 30px 30px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-size:0;flex-wrap:wrap;-webkit-transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);-moz-transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);-ms-transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);-o-transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);box-shadow:0 20px 60px 0 rgba(14, 42, 90, 0.55);transform:perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg);transform-style:preserve-3d;backface-visibility:hidden;margin:0 auto 30px}.wrap-card-back.svelte-14uywbf{width:100%;position:absolute;top:0;left:0}.card-back.svelte-14uywbf{display:flex;width:450px;height:270px;background-image:url(/color.jpg);background-position:center center;background-repeat:no-repeat, no-repeat;-webkit-background-size:100%;background-size:100%;-webkit-border-radius:20px;-moz-border-radius:20px;border-radius:20px;padding:170px 30px 30px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0 0 0 0 #000;-moz-box-shadow:0 0 0 0 #000;box-shadow:0 0 0 0 #000;font-size:0;flex-wrap:wrap;margin:0 auto 30px;transform-style:preserve-3d;box-shadow:0 20px 60px 0 rgba(14, 42, 90, 0.55);-webkit-transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);-moz-transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);-ms-transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);-o-transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);-webkit-transform:perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);-moz-transform:perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);-ms-transform:perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);-o-transform:perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);transform:perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);backface-visibility:hidden}.wrap-card.active.svelte-14uywbf .card.svelte-14uywbf{-webkit-transform:perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);-moz-transform:perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);-ms-transform:perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);-o-transform:perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);transform:perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg)}.wrap-card.active.svelte-14uywbf .card-back.svelte-14uywbf{-webkit-transform:perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);-moz-transform:perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);-ms-transform:perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);-o-transform:perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);transform:perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1)}.card-number.svelte-14uywbf{display:flex;max-width:100%;width:100%;height:24px;color:#ffffff;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;padding:0 20px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin-bottom:20px;font-size:16px;overflow:hidden}.card-holders.svelte-14uywbf{display:inline-block;width:255px;color:#ffffff;font-weight:bold;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-size:16px;margin-right:50px}.card-month-wrap.svelte-14uywbf{display:inline-block;width:38px;height:25px;color:#ffffff;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;padding:0 5px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-size:16px;text-align:center;overflow:hidden;position:relative}.card-month.svelte-14uywbf{transition:transform 0.3s;will-change:transform;position:absolute;left:0;bottom:0;width:100%;height:100%}.slash.svelte-14uywbf{color:#ffffff;font-size:16px}.card-year-wrap.svelte-14uywbf{display:inline-block;width:38px;height:25px;overflow:hidden;color:#ffffff;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;padding:0 5px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-size:16px;text-align:center;position:relative}.card-year.svelte-14uywbf{transition:transform 0.3s;will-change:transform;position:absolute;left:0;bottom:0;width:100%;height:100%}.digit-item.svelte-14uywbf{-webkit-transition:all 1s;-moz-transition:all 1s;-ms-transition:all 1s;-o-transition:all 1s;transition:all 1s}.digit-item.active.svelte-14uywbf{}.input-field.svelte-14uywbf{width:450px;margin:0 auto}.input-field.svelte-14uywbf input.svelte-14uywbf:first-child,.input-field.svelte-14uywbf input.svelte-14uywbf:nth-child(2){width:100%}.card-number.svelte-14uywbf .num.svelte-14uywbf{width:18px;height:20px;overflow:hidden;margin-top:2px;margin-bottom:5px;text-align:center;line-height:20px;-webkit-transition:all 0.2s;-moz-transition:all 0.2s;-ms-transition:all 0.2s;-o-transition:all 0.2s;transition:all 0.2s;font-family:'Bebas Neue';font-size:26px}.card-number.svelte-14uywbf .num.active.svelte-14uywbf{-webkit-transform:translate(0, -25px);-moz-transform:translate(0, -25px);-ms-transform:translate(0, -25px);-o-transform:translate(0, -25px);transform:translate(0, -25px)}.card-number.svelte-14uywbf .digit-item:nth-child(6) .num.active.svelte-14uywbf,.card-number.svelte-14uywbf .digit-item:nth-child(7) .num.active.svelte-14uywbf,.card-number.svelte-14uywbf .digit-item:nth-child(8) .num.active.svelte-14uywbf,.card-number.svelte-14uywbf .digit-item:nth-child(9) .num.active.svelte-14uywbf,.card-number.svelte-14uywbf .digit-item:nth-child(11) .num.active.svelte-14uywbf,.card-number.svelte-14uywbf .digit-item:nth-child(12) .num.active.svelte-14uywbf,.card-number.svelte-14uywbf .digit-item:nth-child(13) .num.active.svelte-14uywbf,.card-number.svelte-14uywbf .digit-item:nth-child(14) .num.active.svelte-14uywbf{line-height:25px}.card-number.svelte-14uywbf .num.not-active.svelte-14uywbf{-webkit-transform:translate(0, -25px);-moz-transform:translate(0, -25px);-ms-transform:translate(0, -25px);-o-transform:translate(0, -25px);transform:translate(0, -25px)}.card-holders.svelte-14uywbf{display:flex;height:24px;overflow:hidden;padding-left:5px;flex-wrap:wrap}.card-holders.svelte-14uywbf .num.svelte-14uywbf{width:12px;height:20px;overflow:hidden;margin-top:2px;margin-bottom:5px;text-align:center;font-size:11px;line-height:20px;-webkit-transition:all 0.5s;-moz-transition:all 0.5s;-ms-transition:all 0.5s;-o-transition:all 0.5s;transition:all 0.5s;-webkit-transform:translate(15px, -25px) rotate(90deg);-moz-transform:translate(15px, -25px) rotate(90deg);-ms-transform:translate(15px, -25px) rotate(90deg);-o-transform:translate(15px, -25px) rotate(90deg);transform:translate(15px, -25px) rotate(90deg);text-transform:uppercase;font-weight:normal;font-family:'Bebas Neue';font-size:20px}.card-holders.svelte-14uywbf .num.active.svelte-14uywbf{-webkit-transform:translate(0, -25px) rotate(0deg);-moz-transform:translate(0, -25px) rotate(0deg);-ms-transform:translate(0, -25px) rotate(0deg);-o-transform:translate(0, -25px) rotate(0deg);transform:translate(0, -25px) rotate(0deg)}.card-holders.svelte-14uywbf .num.not-active.svelte-14uywbf{-webkit-transform:translate(0, -25px) rotate(0deg);-moz-transform:translate(0, -25px) rotate(0deg);-ms-transform:translate(0, -25px) rotate(0deg);-o-transform:translate(0, -25px) rotate(0deg);transform:translate(0, -25px) rotate(0deg)}.placeholder.svelte-14uywbf{width:100%;max-width:100%;font-family:'Bebas Neue';font-size:20px;line-height:25px;letter-spacing:4.4pt;text-indent:5px;font-weight:normal}.placeholder.active.svelte-14uywbf{width:100%;max-width:100%;-webkit-transition:all 0.2s;-moz-transition:all 0.2s;-ms-transition:all 0.2s;-o-transition:all 0.2s;transition:all 0.2s}.placeholder.not-active.svelte-14uywbf{margin-top:-25px}#cardcode.svelte-14uywbf{height:50px;padding:5px 15px;border:1px solid #ced6e0;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;margin-bottom:20px;box-sizing:border-box}#cardcode2.svelte-14uywbf{height:50px;padding:5px 15px;border:1px solid #ced6e0;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;margin-bottom:20px;box-sizing:border-box}#cardcode3.svelte-14uywbf{height:50px;padding:5px 15px;border:1px solid #ced6e0;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;margin-bottom:20px;box-sizing:border-box}#cardcode4.svelte-14uywbf{height:50px;padding:5px 15px;border:1px solid #ced6e0;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;margin-bottom:20px;box-sizing:border-box}#cardcode5.svelte-14uywbf{height:50px;padding:5px 15px;border:1px solid #ced6e0;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;margin-bottom:20px;box-sizing:border-box}.card-item-band.svelte-14uywbf{background:rgba(0, 0, 19, 0.8);width:100%;height:50px;margin-top:30px;position:absolute;z-index:2;top:0;left:0}.card-item-cvv.svelte-14uywbf{width:300px;height:45px;background:#fff;margin-bottom:30px;text-align:right;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:#1a3b5d;font-size:18px;border-radius:4px;box-shadow:0px 10px 20px -7px rgba(32, 56, 117, 0.35);-webkit-transform:scale(-1, 1);-moz-transform:scale(-1, 1);-ms-transform:scale(-1, 1);-o-transform:scale(-1, 1);transform:scale(-1, 1);position:absolute;right:30px;top:100px;left:auto}.star.svelte-14uywbf{-webkit-transform:translate(0, 3px);-moz-transform:translate(0, 3px);-ms-transform:translate(0, 3px);-o-transform:translate(0, 3px);transform:translate(0, 3px)}.three.svelte-14uywbf{width:100%;max-width:calc(33.33% - 3px)}.cvv-label.svelte-14uywbf{position:absolute;top:105px;left:45px;color:#ffffff;font-size:23px;-webkit-transform:scale(-1, 1);-moz-transform:scale(-1, 1);-ms-transform:scale(-1, 1);-o-transform:scale(-1, 1);transform:scale(-1, 1);text-shadow:0px 4px 4px #000000;letter-spacing:3pt}button.svelte-14uywbf{width:100%;height:55px;background:#2364d2;border:none;border-radius:5px;font-size:22px;font-weight:500;font-family:\"Source Sans Pro\", sans-serif;box-shadow:3px 10px 20px 0px rgba(35, 100, 210, 0.3);color:#fff;margin-top:20px;cursor:pointer}.month.svelte-14uywbf,.year.svelte-14uywbf{-webkit-transition:all 0.3s;-moz-transition:all 0.3s;-ms-transition:all 0.3s;-o-transition:all 0.3s;transition:all 0.3s !important}.month.up.svelte-14uywbf,.year.up.svelte-14uywbf{margin-top:-24px !important}.focus.svelte-14uywbf{position:absolute;top:0;left:0;width:450px;height:270px;z-index:3;border:2px solid #ffffff;-webkit-border-radius:14px;-moz-border-radius:14px;border-radius:14px;background-color:rgba(0,0,0,0.3);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-transition:all 0.5s;-moz-transition:all 0.5s;-ms-transition:all 0.5s;-o-transition:all 0.5s;transition:all 0.5s;opacity:0}.focus.focus-number.svelte-14uywbf{top:161px;left:41px;width:367px;height:40px;z-index:3;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;opacity:1}.focus.focus-name.svelte-14uywbf{top:206px;left:29px;width:257px;height:40px;z-index:3;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;opacity:1}.focus.focus-date.svelte-14uywbf{top:206px;left:330px;width:95px;height:40px;z-index:3;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;opacity:1}.card-fake-number.svelte-14uywbf{position:absolute;top:161px;left:41px;width:367px;height:40px;z-index:3;cursor:pointer;z-index:4}.card-fake-holder.svelte-14uywbf{position:absolute;top:206px;left:29px;width:257px;height:40px;cursor:pointer;z-index:4}.card-fake-month.svelte-14uywbf{position:absolute;top:206px;left:330px;width:40px;height:40px;cursor:pointer;z-index:4}.card-fake-year.svelte-14uywbf{position:absolute;top:206px;left:375px;width:40px;height:40px;cursor:pointer;z-index:4}",
	map: "{\"version\":3,\"file\":\"Card.svelte\",\"sources\":[\"Card.svelte\"],\"sourcesContent\":[\"<script >\\r\\n    import { onMount } from 'svelte';\\r\\n    let res = [];\\r\\n    let nameString = [];\\r\\n    let cvvString = [];\\r\\n    let on = false;\\r\\n    let numberFocus = false;\\r\\n    let nameFocus = false;\\r\\n    let dateFocus = false;\\r\\n    let monthMass = [\\\"MM\\\"];\\r\\n    let yearMass = [\\\"ГГ\\\"];\\r\\n    let thisNumber;\\r\\n    let thisHolder;\\r\\n    let thisCvv;\\r\\n    let thisMonth;\\r\\n    let thisYear;\\r\\n    let fakeMassNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];\\r\\n    let fakeMassName = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];\\r\\n    let massMonth = [\\\"01\\\", \\\"02\\\", \\\"03\\\", \\\"04\\\", \\\"05\\\", \\\"06\\\", \\\"07\\\", \\\"08\\\", \\\"09\\\", \\\"10\\\", \\\"11\\\", \\\"12\\\"];\\r\\n    let massYear = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];\\r\\n    let numberr;\\r\\n\\r\\n    const formatCardCode = () => {\\r\\n       let cardCode = thisNumber.value.replace(/[^\\\\d]/g, '').substring(0,16);\\r\\n       cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';\\r\\n       thisNumber.value = cardCode;\\r\\n       numberr.value = thisNumber.value.split(\\\" \\\").join(\\\"\\\");\\r\\n       let mass = cardcode.value.split('');\\r\\n       res = mass.map((item, index, array) => {\\r\\n           if(index > 3 && index < 14){\\r\\n               if (index == 4 || index == 9 || index == 14){\\r\\n                   return item;\\r\\n               }\\r\\n               return item = \\\"*\\\";\\r\\n           }\\r\\n           return item;\\r\\n       });\\r\\n   }\\r\\n\\r\\n   const inputName = () => {\\r\\n       nameString = thisHolder.value.split(\\\"\\\");\\r\\n   }\\r\\n\\r\\n   const cvv = () => {\\r\\n       cvvString = thisCvv.value.split(\\\"\\\");\\r\\n   }\\r\\n\\r\\n   const changeMonth = ({ target: { value }}) => {\\r\\n  \\t monthMass = [ ...monthMass, value ]\\r\\n   }\\r\\n\\r\\n   $: offset = monthMass && monthMass.length > 1 ? offset - 24 : 0;\\r\\n\\r\\n   const changeYear = ({ target: { value }}) => {\\r\\n     yearMass = [ ...yearMass, value ]\\r\\n   }\\r\\n\\r\\n   $: offset2 = yearMass && yearMass.length > 1 ? offset2 - 24 : 0;\\r\\n\\r\\n    const active = () => {on = true}\\r\\n    const deactive = () => {on = false; numberFocus = false; nameFocus = false; dateFocus = false}\\r\\n    const focusNumber = () => {numberFocus = true}\\r\\n    const focusName = () => {nameFocus = true}\\r\\n    const focusDate = () => {dateFocus = true}\\r\\n\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .wrap-card {\\r\\n        position: relative;\\r\\n    }\\r\\n    .card {\\r\\n        display: flex;\\r\\n        width: 450px;\\r\\n        height: 270px;\\r\\n        background-image:  url(/mir-details-01.png), url(/color.jpg);\\r\\n        background-position: left 30px top 30px, center center;\\r\\n        background-repeat: no-repeat, no-repeat;\\r\\n        -webkit-background-size: 15%, 100%;\\r\\n        background-size: 15%, 100%;\\r\\n        -webkit-border-radius: 20px;-moz-border-radius: 20px;border-radius: 20px;\\r\\n        padding: 170px 30px 30px;\\r\\n        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;\\r\\n        font-size: 0;\\r\\n        flex-wrap: wrap;\\r\\n        -webkit-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        -moz-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        -ms-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        -o-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.55);\\r\\n        transform: perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg);\\r\\n        transform-style: preserve-3d;\\r\\n        backface-visibility: hidden;\\r\\n        margin: 0 auto 30px;\\r\\n    }\\r\\n    .wrap-card-back {\\r\\n        width: 100%;\\r\\n        position: absolute;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n    }\\r\\n    .card-back {\\r\\n        display: flex;\\r\\n        width: 450px;\\r\\n        height: 270px;\\r\\n        background-image:  url(/color.jpg);\\r\\n        background-position: center center;\\r\\n        background-repeat: no-repeat, no-repeat;\\r\\n        -webkit-background-size: 100%;\\r\\n        background-size: 100%;\\r\\n        -webkit-border-radius: 20px;-moz-border-radius: 20px;border-radius: 20px;\\r\\n        padding: 170px 30px 30px;\\r\\n        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;\\r\\n        -webkit-box-shadow: 0 0 0 0 #000;-moz-box-shadow: 0 0 0 0 #000;box-shadow: 0 0 0 0 #000;\\r\\n        font-size: 0;\\r\\n        flex-wrap: wrap;\\r\\n        margin: 0 auto 30px;\\r\\n        transform-style: preserve-3d;\\r\\n        box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.55);\\r\\n        -webkit-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        -moz-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        -ms-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        -o-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        -webkit-transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        -moz-transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        -ms-transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        -o-transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        backface-visibility: hidden;\\r\\n    }\\r\\n    .wrap-card.active .card {\\r\\n        -webkit-transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);\\r\\n        -moz-transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);\\r\\n        -ms-transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);\\r\\n        -o-transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);\\r\\n        transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);\\r\\n    }\\r\\n    .wrap-card.active .card-back {\\r\\n        -webkit-transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        -moz-transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        -ms-transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        -o-transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n    }\\r\\n    .card-number {\\r\\n        display: flex;\\r\\n        max-width: 100%;\\r\\n        width: 100%;\\r\\n        height: 24px;\\r\\n        color: #ffffff;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        padding: 0 20px;\\r\\n        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;\\r\\n        margin-bottom: 20px;\\r\\n        font-size: 16px;\\r\\n        overflow: hidden;\\r\\n    }\\r\\n    .card-holders {\\r\\n        display: inline-block;\\r\\n        width: 255px;\\r\\n        color: #ffffff;\\r\\n        font-weight: bold;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        padding: 0;\\r\\n        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;\\r\\n        font-size: 16px;\\r\\n        margin-right: 50px;\\r\\n    }\\r\\n    .card-month-wrap {\\r\\n        display: inline-block;\\r\\n        width: 38px;\\r\\n        height: 25px;\\r\\n        color: #ffffff;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        padding: 0 5px;\\r\\n        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;\\r\\n        font-size: 16px;\\r\\n        text-align: center;\\r\\n        overflow: hidden;\\r\\n        position: relative;\\r\\n    }\\r\\n\\r\\n    .card-month {\\r\\n        transition: transform 0.3s;\\r\\n        will-change: transform;\\r\\n        position: absolute;\\r\\n        left: 0;\\r\\n        bottom: 0;\\r\\n        width: 100%;\\r\\n        height: 100%;\\r\\n    }\\r\\n    .slash {\\r\\n        color: #ffffff;\\r\\n        font-size: 16px;\\r\\n    }\\r\\n    .card-year-wrap {\\r\\n        display: inline-block;\\r\\n        width: 38px;\\r\\n        height: 25px;\\r\\n        overflow: hidden;\\r\\n        color: #ffffff;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        padding: 0 5px;\\r\\n        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;\\r\\n        font-size: 16px;\\r\\n        text-align: center;\\r\\n        position: relative;\\r\\n    }\\r\\n    .card-year {\\r\\n        transition: transform 0.3s;\\r\\n        will-change: transform;\\r\\n        position: absolute;\\r\\n        left: 0;\\r\\n        bottom: 0;\\r\\n        width: 100%;\\r\\n        height: 100%;\\r\\n    }\\r\\n    .digit-item {\\r\\n        -webkit-transition: all 1s;-moz-transition: all 1s;-ms-transition: all 1s;-o-transition: all 1s;transition: all 1s;\\r\\n    }\\r\\n    .digit-item.active {}\\r\\n    .input-field {\\r\\n        width: 450px;\\r\\n        margin: 0 auto;\\r\\n    }\\r\\n    .input-field input:first-child,\\r\\n    .input-field input:nth-child(2) {\\r\\n        width: 100%;\\r\\n    }\\r\\n    .card-number .num {\\r\\n        width: 18px;\\r\\n        height: 20px;\\r\\n        overflow: hidden;\\r\\n        margin-top: 2px;\\r\\n        margin-bottom: 5px;\\r\\n        text-align: center;\\r\\n        line-height: 20px;\\r\\n        -webkit-transition: all 0.2s;-moz-transition: all 0.2s;-ms-transition: all 0.2s;-o-transition: all 0.2s;transition: all 0.2s;\\r\\n        font-family: 'Bebas Neue';\\r\\n        font-size: 26px;\\r\\n    }\\r\\n    .card-number .num.active {\\r\\n        -webkit-transform: translate(0, -25px);-moz-transform: translate(0, -25px);-ms-transform: translate(0, -25px);-o-transform: translate(0, -25px);transform: translate(0, -25px);\\r\\n    }\\r\\n    .card-number .digit-item:nth-child(6) .num.active,\\r\\n    .card-number .digit-item:nth-child(7) .num.active,\\r\\n    .card-number .digit-item:nth-child(8) .num.active,\\r\\n    .card-number .digit-item:nth-child(9) .num.active,\\r\\n    .card-number .digit-item:nth-child(11) .num.active,\\r\\n    .card-number .digit-item:nth-child(12) .num.active,\\r\\n    .card-number .digit-item:nth-child(13) .num.active,\\r\\n    .card-number .digit-item:nth-child(14) .num.active {\\r\\n        line-height: 25px;\\r\\n    }\\r\\n    .card-number .num.not-active {\\r\\n        -webkit-transform: translate(0, -25px);\\r\\n        -moz-transform: translate(0, -25px);\\r\\n        -ms-transform: translate(0, -25px);\\r\\n        -o-transform: translate(0, -25px);\\r\\n        transform: translate(0, -25px);\\r\\n    }\\r\\n    .card-holders {\\r\\n        display: flex;\\r\\n        height: 24px;\\r\\n        overflow: hidden;\\r\\n        padding-left: 5px;\\r\\n        flex-wrap: wrap;\\r\\n    }\\r\\n    .card-holders .num {\\r\\n        width: 12px;\\r\\n        height: 20px;\\r\\n        overflow: hidden;\\r\\n        margin-top: 2px;\\r\\n        margin-bottom: 5px;\\r\\n        text-align: center;\\r\\n        font-size: 11px;\\r\\n        line-height: 20px;\\r\\n        -webkit-transition: all 0.5s;\\r\\n        -moz-transition: all 0.5s;\\r\\n        -ms-transition: all 0.5s;\\r\\n        -o-transition: all 0.5s;\\r\\n        transition: all 0.5s;\\r\\n        -webkit-transform: translate(15px, -25px) rotate(90deg);\\r\\n        -moz-transform: translate(15px, -25px) rotate(90deg);\\r\\n        -ms-transform: translate(15px, -25px) rotate(90deg);\\r\\n        -o-transform: translate(15px, -25px) rotate(90deg);\\r\\n        transform: translate(15px, -25px) rotate(90deg);\\r\\n        text-transform: uppercase;\\r\\n        font-weight: normal;\\r\\n        font-family: 'Bebas Neue';\\r\\n        font-size: 20px;\\r\\n    }\\r\\n    .card-holders .num.active {\\r\\n        -webkit-transform: translate(0, -25px) rotate(0deg);\\r\\n        -moz-transform: translate(0, -25px) rotate(0deg);\\r\\n        -ms-transform: translate(0, -25px) rotate(0deg);\\r\\n        -o-transform: translate(0, -25px) rotate(0deg);\\r\\n        transform: translate(0, -25px) rotate(0deg);\\r\\n    }\\r\\n    .card-holders .num.not-active {\\r\\n        -webkit-transform: translate(0, -25px) rotate(0deg);\\r\\n        -moz-transform: translate(0, -25px) rotate(0deg);\\r\\n        -ms-transform: translate(0, -25px) rotate(0deg);\\r\\n        -o-transform: translate(0, -25px) rotate(0deg);\\r\\n        transform: translate(0, -25px) rotate(0deg);\\r\\n    }\\r\\n    .placeholder {\\r\\n        width: 100%;\\r\\n        max-width: 100%;\\r\\n        font-family: 'Bebas Neue';\\r\\n        font-size: 20px;\\r\\n        line-height: 25px;\\r\\n        letter-spacing: 4.4pt;\\r\\n        text-indent: 5px;\\r\\n        font-weight: normal;\\r\\n    }\\r\\n    .placeholder.active {\\r\\n        width: 100%;\\r\\n        max-width: 100%;\\r\\n        -webkit-transition: all 0.2s;-moz-transition: all 0.2s;-ms-transition: all 0.2s;-o-transition: all 0.2s;transition: all 0.2s;\\r\\n    }\\r\\n    .placeholder.not-active {\\r\\n        margin-top: -25px;\\r\\n    }\\r\\n    #cardcode {\\r\\n        height: 50px;\\r\\n        padding: 5px 15px;\\r\\n        border: 1px solid #ced6e0;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        margin-bottom: 20px;\\r\\n        box-sizing: border-box;\\r\\n    }\\r\\n    #cardcode2 {\\r\\n        height: 50px;\\r\\n        padding: 5px 15px;\\r\\n        border: 1px solid #ced6e0;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        margin-bottom: 20px;\\r\\n        box-sizing: border-box;\\r\\n    }\\r\\n    #cardcode3 {\\r\\n        height: 50px;\\r\\n        padding: 5px 15px;\\r\\n        border: 1px solid #ced6e0;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        margin-bottom: 20px;\\r\\n        box-sizing: border-box;\\r\\n    }\\r\\n    #cardcode4 {\\r\\n        height: 50px;\\r\\n        padding: 5px 15px;\\r\\n        border: 1px solid #ced6e0;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        margin-bottom: 20px;\\r\\n        box-sizing: border-box;\\r\\n    }\\r\\n    #cardcode5 {\\r\\n        height: 50px;\\r\\n        padding: 5px 15px;\\r\\n        border: 1px solid #ced6e0;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        margin-bottom: 20px;\\r\\n        box-sizing: border-box;\\r\\n    }\\r\\n    .card-item-band {\\r\\n        background: rgba(0, 0, 19, 0.8);\\r\\n        width: 100%;\\r\\n        height: 50px;\\r\\n        margin-top: 30px;\\r\\n        position: absolute;\\r\\n        z-index: 2;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n    }\\r\\n    .card-item-cvv {\\r\\n        width: 300px;\\r\\n        height: 45px;\\r\\n        background: #fff;\\r\\n        margin-bottom: 30px;\\r\\n        text-align: right;\\r\\n        display: flex;\\r\\n        align-items: center;\\r\\n        justify-content: flex-end;\\r\\n        padding-right: 10px;\\r\\n        color: #1a3b5d;\\r\\n        font-size: 18px;\\r\\n        border-radius: 4px;\\r\\n        box-shadow: 0px 10px 20px -7px rgba(32, 56, 117, 0.35);\\r\\n        -webkit-transform: scale(-1, 1);\\r\\n        -moz-transform: scale(-1, 1);\\r\\n        -ms-transform: scale(-1, 1);\\r\\n        -o-transform: scale(-1, 1);\\r\\n        transform: scale(-1, 1);\\r\\n        position: absolute;\\r\\n        right: 30px;\\r\\n        top: 100px;\\r\\n        left: auto;\\r\\n    }\\r\\n    .star {\\r\\n        -webkit-transform: translate(0, 3px);\\r\\n        -moz-transform: translate(0, 3px);\\r\\n        -ms-transform: translate(0, 3px);\\r\\n        -o-transform: translate(0, 3px);\\r\\n        transform: translate(0, 3px);\\r\\n    }\\r\\n    .three {\\r\\n        width: 100%;\\r\\n        max-width: calc(33.33% - 3px);\\r\\n    }\\r\\n    .cvv-label {\\r\\n        position: absolute;\\r\\n        top: 105px;\\r\\n        left: 45px;\\r\\n        color: #ffffff;\\r\\n        font-size: 23px;\\r\\n        -webkit-transform: scale(-1, 1);\\r\\n        -moz-transform: scale(-1, 1);\\r\\n        -ms-transform: scale(-1, 1);\\r\\n        -o-transform: scale(-1, 1);\\r\\n        transform: scale(-1, 1);\\r\\n        text-shadow: 0px 4px 4px #000000;\\r\\n        letter-spacing: 3pt;\\r\\n    }\\r\\n    button {\\r\\n        width: 100%;\\r\\n        height: 55px;\\r\\n        background: #2364d2;\\r\\n        border: none;\\r\\n        border-radius: 5px;\\r\\n        font-size: 22px;\\r\\n        font-weight: 500;\\r\\n        font-family: \\\"Source Sans Pro\\\", sans-serif;\\r\\n        box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.3);\\r\\n        color: #fff;\\r\\n        margin-top: 20px;\\r\\n        cursor: pointer;\\r\\n    }\\r\\n    .month,\\r\\n    .year {\\r\\n        -webkit-transition: all 0.3s;\\r\\n        -moz-transition: all 0.3s;\\r\\n        -ms-transition: all 0.3s;\\r\\n        -o-transition: all 0.3s;\\r\\n        transition: all 0.3s !important;\\r\\n    }\\r\\n    .month.up,\\r\\n    .year.up {\\r\\n        margin-top: -24px !important;\\r\\n    }\\r\\n    .focus {\\r\\n        position: absolute;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        width: 450px;\\r\\n        height: 270px;\\r\\n        z-index: 3;\\r\\n        border: 2px solid #ffffff;\\r\\n        -webkit-border-radius: 14px;-moz-border-radius: 14px;border-radius: 14px;\\r\\n        background-color: rgba(0,0,0,0.3);\\r\\n        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;\\r\\n        -webkit-transition: all 0.5s;\\r\\n        -moz-transition: all 0.5s;\\r\\n        -ms-transition: all 0.5s;\\r\\n        -o-transition: all 0.5s;\\r\\n        transition: all 0.5s;\\r\\n        opacity: 0;\\r\\n    }\\r\\n    .focus.focus-number {\\r\\n        top: 161px;\\r\\n        left: 41px;\\r\\n        width: 367px;\\r\\n        height: 40px;\\r\\n        z-index: 3;\\r\\n        -webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;\\r\\n        opacity: 1;\\r\\n    }\\r\\n    .focus.focus-name {\\r\\n        top: 206px;\\r\\n        left: 29px;\\r\\n        width: 257px;\\r\\n        height: 40px;\\r\\n        z-index: 3;\\r\\n        -webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;\\r\\n        opacity: 1;\\r\\n    }\\r\\n    .focus.focus-date {\\r\\n        top: 206px;\\r\\n        left: 330px;\\r\\n        width: 95px;\\r\\n        height: 40px;\\r\\n        z-index: 3;\\r\\n        -webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;\\r\\n        opacity: 1;\\r\\n    }\\r\\n    .card-fake-number {\\r\\n        position: absolute;\\r\\n        top: 161px;\\r\\n        left: 41px;\\r\\n        width: 367px;\\r\\n        height: 40px;\\r\\n        z-index: 3;\\r\\n        cursor: pointer;\\r\\n        z-index: 4;\\r\\n    }\\r\\n    .card-fake-holder {\\r\\n        position: absolute;\\r\\n        top: 206px;\\r\\n        left: 29px;\\r\\n        width: 257px;\\r\\n        height: 40px;\\r\\n        cursor: pointer;\\r\\n        z-index: 4;\\r\\n    }\\r\\n    .card-fake-month {\\r\\n        position: absolute;\\r\\n        top: 206px;\\r\\n        left: 330px;\\r\\n        width: 40px;\\r\\n        height: 40px;\\r\\n        cursor: pointer;\\r\\n        z-index: 4;\\r\\n    }\\r\\n    .card-fake-year {\\r\\n        position: absolute;\\r\\n        top: 206px;\\r\\n        left: 375px;\\r\\n        width: 40px;\\r\\n        height: 40px;\\r\\n        cursor: pointer;\\r\\n        z-index: 4;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\\"wrap-card {on ? 'active' : ''}\\\">\\r\\n    <div class=\\\"card\\\">\\r\\n        <div class=\\\"focus {numberFocus ? 'focus-number' : ''} {nameFocus ? 'focus-name' : ''} {dateFocus ?\\r\\n        'focus-date' : ''}\\\"></div>\\r\\n        <div class=\\\"card-number\\\">\\r\\n            {#each fakeMassNumber as string, i}\\r\\n                {#if i == 4 || i == 9 || i == 14}\\r\\n                    <div class=\\\"digit-item\\\">\\r\\n                        <div class=\\\"num {res.length > i ? 'not-active' : ''}\\\"></div>\\r\\n                    </div>\\r\\n                {:else}\\r\\n                    <div class=\\\"digit-item\\\">\\r\\n                        <div class=\\\"num {res.length > i ? 'not-active' : ''}\\\">#</div>\\r\\n                        <div class=\\\"num {res.length > i ? 'active' : ''}\\\">{res[i] || \\\"\\\"}</div>\\r\\n                    </div>\\r\\n                {/if}\\r\\n            {/each}\\r\\n        </div>\\r\\n        <div class=\\\"card-holders\\\">\\r\\n            <div class=\\\"placeholder {nameString.length == 0 ? 'active' : 'not-active'}\\\">\\r\\n                IVAN IVANOV\\r\\n            </div>\\r\\n            {#each fakeMassName as string, i}\\r\\n                <div class=\\\"digit-item\\\">\\r\\n                    <div class=\\\"num {nameString.length < i ? 'not-active' : ''}\\\"> </div>\\r\\n                    <div class=\\\"num {nameString.length > i ? 'active' : ''}\\\">{nameString[i] || \\\"\\\"}</div>\\r\\n                </div>\\r\\n            {/each}\\r\\n        </div>\\r\\n        <div class=\\\"card-month-wrap\\\">\\r\\n            <div class=\\\"card-month\\\" style=\\\"transform: translateY({offset}px)\\\">\\r\\n                {#each monthMass as item}\\r\\n                    <div class=\\\"month\\\">\\r\\n                        {item}\\r\\n                    </div>\\r\\n                {/each}\\r\\n            </div>\\r\\n        </div>\\r\\n        <div class=\\\"slash\\\">/</div>\\r\\n        <div class=\\\"card-year-wrap\\\">\\r\\n            <div class=\\\"card-year\\\" style=\\\"transform: translateY({offset2}px)\\\">\\r\\n                {#each yearMass as item}\\r\\n                    <div class=\\\"year\\\">\\r\\n                        {item.substr(-2)}\\r\\n                    </div>\\r\\n                {/each}\\r\\n            </div>\\r\\n        </div>\\r\\n        <div class=\\\"card-fake-number\\\" on:mousedown=\\\"{(e) => {e.preventDefault();thisNumber.focus();}}\\\"></div>\\r\\n        <div class=\\\"card-fake-holder\\\" on:mousedown=\\\"{(e) => {e.preventDefault();thisHolder.focus();}}\\\"></div>\\r\\n        <div class=\\\"card-fake-month\\\" on:mousedown=\\\"{(e) => {e.preventDefault();thisMonth.focus();}}\\\"></div>\\r\\n        <div class=\\\"card-fake-year\\\" on:mousedown=\\\"{(e) => {e.preventDefault();thisYear.focus();}}\\\"></div>\\r\\n    </div>\\r\\n    <div class=\\\"wrap-card-back\\\">\\r\\n        <div class=\\\"card-back\\\">\\r\\n            <div class=\\\"card-item-band\\\"></div>\\r\\n            <div class=\\\"card-item-cvv\\\">\\r\\n                {#each cvvString as cvvDigit}\\r\\n                    <div class=\\\"star\\\">*</div>\\r\\n                {/each}\\r\\n            </div>\\r\\n            <div class=\\\"cvv-label\\\">CVV</div>\\r\\n        </div>\\r\\n    </div>\\r\\n</div>\\r\\n\\r\\n<form name=\\\"myform\\\" class=\\\"input-field\\\">\\r\\n    <input type=\\\"text\\\" class=\\\"input-number\\\" id=\\\"cardcode\\\" placeholder=\\\"Номер карты\\\" on:focus={focusNumber}\\r\\n    on:blur={deactive} bind:this={thisNumber} on:input={formatCardCode}>\\r\\n    <input type=\\\"text\\\" class=\\\"input-name\\\" id=\\\"cardcode2\\\" placeholder=\\\"Имя Фамилия\\\" on:focus={focusName}\\r\\n    on:blur={deactive} bind:this={thisHolder} on:input={inputName}>\\r\\n    <select id=\\\"cardcode3\\\" class=\\\"three\\\" on:focus={focusDate} on:blur={deactive} bind:this={thisMonth} on:change={changeMonth}>\\r\\n        <option selected disabled>Месяц</option>\\r\\n        {#each massMonth as month, i}\\r\\n            <option>{month}</option>\\r\\n        {/each}\\r\\n    </select>\\r\\n    <select id=\\\"cardcode4\\\" class=\\\"three\\\" on:focus={focusDate} on:blur={deactive} bind:this={thisYear}\\r\\n    on:change={changeYear}>\\r\\n        <option selected disabled>Год</option>\\r\\n        {#each massYear as year}\\r\\n            <option>{year}</option>\\r\\n        {/each}\\r\\n    </select>\\r\\n    <input type=\\\"text\\\" id=\\\"cardcode5\\\" placeholder=\\\"CVV\\\" on:focus={active} on:blur={deactive} maxlength=\\\"4\\\"\\r\\n    class=\\\"three\\\" on:input={cvv} bind:this={thisCvv}>\\r\\n    <input type=hidden name=number value=\\\"\\\" bind:this={numberr}>\\r\\n    <button type=\\\"submit\\\">Отправить</button>\\r\\n</form>\"],\"names\":[],\"mappings\":\"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\"}"
};

const Card = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let res = [];
    let nameString = [];
    let cvvString = [];
    let on = false;
    let numberFocus = false;
    let nameFocus = false;
    let dateFocus = false;
    let monthMass = ["MM"];
    let yearMass = ["ГГ"];
    let thisNumber;
    let thisHolder;
    let thisCvv;
    let thisMonth;
    let thisYear;
    let fakeMassNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    let fakeMassName = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    let massMonth = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    let massYear = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
    let numberr;

	$$result.css.add(css);

	let offset; offset = monthMass && monthMass.length > 1 ? offset - 24 : 0;
	let offset2; offset2 = yearMass && yearMass.length > 1 ? offset2 - 24 : 0;

	return `<div class="wrap-card ${escape(on ? 'active' : '')} svelte-14uywbf">
	    <div class="card svelte-14uywbf">
	        <div class="focus ${escape(numberFocus ? 'focus-number' : '')} ${escape(nameFocus ? 'focus-name' : '')} ${escape(dateFocus ?
        'focus-date' : '')} svelte-14uywbf"></div>
	        <div class="card-number svelte-14uywbf">
	            ${each(fakeMassNumber, (string, i) => `${ i == 4 || i == 9 || i == 14 ? `<div class="digit-item svelte-14uywbf">
	                        <div class="num ${escape(res.length > i ? 'not-active' : '')} svelte-14uywbf"></div>
	                    </div>` : `<div class="digit-item svelte-14uywbf">
	                        <div class="num ${escape(res.length > i ? 'not-active' : '')} svelte-14uywbf">#</div>
	                        <div class="num ${escape(res.length > i ? 'active' : '')} svelte-14uywbf">${escape(res[i] || "")}</div>
	                    </div>` }`)}
	        </div>
	        <div class="card-holders svelte-14uywbf">
	            <div class="placeholder ${escape(nameString.length == 0 ? 'active' : 'not-active')} svelte-14uywbf">
	                IVAN IVANOV
	            </div>
	            ${each(fakeMassName, (string, i) => `<div class="digit-item svelte-14uywbf">
	                    <div class="num ${escape(nameString.length < i ? 'not-active' : '')} svelte-14uywbf"> </div>
	                    <div class="num ${escape(nameString.length > i ? 'active' : '')} svelte-14uywbf">${escape(nameString[i] || "")}</div>
	                </div>`)}
	        </div>
	        <div class="card-month-wrap svelte-14uywbf">
	            <div class="card-month svelte-14uywbf" style="transform: translateY(${escape(offset)}px)">
	                ${each(monthMass, (item) => `<div class="month svelte-14uywbf">
	                        ${escape(item)}
	                    </div>`)}
	            </div>
	        </div>
	        <div class="slash svelte-14uywbf">/</div>
	        <div class="card-year-wrap svelte-14uywbf">
	            <div class="card-year svelte-14uywbf" style="transform: translateY(${escape(offset2)}px)">
	                ${each(yearMass, (item) => `<div class="year svelte-14uywbf">
	                        ${escape(item.substr(-2))}
	                    </div>`)}
	            </div>
	        </div>
	        <div class="card-fake-number svelte-14uywbf"></div>
	        <div class="card-fake-holder svelte-14uywbf"></div>
	        <div class="card-fake-month svelte-14uywbf"></div>
	        <div class="card-fake-year svelte-14uywbf"></div>
	    </div>
	    <div class="wrap-card-back svelte-14uywbf">
	        <div class="card-back svelte-14uywbf">
	            <div class="card-item-band svelte-14uywbf"></div>
	            <div class="card-item-cvv svelte-14uywbf">
	                ${each(cvvString, (cvvDigit) => `<div class="star svelte-14uywbf">*</div>`)}
	            </div>
	            <div class="cvv-label svelte-14uywbf">CVV</div>
	        </div>
	    </div>
	</div>

	<form name="myform" class="input-field svelte-14uywbf">
	    <input type="text" class="input-number svelte-14uywbf" id="cardcode" placeholder="Номер карты"${add_attribute("this", thisNumber, 1)}>
	    <input type="text" class="input-name svelte-14uywbf" id="cardcode2" placeholder="Имя Фамилия"${add_attribute("this", thisHolder, 1)}>
	    <select id="cardcode3" class="three svelte-14uywbf"${add_attribute("this", thisMonth, 1)}>
	        <option selected disabled value="Месяц">Месяц</option>
	        ${each(massMonth, (month, i) => `<option${add_attribute("value", month, 0)}>${escape(month)}</option>`)}
	    </select>
	    <select id="cardcode4" class="three svelte-14uywbf"${add_attribute("this", thisYear, 1)}>
	        <option selected disabled value="Год">Год</option>
	        ${each(massYear, (year) => `<option${add_attribute("value", year, 0)}>${escape(year)}</option>`)}
	    </select>
	    <input type="text" id="cardcode5" placeholder="CVV" maxlength="4" class="three svelte-14uywbf"${add_attribute("this", thisCvv, 1)}>
	    <input type="hidden" name="number" value="" class="svelte-14uywbf"${add_attribute("this", numberr, 1)}>
	    <button type="submit" class="svelte-14uywbf">Отправить</button>
	</form>`;
});

/* src\routes\index.svelte generated by Svelte v3.12.1 */

const css$1 = {
	code: "@media(min-width: 480px){}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script >\\r\\n    import ToDo from '../components/ToDo.svelte';\\r\\n    import Card from '../components/Card.svelte';\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n\\th1, figure, p {\\r\\n\\t\\ttext-align: center;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t}\\r\\n\\r\\n\\th1 {\\r\\n\\t\\tfont-size: 2.8em;\\r\\n\\t\\ttext-transform: uppercase;\\r\\n\\t\\tfont-weight: 700;\\r\\n\\t\\tmargin: 0 0 0.5em 0;\\r\\n\\t}\\r\\n\\r\\n\\tfigure {\\r\\n\\t\\tmargin: 0 0 1em 0;\\r\\n\\t}\\r\\n\\r\\n\\timg {\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\tmax-width: 400px;\\r\\n\\t\\tmargin: 0 0 1em 0;\\r\\n\\t}\\r\\n\\r\\n\\tp {\\r\\n\\t\\tmargin: 1em auto;\\r\\n\\t}\\r\\n\\r\\n\\t@media (min-width: 480px) {\\r\\n\\t\\th1 {\\r\\n\\t\\t\\tfont-size: 4em;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n</style>\\r\\n\\r\\n<svelte:head>\\r\\n\\t<title>Sapper project template</title>\\r\\n</svelte:head>\\r\\n\\r\\n<Card></Card>\\r\\n\\r\\n<!--<ToDo></ToDo>-->\\r\\n\\r\\n\\r\\n\"],\"names\":[],\"mappings\":\"AAgCC,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAI3B,CAAC\"}"
};

const Index = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$1);

	return `${($$result.head += `<title>Sapper project template</title>`, "")}

	${validate_component(Card, 'Card').$$render($$result, {}, {}, {})}

	`;
});

/* src\routes\about.svelte generated by Svelte v3.12.1 */

const About = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `${($$result.head += `<title>About</title>`, "")}

	<h1>About this site</h1>

	<p>This is the 'about' page. There's not much here.</p>`;
});

/* src\routes\blog\index.svelte generated by Svelte v3.12.1 */

const css$2 = {
	code: "ul.svelte-1she90c{margin:0 0 1em 0;line-height:1.5}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\r\\n\\texport function preload({ params, query }) {\\r\\n\\t\\treturn this.fetch(`blog.json`).then(r => r.json()).then(posts => {\\r\\n\\t\\t\\treturn { posts };\\r\\n\\t\\t});\\r\\n\\t}\\r\\n</script>\\r\\n\\r\\n<script>\\r\\n\\texport let posts;\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n\\tul {\\r\\n\\t\\tmargin: 0 0 1em 0;\\r\\n\\t\\tline-height: 1.5;\\r\\n\\t}\\r\\n</style>\\r\\n\\r\\n<svelte:head>\\r\\n\\t<title>Blog</title>\\r\\n</svelte:head>\\r\\n\\r\\n<h1>Recent posts</h1>\\r\\n\\r\\n<ul>\\r\\n\\t{#each posts as post}\\r\\n\\t\\t<!-- we're using the non-standard `rel=prefetch` attribute to\\r\\n\\t\\t\\t\\ttell Sapper to load the data for the page as soon as\\r\\n\\t\\t\\t\\tthe user hovers over the link or taps it, instead of\\r\\n\\t\\t\\t\\twaiting for the 'click' event -->\\r\\n\\t\\t<li><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></li>\\r\\n\\t{/each}\\r\\n</ul>\"],\"names\":[],\"mappings\":\"AAaC,EAAE,eAAC,CAAC,AACH,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACjB,WAAW,CAAE,GAAG,AACjB,CAAC\"}"
};

function preload({ params, query }) {
	return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
		return { posts };
	});
}

const Index$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { posts } = $$props;

	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);

	$$result.css.add(css$2);

	return `${($$result.head += `<title>Blog</title>`, "")}

	<h1>Recent posts</h1>

	<ul class="svelte-1she90c">
		${each(posts, (post) => `
			<li><a rel="prefetch" href="blog/${escape(post.slug)}">${escape(post.title)}</a></li>`)}
	</ul>`;
});

/* src\routes\blog\[slug].svelte generated by Svelte v3.12.1 */

const css$3 = {
	code: ".content.svelte-dkhkxh h2{font-size:1.4em;font-weight:500}.content.svelte-dkhkxh pre{background-color:#f9f9f9;box-shadow:inset 1px 1px 5px rgba(0,0,0,0.05);padding:0.5em;border-radius:2px;overflow-x:auto}.content.svelte-dkhkxh pre code{background-color:transparent;padding:0}.content.svelte-dkhkxh ul{line-height:1.5}.content.svelte-dkhkxh li{margin:0 0 0.5em 0}",
	map: "{\"version\":3,\"file\":\"[slug].svelte\",\"sources\":[\"[slug].svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\r\\n\\texport async function preload({ params, query }) {\\r\\n\\t\\t// the `slug` parameter is available because\\r\\n\\t\\t// this file is called [slug].svelte\\r\\n\\t\\tconst res = await this.fetch(`blog/${params.slug}.json`);\\r\\n\\t\\tconst data = await res.json();\\r\\n\\r\\n\\t\\tif (res.status === 200) {\\r\\n\\t\\t\\treturn { post: data };\\r\\n\\t\\t} else {\\r\\n\\t\\t\\tthis.error(res.status, data.message);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</script>\\r\\n\\r\\n<script>\\r\\n\\texport let post;\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n\\t/*\\r\\n\\t\\tBy default, CSS is locally scoped to the component,\\r\\n\\t\\tand any unused styles are dead-code-eliminated.\\r\\n\\t\\tIn this page, Svelte can't know which elements are\\r\\n\\t\\tgoing to appear inside the {{{post.html}}} block,\\r\\n\\t\\tso we have to use the :global(...) modifier to target\\r\\n\\t\\tall elements inside .content\\r\\n\\t*/\\r\\n\\t.content :global(h2) {\\r\\n\\t\\tfont-size: 1.4em;\\r\\n\\t\\tfont-weight: 500;\\r\\n\\t}\\r\\n\\r\\n\\t.content :global(pre) {\\r\\n\\t\\tbackground-color: #f9f9f9;\\r\\n\\t\\tbox-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);\\r\\n\\t\\tpadding: 0.5em;\\r\\n\\t\\tborder-radius: 2px;\\r\\n\\t\\toverflow-x: auto;\\r\\n\\t}\\r\\n\\r\\n\\t.content :global(pre) :global(code) {\\r\\n\\t\\tbackground-color: transparent;\\r\\n\\t\\tpadding: 0;\\r\\n\\t}\\r\\n\\r\\n\\t.content :global(ul) {\\r\\n\\t\\tline-height: 1.5;\\r\\n\\t}\\r\\n\\r\\n\\t.content :global(li) {\\r\\n\\t\\tmargin: 0 0 0.5em 0;\\r\\n\\t}\\r\\n</style>\\r\\n\\r\\n<svelte:head>\\r\\n\\t<title>{post.title}</title>\\r\\n</svelte:head>\\r\\n\\r\\n<h1>{post.title}</h1>\\r\\n\\r\\n<div class='content'>\\r\\n\\t{@html post.html}\\r\\n</div>\\r\\n\"],\"names\":[],\"mappings\":\"AA4BC,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACtB,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAC9C,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAC,CAAC,AAAQ,IAAI,AAAE,CAAC,AACpC,gBAAgB,CAAE,WAAW,CAC7B,OAAO,CAAE,CAAC,AACX,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC\"}"
};

async function preload$1({ params, query }) {
	// the `slug` parameter is available because
	// this file is called [slug].svelte
	const res = await this.fetch(`blog/${params.slug}.json`);
	const data = await res.json();

	if (res.status === 200) {
		return { post: data };
	} else {
		this.error(res.status, data.message);
	}
}

const Slug = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { post } = $$props;

	if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);

	$$result.css.add(css$3);

	return `${($$result.head += `<title>${escape(post.title)}</title>`, "")}

	<h1>${escape(post.title)}</h1>

	<div class="content svelte-dkhkxh">
		${post.html}
	</div>`;
});

/* src\routes\_layout.svelte generated by Svelte v3.12.1 */

const css$4 = {
	code: "main.svelte-1tyvcu5{position:relative;max-width:56em;background-color:white;padding:2em;margin:0 auto;box-sizing:border-box}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script>\\r\\n\\timport Nav from '../components/Nav.svelte';\\r\\n\\r\\n\\texport let segment;\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n\\tmain {\\r\\n\\t\\tposition: relative;\\r\\n\\t\\tmax-width: 56em;\\r\\n\\t\\tbackground-color: white;\\r\\n\\t\\tpadding: 2em;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tbox-sizing: border-box;\\r\\n\\t}\\r\\n</style>\\r\\n\\r\\n<!--<Nav {segment}/>-->\\r\\n\\r\\n<main>\\r\\n\\t<slot></slot>\\r\\n</main>\"],\"names\":[],\"mappings\":\"AAOC,IAAI,eAAC,CAAC,AACL,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,IAAI,CACf,gBAAgB,CAAE,KAAK,CACvB,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,UAAU,CAAE,UAAU,AACvB,CAAC\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;

	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);

	$$result.css.add(css$4);

	return `

	<main class="svelte-1tyvcu5">
		${$$slots.default ? $$slots.default({}) : ``}
	</main>`;
});

/* src\routes\_error.svelte generated by Svelte v3.12.1 */

const css$5 = {
	code: "h1.svelte-13vgy2g,p.svelte-13vgy2g{margin:0 auto}h1.svelte-13vgy2g{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-13vgy2g{margin:1em auto}@media(min-width: 480px){h1.svelte-13vgy2g{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\r\\n\\texport let status;\\r\\n\\texport let error;\\r\\n\\r\\n\\tconst dev = \\\"development\\\" === 'development';\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n\\th1, p {\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t}\\r\\n\\r\\n\\th1 {\\r\\n\\t\\tfont-size: 2.8em;\\r\\n\\t\\tfont-weight: 700;\\r\\n\\t\\tmargin: 0 0 0.5em 0;\\r\\n\\t}\\r\\n\\r\\n\\tp {\\r\\n\\t\\tmargin: 1em auto;\\r\\n\\t}\\r\\n\\r\\n\\t@media (min-width: 480px) {\\r\\n\\t\\th1 {\\r\\n\\t\\t\\tfont-size: 4em;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n\\r\\n<svelte:head>\\r\\n\\t<title>{status}</title>\\r\\n</svelte:head>\\r\\n\\r\\n<h1>{status}</h1>\\r\\n\\r\\n<p>{error.message}</p>\\r\\n\\r\\n{#if dev && error.stack}\\r\\n\\t<pre>{error.stack}</pre>\\r\\n{/if}\\r\\n\"],\"names\":[],\"mappings\":\"AAQC,iBAAE,CAAE,CAAC,eAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,eAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,eAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,eAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { status, error } = $$props;

	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);

	$$result.css.add(css$5);

	return `${($$result.head += `<title>${escape(status)}</title>`, "")}

	<h1 class="svelte-13vgy2g">${escape(status)}</h1>

	<p class="svelte-13vgy2g">${escape(error.message)}</p>

	${  error.stack ? `<pre>${escape(error.stack)}</pre>` : `` }`;
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		{
			// blog/index.json.js
			pattern: /^\/blog.json$/,
			handlers: route_0,
			params: () => ({})
		},

		{
			// blog/[slug].json.js
			pattern: /^\/blog\/([^\/]+?).json$/,
			handlers: route_1,
			params: match => ({ slug: d(match[1]) })
		}
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: Index }
			]
		},

		{
			// about.svelte
			pattern: /^\/about\/?$/,
			parts: [
				{ name: "about", file: "about.svelte", component: About }
			]
		},

		{
			// blog/index.svelte
			pattern: /^\/blog\/?$/,
			parts: [
				{ name: "blog", file: "blog/index.svelte", component: Index$1, preload: preload }
			]
		},

		{
			// blog/[slug].svelte
			pattern: /^\/blog\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "blog_$slug", file: "blog/[slug].svelte", component: Slug, preload: preload$1, params: match => ({ slug: d(match[1]) }) }
			]
		}
	],

	root: Layout,
	root_preload: () => {},
	error: Error$1
};

const build_dir = "__sapper__/dev";

const src_dir = "src";

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const CONTEXT_KEY = {};

/* src\node_modules\@sapper\internal\App.svelte generated by Svelte v3.12.1 */

const App = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	

	let { stores, error, status, segments, level0, level1 = null } = $$props;

	setContext(CONTEXT_KEY, stores);

	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);

	return `


	${validate_component(Layout, 'Layout').$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `
		${ error ? `${validate_component(Error$1, 'Error').$$render($$result, { error: error, status: status }, {}, {})}` : `${validate_component(((level1.component) || missing_component), 'svelte:component').$$render($$result, Object.assign(level1.props), {}, {})}` }
	`
	})}`;
});

function get_server_route_handler(routes) {
	async function handle_route(route, req, res, next) {
		req.params = route.params(route.pattern.exec(req.path));

		const method = req.method.toLowerCase();
		// 'delete' cannot be exported from a module because it is a keyword,
		// so check for 'del' instead
		const method_export = method === 'delete' ? 'del' : method;
		const handle_method = route.handlers[method_export];
		if (handle_method) {
			if (process.env.SAPPER_EXPORT) {
				const { write, end, setHeader } = res;
				const chunks = [];
				const headers = {};

				// intercept data so that it can be exported
				res.write = function(chunk) {
					chunks.push(Buffer.from(chunk));
					write.apply(res, arguments);
				};

				res.setHeader = function(name, value) {
					headers[name.toLowerCase()] = value;
					setHeader.apply(res, arguments);
				};

				res.end = function(chunk) {
					if (chunk) chunks.push(Buffer.from(chunk));
					end.apply(res, arguments);

					process.send({
						__sapper__: true,
						event: 'file',
						url: req.url,
						method: req.method,
						status: res.statusCode,
						type: headers['content-type'],
						body: Buffer.concat(chunks).toString()
					});
				};
			}

			const handle_next = (err) => {
				if (err) {
					res.statusCode = 500;
					res.end(err.message);
				} else {
					process.nextTick(next);
				}
			};

			try {
				await handle_method(req, res, handle_next);
			} catch (err) {
				console.error(err);
				handle_next(err);
			}
		} else {
			// no matching handler for method
			process.nextTick(next);
		}
	}

	return function find_route(req, res, next) {
		for (const route of routes) {
			if (route.pattern.test(req.path)) {
				handle_route(route, req, res, next);
				return;
			}
		}

		next();
	};
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;
var serialize_1 = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var cookie = {
	parse: parse_1,
	serialize: serialize_1
};

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return thing.toString();
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped$1) {
            result += escaped$1[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

function get_page_handler(
	manifest,
	session_getter
) {
	const get_build_info =  () => JSON.parse(fs.readFileSync(path.join(build_dir, 'build.json'), 'utf-8'))
		;

	const template =  () => read_template(src_dir)
		;

	const has_service_worker = fs.existsSync(path.join(build_dir, 'service-worker.js'));

	const { server_routes, pages } = manifest;
	const error_route = manifest.error;

	function bail(req, res, err) {
		console.error(err);

		const message =  escape_html(err.message) ;

		res.statusCode = 500;
		res.end(`<pre>${message}</pre>`);
	}

	function handle_error(req, res, statusCode, error) {
		handle_page({
			pattern: null,
			parts: [
				{ name: null, component: error_route }
			]
		}, req, res, statusCode, error || new Error('Unknown error in preload function'));
	}

	async function handle_page(page, req, res, status = 200, error = null) {
		const is_service_worker_index = req.path === '/service-worker-index.html';
		const build_info




 = get_build_info();

		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Cache-Control',  'no-cache' );

		// preload main.js and current route
		// TODO detect other stuff we can preload? images, CSS, fonts?
		let preloaded_chunks = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
		if (!error && !is_service_worker_index) {
			page.parts.forEach(part => {
				if (!part) return;

				// using concat because it could be a string or an array. thanks webpack!
				preloaded_chunks = preloaded_chunks.concat(build_info.assets[part.name]);
			});
		}

		if (build_info.bundler === 'rollup') {
			// TODO add dependencies and CSS
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map(file => `<${req.baseUrl}/client/${file}>;rel="modulepreload"`)
				.join(', ');

			res.setHeader('Link', link);
		} else {
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map((file) => {
					const as = /\.css$/.test(file) ? 'style' : 'script';
					return `<${req.baseUrl}/client/${file}>;rel="preload";as="${as}"`;
				})
				.join(', ');

			res.setHeader('Link', link);
		}

		const session = session_getter(req, res);

		let redirect;
		let preload_error;

		const preload_context = {
			redirect: (statusCode, location) => {
				if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
					throw new Error(`Conflicting redirects`);
				}
				location = location.replace(/^\//g, ''); // leading slash (only)
				redirect = { statusCode, location };
			},
			error: (statusCode, message) => {
				preload_error = { statusCode, message };
			},
			fetch: (url, opts) => {
				const parsed = new Url.URL(url, `http://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' :''}`);

				if (opts) {
					opts = Object.assign({}, opts);

					const include_cookies = (
						opts.credentials === 'include' ||
						opts.credentials === 'same-origin' && parsed.origin === `http://127.0.0.1:${process.env.PORT}`
					);

					if (include_cookies) {
						opts.headers = Object.assign({}, opts.headers);

						const cookies = Object.assign(
							{},
							cookie.parse(req.headers.cookie || ''),
							cookie.parse(opts.headers.cookie || '')
						);

						const set_cookie = res.getHeader('Set-Cookie');
						(Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach(str => {
							const match = /([^=]+)=([^;]+)/.exec(str);
							if (match) cookies[match[1]] = match[2];
						});

						const str = Object.keys(cookies)
							.map(key => `${key}=${cookies[key]}`)
							.join('; ');

						opts.headers.cookie = str;
					}
				}

				return fetch(parsed.href, opts);
			}
		};

		let preloaded;
		let match;
		let params;

		try {
			const root_preloaded = manifest.root_preload
				? manifest.root_preload.call(preload_context, {
					host: req.headers.host,
					path: req.path,
					query: req.query,
					params: {}
				}, session)
				: {};

			match = error ? null : page.pattern.exec(req.path);


			let toPreload = [root_preloaded];
			if (!is_service_worker_index) {
				toPreload = toPreload.concat(page.parts.map(part => {
					if (!part) return null;

					// the deepest level is used below, to initialise the store
					params = part.params ? part.params(match) : {};

					return part.preload
						? part.preload.call(preload_context, {
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}, session)
						: {};
				}));
			}

			preloaded = await Promise.all(toPreload);
		} catch (err) {
			if (error) {
				return bail(req, res, err)
			}

			preload_error = { statusCode: 500, message: err };
			preloaded = []; // appease TypeScript
		}

		try {
			if (redirect) {
				const location = Url.resolve((req.baseUrl || '') + '/', redirect.location);

				res.statusCode = redirect.statusCode;
				res.setHeader('Location', location);
				res.end();

				return;
			}

			if (preload_error) {
				handle_error(req, res, preload_error.statusCode, preload_error.message);
				return;
			}

			const segments = req.path.split('/').filter(Boolean);

			// TODO make this less confusing
			const layout_segments = [segments[0]];
			let l = 1;

			page.parts.forEach((part, i) => {
				layout_segments[l] = segments[i + 1];
				if (!part) return null;
				l++;
			});

			const props = {
				stores: {
					page: {
						subscribe: writable({
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}).subscribe
					},
					preloading: {
						subscribe: writable(null).subscribe
					},
					session: writable(session)
				},
				segments: layout_segments,
				status: error ? status : 200,
				error: error ? error instanceof Error ? error : { message: error } : null,
				level0: {
					props: preloaded[0]
				},
				level1: {
					segment: segments[0],
					props: {}
				}
			};

			if (!is_service_worker_index) {
				let l = 1;
				for (let i = 0; i < page.parts.length; i += 1) {
					const part = page.parts[i];
					if (!part) continue;

					props[`level${l++}`] = {
						component: part.component,
						props: preloaded[i + 1] || {},
						segment: segments[i]
					};
				}
			}

			const { html, head, css } = App.render(props);

			const serialized = {
				preloaded: `[${preloaded.map(data => try_serialize(data)).join(',')}]`,
				session: session && try_serialize(session, err => {
					throw new Error(`Failed to serialize session data: ${err.message}`);
				}),
				error: error && try_serialize(props.error)
			};

			let script = `__SAPPER__={${[
				error && `error:${serialized.error},status:${status}`,
				`baseUrl:"${req.baseUrl}"`,
				serialized.preloaded && `preloaded:${serialized.preloaded}`,
				serialized.session && `session:${serialized.session}`
			].filter(Boolean).join(',')}};`;

			if (has_service_worker) {
				script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
			}

			const file = [].concat(build_info.assets.main).filter(file => file && /\.js$/.test(file))[0];
			const main = `${req.baseUrl}/client/${file}`;

			if (build_info.bundler === 'rollup') {
				if (build_info.legacy_assets) {
					const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
					script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
				} else {
					script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
				}
			} else {
				script += `</script><script src="${main}">`;
			}

			let styles;

			// TODO make this consistent across apps
			// TODO embed build_info in placeholder.ts
			if (build_info.css && build_info.css.main) {
				const css_chunks = new Set();
				if (build_info.css.main) css_chunks.add(build_info.css.main);
				page.parts.forEach(part => {
					if (!part) return;
					const css_chunks_for_part = build_info.css.chunks[part.file];

					if (css_chunks_for_part) {
						css_chunks_for_part.forEach(file => {
							css_chunks.add(file);
						});
					}
				});

				styles = Array.from(css_chunks)
					.map(href => `<link rel="stylesheet" href="client/${href}">`)
					.join('');
			} else {
				styles = (css && css.code ? `<style>${css.code}</style>` : '');
			}

			// users can set a CSP nonce using res.locals.nonce
			const nonce_attr = (res.locals && res.locals.nonce) ? ` nonce="${res.locals.nonce}"` : '';

			const body = template()
				.replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
				.replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
				.replace('%sapper.html%', () => html)
				.replace('%sapper.head%', () => `<noscript id='sapper-head-start'></noscript>${head}<noscript id='sapper-head-end'></noscript>`)
				.replace('%sapper.styles%', () => styles);

			res.statusCode = status;
			res.end(body);
		} catch(err) {
			if (error) {
				bail(req, res, err);
			} else {
				handle_error(req, res, 500, err);
			}
		}
	}

	return function find_route(req, res, next) {
		if (req.path === '/service-worker-index.html') {
			const homePage = pages.find(page => page.pattern.test('/'));
			handle_page(homePage, req, res);
			return;
		}

		for (const page of pages) {
			if (page.pattern.test(req.path)) {
				handle_page(page, req, res);
				return;
			}
		}

		handle_error(req, res, 404, 'Not found');
	};
}

function read_template(dir = build_dir) {
	return fs.readFileSync(`${dir}/template.html`, 'utf-8');
}

function try_serialize(data, fail) {
	try {
		return devalue(data);
	} catch (err) {
		if (fail) fail(err);
		return null;
	}
}

function escape_html(html) {
	const chars = {
		'"' : 'quot',
		"'": '#39',
		'&': 'amp',
		'<' : 'lt',
		'>' : 'gt'
	};

	return html.replace(/["'&<>]/g, c => `&${chars[c]};`);
}

var mime_raw = "application/andrew-inset\t\t\tez\napplication/applixware\t\t\t\taw\napplication/atom+xml\t\t\t\tatom\napplication/atomcat+xml\t\t\t\tatomcat\napplication/atomsvc+xml\t\t\t\tatomsvc\napplication/ccxml+xml\t\t\t\tccxml\napplication/cdmi-capability\t\t\tcdmia\napplication/cdmi-container\t\t\tcdmic\napplication/cdmi-domain\t\t\t\tcdmid\napplication/cdmi-object\t\t\t\tcdmio\napplication/cdmi-queue\t\t\t\tcdmiq\napplication/cu-seeme\t\t\t\tcu\napplication/davmount+xml\t\t\tdavmount\napplication/docbook+xml\t\t\t\tdbk\napplication/dssc+der\t\t\t\tdssc\napplication/dssc+xml\t\t\t\txdssc\napplication/ecmascript\t\t\t\tecma\napplication/emma+xml\t\t\t\temma\napplication/epub+zip\t\t\t\tepub\napplication/exi\t\t\t\t\texi\napplication/font-tdpfr\t\t\t\tpfr\napplication/gml+xml\t\t\t\tgml\napplication/gpx+xml\t\t\t\tgpx\napplication/gxf\t\t\t\t\tgxf\napplication/hyperstudio\t\t\t\tstk\napplication/inkml+xml\t\t\t\tink inkml\napplication/ipfix\t\t\t\tipfix\napplication/java-archive\t\t\tjar\napplication/java-serialized-object\t\tser\napplication/java-vm\t\t\t\tclass\napplication/javascript\t\t\t\tjs\napplication/json\t\t\t\tjson map\napplication/jsonml+json\t\t\t\tjsonml\napplication/lost+xml\t\t\t\tlostxml\napplication/mac-binhex40\t\t\thqx\napplication/mac-compactpro\t\t\tcpt\napplication/mads+xml\t\t\t\tmads\napplication/marc\t\t\t\tmrc\napplication/marcxml+xml\t\t\t\tmrcx\napplication/mathematica\t\t\t\tma nb mb\napplication/mathml+xml\t\t\t\tmathml\napplication/mbox\t\t\t\tmbox\napplication/mediaservercontrol+xml\t\tmscml\napplication/metalink+xml\t\t\tmetalink\napplication/metalink4+xml\t\t\tmeta4\napplication/mets+xml\t\t\t\tmets\napplication/mods+xml\t\t\t\tmods\napplication/mp21\t\t\t\tm21 mp21\napplication/mp4\t\t\t\t\tmp4s\napplication/msword\t\t\t\tdoc dot\napplication/mxf\t\t\t\t\tmxf\napplication/octet-stream\tbin dms lrf mar so dist distz pkg bpk dump elc deploy\napplication/oda\t\t\t\t\toda\napplication/oebps-package+xml\t\t\topf\napplication/ogg\t\t\t\t\togx\napplication/omdoc+xml\t\t\t\tomdoc\napplication/onenote\t\t\t\tonetoc onetoc2 onetmp onepkg\napplication/oxps\t\t\t\toxps\napplication/patch-ops-error+xml\t\t\txer\napplication/pdf\t\t\t\t\tpdf\napplication/pgp-encrypted\t\t\tpgp\napplication/pgp-signature\t\t\tasc sig\napplication/pics-rules\t\t\t\tprf\napplication/pkcs10\t\t\t\tp10\napplication/pkcs7-mime\t\t\t\tp7m p7c\napplication/pkcs7-signature\t\t\tp7s\napplication/pkcs8\t\t\t\tp8\napplication/pkix-attr-cert\t\t\tac\napplication/pkix-cert\t\t\t\tcer\napplication/pkix-crl\t\t\t\tcrl\napplication/pkix-pkipath\t\t\tpkipath\napplication/pkixcmp\t\t\t\tpki\napplication/pls+xml\t\t\t\tpls\napplication/postscript\t\t\t\tai eps ps\napplication/prs.cww\t\t\t\tcww\napplication/pskc+xml\t\t\t\tpskcxml\napplication/rdf+xml\t\t\t\trdf\napplication/reginfo+xml\t\t\t\trif\napplication/relax-ng-compact-syntax\t\trnc\napplication/resource-lists+xml\t\t\trl\napplication/resource-lists-diff+xml\t\trld\napplication/rls-services+xml\t\t\trs\napplication/rpki-ghostbusters\t\t\tgbr\napplication/rpki-manifest\t\t\tmft\napplication/rpki-roa\t\t\t\troa\napplication/rsd+xml\t\t\t\trsd\napplication/rss+xml\t\t\t\trss\napplication/rtf\t\t\t\t\trtf\napplication/sbml+xml\t\t\t\tsbml\napplication/scvp-cv-request\t\t\tscq\napplication/scvp-cv-response\t\t\tscs\napplication/scvp-vp-request\t\t\tspq\napplication/scvp-vp-response\t\t\tspp\napplication/sdp\t\t\t\t\tsdp\napplication/set-payment-initiation\t\tsetpay\napplication/set-registration-initiation\t\tsetreg\napplication/shf+xml\t\t\t\tshf\napplication/smil+xml\t\t\t\tsmi smil\napplication/sparql-query\t\t\trq\napplication/sparql-results+xml\t\t\tsrx\napplication/srgs\t\t\t\tgram\napplication/srgs+xml\t\t\t\tgrxml\napplication/sru+xml\t\t\t\tsru\napplication/ssdl+xml\t\t\t\tssdl\napplication/ssml+xml\t\t\t\tssml\napplication/tei+xml\t\t\t\ttei teicorpus\napplication/thraud+xml\t\t\t\ttfi\napplication/timestamped-data\t\t\ttsd\napplication/vnd.3gpp.pic-bw-large\t\tplb\napplication/vnd.3gpp.pic-bw-small\t\tpsb\napplication/vnd.3gpp.pic-bw-var\t\t\tpvb\napplication/vnd.3gpp2.tcap\t\t\ttcap\napplication/vnd.3m.post-it-notes\t\tpwn\napplication/vnd.accpac.simply.aso\t\taso\napplication/vnd.accpac.simply.imp\t\timp\napplication/vnd.acucobol\t\t\tacu\napplication/vnd.acucorp\t\t\t\tatc acutc\napplication/vnd.adobe.air-application-installer-package+zip\tair\napplication/vnd.adobe.formscentral.fcdt\t\tfcdt\napplication/vnd.adobe.fxp\t\t\tfxp fxpl\napplication/vnd.adobe.xdp+xml\t\t\txdp\napplication/vnd.adobe.xfdf\t\t\txfdf\napplication/vnd.ahead.space\t\t\tahead\napplication/vnd.airzip.filesecure.azf\t\tazf\napplication/vnd.airzip.filesecure.azs\t\tazs\napplication/vnd.amazon.ebook\t\t\tazw\napplication/vnd.americandynamics.acc\t\tacc\napplication/vnd.amiga.ami\t\t\tami\napplication/vnd.android.package-archive\t\tapk\napplication/vnd.anser-web-certificate-issue-initiation\tcii\napplication/vnd.anser-web-funds-transfer-initiation\tfti\napplication/vnd.antix.game-component\t\tatx\napplication/vnd.apple.installer+xml\t\tmpkg\napplication/vnd.apple.mpegurl\t\t\tm3u8\napplication/vnd.aristanetworks.swi\t\tswi\napplication/vnd.astraea-software.iota\t\tiota\napplication/vnd.audiograph\t\t\taep\napplication/vnd.blueice.multipass\t\tmpm\napplication/vnd.bmi\t\t\t\tbmi\napplication/vnd.businessobjects\t\t\trep\napplication/vnd.chemdraw+xml\t\t\tcdxml\napplication/vnd.chipnuts.karaoke-mmd\t\tmmd\napplication/vnd.cinderella\t\t\tcdy\napplication/vnd.claymore\t\t\tcla\napplication/vnd.cloanto.rp9\t\t\trp9\napplication/vnd.clonk.c4group\t\t\tc4g c4d c4f c4p c4u\napplication/vnd.cluetrust.cartomobile-config\t\tc11amc\napplication/vnd.cluetrust.cartomobile-config-pkg\tc11amz\napplication/vnd.commonspace\t\t\tcsp\napplication/vnd.contact.cmsg\t\t\tcdbcmsg\napplication/vnd.cosmocaller\t\t\tcmc\napplication/vnd.crick.clicker\t\t\tclkx\napplication/vnd.crick.clicker.keyboard\t\tclkk\napplication/vnd.crick.clicker.palette\t\tclkp\napplication/vnd.crick.clicker.template\t\tclkt\napplication/vnd.crick.clicker.wordbank\t\tclkw\napplication/vnd.criticaltools.wbs+xml\t\twbs\napplication/vnd.ctc-posml\t\t\tpml\napplication/vnd.cups-ppd\t\t\tppd\napplication/vnd.curl.car\t\t\tcar\napplication/vnd.curl.pcurl\t\t\tpcurl\napplication/vnd.dart\t\t\t\tdart\napplication/vnd.data-vision.rdz\t\t\trdz\napplication/vnd.dece.data\t\t\tuvf uvvf uvd uvvd\napplication/vnd.dece.ttml+xml\t\t\tuvt uvvt\napplication/vnd.dece.unspecified\t\tuvx uvvx\napplication/vnd.dece.zip\t\t\tuvz uvvz\napplication/vnd.denovo.fcselayout-link\t\tfe_launch\napplication/vnd.dna\t\t\t\tdna\napplication/vnd.dolby.mlp\t\t\tmlp\napplication/vnd.dpgraph\t\t\t\tdpg\napplication/vnd.dreamfactory\t\t\tdfac\napplication/vnd.ds-keypoint\t\t\tkpxx\napplication/vnd.dvb.ait\t\t\t\tait\napplication/vnd.dvb.service\t\t\tsvc\napplication/vnd.dynageo\t\t\t\tgeo\napplication/vnd.ecowin.chart\t\t\tmag\napplication/vnd.enliven\t\t\t\tnml\napplication/vnd.epson.esf\t\t\tesf\napplication/vnd.epson.msf\t\t\tmsf\napplication/vnd.epson.quickanime\t\tqam\napplication/vnd.epson.salt\t\t\tslt\napplication/vnd.epson.ssf\t\t\tssf\napplication/vnd.eszigno3+xml\t\t\tes3 et3\napplication/vnd.ezpix-album\t\t\tez2\napplication/vnd.ezpix-package\t\t\tez3\napplication/vnd.fdf\t\t\t\tfdf\napplication/vnd.fdsn.mseed\t\t\tmseed\napplication/vnd.fdsn.seed\t\t\tseed dataless\napplication/vnd.flographit\t\t\tgph\napplication/vnd.fluxtime.clip\t\t\tftc\napplication/vnd.framemaker\t\t\tfm frame maker book\napplication/vnd.frogans.fnc\t\t\tfnc\napplication/vnd.frogans.ltf\t\t\tltf\napplication/vnd.fsc.weblaunch\t\t\tfsc\napplication/vnd.fujitsu.oasys\t\t\toas\napplication/vnd.fujitsu.oasys2\t\t\toa2\napplication/vnd.fujitsu.oasys3\t\t\toa3\napplication/vnd.fujitsu.oasysgp\t\t\tfg5\napplication/vnd.fujitsu.oasysprs\t\tbh2\napplication/vnd.fujixerox.ddd\t\t\tddd\napplication/vnd.fujixerox.docuworks\t\txdw\napplication/vnd.fujixerox.docuworks.binder\txbd\napplication/vnd.fuzzysheet\t\t\tfzs\napplication/vnd.genomatix.tuxedo\t\ttxd\napplication/vnd.geogebra.file\t\t\tggb\napplication/vnd.geogebra.tool\t\t\tggt\napplication/vnd.geometry-explorer\t\tgex gre\napplication/vnd.geonext\t\t\t\tgxt\napplication/vnd.geoplan\t\t\t\tg2w\napplication/vnd.geospace\t\t\tg3w\napplication/vnd.gmx\t\t\t\tgmx\napplication/vnd.google-earth.kml+xml\t\tkml\napplication/vnd.google-earth.kmz\t\tkmz\napplication/vnd.grafeq\t\t\t\tgqf gqs\napplication/vnd.groove-account\t\t\tgac\napplication/vnd.groove-help\t\t\tghf\napplication/vnd.groove-identity-message\t\tgim\napplication/vnd.groove-injector\t\t\tgrv\napplication/vnd.groove-tool-message\t\tgtm\napplication/vnd.groove-tool-template\t\ttpl\napplication/vnd.groove-vcard\t\t\tvcg\napplication/vnd.hal+xml\t\t\t\thal\napplication/vnd.handheld-entertainment+xml\tzmm\napplication/vnd.hbci\t\t\t\thbci\napplication/vnd.hhe.lesson-player\t\tles\napplication/vnd.hp-hpgl\t\t\t\thpgl\napplication/vnd.hp-hpid\t\t\t\thpid\napplication/vnd.hp-hps\t\t\t\thps\napplication/vnd.hp-jlyt\t\t\t\tjlt\napplication/vnd.hp-pcl\t\t\t\tpcl\napplication/vnd.hp-pclxl\t\t\tpclxl\napplication/vnd.hydrostatix.sof-data\t\tsfd-hdstx\napplication/vnd.ibm.minipay\t\t\tmpy\napplication/vnd.ibm.modcap\t\t\tafp listafp list3820\napplication/vnd.ibm.rights-management\t\tirm\napplication/vnd.ibm.secure-container\t\tsc\napplication/vnd.iccprofile\t\t\ticc icm\napplication/vnd.igloader\t\t\tigl\napplication/vnd.immervision-ivp\t\t\tivp\napplication/vnd.immervision-ivu\t\t\tivu\napplication/vnd.insors.igm\t\t\tigm\napplication/vnd.intercon.formnet\t\txpw xpx\napplication/vnd.intergeo\t\t\ti2g\napplication/vnd.intu.qbo\t\t\tqbo\napplication/vnd.intu.qfx\t\t\tqfx\napplication/vnd.ipunplugged.rcprofile\t\trcprofile\napplication/vnd.irepository.package+xml\t\tirp\napplication/vnd.is-xpr\t\t\t\txpr\napplication/vnd.isac.fcs\t\t\tfcs\napplication/vnd.jam\t\t\t\tjam\napplication/vnd.jcp.javame.midlet-rms\t\trms\napplication/vnd.jisp\t\t\t\tjisp\napplication/vnd.joost.joda-archive\t\tjoda\napplication/vnd.kahootz\t\t\t\tktz ktr\napplication/vnd.kde.karbon\t\t\tkarbon\napplication/vnd.kde.kchart\t\t\tchrt\napplication/vnd.kde.kformula\t\t\tkfo\napplication/vnd.kde.kivio\t\t\tflw\napplication/vnd.kde.kontour\t\t\tkon\napplication/vnd.kde.kpresenter\t\t\tkpr kpt\napplication/vnd.kde.kspread\t\t\tksp\napplication/vnd.kde.kword\t\t\tkwd kwt\napplication/vnd.kenameaapp\t\t\thtke\napplication/vnd.kidspiration\t\t\tkia\napplication/vnd.kinar\t\t\t\tkne knp\napplication/vnd.koan\t\t\t\tskp skd skt skm\napplication/vnd.kodak-descriptor\t\tsse\napplication/vnd.las.las+xml\t\t\tlasxml\napplication/vnd.llamagraphics.life-balance.desktop\tlbd\napplication/vnd.llamagraphics.life-balance.exchange+xml\tlbe\napplication/vnd.lotus-1-2-3\t\t\t123\napplication/vnd.lotus-approach\t\t\tapr\napplication/vnd.lotus-freelance\t\t\tpre\napplication/vnd.lotus-notes\t\t\tnsf\napplication/vnd.lotus-organizer\t\t\torg\napplication/vnd.lotus-screencam\t\t\tscm\napplication/vnd.lotus-wordpro\t\t\tlwp\napplication/vnd.macports.portpkg\t\tportpkg\napplication/vnd.mcd\t\t\t\tmcd\napplication/vnd.medcalcdata\t\t\tmc1\napplication/vnd.mediastation.cdkey\t\tcdkey\napplication/vnd.mfer\t\t\t\tmwf\napplication/vnd.mfmp\t\t\t\tmfm\napplication/vnd.micrografx.flo\t\t\tflo\napplication/vnd.micrografx.igx\t\t\tigx\napplication/vnd.mif\t\t\t\tmif\napplication/vnd.mobius.daf\t\t\tdaf\napplication/vnd.mobius.dis\t\t\tdis\napplication/vnd.mobius.mbk\t\t\tmbk\napplication/vnd.mobius.mqy\t\t\tmqy\napplication/vnd.mobius.msl\t\t\tmsl\napplication/vnd.mobius.plc\t\t\tplc\napplication/vnd.mobius.txf\t\t\ttxf\napplication/vnd.mophun.application\t\tmpn\napplication/vnd.mophun.certificate\t\tmpc\napplication/vnd.mozilla.xul+xml\t\t\txul\napplication/vnd.ms-artgalry\t\t\tcil\napplication/vnd.ms-cab-compressed\t\tcab\napplication/vnd.ms-excel\t\t\txls xlm xla xlc xlt xlw\napplication/vnd.ms-excel.addin.macroenabled.12\t\txlam\napplication/vnd.ms-excel.sheet.binary.macroenabled.12\txlsb\napplication/vnd.ms-excel.sheet.macroenabled.12\t\txlsm\napplication/vnd.ms-excel.template.macroenabled.12\txltm\napplication/vnd.ms-fontobject\t\t\teot\napplication/vnd.ms-htmlhelp\t\t\tchm\napplication/vnd.ms-ims\t\t\t\tims\napplication/vnd.ms-lrm\t\t\t\tlrm\napplication/vnd.ms-officetheme\t\t\tthmx\napplication/vnd.ms-pki.seccat\t\t\tcat\napplication/vnd.ms-pki.stl\t\t\tstl\napplication/vnd.ms-powerpoint\t\t\tppt pps pot\napplication/vnd.ms-powerpoint.addin.macroenabled.12\t\tppam\napplication/vnd.ms-powerpoint.presentation.macroenabled.12\tpptm\napplication/vnd.ms-powerpoint.slide.macroenabled.12\t\tsldm\napplication/vnd.ms-powerpoint.slideshow.macroenabled.12\t\tppsm\napplication/vnd.ms-powerpoint.template.macroenabled.12\t\tpotm\napplication/vnd.ms-project\t\t\tmpp mpt\napplication/vnd.ms-word.document.macroenabled.12\tdocm\napplication/vnd.ms-word.template.macroenabled.12\tdotm\napplication/vnd.ms-works\t\t\twps wks wcm wdb\napplication/vnd.ms-wpl\t\t\t\twpl\napplication/vnd.ms-xpsdocument\t\t\txps\napplication/vnd.mseq\t\t\t\tmseq\napplication/vnd.musician\t\t\tmus\napplication/vnd.muvee.style\t\t\tmsty\napplication/vnd.mynfc\t\t\t\ttaglet\napplication/vnd.neurolanguage.nlu\t\tnlu\napplication/vnd.nitf\t\t\t\tntf nitf\napplication/vnd.noblenet-directory\t\tnnd\napplication/vnd.noblenet-sealer\t\t\tnns\napplication/vnd.noblenet-web\t\t\tnnw\napplication/vnd.nokia.n-gage.data\t\tngdat\napplication/vnd.nokia.n-gage.symbian.install\tn-gage\napplication/vnd.nokia.radio-preset\t\trpst\napplication/vnd.nokia.radio-presets\t\trpss\napplication/vnd.novadigm.edm\t\t\tedm\napplication/vnd.novadigm.edx\t\t\tedx\napplication/vnd.novadigm.ext\t\t\text\napplication/vnd.oasis.opendocument.chart\t\todc\napplication/vnd.oasis.opendocument.chart-template\totc\napplication/vnd.oasis.opendocument.database\t\todb\napplication/vnd.oasis.opendocument.formula\t\todf\napplication/vnd.oasis.opendocument.formula-template\todft\napplication/vnd.oasis.opendocument.graphics\t\todg\napplication/vnd.oasis.opendocument.graphics-template\totg\napplication/vnd.oasis.opendocument.image\t\todi\napplication/vnd.oasis.opendocument.image-template\toti\napplication/vnd.oasis.opendocument.presentation\t\todp\napplication/vnd.oasis.opendocument.presentation-template\totp\napplication/vnd.oasis.opendocument.spreadsheet\t\tods\napplication/vnd.oasis.opendocument.spreadsheet-template\tots\napplication/vnd.oasis.opendocument.text\t\t\todt\napplication/vnd.oasis.opendocument.text-master\t\todm\napplication/vnd.oasis.opendocument.text-template\tott\napplication/vnd.oasis.opendocument.text-web\t\toth\napplication/vnd.olpc-sugar\t\t\txo\napplication/vnd.oma.dd2+xml\t\t\tdd2\napplication/vnd.openofficeorg.extension\t\toxt\napplication/vnd.openxmlformats-officedocument.presentationml.presentation\tpptx\napplication/vnd.openxmlformats-officedocument.presentationml.slide\tsldx\napplication/vnd.openxmlformats-officedocument.presentationml.slideshow\tppsx\napplication/vnd.openxmlformats-officedocument.presentationml.template\tpotx\napplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet\txlsx\napplication/vnd.openxmlformats-officedocument.spreadsheetml.template\txltx\napplication/vnd.openxmlformats-officedocument.wordprocessingml.document\tdocx\napplication/vnd.openxmlformats-officedocument.wordprocessingml.template\tdotx\napplication/vnd.osgeo.mapguide.package\t\tmgp\napplication/vnd.osgi.dp\t\t\t\tdp\napplication/vnd.osgi.subsystem\t\t\tesa\napplication/vnd.palm\t\t\t\tpdb pqa oprc\napplication/vnd.pawaafile\t\t\tpaw\napplication/vnd.pg.format\t\t\tstr\napplication/vnd.pg.osasli\t\t\tei6\napplication/vnd.picsel\t\t\t\tefif\napplication/vnd.pmi.widget\t\t\twg\napplication/vnd.pocketlearn\t\t\tplf\napplication/vnd.powerbuilder6\t\t\tpbd\napplication/vnd.previewsystems.box\t\tbox\napplication/vnd.proteus.magazine\t\tmgz\napplication/vnd.publishare-delta-tree\t\tqps\napplication/vnd.pvi.ptid1\t\t\tptid\napplication/vnd.quark.quarkxpress\t\tqxd qxt qwd qwt qxl qxb\napplication/vnd.realvnc.bed\t\t\tbed\napplication/vnd.recordare.musicxml\t\tmxl\napplication/vnd.recordare.musicxml+xml\t\tmusicxml\napplication/vnd.rig.cryptonote\t\t\tcryptonote\napplication/vnd.rim.cod\t\t\t\tcod\napplication/vnd.rn-realmedia\t\t\trm\napplication/vnd.rn-realmedia-vbr\t\trmvb\napplication/vnd.route66.link66+xml\t\tlink66\napplication/vnd.sailingtracker.track\t\tst\napplication/vnd.seemail\t\t\t\tsee\napplication/vnd.sema\t\t\t\tsema\napplication/vnd.semd\t\t\t\tsemd\napplication/vnd.semf\t\t\t\tsemf\napplication/vnd.shana.informed.formdata\t\tifm\napplication/vnd.shana.informed.formtemplate\titp\napplication/vnd.shana.informed.interchange\tiif\napplication/vnd.shana.informed.package\t\tipk\napplication/vnd.simtech-mindmapper\t\ttwd twds\napplication/vnd.smaf\t\t\t\tmmf\napplication/vnd.smart.teacher\t\t\tteacher\napplication/vnd.solent.sdkm+xml\t\t\tsdkm sdkd\napplication/vnd.spotfire.dxp\t\t\tdxp\napplication/vnd.spotfire.sfs\t\t\tsfs\napplication/vnd.stardivision.calc\t\tsdc\napplication/vnd.stardivision.draw\t\tsda\napplication/vnd.stardivision.impress\t\tsdd\napplication/vnd.stardivision.math\t\tsmf\napplication/vnd.stardivision.writer\t\tsdw vor\napplication/vnd.stardivision.writer-global\tsgl\napplication/vnd.stepmania.package\t\tsmzip\napplication/vnd.stepmania.stepchart\t\tsm\napplication/vnd.sun.xml.calc\t\t\tsxc\napplication/vnd.sun.xml.calc.template\t\tstc\napplication/vnd.sun.xml.draw\t\t\tsxd\napplication/vnd.sun.xml.draw.template\t\tstd\napplication/vnd.sun.xml.impress\t\t\tsxi\napplication/vnd.sun.xml.impress.template\tsti\napplication/vnd.sun.xml.math\t\t\tsxm\napplication/vnd.sun.xml.writer\t\t\tsxw\napplication/vnd.sun.xml.writer.global\t\tsxg\napplication/vnd.sun.xml.writer.template\t\tstw\napplication/vnd.sus-calendar\t\t\tsus susp\napplication/vnd.svd\t\t\t\tsvd\napplication/vnd.symbian.install\t\t\tsis sisx\napplication/vnd.syncml+xml\t\t\txsm\napplication/vnd.syncml.dm+wbxml\t\t\tbdm\napplication/vnd.syncml.dm+xml\t\t\txdm\napplication/vnd.tao.intent-module-archive\ttao\napplication/vnd.tcpdump.pcap\t\t\tpcap cap dmp\napplication/vnd.tmobile-livetv\t\t\ttmo\napplication/vnd.trid.tpt\t\t\ttpt\napplication/vnd.triscape.mxs\t\t\tmxs\napplication/vnd.trueapp\t\t\t\ttra\napplication/vnd.ufdl\t\t\t\tufd ufdl\napplication/vnd.uiq.theme\t\t\tutz\napplication/vnd.umajin\t\t\t\tumj\napplication/vnd.unity\t\t\t\tunityweb\napplication/vnd.uoml+xml\t\t\tuoml\napplication/vnd.vcx\t\t\t\tvcx\napplication/vnd.visio\t\t\t\tvsd vst vss vsw\napplication/vnd.visionary\t\t\tvis\napplication/vnd.vsf\t\t\t\tvsf\napplication/vnd.wap.wbxml\t\t\twbxml\napplication/vnd.wap.wmlc\t\t\twmlc\napplication/vnd.wap.wmlscriptc\t\t\twmlsc\napplication/vnd.webturbo\t\t\twtb\napplication/vnd.wolfram.player\t\t\tnbp\napplication/vnd.wordperfect\t\t\twpd\napplication/vnd.wqd\t\t\t\twqd\napplication/vnd.wt.stf\t\t\t\tstf\napplication/vnd.xara\t\t\t\txar\napplication/vnd.xfdl\t\t\t\txfdl\napplication/vnd.yamaha.hv-dic\t\t\thvd\napplication/vnd.yamaha.hv-script\t\thvs\napplication/vnd.yamaha.hv-voice\t\t\thvp\napplication/vnd.yamaha.openscoreformat\t\t\tosf\napplication/vnd.yamaha.openscoreformat.osfpvg+xml\tosfpvg\napplication/vnd.yamaha.smaf-audio\t\tsaf\napplication/vnd.yamaha.smaf-phrase\t\tspf\napplication/vnd.yellowriver-custom-menu\t\tcmp\napplication/vnd.zul\t\t\t\tzir zirz\napplication/vnd.zzazz.deck+xml\t\t\tzaz\napplication/voicexml+xml\t\t\tvxml\napplication/wasm\t\t\t\twasm\napplication/widget\t\t\t\twgt\napplication/winhlp\t\t\t\thlp\napplication/wsdl+xml\t\t\t\twsdl\napplication/wspolicy+xml\t\t\twspolicy\napplication/x-7z-compressed\t\t\t7z\napplication/x-abiword\t\t\t\tabw\napplication/x-ace-compressed\t\t\tace\napplication/x-apple-diskimage\t\t\tdmg\napplication/x-authorware-bin\t\t\taab x32 u32 vox\napplication/x-authorware-map\t\t\taam\napplication/x-authorware-seg\t\t\taas\napplication/x-bcpio\t\t\t\tbcpio\napplication/x-bittorrent\t\t\ttorrent\napplication/x-blorb\t\t\t\tblb blorb\napplication/x-bzip\t\t\t\tbz\napplication/x-bzip2\t\t\t\tbz2 boz\napplication/x-cbr\t\t\t\tcbr cba cbt cbz cb7\napplication/x-cdlink\t\t\t\tvcd\napplication/x-cfs-compressed\t\t\tcfs\napplication/x-chat\t\t\t\tchat\napplication/x-chess-pgn\t\t\t\tpgn\napplication/x-conference\t\t\tnsc\napplication/x-cpio\t\t\t\tcpio\napplication/x-csh\t\t\t\tcsh\napplication/x-debian-package\t\t\tdeb udeb\napplication/x-dgc-compressed\t\t\tdgc\napplication/x-director\t\t\tdir dcr dxr cst cct cxt w3d fgd swa\napplication/x-doom\t\t\t\twad\napplication/x-dtbncx+xml\t\t\tncx\napplication/x-dtbook+xml\t\t\tdtb\napplication/x-dtbresource+xml\t\t\tres\napplication/x-dvi\t\t\t\tdvi\napplication/x-envoy\t\t\t\tevy\napplication/x-eva\t\t\t\teva\napplication/x-font-bdf\t\t\t\tbdf\napplication/x-font-ghostscript\t\t\tgsf\napplication/x-font-linux-psf\t\t\tpsf\napplication/x-font-pcf\t\t\t\tpcf\napplication/x-font-snf\t\t\t\tsnf\napplication/x-font-type1\t\t\tpfa pfb pfm afm\napplication/x-freearc\t\t\t\tarc\napplication/x-futuresplash\t\t\tspl\napplication/x-gca-compressed\t\t\tgca\napplication/x-glulx\t\t\t\tulx\napplication/x-gnumeric\t\t\t\tgnumeric\napplication/x-gramps-xml\t\t\tgramps\napplication/x-gtar\t\t\t\tgtar\napplication/x-hdf\t\t\t\thdf\napplication/x-install-instructions\t\tinstall\napplication/x-iso9660-image\t\t\tiso\napplication/x-java-jnlp-file\t\t\tjnlp\napplication/x-latex\t\t\t\tlatex\napplication/x-lzh-compressed\t\t\tlzh lha\napplication/x-mie\t\t\t\tmie\napplication/x-mobipocket-ebook\t\t\tprc mobi\napplication/x-ms-application\t\t\tapplication\napplication/x-ms-shortcut\t\t\tlnk\napplication/x-ms-wmd\t\t\t\twmd\napplication/x-ms-wmz\t\t\t\twmz\napplication/x-ms-xbap\t\t\t\txbap\napplication/x-msaccess\t\t\t\tmdb\napplication/x-msbinder\t\t\t\tobd\napplication/x-mscardfile\t\t\tcrd\napplication/x-msclip\t\t\t\tclp\napplication/x-msdownload\t\t\texe dll com bat msi\napplication/x-msmediaview\t\t\tmvb m13 m14\napplication/x-msmetafile\t\t\twmf wmz emf emz\napplication/x-msmoney\t\t\t\tmny\napplication/x-mspublisher\t\t\tpub\napplication/x-msschedule\t\t\tscd\napplication/x-msterminal\t\t\ttrm\napplication/x-mswrite\t\t\t\twri\napplication/x-netcdf\t\t\t\tnc cdf\napplication/x-nzb\t\t\t\tnzb\napplication/x-pkcs12\t\t\t\tp12 pfx\napplication/x-pkcs7-certificates\t\tp7b spc\napplication/x-pkcs7-certreqresp\t\t\tp7r\napplication/x-rar-compressed\t\t\trar\napplication/x-research-info-systems\t\tris\napplication/x-sh\t\t\t\tsh\napplication/x-shar\t\t\t\tshar\napplication/x-shockwave-flash\t\t\tswf\napplication/x-silverlight-app\t\t\txap\napplication/x-sql\t\t\t\tsql\napplication/x-stuffit\t\t\t\tsit\napplication/x-stuffitx\t\t\t\tsitx\napplication/x-subrip\t\t\t\tsrt\napplication/x-sv4cpio\t\t\t\tsv4cpio\napplication/x-sv4crc\t\t\t\tsv4crc\napplication/x-t3vm-image\t\t\tt3\napplication/x-tads\t\t\t\tgam\napplication/x-tar\t\t\t\ttar\napplication/x-tcl\t\t\t\ttcl\napplication/x-tex\t\t\t\ttex\napplication/x-tex-tfm\t\t\t\ttfm\napplication/x-texinfo\t\t\t\ttexinfo texi\napplication/x-tgif\t\t\t\tobj\napplication/x-ustar\t\t\t\tustar\napplication/x-wais-source\t\t\tsrc\napplication/x-x509-ca-cert\t\t\tder crt\napplication/x-xfig\t\t\t\tfig\napplication/x-xliff+xml\t\t\t\txlf\napplication/x-xpinstall\t\t\t\txpi\napplication/x-xz\t\t\t\txz\napplication/x-zmachine\t\t\t\tz1 z2 z3 z4 z5 z6 z7 z8\napplication/xaml+xml\t\t\t\txaml\napplication/xcap-diff+xml\t\t\txdf\napplication/xenc+xml\t\t\t\txenc\napplication/xhtml+xml\t\t\t\txhtml xht\napplication/xml\t\t\t\t\txml xsl\napplication/xml-dtd\t\t\t\tdtd\napplication/xop+xml\t\t\t\txop\napplication/xproc+xml\t\t\t\txpl\napplication/xslt+xml\t\t\t\txslt\napplication/xspf+xml\t\t\t\txspf\napplication/xv+xml\t\t\t\tmxml xhvml xvml xvm\napplication/yang\t\t\t\tyang\napplication/yin+xml\t\t\t\tyin\napplication/zip\t\t\t\t\tzip\naudio/adpcm\t\t\t\t\tadp\naudio/basic\t\t\t\t\tau snd\naudio/midi\t\t\t\t\tmid midi kar rmi\naudio/mp4\t\t\t\t\tm4a mp4a\naudio/mpeg\t\t\t\t\tmpga mp2 mp2a mp3 m2a m3a\naudio/ogg\t\t\t\t\toga ogg spx\naudio/s3m\t\t\t\t\ts3m\naudio/silk\t\t\t\t\tsil\naudio/vnd.dece.audio\t\t\t\tuva uvva\naudio/vnd.digital-winds\t\t\t\teol\naudio/vnd.dra\t\t\t\t\tdra\naudio/vnd.dts\t\t\t\t\tdts\naudio/vnd.dts.hd\t\t\t\tdtshd\naudio/vnd.lucent.voice\t\t\t\tlvp\naudio/vnd.ms-playready.media.pya\t\tpya\naudio/vnd.nuera.ecelp4800\t\t\tecelp4800\naudio/vnd.nuera.ecelp7470\t\t\tecelp7470\naudio/vnd.nuera.ecelp9600\t\t\tecelp9600\naudio/vnd.rip\t\t\t\t\trip\naudio/webm\t\t\t\t\tweba\naudio/x-aac\t\t\t\t\taac\naudio/x-aiff\t\t\t\t\taif aiff aifc\naudio/x-caf\t\t\t\t\tcaf\naudio/x-flac\t\t\t\t\tflac\naudio/x-matroska\t\t\t\tmka\naudio/x-mpegurl\t\t\t\t\tm3u\naudio/x-ms-wax\t\t\t\t\twax\naudio/x-ms-wma\t\t\t\t\twma\naudio/x-pn-realaudio\t\t\t\tram ra\naudio/x-pn-realaudio-plugin\t\t\trmp\naudio/x-wav\t\t\t\t\twav\naudio/xm\t\t\t\t\txm\nchemical/x-cdx\t\t\t\t\tcdx\nchemical/x-cif\t\t\t\t\tcif\nchemical/x-cmdf\t\t\t\t\tcmdf\nchemical/x-cml\t\t\t\t\tcml\nchemical/x-csml\t\t\t\t\tcsml\nchemical/x-xyz\t\t\t\t\txyz\nfont/collection\t\t\t\t\tttc\nfont/otf\t\t\t\t\totf\nfont/ttf\t\t\t\t\tttf\nfont/woff\t\t\t\t\twoff\nfont/woff2\t\t\t\t\twoff2\nimage/bmp\t\t\t\t\tbmp\nimage/cgm\t\t\t\t\tcgm\nimage/g3fax\t\t\t\t\tg3\nimage/gif\t\t\t\t\tgif\nimage/ief\t\t\t\t\tief\nimage/jpeg\t\t\t\t\tjpeg jpg jpe\nimage/ktx\t\t\t\t\tktx\nimage/png\t\t\t\t\tpng\nimage/prs.btif\t\t\t\t\tbtif\nimage/sgi\t\t\t\t\tsgi\nimage/svg+xml\t\t\t\t\tsvg svgz\nimage/tiff\t\t\t\t\ttiff tif\nimage/vnd.adobe.photoshop\t\t\tpsd\nimage/vnd.dece.graphic\t\t\t\tuvi uvvi uvg uvvg\nimage/vnd.djvu\t\t\t\t\tdjvu djv\nimage/vnd.dvb.subtitle\t\t\t\tsub\nimage/vnd.dwg\t\t\t\t\tdwg\nimage/vnd.dxf\t\t\t\t\tdxf\nimage/vnd.fastbidsheet\t\t\t\tfbs\nimage/vnd.fpx\t\t\t\t\tfpx\nimage/vnd.fst\t\t\t\t\tfst\nimage/vnd.fujixerox.edmics-mmr\t\t\tmmr\nimage/vnd.fujixerox.edmics-rlc\t\t\trlc\nimage/vnd.ms-modi\t\t\t\tmdi\nimage/vnd.ms-photo\t\t\t\twdp\nimage/vnd.net-fpx\t\t\t\tnpx\nimage/vnd.wap.wbmp\t\t\t\twbmp\nimage/vnd.xiff\t\t\t\t\txif\nimage/webp\t\t\t\t\twebp\nimage/x-3ds\t\t\t\t\t3ds\nimage/x-cmu-raster\t\t\t\tras\nimage/x-cmx\t\t\t\t\tcmx\nimage/x-freehand\t\t\t\tfh fhc fh4 fh5 fh7\nimage/x-icon\t\t\t\t\tico\nimage/x-mrsid-image\t\t\t\tsid\nimage/x-pcx\t\t\t\t\tpcx\nimage/x-pict\t\t\t\t\tpic pct\nimage/x-portable-anymap\t\t\t\tpnm\nimage/x-portable-bitmap\t\t\t\tpbm\nimage/x-portable-graymap\t\t\tpgm\nimage/x-portable-pixmap\t\t\t\tppm\nimage/x-rgb\t\t\t\t\trgb\nimage/x-tga\t\t\t\t\ttga\nimage/x-xbitmap\t\t\t\t\txbm\nimage/x-xpixmap\t\t\t\t\txpm\nimage/x-xwindowdump\t\t\t\txwd\nmessage/rfc822\t\t\t\t\teml mime\nmodel/iges\t\t\t\t\tigs iges\nmodel/mesh\t\t\t\t\tmsh mesh silo\nmodel/vnd.collada+xml\t\t\t\tdae\nmodel/vnd.dwf\t\t\t\t\tdwf\nmodel/vnd.gdl\t\t\t\t\tgdl\nmodel/vnd.gtw\t\t\t\t\tgtw\nmodel/vnd.mts\t\t\t\t\tmts\nmodel/vnd.vtu\t\t\t\t\tvtu\nmodel/vrml\t\t\t\t\twrl vrml\nmodel/x3d+binary\t\t\t\tx3db x3dbz\nmodel/x3d+vrml\t\t\t\t\tx3dv x3dvz\nmodel/x3d+xml\t\t\t\t\tx3d x3dz\ntext/cache-manifest\t\t\t\tappcache\ntext/calendar\t\t\t\t\tics ifb\ntext/css\t\t\t\t\tcss\ntext/csv\t\t\t\t\tcsv\ntext/html\t\t\t\t\thtml htm\ntext/n3\t\t\t\t\t\tn3\ntext/plain\t\t\t\t\ttxt text conf def list log in\ntext/prs.lines.tag\t\t\t\tdsc\ntext/richtext\t\t\t\t\trtx\ntext/sgml\t\t\t\t\tsgml sgm\ntext/tab-separated-values\t\t\ttsv\ntext/troff\t\t\t\t\tt tr roff man me ms\ntext/turtle\t\t\t\t\tttl\ntext/uri-list\t\t\t\t\turi uris urls\ntext/vcard\t\t\t\t\tvcard\ntext/vnd.curl\t\t\t\t\tcurl\ntext/vnd.curl.dcurl\t\t\t\tdcurl\ntext/vnd.curl.mcurl\t\t\t\tmcurl\ntext/vnd.curl.scurl\t\t\t\tscurl\ntext/vnd.dvb.subtitle\t\t\t\tsub\ntext/vnd.fly\t\t\t\t\tfly\ntext/vnd.fmi.flexstor\t\t\t\tflx\ntext/vnd.graphviz\t\t\t\tgv\ntext/vnd.in3d.3dml\t\t\t\t3dml\ntext/vnd.in3d.spot\t\t\t\tspot\ntext/vnd.sun.j2me.app-descriptor\t\tjad\ntext/vnd.wap.wml\t\t\t\twml\ntext/vnd.wap.wmlscript\t\t\t\twmls\ntext/x-asm\t\t\t\t\ts asm\ntext/x-c\t\t\t\t\tc cc cxx cpp h hh dic\ntext/x-fortran\t\t\t\t\tf for f77 f90\ntext/x-java-source\t\t\t\tjava\ntext/x-nfo\t\t\t\t\tnfo\ntext/x-opml\t\t\t\t\topml\ntext/x-pascal\t\t\t\t\tp pas\ntext/x-setext\t\t\t\t\tetx\ntext/x-sfv\t\t\t\t\tsfv\ntext/x-uuencode\t\t\t\t\tuu\ntext/x-vcalendar\t\t\t\tvcs\ntext/x-vcard\t\t\t\t\tvcf\nvideo/3gpp\t\t\t\t\t3gp\nvideo/3gpp2\t\t\t\t\t3g2\nvideo/h261\t\t\t\t\th261\nvideo/h263\t\t\t\t\th263\nvideo/h264\t\t\t\t\th264\nvideo/jpeg\t\t\t\t\tjpgv\nvideo/jpm\t\t\t\t\tjpm jpgm\nvideo/mj2\t\t\t\t\tmj2 mjp2\nvideo/mp4\t\t\t\t\tmp4 mp4v mpg4\nvideo/mpeg\t\t\t\t\tmpeg mpg mpe m1v m2v\nvideo/ogg\t\t\t\t\togv\nvideo/quicktime\t\t\t\t\tqt mov\nvideo/vnd.dece.hd\t\t\t\tuvh uvvh\nvideo/vnd.dece.mobile\t\t\t\tuvm uvvm\nvideo/vnd.dece.pd\t\t\t\tuvp uvvp\nvideo/vnd.dece.sd\t\t\t\tuvs uvvs\nvideo/vnd.dece.video\t\t\t\tuvv uvvv\nvideo/vnd.dvb.file\t\t\t\tdvb\nvideo/vnd.fvt\t\t\t\t\tfvt\nvideo/vnd.mpegurl\t\t\t\tmxu m4u\nvideo/vnd.ms-playready.media.pyv\t\tpyv\nvideo/vnd.uvvu.mp4\t\t\t\tuvu uvvu\nvideo/vnd.vivo\t\t\t\t\tviv\nvideo/webm\t\t\t\t\twebm\nvideo/x-f4v\t\t\t\t\tf4v\nvideo/x-fli\t\t\t\t\tfli\nvideo/x-flv\t\t\t\t\tflv\nvideo/x-m4v\t\t\t\t\tm4v\nvideo/x-matroska\t\t\t\tmkv mk3d mks\nvideo/x-mng\t\t\t\t\tmng\nvideo/x-ms-asf\t\t\t\t\tasf asx\nvideo/x-ms-vob\t\t\t\t\tvob\nvideo/x-ms-wm\t\t\t\t\twm\nvideo/x-ms-wmv\t\t\t\t\twmv\nvideo/x-ms-wmx\t\t\t\t\twmx\nvideo/x-ms-wvx\t\t\t\t\twvx\nvideo/x-msvideo\t\t\t\t\tavi\nvideo/x-sgi-movie\t\t\t\tmovie\nvideo/x-smv\t\t\t\t\tsmv\nx-conference/x-cooltalk\t\t\t\tice\n";

const map = new Map();

mime_raw.split('\n').forEach((row) => {
	const match = /(.+?)\t+(.+)/.exec(row);
	if (!match) return;

	const type = match[1];
	const extensions = match[2].split(' ');

	extensions.forEach(ext => {
		map.set(ext, type);
	});
});

function lookup$1(file) {
	const match = /\.([^\.]+)$/.exec(file);
	return match && map.get(match[1]);
}

function middleware(opts


 = {}) {
	const { session, ignore } = opts;

	let emitted_basepath = false;

	return compose_handlers(ignore, [
		(req, res, next) => {
			if (req.baseUrl === undefined) {
				let { originalUrl } = req;
				if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
					originalUrl += '/';
				}

				req.baseUrl = originalUrl
					? originalUrl.slice(0, -req.url.length)
					: '';
			}

			if (!emitted_basepath && process.send) {
				process.send({
					__sapper__: true,
					event: 'basepath',
					basepath: req.baseUrl
				});

				emitted_basepath = true;
			}

			if (req.path === undefined) {
				req.path = req.url.replace(/\?.*/, '');
			}

			next();
		},

		fs.existsSync(path.join(build_dir, 'service-worker.js')) && serve({
			pathname: '/service-worker.js',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		fs.existsSync(path.join(build_dir, 'service-worker.js.map')) && serve({
			pathname: '/service-worker.js.map',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		serve({
			prefix: '/client/',
			cache_control:  'no-cache' 
		}),

		get_server_route_handler(manifest.server_routes),

		get_page_handler(manifest, session || noop$1)
	].filter(Boolean));
}

function compose_handlers(ignore, handlers) {
	const total = handlers.length;

	function nth_handler(n, req, res, next) {
		if (n >= total) {
			return next();
		}

		handlers[n](req, res, () => nth_handler(n+1, req, res, next));
	}

	return !ignore
		? (req, res, next) => nth_handler(0, req, res, next)
		: (req, res, next) => {
			if (should_ignore(req.path, ignore)) {
				next();
			} else {
				nth_handler(0, req, res, next);
			}
		};
}

function should_ignore(uri, val) {
	if (Array.isArray(val)) return val.some(x => should_ignore(uri, x));
	if (val instanceof RegExp) return val.test(uri);
	if (typeof val === 'function') return val(uri);
	return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}

function serve({ prefix, pathname, cache_control }



) {
	const filter = pathname
		? (req) => req.path === pathname
		: (req) => req.path.startsWith(prefix);

	const read =  (file) => fs.readFileSync(path.resolve(build_dir, file))
		;

	return (req, res, next) => {
		if (filter(req)) {
			const type = lookup$1(req.path);

			try {
				const file = decodeURIComponent(req.path.slice(1));
				const data = read(file);

				res.setHeader('Content-Type', type);
				res.setHeader('Cache-Control', cache_control);
				res.end(data);
			} catch (err) {
				res.statusCode = 404;
				res.end('not found');
			}
		} else {
			next();
		}
	};
}

function noop$1(){}

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2Jsb2cvX3Bvc3RzLmpzIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9ibG9nL2luZGV4Lmpzb24uanMiLCIuLi8uLi8uLi9zcmMvcm91dGVzL2Jsb2cvW3NsdWddLmpzb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlL2ludGVybmFsL2luZGV4Lm1qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NhcmQuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9ibG9nL2luZGV4LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvYmxvZy9bc2x1Z10uc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9fbGF5b3V0LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvX2Vycm9yLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9pbnRlcm5hbC9tYW5pZmVzdC1zZXJ2ZXIubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zdG9yZS9pbmRleC5tanMiLCIuLi8uLi8uLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvaW50ZXJuYWwvc2hhcmVkLm1qcyIsIi4uLy4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9pbnRlcm5hbC9BcHAuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL3NlcnZlci5tanMiLCIuLi8uLi8uLi9zcmMvc2VydmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIE9yZGluYXJpbHksIHlvdSdkIGdlbmVyYXRlIHRoaXMgZGF0YSBmcm9tIG1hcmtkb3duIGZpbGVzIGluIHlvdXJcclxuLy8gcmVwbywgb3IgZmV0Y2ggdGhlbSBmcm9tIGEgZGF0YWJhc2Ugb2Ygc29tZSBraW5kLiBCdXQgaW4gb3JkZXIgdG9cclxuLy8gYXZvaWQgdW5uZWNlc3NhcnkgZGVwZW5kZW5jaWVzIGluIHRoZSBzdGFydGVyIHRlbXBsYXRlLCBhbmQgaW4gdGhlXHJcbi8vIHNlcnZpY2Ugb2Ygb2J2aW91c25lc3MsIHdlJ3JlIGp1c3QgZ29pbmcgdG8gbGVhdmUgaXQgaGVyZS5cclxuXHJcbi8vIFRoaXMgZmlsZSBpcyBjYWxsZWQgYF9wb3N0cy5qc2AgcmF0aGVyIHRoYW4gYHBvc3RzLmpzYCwgYmVjYXVzZVxyXG4vLyB3ZSBkb24ndCB3YW50IHRvIGNyZWF0ZSBhbiBgL2Jsb2cvcG9zdHNgIHJvdXRlIOKAlCB0aGUgbGVhZGluZ1xyXG4vLyB1bmRlcnNjb3JlIHRlbGxzIFNhcHBlciBub3QgdG8gZG8gdGhhdC5cclxuXHJcbmNvbnN0IHBvc3RzID0gW1xyXG5cdHtcclxuXHRcdHRpdGxlOiAnV2hhdCBpcyBTYXBwZXI/JyxcclxuXHRcdHNsdWc6ICd3aGF0LWlzLXNhcHBlcicsXHJcblx0XHRodG1sOiBgXHJcblx0XHRcdDxwPkZpcnN0LCB5b3UgaGF2ZSB0byBrbm93IHdoYXQgPGEgaHJlZj0naHR0cHM6Ly9zdmVsdGUuZGV2Jz5TdmVsdGU8L2E+IGlzLiBTdmVsdGUgaXMgYSBVSSBmcmFtZXdvcmsgd2l0aCBhIGJvbGQgbmV3IGlkZWE6IHJhdGhlciB0aGFuIHByb3ZpZGluZyBhIGxpYnJhcnkgdGhhdCB5b3Ugd3JpdGUgY29kZSB3aXRoIChsaWtlIFJlYWN0IG9yIFZ1ZSwgZm9yIGV4YW1wbGUpLCBpdCdzIGEgY29tcGlsZXIgdGhhdCB0dXJucyB5b3VyIGNvbXBvbmVudHMgaW50byBoaWdobHkgb3B0aW1pemVkIHZhbmlsbGEgSmF2YVNjcmlwdC4gSWYgeW91IGhhdmVuJ3QgYWxyZWFkeSByZWFkIHRoZSA8YSBocmVmPSdodHRwczovL3N2ZWx0ZS5kZXYvYmxvZy9mcmFtZXdvcmtzLXdpdGhvdXQtdGhlLWZyYW1ld29yayc+aW50cm9kdWN0b3J5IGJsb2cgcG9zdDwvYT4sIHlvdSBzaG91bGQhPC9wPlxyXG5cclxuXHRcdFx0PHA+U2FwcGVyIGlzIGEgTmV4dC5qcy1zdHlsZSBmcmFtZXdvcmsgKDxhIGhyZWY9J2Jsb2cvaG93LWlzLXNhcHBlci1kaWZmZXJlbnQtZnJvbS1uZXh0Jz5tb3JlIG9uIHRoYXQgaGVyZTwvYT4pIGJ1aWx0IGFyb3VuZCBTdmVsdGUuIEl0IG1ha2VzIGl0IGVtYmFycmFzc2luZ2x5IGVhc3kgdG8gY3JlYXRlIGV4dHJlbWVseSBoaWdoIHBlcmZvcm1hbmNlIHdlYiBhcHBzLiBPdXQgb2YgdGhlIGJveCwgeW91IGdldDo8L3A+XHJcblxyXG5cdFx0XHQ8dWw+XHJcblx0XHRcdFx0PGxpPkNvZGUtc3BsaXR0aW5nLCBkeW5hbWljIGltcG9ydHMgYW5kIGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQsIHBvd2VyZWQgYnkgd2VicGFjazwvbGk+XHJcblx0XHRcdFx0PGxpPlNlcnZlci1zaWRlIHJlbmRlcmluZyAoU1NSKSB3aXRoIGNsaWVudC1zaWRlIGh5ZHJhdGlvbjwvbGk+XHJcblx0XHRcdFx0PGxpPlNlcnZpY2Ugd29ya2VyIGZvciBvZmZsaW5lIHN1cHBvcnQsIGFuZCBhbGwgdGhlIFBXQSBiZWxscyBhbmQgd2hpc3RsZXM8L2xpPlxyXG5cdFx0XHRcdDxsaT5UaGUgbmljZXN0IGRldmVsb3BtZW50IGV4cGVyaWVuY2UgeW91J3ZlIGV2ZXIgaGFkLCBvciB5b3VyIG1vbmV5IGJhY2s8L2xpPlxyXG5cdFx0XHQ8L3VsPlxyXG5cclxuXHRcdFx0PHA+SXQncyBpbXBsZW1lbnRlZCBhcyBFeHByZXNzIG1pZGRsZXdhcmUuIEV2ZXJ5dGhpbmcgaXMgc2V0IHVwIGFuZCB3YWl0aW5nIGZvciB5b3UgdG8gZ2V0IHN0YXJ0ZWQsIGJ1dCB5b3Uga2VlcCBjb21wbGV0ZSBjb250cm9sIG92ZXIgdGhlIHNlcnZlciwgc2VydmljZSB3b3JrZXIsIHdlYnBhY2sgY29uZmlnIGFuZCBldmVyeXRoaW5nIGVsc2UsIHNvIGl0J3MgYXMgZmxleGlibGUgYXMgeW91IG5lZWQgaXQgdG8gYmUuPC9wPlxyXG5cdFx0YFxyXG5cdH0sXHJcblxyXG5cdHtcclxuXHRcdHRpdGxlOiAnSG93IHRvIHVzZSBTYXBwZXInLFxyXG5cdFx0c2x1ZzogJ2hvdy10by11c2Utc2FwcGVyJyxcclxuXHRcdGh0bWw6IGBcclxuXHRcdFx0PGgyPlN0ZXAgb25lPC9oMj5cclxuXHRcdFx0PHA+Q3JlYXRlIGEgbmV3IHByb2plY3QsIHVzaW5nIDxhIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9SaWNoLUhhcnJpcy9kZWdpdCc+ZGVnaXQ8L2E+OjwvcD5cclxuXHJcblx0XHRcdDxwcmU+PGNvZGU+bnB4IGRlZ2l0IFwic3ZlbHRlanMvc2FwcGVyLXRlbXBsYXRlI3JvbGx1cFwiIG15LWFwcFxyXG5cdFx0XHRjZCBteS1hcHBcclxuXHRcdFx0bnBtIGluc3RhbGwgIyBvciB5YXJuIVxyXG5cdFx0XHRucG0gcnVuIGRldlxyXG5cdFx0XHQ8L2NvZGU+PC9wcmU+XHJcblxyXG5cdFx0XHQ8aDI+U3RlcCB0d288L2gyPlxyXG5cdFx0XHQ8cD5HbyB0byA8YSBocmVmPSdodHRwOi8vbG9jYWxob3N0OjMwMDAnPmxvY2FsaG9zdDozMDAwPC9hPi4gT3BlbiA8Y29kZT5teS1hcHA8L2NvZGU+IGluIHlvdXIgZWRpdG9yLiBFZGl0IHRoZSBmaWxlcyBpbiB0aGUgPGNvZGU+c3JjL3JvdXRlczwvY29kZT4gZGlyZWN0b3J5IG9yIGFkZCBuZXcgb25lcy48L3A+XHJcblxyXG5cdFx0XHQ8aDI+U3RlcCB0aHJlZTwvaDI+XHJcblx0XHRcdDxwPi4uLjwvcD5cclxuXHJcblx0XHRcdDxoMj5TdGVwIGZvdXI8L2gyPlxyXG5cdFx0XHQ8cD5SZXNpc3Qgb3ZlcmRvbmUgam9rZSBmb3JtYXRzLjwvcD5cclxuXHRcdGBcclxuXHR9LFxyXG5cclxuXHR7XHJcblx0XHR0aXRsZTogJ1doeSB0aGUgbmFtZT8nLFxyXG5cdFx0c2x1ZzogJ3doeS10aGUtbmFtZScsXHJcblx0XHRodG1sOiBgXHJcblx0XHRcdDxwPkluIHdhciwgdGhlIHNvbGRpZXJzIHdobyBidWlsZCBicmlkZ2VzLCByZXBhaXIgcm9hZHMsIGNsZWFyIG1pbmVmaWVsZHMgYW5kIGNvbmR1Y3QgZGVtb2xpdGlvbnMg4oCUIGFsbCB1bmRlciBjb21iYXQgY29uZGl0aW9ucyDigJQgYXJlIGtub3duIGFzIDxlbT5zYXBwZXJzPC9lbT4uPC9wPlxyXG5cclxuXHRcdFx0PHA+Rm9yIHdlYiBkZXZlbG9wZXJzLCB0aGUgc3Rha2VzIGFyZSBnZW5lcmFsbHkgbG93ZXIgdGhhbiB0aG9zZSBmb3IgY29tYmF0IGVuZ2luZWVycy4gQnV0IHdlIGZhY2Ugb3VyIG93biBob3N0aWxlIGVudmlyb25tZW50OiB1bmRlcnBvd2VyZWQgZGV2aWNlcywgcG9vciBuZXR3b3JrIGNvbm5lY3Rpb25zLCBhbmQgdGhlIGNvbXBsZXhpdHkgaW5oZXJlbnQgaW4gZnJvbnQtZW5kIGVuZ2luZWVyaW5nLiBTYXBwZXIsIHdoaWNoIGlzIHNob3J0IGZvciA8c3Ryb25nPlM8L3N0cm9uZz52ZWx0ZSA8c3Ryb25nPmFwcDwvc3Ryb25nPiBtYWs8c3Ryb25nPmVyPC9zdHJvbmc+LCBpcyB5b3VyIGNvdXJhZ2VvdXMgYW5kIGR1dGlmdWwgYWxseS48L3A+XHJcblx0XHRgXHJcblx0fSxcclxuXHJcblx0e1xyXG5cdFx0dGl0bGU6ICdIb3cgaXMgU2FwcGVyIGRpZmZlcmVudCBmcm9tIE5leHQuanM/JyxcclxuXHRcdHNsdWc6ICdob3ctaXMtc2FwcGVyLWRpZmZlcmVudC1mcm9tLW5leHQnLFxyXG5cdFx0aHRtbDogYFxyXG5cdFx0XHQ8cD48YSBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vemVpdC9uZXh0LmpzJz5OZXh0LmpzPC9hPiBpcyBhIFJlYWN0IGZyYW1ld29yayBmcm9tIDxhIGhyZWY9J2h0dHBzOi8vemVpdC5jbyc+WmVpdDwvYT4sIGFuZCBpcyB0aGUgaW5zcGlyYXRpb24gZm9yIFNhcHBlci4gVGhlcmUgYXJlIGEgZmV3IG5vdGFibGUgZGlmZmVyZW5jZXMsIGhvd2V2ZXI6PC9wPlxyXG5cclxuXHRcdFx0PHVsPlxyXG5cdFx0XHRcdDxsaT5JdCdzIHBvd2VyZWQgYnkgPGEgaHJlZj0naHR0cHM6Ly9zdmVsdGUuZGV2Jz5TdmVsdGU8L2E+IGluc3RlYWQgb2YgUmVhY3QsIHNvIGl0J3MgZmFzdGVyIGFuZCB5b3VyIGFwcHMgYXJlIHNtYWxsZXI8L2xpPlxyXG5cdFx0XHRcdDxsaT5JbnN0ZWFkIG9mIHJvdXRlIG1hc2tpbmcsIHdlIGVuY29kZSByb3V0ZSBwYXJhbWV0ZXJzIGluIGZpbGVuYW1lcy4gRm9yIGV4YW1wbGUsIHRoZSBwYWdlIHlvdSdyZSBsb29raW5nIGF0IHJpZ2h0IG5vdyBpcyA8Y29kZT5zcmMvcm91dGVzL2Jsb2cvW3NsdWddLmh0bWw8L2NvZGU+PC9saT5cclxuXHRcdFx0XHQ8bGk+QXMgd2VsbCBhcyBwYWdlcyAoU3ZlbHRlIGNvbXBvbmVudHMsIHdoaWNoIHJlbmRlciBvbiBzZXJ2ZXIgb3IgY2xpZW50KSwgeW91IGNhbiBjcmVhdGUgPGVtPnNlcnZlciByb3V0ZXM8L2VtPiBpbiB5b3VyIDxjb2RlPnJvdXRlczwvY29kZT4gZGlyZWN0b3J5LiBUaGVzZSBhcmUganVzdCA8Y29kZT4uanM8L2NvZGU+IGZpbGVzIHRoYXQgZXhwb3J0IGZ1bmN0aW9ucyBjb3JyZXNwb25kaW5nIHRvIEhUVFAgbWV0aG9kcywgYW5kIHJlY2VpdmUgRXhwcmVzcyA8Y29kZT5yZXF1ZXN0PC9jb2RlPiBhbmQgPGNvZGU+cmVzcG9uc2U8L2NvZGU+IG9iamVjdHMgYXMgYXJndW1lbnRzLiBUaGlzIG1ha2VzIGl0IHZlcnkgZWFzeSB0bywgZm9yIGV4YW1wbGUsIGFkZCBhIEpTT04gQVBJIHN1Y2ggYXMgdGhlIG9uZSA8YSBocmVmPSdibG9nL2hvdy1pcy1zYXBwZXItZGlmZmVyZW50LWZyb20tbmV4dC5qc29uJz5wb3dlcmluZyB0aGlzIHZlcnkgcGFnZTwvYT48L2xpPlxyXG5cdFx0XHRcdDxsaT5MaW5rcyBhcmUganVzdCA8Y29kZT4mbHQ7YSZndDs8L2NvZGU+IGVsZW1lbnRzLCByYXRoZXIgdGhhbiBmcmFtZXdvcmstc3BlY2lmaWMgPGNvZGU+Jmx0O0xpbmsmZ3Q7PC9jb2RlPiBjb21wb25lbnRzLiBUaGF0IG1lYW5zLCBmb3IgZXhhbXBsZSwgdGhhdCA8YSBocmVmPSdibG9nL2hvdy1jYW4taS1nZXQtaW52b2x2ZWQnPnRoaXMgbGluayByaWdodCBoZXJlPC9hPiwgZGVzcGl0ZSBiZWluZyBpbnNpZGUgYSBibG9iIG9mIEhUTUwsIHdvcmtzIHdpdGggdGhlIHJvdXRlciBhcyB5b3UnZCBleHBlY3QuPC9saT5cclxuXHRcdFx0PC91bD5cclxuXHRcdGBcclxuXHR9LFxyXG5cclxuXHR7XHJcblx0XHR0aXRsZTogJ0hvdyBjYW4gSSBnZXQgaW52b2x2ZWQ/JyxcclxuXHRcdHNsdWc6ICdob3ctY2FuLWktZ2V0LWludm9sdmVkJyxcclxuXHRcdGh0bWw6IGBcclxuXHRcdFx0PHA+V2UncmUgc28gZ2xhZCB5b3UgYXNrZWQhIENvbWUgb24gb3ZlciB0byB0aGUgPGEgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL3N2ZWx0ZWpzL3N2ZWx0ZSc+U3ZlbHRlPC9hPiBhbmQgPGEgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL3N2ZWx0ZWpzL3NhcHBlcic+U2FwcGVyPC9hPiByZXBvcywgYW5kIGpvaW4gdXMgaW4gdGhlIDxhIGhyZWY9J2h0dHBzOi8vc3ZlbHRlLmRldi9jaGF0Jz5EaXNjb3JkIGNoYXRyb29tPC9hPi4gRXZlcnlvbmUgaXMgd2VsY29tZSwgZXNwZWNpYWxseSB5b3UhPC9wPlxyXG5cdFx0YFxyXG5cdH1cclxuXTtcclxuXHJcbnBvc3RzLmZvckVhY2gocG9zdCA9PiB7XHJcblx0cG9zdC5odG1sID0gcG9zdC5odG1sLnJlcGxhY2UoL15cXHR7M30vZ20sICcnKTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwb3N0cztcclxuIiwiaW1wb3J0IHBvc3RzIGZyb20gJy4vX3Bvc3RzLmpzJztcclxuXHJcbmNvbnN0IGNvbnRlbnRzID0gSlNPTi5zdHJpbmdpZnkocG9zdHMubWFwKHBvc3QgPT4ge1xyXG5cdHJldHVybiB7XHJcblx0XHR0aXRsZTogcG9zdC50aXRsZSxcclxuXHRcdHNsdWc6IHBvc3Quc2x1Z1xyXG5cdH07XHJcbn0pKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXQocmVxLCByZXMpIHtcclxuXHRyZXMud3JpdGVIZWFkKDIwMCwge1xyXG5cdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdH0pO1xyXG5cclxuXHRyZXMuZW5kKGNvbnRlbnRzKTtcclxufSIsImltcG9ydCBwb3N0cyBmcm9tICcuL19wb3N0cy5qcyc7XHJcblxyXG5jb25zdCBsb29rdXAgPSBuZXcgTWFwKCk7XHJcbnBvc3RzLmZvckVhY2gocG9zdCA9PiB7XHJcblx0bG9va3VwLnNldChwb3N0LnNsdWcsIEpTT04uc3RyaW5naWZ5KHBvc3QpKTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0KHJlcSwgcmVzLCBuZXh0KSB7XHJcblx0Ly8gdGhlIGBzbHVnYCBwYXJhbWV0ZXIgaXMgYXZhaWxhYmxlIGJlY2F1c2VcclxuXHQvLyB0aGlzIGZpbGUgaXMgY2FsbGVkIFtzbHVnXS5qc29uLmpzXHJcblx0Y29uc3QgeyBzbHVnIH0gPSByZXEucGFyYW1zO1xyXG5cclxuXHRpZiAobG9va3VwLmhhcyhzbHVnKSkge1xyXG5cdFx0cmVzLndyaXRlSGVhZCgyMDAsIHtcclxuXHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmVzLmVuZChsb29rdXAuZ2V0KHNsdWcpKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmVzLndyaXRlSGVhZCg0MDQsIHtcclxuXHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmVzLmVuZChKU09OLnN0cmluZ2lmeSh7XHJcblx0XHRcdG1lc3NhZ2U6IGBOb3QgZm91bmRgXHJcblx0XHR9KSk7XHJcblx0fVxyXG59XHJcbiIsImZ1bmN0aW9uIG5vb3AoKSB7IH1cbmNvbnN0IGlkZW50aXR5ID0geCA9PiB4O1xuZnVuY3Rpb24gYXNzaWduKHRhciwgc3JjKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGZvciAoY29uc3QgayBpbiBzcmMpXG4gICAgICAgIHRhcltrXSA9IHNyY1trXTtcbiAgICByZXR1cm4gdGFyO1xufVxuZnVuY3Rpb24gaXNfcHJvbWlzZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nO1xufVxuZnVuY3Rpb24gYWRkX2xvY2F0aW9uKGVsZW1lbnQsIGZpbGUsIGxpbmUsIGNvbHVtbiwgY2hhcikge1xuICAgIGVsZW1lbnQuX19zdmVsdGVfbWV0YSA9IHtcbiAgICAgICAgbG9jOiB7IGZpbGUsIGxpbmUsIGNvbHVtbiwgY2hhciB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHJ1bihmbikge1xuICAgIHJldHVybiBmbigpO1xufVxuZnVuY3Rpb24gYmxhbmtfb2JqZWN0KCkge1xuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKG51bGwpO1xufVxuZnVuY3Rpb24gcnVuX2FsbChmbnMpIHtcbiAgICBmbnMuZm9yRWFjaChydW4pO1xufVxuZnVuY3Rpb24gaXNfZnVuY3Rpb24odGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAnZnVuY3Rpb24nO1xufVxuZnVuY3Rpb24gc2FmZV9ub3RfZXF1YWwoYSwgYikge1xuICAgIHJldHVybiBhICE9IGEgPyBiID09IGIgOiBhICE9PSBiIHx8ICgoYSAmJiB0eXBlb2YgYSA9PT0gJ29iamVjdCcpIHx8IHR5cGVvZiBhID09PSAnZnVuY3Rpb24nKTtcbn1cbmZ1bmN0aW9uIG5vdF9lcXVhbChhLCBiKSB7XG4gICAgcmV0dXJuIGEgIT0gYSA/IGIgPT0gYiA6IGEgIT09IGI7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9zdG9yZShzdG9yZSwgbmFtZSkge1xuICAgIGlmICghc3RvcmUgfHwgdHlwZW9mIHN0b3JlLnN1YnNjcmliZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCcke25hbWV9JyBpcyBub3QgYSBzdG9yZSB3aXRoIGEgJ3N1YnNjcmliZScgbWV0aG9kYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gc3Vic2NyaWJlKHN0b3JlLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHVuc3ViID0gc3RvcmUuc3Vic2NyaWJlKGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdW5zdWIudW5zdWJzY3JpYmUgPyAoKSA9PiB1bnN1Yi51bnN1YnNjcmliZSgpIDogdW5zdWI7XG59XG5mdW5jdGlvbiBnZXRfc3RvcmVfdmFsdWUoc3RvcmUpIHtcbiAgICBsZXQgdmFsdWU7XG4gICAgc3Vic2NyaWJlKHN0b3JlLCBfID0+IHZhbHVlID0gXykoKTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiBjb21wb25lbnRfc3Vic2NyaWJlKGNvbXBvbmVudCwgc3RvcmUsIGNhbGxiYWNrKSB7XG4gICAgY29tcG9uZW50LiQkLm9uX2Rlc3Ryb3kucHVzaChzdWJzY3JpYmUoc3RvcmUsIGNhbGxiYWNrKSk7XG59XG5mdW5jdGlvbiBjcmVhdGVfc2xvdChkZWZpbml0aW9uLCBjdHgsIGZuKSB7XG4gICAgaWYgKGRlZmluaXRpb24pIHtcbiAgICAgICAgY29uc3Qgc2xvdF9jdHggPSBnZXRfc2xvdF9jb250ZXh0KGRlZmluaXRpb24sIGN0eCwgZm4pO1xuICAgICAgICByZXR1cm4gZGVmaW5pdGlvblswXShzbG90X2N0eCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0X3Nsb3RfY29udGV4dChkZWZpbml0aW9uLCBjdHgsIGZuKSB7XG4gICAgcmV0dXJuIGRlZmluaXRpb25bMV1cbiAgICAgICAgPyBhc3NpZ24oe30sIGFzc2lnbihjdHguJCRzY29wZS5jdHgsIGRlZmluaXRpb25bMV0oZm4gPyBmbihjdHgpIDoge30pKSlcbiAgICAgICAgOiBjdHguJCRzY29wZS5jdHg7XG59XG5mdW5jdGlvbiBnZXRfc2xvdF9jaGFuZ2VzKGRlZmluaXRpb24sIGN0eCwgY2hhbmdlZCwgZm4pIHtcbiAgICByZXR1cm4gZGVmaW5pdGlvblsxXVxuICAgICAgICA/IGFzc2lnbih7fSwgYXNzaWduKGN0eC4kJHNjb3BlLmNoYW5nZWQgfHwge30sIGRlZmluaXRpb25bMV0oZm4gPyBmbihjaGFuZ2VkKSA6IHt9KSkpXG4gICAgICAgIDogY3R4LiQkc2NvcGUuY2hhbmdlZCB8fCB7fTtcbn1cbmZ1bmN0aW9uIGV4Y2x1ZGVfaW50ZXJuYWxfcHJvcHMocHJvcHMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGsgaW4gcHJvcHMpXG4gICAgICAgIGlmIChrWzBdICE9PSAnJCcpXG4gICAgICAgICAgICByZXN1bHRba10gPSBwcm9wc1trXTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gb25jZShmbikge1xuICAgIGxldCByYW4gPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKHJhbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgcmFuID0gdHJ1ZTtcbiAgICAgICAgZm4uY2FsbCh0aGlzLCAuLi5hcmdzKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gbnVsbF90b19lbXB0eSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHNldF9zdG9yZV92YWx1ZShzdG9yZSwgcmV0LCB2YWx1ZSA9IHJldCkge1xuICAgIHN0b3JlLnNldCh2YWx1ZSk7XG4gICAgcmV0dXJuIHJldDtcbn1cblxuY29uc3QgaXNfY2xpZW50ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG5sZXQgbm93ID0gaXNfY2xpZW50XG4gICAgPyAoKSA9PiB3aW5kb3cucGVyZm9ybWFuY2Uubm93KClcbiAgICA6ICgpID0+IERhdGUubm93KCk7XG5sZXQgcmFmID0gaXNfY2xpZW50ID8gY2IgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNiKSA6IG5vb3A7XG4vLyB1c2VkIGludGVybmFsbHkgZm9yIHRlc3RpbmdcbmZ1bmN0aW9uIHNldF9ub3coZm4pIHtcbiAgICBub3cgPSBmbjtcbn1cbmZ1bmN0aW9uIHNldF9yYWYoZm4pIHtcbiAgICByYWYgPSBmbjtcbn1cblxuY29uc3QgdGFza3MgPSBuZXcgU2V0KCk7XG5sZXQgcnVubmluZyA9IGZhbHNlO1xuZnVuY3Rpb24gcnVuX3Rhc2tzKCkge1xuICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgIGlmICghdGFza1swXShub3coKSkpIHtcbiAgICAgICAgICAgIHRhc2tzLmRlbGV0ZSh0YXNrKTtcbiAgICAgICAgICAgIHRhc2tbMV0oKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJ1bm5pbmcgPSB0YXNrcy5zaXplID4gMDtcbiAgICBpZiAocnVubmluZylcbiAgICAgICAgcmFmKHJ1bl90YXNrcyk7XG59XG5mdW5jdGlvbiBjbGVhcl9sb29wcygpIHtcbiAgICAvLyBmb3IgdGVzdGluZy4uLlxuICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB0YXNrcy5kZWxldGUodGFzaykpO1xuICAgIHJ1bm5pbmcgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIGxvb3AoZm4pIHtcbiAgICBsZXQgdGFzaztcbiAgICBpZiAoIXJ1bm5pbmcpIHtcbiAgICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICAgIHJhZihydW5fdGFza3MpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9taXNlOiBuZXcgUHJvbWlzZShmdWxmaWwgPT4ge1xuICAgICAgICAgICAgdGFza3MuYWRkKHRhc2sgPSBbZm4sIGZ1bGZpbF0pO1xuICAgICAgICB9KSxcbiAgICAgICAgYWJvcnQoKSB7XG4gICAgICAgICAgICB0YXNrcy5kZWxldGUodGFzayk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBhcHBlbmQodGFyZ2V0LCBub2RlKSB7XG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKG5vZGUpO1xufVxuZnVuY3Rpb24gaW5zZXJ0KHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XG4gICAgdGFyZ2V0Lmluc2VydEJlZm9yZShub2RlLCBhbmNob3IgfHwgbnVsbCk7XG59XG5mdW5jdGlvbiBkZXRhY2gobm9kZSkge1xuICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbn1cbmZ1bmN0aW9uIGRlc3Ryb3lfZWFjaChpdGVyYXRpb25zLCBkZXRhY2hpbmcpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGl0ZXJhdGlvbnNbaV0pXG4gICAgICAgICAgICBpdGVyYXRpb25zW2ldLmQoZGV0YWNoaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBlbGVtZW50KG5hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKTtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRfaXMobmFtZSwgaXMpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lLCB7IGlzIH0pO1xufVxuZnVuY3Rpb24gb2JqZWN0X3dpdGhvdXRfcHJvcGVydGllcyhvYmosIGV4Y2x1ZGUpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW9iamVjdC1saXRlcmFsLXR5cGUtYXNzZXJ0aW9uXG4gICAgY29uc3QgdGFyZ2V0ID0ge307XG4gICAgZm9yIChjb25zdCBrIGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaylcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICYmIGV4Y2x1ZGUuaW5kZXhPZihrKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRhcmdldFtrXSA9IG9ialtrXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gc3ZnX2VsZW1lbnQobmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgbmFtZSk7XG59XG5mdW5jdGlvbiB0ZXh0KGRhdGEpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZGF0YSk7XG59XG5mdW5jdGlvbiBzcGFjZSgpIHtcbiAgICByZXR1cm4gdGV4dCgnICcpO1xufVxuZnVuY3Rpb24gZW1wdHkoKSB7XG4gICAgcmV0dXJuIHRleHQoJycpO1xufVxuZnVuY3Rpb24gbGlzdGVuKG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICByZXR1cm4gKCkgPT4gbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHByZXZlbnRfZGVmYXVsdChmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHN0b3BfcHJvcGFnYXRpb24oZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gc2VsZihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzKVxuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGF0dHIobm9kZSwgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgIGVsc2VcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBzZXRfYXR0cmlidXRlcyhub2RlLCBhdHRyaWJ1dGVzKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5IGluIG5vZGUpIHtcbiAgICAgICAgICAgIG5vZGVba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF0dHIobm9kZSwga2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0X3N2Z19hdHRyaWJ1dGVzKG5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGF0dHIobm9kZSwga2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9jdXN0b21fZWxlbWVudF9kYXRhKG5vZGUsIHByb3AsIHZhbHVlKSB7XG4gICAgaWYgKHByb3AgaW4gbm9kZSkge1xuICAgICAgICBub2RlW3Byb3BdID0gdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhdHRyKG5vZGUsIHByb3AsIHZhbHVlKTtcbiAgICB9XG59XG5mdW5jdGlvbiB4bGlua19hdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBub2RlLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgYXR0cmlidXRlLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBnZXRfYmluZGluZ19ncm91cF92YWx1ZShncm91cCkge1xuICAgIGNvbnN0IHZhbHVlID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm91cC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoZ3JvdXBbaV0uY2hlY2tlZClcbiAgICAgICAgICAgIHZhbHVlLnB1c2goZ3JvdXBbaV0uX192YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHRvX251bWJlcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gJycgPyB1bmRlZmluZWQgOiArdmFsdWU7XG59XG5mdW5jdGlvbiB0aW1lX3Jhbmdlc190b19hcnJheShyYW5nZXMpIHtcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGFycmF5LnB1c2goeyBzdGFydDogcmFuZ2VzLnN0YXJ0KGkpLCBlbmQ6IHJhbmdlcy5lbmQoaSkgfSk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbn1cbmZ1bmN0aW9uIGNoaWxkcmVuKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpO1xufVxuZnVuY3Rpb24gY2xhaW1fZWxlbWVudChub2RlcywgbmFtZSwgYXR0cmlidXRlcywgc3ZnKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgIGlmIChub2RlLm5vZGVOYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG5vZGUuYXR0cmlidXRlcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG5vZGUuYXR0cmlidXRlc1tqXTtcbiAgICAgICAgICAgICAgICBpZiAoIWF0dHJpYnV0ZXNbYXR0cmlidXRlLm5hbWVdKVxuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZXMuc3BsaWNlKGksIDEpWzBdOyAvLyBUT0RPIHN0cmlwIHVud2FudGVkIGF0dHJpYnV0ZXNcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3ZnID8gc3ZnX2VsZW1lbnQobmFtZSkgOiBlbGVtZW50KG5hbWUpO1xufVxuZnVuY3Rpb24gY2xhaW1fdGV4dChub2RlcywgZGF0YSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgbm9kZS5kYXRhID0gJycgKyBkYXRhO1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVzLnNwbGljZShpLCAxKVswXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGV4dChkYXRhKTtcbn1cbmZ1bmN0aW9uIGNsYWltX3NwYWNlKG5vZGVzKSB7XG4gICAgcmV0dXJuIGNsYWltX3RleHQobm9kZXMsICcgJyk7XG59XG5mdW5jdGlvbiBzZXRfZGF0YSh0ZXh0LCBkYXRhKSB7XG4gICAgZGF0YSA9ICcnICsgZGF0YTtcbiAgICBpZiAodGV4dC5kYXRhICE9PSBkYXRhKVxuICAgICAgICB0ZXh0LmRhdGEgPSBkYXRhO1xufVxuZnVuY3Rpb24gc2V0X2lucHV0X3ZhbHVlKGlucHV0LCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAhPSBudWxsIHx8IGlucHV0LnZhbHVlKSB7XG4gICAgICAgIGlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0X2lucHV0X3R5cGUoaW5wdXQsIHR5cGUpIHtcbiAgICB0cnkge1xuICAgICAgICBpbnB1dC50eXBlID0gdHlwZTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9zdHlsZShub2RlLCBrZXksIHZhbHVlLCBpbXBvcnRhbnQpIHtcbiAgICBub2RlLnN0eWxlLnNldFByb3BlcnR5KGtleSwgdmFsdWUsIGltcG9ydGFudCA/ICdpbXBvcnRhbnQnIDogJycpO1xufVxuZnVuY3Rpb24gc2VsZWN0X29wdGlvbihzZWxlY3QsIHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcbiAgICAgICAgaWYgKG9wdGlvbi5fX3ZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHNlbGVjdF9vcHRpb25zKHNlbGVjdCwgdmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdC5vcHRpb25zW2ldO1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB+dmFsdWUuaW5kZXhPZihvcHRpb24uX192YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2VsZWN0X3ZhbHVlKHNlbGVjdCkge1xuICAgIGNvbnN0IHNlbGVjdGVkX29wdGlvbiA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCc6Y2hlY2tlZCcpIHx8IHNlbGVjdC5vcHRpb25zWzBdO1xuICAgIHJldHVybiBzZWxlY3RlZF9vcHRpb24gJiYgc2VsZWN0ZWRfb3B0aW9uLl9fdmFsdWU7XG59XG5mdW5jdGlvbiBzZWxlY3RfbXVsdGlwbGVfdmFsdWUoc2VsZWN0KSB7XG4gICAgcmV0dXJuIFtdLm1hcC5jYWxsKHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCc6Y2hlY2tlZCcpLCBvcHRpb24gPT4gb3B0aW9uLl9fdmFsdWUpO1xufVxuZnVuY3Rpb24gYWRkX3Jlc2l6ZV9saXN0ZW5lcihlbGVtZW50LCBmbikge1xuICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICB9XG4gICAgY29uc3Qgb2JqZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2JqZWN0Jyk7XG4gICAgb2JqZWN0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTogYmxvY2s7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyBoZWlnaHQ6IDEwMCU7IHdpZHRoOiAxMDAlOyBvdmVyZmxvdzogaGlkZGVuOyBwb2ludGVyLWV2ZW50czogbm9uZTsgei1pbmRleDogLTE7Jyk7XG4gICAgb2JqZWN0LnR5cGUgPSAndGV4dC9odG1sJztcbiAgICBvYmplY3QudGFiSW5kZXggPSAtMTtcbiAgICBsZXQgd2luO1xuICAgIG9iamVjdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIHdpbiA9IG9iamVjdC5jb250ZW50RG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gICAgICAgIHdpbi5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmbik7XG4gICAgfTtcbiAgICBpZiAoL1RyaWRlbnQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChvYmplY3QpO1xuICAgICAgICBvYmplY3QuZGF0YSA9ICdhYm91dDpibGFuayc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBvYmplY3QuZGF0YSA9ICdhYm91dDpibGFuayc7XG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQob2JqZWN0KTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2FuY2VsOiAoKSA9PiB7XG4gICAgICAgICAgICB3aW4gJiYgd2luLnJlbW92ZUV2ZW50TGlzdGVuZXIgJiYgd2luLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZuKTtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQob2JqZWN0KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiB0b2dnbGVfY2xhc3MoZWxlbWVudCwgbmFtZSwgdG9nZ2xlKSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3RbdG9nZ2xlID8gJ2FkZCcgOiAncmVtb3ZlJ10obmFtZSk7XG59XG5mdW5jdGlvbiBjdXN0b21fZXZlbnQodHlwZSwgZGV0YWlsKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSwgZGV0YWlsKTtcbiAgICByZXR1cm4gZTtcbn1cbmNsYXNzIEh0bWxUYWcge1xuICAgIGNvbnN0cnVjdG9yKGh0bWwsIGFuY2hvciA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5lID0gZWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuYSA9IGFuY2hvcjtcbiAgICAgICAgdGhpcy51KGh0bWwpO1xuICAgIH1cbiAgICBtKHRhcmdldCwgYW5jaG9yID0gbnVsbCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubi5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaW5zZXJ0KHRhcmdldCwgdGhpcy5uW2ldLCBhbmNob3IpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudCA9IHRhcmdldDtcbiAgICB9XG4gICAgdShodG1sKSB7XG4gICAgICAgIHRoaXMuZS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICB0aGlzLm4gPSBBcnJheS5mcm9tKHRoaXMuZS5jaGlsZE5vZGVzKTtcbiAgICB9XG4gICAgcChodG1sKSB7XG4gICAgICAgIHRoaXMuZCgpO1xuICAgICAgICB0aGlzLnUoaHRtbCk7XG4gICAgICAgIHRoaXMubSh0aGlzLnQsIHRoaXMuYSk7XG4gICAgfVxuICAgIGQoKSB7XG4gICAgICAgIHRoaXMubi5mb3JFYWNoKGRldGFjaCk7XG4gICAgfVxufVxuXG5sZXQgc3R5bGVzaGVldDtcbmxldCBhY3RpdmUgPSAwO1xubGV0IGN1cnJlbnRfcnVsZXMgPSB7fTtcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXJrc2t5YXBwL3N0cmluZy1oYXNoL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG5mdW5jdGlvbiBoYXNoKHN0cikge1xuICAgIGxldCBoYXNoID0gNTM4MTtcbiAgICBsZXQgaSA9IHN0ci5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSlcbiAgICAgICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpIF4gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGhhc2ggPj4+IDA7XG59XG5mdW5jdGlvbiBjcmVhdGVfcnVsZShub2RlLCBhLCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2UsIGZuLCB1aWQgPSAwKSB7XG4gICAgY29uc3Qgc3RlcCA9IDE2LjY2NiAvIGR1cmF0aW9uO1xuICAgIGxldCBrZXlmcmFtZXMgPSAne1xcbic7XG4gICAgZm9yIChsZXQgcCA9IDA7IHAgPD0gMTsgcCArPSBzdGVwKSB7XG4gICAgICAgIGNvbnN0IHQgPSBhICsgKGIgLSBhKSAqIGVhc2UocCk7XG4gICAgICAgIGtleWZyYW1lcyArPSBwICogMTAwICsgYCV7JHtmbih0LCAxIC0gdCl9fVxcbmA7XG4gICAgfVxuICAgIGNvbnN0IHJ1bGUgPSBrZXlmcmFtZXMgKyBgMTAwJSB7JHtmbihiLCAxIC0gYil9fVxcbn1gO1xuICAgIGNvbnN0IG5hbWUgPSBgX19zdmVsdGVfJHtoYXNoKHJ1bGUpfV8ke3VpZH1gO1xuICAgIGlmICghY3VycmVudF9ydWxlc1tuYW1lXSkge1xuICAgICAgICBpZiAoIXN0eWxlc2hlZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gZWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgICAgICAgICAgc3R5bGVzaGVldCA9IHN0eWxlLnNoZWV0O1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRfcnVsZXNbbmFtZV0gPSB0cnVlO1xuICAgICAgICBzdHlsZXNoZWV0Lmluc2VydFJ1bGUoYEBrZXlmcmFtZXMgJHtuYW1lfSAke3J1bGV9YCwgc3R5bGVzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xuICAgIH1cbiAgICBjb25zdCBhbmltYXRpb24gPSBub2RlLnN0eWxlLmFuaW1hdGlvbiB8fCAnJztcbiAgICBub2RlLnN0eWxlLmFuaW1hdGlvbiA9IGAke2FuaW1hdGlvbiA/IGAke2FuaW1hdGlvbn0sIGAgOiBgYH0ke25hbWV9ICR7ZHVyYXRpb259bXMgbGluZWFyICR7ZGVsYXl9bXMgMSBib3RoYDtcbiAgICBhY3RpdmUgKz0gMTtcbiAgICByZXR1cm4gbmFtZTtcbn1cbmZ1bmN0aW9uIGRlbGV0ZV9ydWxlKG5vZGUsIG5hbWUpIHtcbiAgICBub2RlLnN0eWxlLmFuaW1hdGlvbiA9IChub2RlLnN0eWxlLmFuaW1hdGlvbiB8fCAnJylcbiAgICAgICAgLnNwbGl0KCcsICcpXG4gICAgICAgIC5maWx0ZXIobmFtZVxuICAgICAgICA/IGFuaW0gPT4gYW5pbS5pbmRleE9mKG5hbWUpIDwgMCAvLyByZW1vdmUgc3BlY2lmaWMgYW5pbWF0aW9uXG4gICAgICAgIDogYW5pbSA9PiBhbmltLmluZGV4T2YoJ19fc3ZlbHRlJykgPT09IC0xIC8vIHJlbW92ZSBhbGwgU3ZlbHRlIGFuaW1hdGlvbnNcbiAgICApXG4gICAgICAgIC5qb2luKCcsICcpO1xuICAgIGlmIChuYW1lICYmICEtLWFjdGl2ZSlcbiAgICAgICAgY2xlYXJfcnVsZXMoKTtcbn1cbmZ1bmN0aW9uIGNsZWFyX3J1bGVzKCkge1xuICAgIHJhZigoKSA9PiB7XG4gICAgICAgIGlmIChhY3RpdmUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxldCBpID0gc3R5bGVzaGVldC5jc3NSdWxlcy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pXG4gICAgICAgICAgICBzdHlsZXNoZWV0LmRlbGV0ZVJ1bGUoaSk7XG4gICAgICAgIGN1cnJlbnRfcnVsZXMgPSB7fTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlX2FuaW1hdGlvbihub2RlLCBmcm9tLCBmbiwgcGFyYW1zKSB7XG4gICAgaWYgKCFmcm9tKVxuICAgICAgICByZXR1cm4gbm9vcDtcbiAgICBjb25zdCB0byA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKGZyb20ubGVmdCA9PT0gdG8ubGVmdCAmJiBmcm9tLnJpZ2h0ID09PSB0by5yaWdodCAmJiBmcm9tLnRvcCA9PT0gdG8udG9wICYmIGZyb20uYm90dG9tID09PSB0by5ib3R0b20pXG4gICAgICAgIHJldHVybiBub29wO1xuICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIFxuICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogc2hvdWxkIHRoaXMgYmUgc2VwYXJhdGVkIGZyb20gZGVzdHJ1Y3R1cmluZz8gT3Igc3RhcnQvZW5kIGFkZGVkIHRvIHB1YmxpYyBhcGkgYW5kIGRvY3VtZW50YXRpb24/XG4gICAgc3RhcnQ6IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5LCBcbiAgICAvLyBAdHMtaWdub3JlIHRvZG86XG4gICAgZW5kID0gc3RhcnRfdGltZSArIGR1cmF0aW9uLCB0aWNrID0gbm9vcCwgY3NzIH0gPSBmbihub2RlLCB7IGZyb20sIHRvIH0sIHBhcmFtcyk7XG4gICAgbGV0IHJ1bm5pbmcgPSB0cnVlO1xuICAgIGxldCBzdGFydGVkID0gZmFsc2U7XG4gICAgbGV0IG5hbWU7XG4gICAgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgIG5hbWUgPSBjcmVhdGVfcnVsZShub2RlLCAwLCAxLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRlbGF5KSB7XG4gICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICBpZiAoY3NzKVxuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgbmFtZSk7XG4gICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgbG9vcChub3cgPT4ge1xuICAgICAgICBpZiAoIXN0YXJ0ZWQgJiYgbm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydGVkICYmIG5vdyA+PSBlbmQpIHtcbiAgICAgICAgICAgIHRpY2soMSwgMCk7XG4gICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFydW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBub3cgLSBzdGFydF90aW1lO1xuICAgICAgICAgICAgY29uc3QgdCA9IDAgKyAxICogZWFzaW5nKHAgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgICBzdGFydCgpO1xuICAgIHRpY2soMCwgMSk7XG4gICAgcmV0dXJuIHN0b3A7XG59XG5mdW5jdGlvbiBmaXhfcG9zaXRpb24obm9kZSkge1xuICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICBpZiAoc3R5bGUucG9zaXRpb24gIT09ICdhYnNvbHV0ZScgJiYgc3R5bGUucG9zaXRpb24gIT09ICdmaXhlZCcpIHtcbiAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBzdHlsZTtcbiAgICAgICAgY29uc3QgYSA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIG5vZGUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBub2RlLnN0eWxlLndpZHRoID0gd2lkdGg7XG4gICAgICAgIG5vZGUuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBhZGRfdHJhbnNmb3JtKG5vZGUsIGEpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFkZF90cmFuc2Zvcm0obm9kZSwgYSkge1xuICAgIGNvbnN0IGIgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChhLmxlZnQgIT09IGIubGVmdCB8fCBhLnRvcCAhPT0gYi50b3ApIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogc3R5bGUudHJhbnNmb3JtO1xuICAgICAgICBub2RlLnN0eWxlLnRyYW5zZm9ybSA9IGAke3RyYW5zZm9ybX0gdHJhbnNsYXRlKCR7YS5sZWZ0IC0gYi5sZWZ0fXB4LCAke2EudG9wIC0gYi50b3B9cHgpYDtcbiAgICB9XG59XG5cbmxldCBjdXJyZW50X2NvbXBvbmVudDtcbmZ1bmN0aW9uIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICBjdXJyZW50X2NvbXBvbmVudCA9IGNvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGdldF9jdXJyZW50X2NvbXBvbmVudCgpIHtcbiAgICBpZiAoIWN1cnJlbnRfY29tcG9uZW50KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZ1bmN0aW9uIGNhbGxlZCBvdXRzaWRlIGNvbXBvbmVudCBpbml0aWFsaXphdGlvbmApO1xuICAgIHJldHVybiBjdXJyZW50X2NvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGJlZm9yZVVwZGF0ZShmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmJlZm9yZV91cGRhdGUucHVzaChmbik7XG59XG5mdW5jdGlvbiBvbk1vdW50KGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQub25fbW91bnQucHVzaChmbik7XG59XG5mdW5jdGlvbiBhZnRlclVwZGF0ZShmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmFmdGVyX3VwZGF0ZS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIG9uRGVzdHJveShmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLm9uX2Rlc3Ryb3kucHVzaChmbik7XG59XG5mdW5jdGlvbiBjcmVhdGVFdmVudERpc3BhdGNoZXIoKSB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XG4gICAgcmV0dXJuICh0eXBlLCBkZXRhaWwpID0+IHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gY29tcG9uZW50LiQkLmNhbGxiYWNrc1t0eXBlXTtcbiAgICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICAgICAgLy8gVE9ETyBhcmUgdGhlcmUgc2l0dWF0aW9ucyB3aGVyZSBldmVudHMgY291bGQgYmUgZGlzcGF0Y2hlZFxuICAgICAgICAgICAgLy8gaW4gYSBzZXJ2ZXIgKG5vbi1ET00pIGVudmlyb25tZW50P1xuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBjdXN0b21fZXZlbnQodHlwZSwgZGV0YWlsKTtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5zbGljZSgpLmZvckVhY2goZm4gPT4ge1xuICAgICAgICAgICAgICAgIGZuLmNhbGwoY29tcG9uZW50LCBldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBzZXRDb250ZXh0KGtleSwgY29udGV4dCkge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuc2V0KGtleSwgY29udGV4dCk7XG59XG5mdW5jdGlvbiBnZXRDb250ZXh0KGtleSkge1xuICAgIHJldHVybiBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LmdldChrZXkpO1xufVxuLy8gVE9ETyBmaWd1cmUgb3V0IGlmIHdlIHN0aWxsIHdhbnQgdG8gc3VwcG9ydFxuLy8gc2hvcnRoYW5kIGV2ZW50cywgb3IgaWYgd2Ugd2FudCB0byBpbXBsZW1lbnRcbi8vIGEgcmVhbCBidWJibGluZyBtZWNoYW5pc21cbmZ1bmN0aW9uIGJ1YmJsZShjb21wb25lbnQsIGV2ZW50KSB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gY29tcG9uZW50LiQkLmNhbGxiYWNrc1tldmVudC50eXBlXTtcbiAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgIGNhbGxiYWNrcy5zbGljZSgpLmZvckVhY2goZm4gPT4gZm4oZXZlbnQpKTtcbiAgICB9XG59XG5cbmNvbnN0IGRpcnR5X2NvbXBvbmVudHMgPSBbXTtcbmNvbnN0IGludHJvcyA9IHsgZW5hYmxlZDogZmFsc2UgfTtcbmNvbnN0IGJpbmRpbmdfY2FsbGJhY2tzID0gW107XG5jb25zdCByZW5kZXJfY2FsbGJhY2tzID0gW107XG5jb25zdCBmbHVzaF9jYWxsYmFja3MgPSBbXTtcbmNvbnN0IHJlc29sdmVkX3Byb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbmxldCB1cGRhdGVfc2NoZWR1bGVkID0gZmFsc2U7XG5mdW5jdGlvbiBzY2hlZHVsZV91cGRhdGUoKSB7XG4gICAgaWYgKCF1cGRhdGVfc2NoZWR1bGVkKSB7XG4gICAgICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICByZXNvbHZlZF9wcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRpY2soKSB7XG4gICAgc2NoZWR1bGVfdXBkYXRlKCk7XG4gICAgcmV0dXJuIHJlc29sdmVkX3Byb21pc2U7XG59XG5mdW5jdGlvbiBhZGRfcmVuZGVyX2NhbGxiYWNrKGZuKSB7XG4gICAgcmVuZGVyX2NhbGxiYWNrcy5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGFkZF9mbHVzaF9jYWxsYmFjayhmbikge1xuICAgIGZsdXNoX2NhbGxiYWNrcy5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIGNvbnN0IHNlZW5fY2FsbGJhY2tzID0gbmV3IFNldCgpO1xuICAgIGRvIHtcbiAgICAgICAgLy8gZmlyc3QsIGNhbGwgYmVmb3JlVXBkYXRlIGZ1bmN0aW9uc1xuICAgICAgICAvLyBhbmQgdXBkYXRlIGNvbXBvbmVudHNcbiAgICAgICAgd2hpbGUgKGRpcnR5X2NvbXBvbmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBkaXJ0eV9jb21wb25lbnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShjb21wb25lbnQuJCQpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChiaW5kaW5nX2NhbGxiYWNrcy5sZW5ndGgpXG4gICAgICAgICAgICBiaW5kaW5nX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgICAgICAvLyB0aGVuLCBvbmNlIGNvbXBvbmVudHMgYXJlIHVwZGF0ZWQsIGNhbGxcbiAgICAgICAgLy8gYWZ0ZXJVcGRhdGUgZnVuY3Rpb25zLiBUaGlzIG1heSBjYXVzZVxuICAgICAgICAvLyBzdWJzZXF1ZW50IHVwZGF0ZXMuLi5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJfY2FsbGJhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IHJlbmRlcl9jYWxsYmFja3NbaV07XG4gICAgICAgICAgICBpZiAoIXNlZW5fY2FsbGJhY2tzLmhhcyhjYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIC8vIC4uLnNvIGd1YXJkIGFnYWluc3QgaW5maW5pdGUgbG9vcHNcbiAgICAgICAgICAgICAgICBzZWVuX2NhbGxiYWNrcy5hZGQoY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlbmRlcl9jYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICB9IHdoaWxlIChkaXJ0eV9jb21wb25lbnRzLmxlbmd0aCk7XG4gICAgd2hpbGUgKGZsdXNoX2NhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgZmx1c2hfY2FsbGJhY2tzLnBvcCgpKCk7XG4gICAgfVxuICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZSgkJCkge1xuICAgIGlmICgkJC5mcmFnbWVudCkge1xuICAgICAgICAkJC51cGRhdGUoJCQuZGlydHkpO1xuICAgICAgICBydW5fYWxsKCQkLmJlZm9yZV91cGRhdGUpO1xuICAgICAgICAkJC5mcmFnbWVudC5wKCQkLmRpcnR5LCAkJC5jdHgpO1xuICAgICAgICAkJC5kaXJ0eSA9IG51bGw7XG4gICAgICAgICQkLmFmdGVyX3VwZGF0ZS5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xuICAgIH1cbn1cblxubGV0IHByb21pc2U7XG5mdW5jdGlvbiB3YWl0KCkge1xuICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9taXNlO1xufVxuZnVuY3Rpb24gZGlzcGF0Y2gobm9kZSwgZGlyZWN0aW9uLCBraW5kKSB7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGN1c3RvbV9ldmVudChgJHtkaXJlY3Rpb24gPyAnaW50cm8nIDogJ291dHJvJ30ke2tpbmR9YCkpO1xufVxuY29uc3Qgb3V0cm9pbmcgPSBuZXcgU2V0KCk7XG5sZXQgb3V0cm9zO1xuZnVuY3Rpb24gZ3JvdXBfb3V0cm9zKCkge1xuICAgIG91dHJvcyA9IHtcbiAgICAgICAgcjogMCxcbiAgICAgICAgYzogW10sXG4gICAgICAgIHA6IG91dHJvcyAvLyBwYXJlbnQgZ3JvdXBcbiAgICB9O1xufVxuZnVuY3Rpb24gY2hlY2tfb3V0cm9zKCkge1xuICAgIGlmICghb3V0cm9zLnIpIHtcbiAgICAgICAgcnVuX2FsbChvdXRyb3MuYyk7XG4gICAgfVxuICAgIG91dHJvcyA9IG91dHJvcy5wO1xufVxuZnVuY3Rpb24gdHJhbnNpdGlvbl9pbihibG9jaywgbG9jYWwpIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2suaSkge1xuICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICBibG9jay5pKGxvY2FsKTtcbiAgICB9XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uX291dChibG9jaywgbG9jYWwsIGRldGFjaCwgY2FsbGJhY2spIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2subykge1xuICAgICAgICBpZiAob3V0cm9pbmcuaGFzKGJsb2NrKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgb3V0cm9pbmcuYWRkKGJsb2NrKTtcbiAgICAgICAgb3V0cm9zLmMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRldGFjaClcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suZCgxKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYmxvY2subyhsb2NhbCk7XG4gICAgfVxufVxuY29uc3QgbnVsbF90cmFuc2l0aW9uID0geyBkdXJhdGlvbjogMCB9O1xuZnVuY3Rpb24gY3JlYXRlX2luX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gZmFsc2U7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xuICAgIGxldCB0YXNrO1xuICAgIGxldCB1aWQgPSAwO1xuICAgIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ28oKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDAsIDEsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MsIHVpZCsrKTtcbiAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXk7XG4gICAgICAgIGNvbnN0IGVuZF90aW1lID0gc3RhcnRfdGltZSArIGR1cmF0aW9uO1xuICAgICAgICBpZiAodGFzaylcbiAgICAgICAgICAgIHRhc2suYWJvcnQoKTtcbiAgICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gobm9kZSwgdHJ1ZSwgJ3N0YXJ0JykpO1xuICAgICAgICB0YXNrID0gbG9vcChub3cgPT4ge1xuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAobm93ID49IGVuZF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHRydWUsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGVhc2luZygobm93IC0gc3RhcnRfdGltZSkgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbGV0IHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydCgpIHtcbiAgICAgICAgICAgIGlmIChzdGFydGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUpO1xuICAgICAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbihnbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbnZhbGlkYXRlKCkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBlbmQoKSB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlX291dF90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMpIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IHRydWU7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xuICAgIGNvbnN0IGdyb3VwID0gb3V0cm9zO1xuICAgIGdyb3VwLnIgKz0gMTtcbiAgICBmdW5jdGlvbiBnbygpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMSwgMCwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgIGNvbnN0IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5O1xuICAgICAgICBjb25zdCBlbmRfdGltZSA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbjtcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCBmYWxzZSwgJ3N0YXJ0JykpO1xuICAgICAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gZW5kX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgZmFsc2UsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEtLWdyb3VwLnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgd2lsbCByZXN1bHQgaW4gYGVuZCgpYCBiZWluZyBjYWxsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzbyB3ZSBkb24ndCBuZWVkIHRvIGNsZWFuIHVwIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bl9hbGwoZ3JvdXAuYyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGVhc2luZygobm93IC0gc3RhcnRfdGltZSkgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMSAtIHQsIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgd2FpdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICBnbygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdvKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGVuZChyZXNldCkge1xuICAgICAgICAgICAgaWYgKHJlc2V0ICYmIGNvbmZpZy50aWNrKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLnRpY2soMSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgYW5pbWF0aW9uX25hbWUpO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVfYmlkaXJlY3Rpb25hbF90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMsIGludHJvKSB7XG4gICAgbGV0IGNvbmZpZyA9IGZuKG5vZGUsIHBhcmFtcyk7XG4gICAgbGV0IHQgPSBpbnRybyA/IDAgOiAxO1xuICAgIGxldCBydW5uaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgIGxldCBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgIGxldCBhbmltYXRpb25fbmFtZSA9IG51bGw7XG4gICAgZnVuY3Rpb24gY2xlYXJfYW5pbWF0aW9uKCkge1xuICAgICAgICBpZiAoYW5pbWF0aW9uX25hbWUpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXQocHJvZ3JhbSwgZHVyYXRpb24pIHtcbiAgICAgICAgY29uc3QgZCA9IHByb2dyYW0uYiAtIHQ7XG4gICAgICAgIGR1cmF0aW9uICo9IE1hdGguYWJzKGQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYTogdCxcbiAgICAgICAgICAgIGI6IHByb2dyYW0uYixcbiAgICAgICAgICAgIGQsXG4gICAgICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgICAgIHN0YXJ0OiBwcm9ncmFtLnN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBwcm9ncmFtLnN0YXJ0ICsgZHVyYXRpb24sXG4gICAgICAgICAgICBncm91cDogcHJvZ3JhbS5ncm91cFxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBnbyhiKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGNvbnN0IHByb2dyYW0gPSB7XG4gICAgICAgICAgICBzdGFydDogbm93KCkgKyBkZWxheSxcbiAgICAgICAgICAgIGJcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFiKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgcHJvZ3JhbS5ncm91cCA9IG91dHJvcztcbiAgICAgICAgICAgIG91dHJvcy5yICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJ1bm5pbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgcGVuZGluZ19wcm9ncmFtID0gcHJvZ3JhbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYW4gaW50cm8sIGFuZCB0aGVyZSdzIGEgZGVsYXksIHdlIG5lZWQgdG8gZG9cbiAgICAgICAgICAgIC8vIGFuIGluaXRpYWwgdGljayBhbmQvb3IgYXBwbHkgQ1NTIGFuaW1hdGlvbiBpbW1lZGlhdGVseVxuICAgICAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgdCwgYiwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYilcbiAgICAgICAgICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gaW5pdChwcm9ncmFtLCBkdXJhdGlvbik7XG4gICAgICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIGIsICdzdGFydCcpKTtcbiAgICAgICAgICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ19wcm9ncmFtICYmIG5vdyA+IHBlbmRpbmdfcHJvZ3JhbS5zdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBpbml0KHBlbmRpbmdfcHJvZ3JhbSwgZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBydW5uaW5nX3Byb2dyYW0uYiwgJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCB0LCBydW5uaW5nX3Byb2dyYW0uYiwgcnVubmluZ19wcm9ncmFtLmR1cmF0aW9uLCAwLCBlYXNpbmcsIGNvbmZpZy5jc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBydW5uaW5nX3Byb2dyYW0uZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrKHQgPSBydW5uaW5nX3Byb2dyYW0uYiwgMSAtIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgcnVubmluZ19wcm9ncmFtLmIsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGVuZGluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UncmUgZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0uYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnRybyDigJQgd2UgY2FuIHRpZHkgdXAgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvdXRybyDigJQgbmVlZHMgdG8gYmUgY29vcmRpbmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEtLXJ1bm5pbmdfcHJvZ3JhbS5ncm91cC5yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuX2FsbChydW5uaW5nX3Byb2dyYW0uZ3JvdXAuYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChub3cgPj0gcnVubmluZ19wcm9ncmFtLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gbm93IC0gcnVubmluZ19wcm9ncmFtLnN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdCA9IHJ1bm5pbmdfcHJvZ3JhbS5hICsgcnVubmluZ19wcm9ncmFtLmQgKiBlYXNpbmcocCAvIHJ1bm5pbmdfcHJvZ3JhbS5kdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gISEocnVubmluZ19wcm9ncmFtIHx8IHBlbmRpbmdfcHJvZ3JhbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBydW4oYikge1xuICAgICAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICAgICAgICAgIGdvKGIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ28oYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9wcm9taXNlKHByb21pc2UsIGluZm8pIHtcbiAgICBjb25zdCB0b2tlbiA9IGluZm8udG9rZW4gPSB7fTtcbiAgICBmdW5jdGlvbiB1cGRhdGUodHlwZSwgaW5kZXgsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGluZm8udG9rZW4gIT09IHRva2VuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpbmZvLnJlc29sdmVkID0ga2V5ICYmIHsgW2tleV06IHZhbHVlIH07XG4gICAgICAgIGNvbnN0IGNoaWxkX2N0eCA9IGFzc2lnbihhc3NpZ24oe30sIGluZm8uY3R4KSwgaW5mby5yZXNvbHZlZCk7XG4gICAgICAgIGNvbnN0IGJsb2NrID0gdHlwZSAmJiAoaW5mby5jdXJyZW50ID0gdHlwZSkoY2hpbGRfY3R4KTtcbiAgICAgICAgaWYgKGluZm8uYmxvY2spIHtcbiAgICAgICAgICAgIGlmIChpbmZvLmJsb2Nrcykge1xuICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzLmZvckVhY2goKGJsb2NrLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSBpbmRleCAmJiBibG9jaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBfb3V0cm9zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzW2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tfb3V0cm9zKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluZm8uYmxvY2suZCgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJsb2NrLmMoKTtcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oYmxvY2ssIDEpO1xuICAgICAgICAgICAgYmxvY2subShpbmZvLm1vdW50KCksIGluZm8uYW5jaG9yKTtcbiAgICAgICAgICAgIGZsdXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgaW5mby5ibG9jayA9IGJsb2NrO1xuICAgICAgICBpZiAoaW5mby5ibG9ja3MpXG4gICAgICAgICAgICBpbmZvLmJsb2Nrc1tpbmRleF0gPSBibG9jaztcbiAgICB9XG4gICAgaWYgKGlzX3Byb21pc2UocHJvbWlzZSkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudF9jb21wb25lbnQgPSBnZXRfY3VycmVudF9jb21wb25lbnQoKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjdXJyZW50X2NvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby50aGVuLCAxLCBpbmZvLnZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjdXJyZW50X2NvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby5jYXRjaCwgMiwgaW5mby5lcnJvciwgZXJyb3IpO1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gaWYgd2UgcHJldmlvdXNseSBoYWQgYSB0aGVuL2NhdGNoIGJsb2NrLCBkZXN0cm95IGl0XG4gICAgICAgIGlmIChpbmZvLmN1cnJlbnQgIT09IGluZm8ucGVuZGluZykge1xuICAgICAgICAgICAgdXBkYXRlKGluZm8ucGVuZGluZywgMCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKGluZm8uY3VycmVudCAhPT0gaW5mby50aGVuKSB7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby50aGVuLCAxLCBpbmZvLnZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGluZm8ucmVzb2x2ZWQgPSB7IFtpbmZvLnZhbHVlXTogcHJvbWlzZSB9O1xuICAgIH1cbn1cblxuY29uc3QgZ2xvYmFscyA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbCk7XG5cbmZ1bmN0aW9uIGRlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmQoMSk7XG4gICAgbG9va3VwLmRlbGV0ZShibG9jay5rZXkpO1xufVxuZnVuY3Rpb24gb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIHRyYW5zaXRpb25fb3V0KGJsb2NrLCAxLCAxLCAoKSA9PiB7XG4gICAgICAgIGxvb2t1cC5kZWxldGUoYmxvY2sua2V5KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZpeF9hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZigpO1xuICAgIGRlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCk7XG59XG5mdW5jdGlvbiBmaXhfYW5kX291dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5mKCk7XG4gICAgb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCk7XG59XG5mdW5jdGlvbiB1cGRhdGVfa2V5ZWRfZWFjaChvbGRfYmxvY2tzLCBjaGFuZ2VkLCBnZXRfa2V5LCBkeW5hbWljLCBjdHgsIGxpc3QsIGxvb2t1cCwgbm9kZSwgZGVzdHJveSwgY3JlYXRlX2VhY2hfYmxvY2ssIG5leHQsIGdldF9jb250ZXh0KSB7XG4gICAgbGV0IG8gPSBvbGRfYmxvY2tzLmxlbmd0aDtcbiAgICBsZXQgbiA9IGxpc3QubGVuZ3RoO1xuICAgIGxldCBpID0gbztcbiAgICBjb25zdCBvbGRfaW5kZXhlcyA9IHt9O1xuICAgIHdoaWxlIChpLS0pXG4gICAgICAgIG9sZF9pbmRleGVzW29sZF9ibG9ja3NbaV0ua2V5XSA9IGk7XG4gICAgY29uc3QgbmV3X2Jsb2NrcyA9IFtdO1xuICAgIGNvbnN0IG5ld19sb29rdXAgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgZGVsdGFzID0gbmV3IE1hcCgpO1xuICAgIGkgPSBuO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29uc3QgY2hpbGRfY3R4ID0gZ2V0X2NvbnRleHQoY3R4LCBsaXN0LCBpKTtcbiAgICAgICAgY29uc3Qga2V5ID0gZ2V0X2tleShjaGlsZF9jdHgpO1xuICAgICAgICBsZXQgYmxvY2sgPSBsb29rdXAuZ2V0KGtleSk7XG4gICAgICAgIGlmICghYmxvY2spIHtcbiAgICAgICAgICAgIGJsb2NrID0gY3JlYXRlX2VhY2hfYmxvY2soa2V5LCBjaGlsZF9jdHgpO1xuICAgICAgICAgICAgYmxvY2suYygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGR5bmFtaWMpIHtcbiAgICAgICAgICAgIGJsb2NrLnAoY2hhbmdlZCwgY2hpbGRfY3R4KTtcbiAgICAgICAgfVxuICAgICAgICBuZXdfbG9va3VwLnNldChrZXksIG5ld19ibG9ja3NbaV0gPSBibG9jayk7XG4gICAgICAgIGlmIChrZXkgaW4gb2xkX2luZGV4ZXMpXG4gICAgICAgICAgICBkZWx0YXMuc2V0KGtleSwgTWF0aC5hYnMoaSAtIG9sZF9pbmRleGVzW2tleV0pKTtcbiAgICB9XG4gICAgY29uc3Qgd2lsbF9tb3ZlID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IGRpZF9tb3ZlID0gbmV3IFNldCgpO1xuICAgIGZ1bmN0aW9uIGluc2VydChibG9jaykge1xuICAgICAgICB0cmFuc2l0aW9uX2luKGJsb2NrLCAxKTtcbiAgICAgICAgYmxvY2subShub2RlLCBuZXh0KTtcbiAgICAgICAgbG9va3VwLnNldChibG9jay5rZXksIGJsb2NrKTtcbiAgICAgICAgbmV4dCA9IGJsb2NrLmZpcnN0O1xuICAgICAgICBuLS07XG4gICAgfVxuICAgIHdoaWxlIChvICYmIG4pIHtcbiAgICAgICAgY29uc3QgbmV3X2Jsb2NrID0gbmV3X2Jsb2Nrc1tuIC0gMV07XG4gICAgICAgIGNvbnN0IG9sZF9ibG9jayA9IG9sZF9ibG9ja3NbbyAtIDFdO1xuICAgICAgICBjb25zdCBuZXdfa2V5ID0gbmV3X2Jsb2NrLmtleTtcbiAgICAgICAgY29uc3Qgb2xkX2tleSA9IG9sZF9ibG9jay5rZXk7XG4gICAgICAgIGlmIChuZXdfYmxvY2sgPT09IG9sZF9ibG9jaykge1xuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgICAgbmV4dCA9IG5ld19ibG9jay5maXJzdDtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgICAgIG4tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbmV3X2xvb2t1cC5oYXMob2xkX2tleSkpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBvbGQgYmxvY2tcbiAgICAgICAgICAgIGRlc3Ryb3kob2xkX2Jsb2NrLCBsb29rdXApO1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFsb29rdXAuaGFzKG5ld19rZXkpIHx8IHdpbGxfbW92ZS5oYXMobmV3X2tleSkpIHtcbiAgICAgICAgICAgIGluc2VydChuZXdfYmxvY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRpZF9tb3ZlLmhhcyhvbGRfa2V5KSkge1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlbHRhcy5nZXQobmV3X2tleSkgPiBkZWx0YXMuZ2V0KG9sZF9rZXkpKSB7XG4gICAgICAgICAgICBkaWRfbW92ZS5hZGQobmV3X2tleSk7XG4gICAgICAgICAgICBpbnNlcnQobmV3X2Jsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdpbGxfbW92ZS5hZGQob2xkX2tleSk7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKG8tLSkge1xuICAgICAgICBjb25zdCBvbGRfYmxvY2sgPSBvbGRfYmxvY2tzW29dO1xuICAgICAgICBpZiAoIW5ld19sb29rdXAuaGFzKG9sZF9ibG9jay5rZXkpKVxuICAgICAgICAgICAgZGVzdHJveShvbGRfYmxvY2ssIGxvb2t1cCk7XG4gICAgfVxuICAgIHdoaWxlIChuKVxuICAgICAgICBpbnNlcnQobmV3X2Jsb2Nrc1tuIC0gMV0pO1xuICAgIHJldHVybiBuZXdfYmxvY2tzO1xufVxuZnVuY3Rpb24gbWVhc3VyZShibG9ja3MpIHtcbiAgICBjb25zdCByZWN0cyA9IHt9O1xuICAgIGxldCBpID0gYmxvY2tzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICByZWN0c1tibG9ja3NbaV0ua2V5XSA9IGJsb2Nrc1tpXS5ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiByZWN0cztcbn1cblxuZnVuY3Rpb24gZ2V0X3NwcmVhZF91cGRhdGUobGV2ZWxzLCB1cGRhdGVzKSB7XG4gICAgY29uc3QgdXBkYXRlID0ge307XG4gICAgY29uc3QgdG9fbnVsbF9vdXQgPSB7fTtcbiAgICBjb25zdCBhY2NvdW50ZWRfZm9yID0geyAkJHNjb3BlOiAxIH07XG4gICAgbGV0IGkgPSBsZXZlbHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29uc3QgbyA9IGxldmVsc1tpXTtcbiAgICAgICAgY29uc3QgbiA9IHVwZGF0ZXNbaV07XG4gICAgICAgIGlmIChuKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5IGluIG4pKVxuICAgICAgICAgICAgICAgICAgICB0b19udWxsX291dFtrZXldID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFjY291bnRlZF9mb3Jba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVba2V5XSA9IG5ba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudGVkX2ZvcltrZXldID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXZlbHNbaV0gPSBuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbykge1xuICAgICAgICAgICAgICAgIGFjY291bnRlZF9mb3Jba2V5XSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9fbnVsbF9vdXQpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIHVwZGF0ZSkpXG4gICAgICAgICAgICB1cGRhdGVba2V5XSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZTtcbn1cbmZ1bmN0aW9uIGdldF9zcHJlYWRfb2JqZWN0KHNwcmVhZF9wcm9wcykge1xuICAgIHJldHVybiB0eXBlb2Ygc3ByZWFkX3Byb3BzID09PSAnb2JqZWN0JyAmJiBzcHJlYWRfcHJvcHMgIT09IG51bGwgPyBzcHJlYWRfcHJvcHMgOiB7fTtcbn1cblxuY29uc3QgaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIgPSAvW1xccydcIj4vPVxcdXtGREQwfS1cXHV7RkRFRn1cXHV7RkZGRX1cXHV7RkZGRn1cXHV7MUZGRkV9XFx1ezFGRkZGfVxcdXsyRkZGRX1cXHV7MkZGRkZ9XFx1ezNGRkZFfVxcdXszRkZGRn1cXHV7NEZGRkV9XFx1ezRGRkZGfVxcdXs1RkZGRX1cXHV7NUZGRkZ9XFx1ezZGRkZFfVxcdXs2RkZGRn1cXHV7N0ZGRkV9XFx1ezdGRkZGfVxcdXs4RkZGRX1cXHV7OEZGRkZ9XFx1ezlGRkZFfVxcdXs5RkZGRn1cXHV7QUZGRkV9XFx1e0FGRkZGfVxcdXtCRkZGRX1cXHV7QkZGRkZ9XFx1e0NGRkZFfVxcdXtDRkZGRn1cXHV7REZGRkV9XFx1e0RGRkZGfVxcdXtFRkZGRX1cXHV7RUZGRkZ9XFx1e0ZGRkZFfVxcdXtGRkZGRn1cXHV7MTBGRkZFfVxcdXsxMEZGRkZ9XS91O1xuLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjYXR0cmlidXRlcy0yXG4vLyBodHRwczovL2luZnJhLnNwZWMud2hhdHdnLm9yZy8jbm9uY2hhcmFjdGVyXG5mdW5jdGlvbiBzcHJlYWQoYXJncykge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCAuLi5hcmdzKTtcbiAgICBsZXQgc3RyID0gJyc7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgaWYgKGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyLnRlc3QobmFtZSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXR0cmlidXRlc1tuYW1lXTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHN0ciArPSBcIiBcIiArIG5hbWU7XG4gICAgICAgIGNvbnN0IGVzY2FwZWQgPSBTdHJpbmcodmFsdWUpXG4gICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJyYjMzQ7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpO1xuICAgICAgICBzdHIgKz0gXCIgXCIgKyBuYW1lICsgXCI9XCIgKyBKU09OLnN0cmluZ2lmeShlc2NhcGVkKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc3RyO1xufVxuY29uc3QgZXNjYXBlZCA9IHtcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjMzk7JyxcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0Oydcbn07XG5mdW5jdGlvbiBlc2NhcGUoaHRtbCkge1xuICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvW1wiJyY8Pl0vZywgbWF0Y2ggPT4gZXNjYXBlZFttYXRjaF0pO1xufVxuZnVuY3Rpb24gZWFjaChpdGVtcywgZm4pIHtcbiAgICBsZXQgc3RyID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBzdHIgKz0gZm4oaXRlbXNbaV0sIGkpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuY29uc3QgbWlzc2luZ19jb21wb25lbnQgPSB7XG4gICAgJCRyZW5kZXI6ICgpID0+ICcnXG59O1xuZnVuY3Rpb24gdmFsaWRhdGVfY29tcG9uZW50KGNvbXBvbmVudCwgbmFtZSkge1xuICAgIGlmICghY29tcG9uZW50IHx8ICFjb21wb25lbnQuJCRyZW5kZXIpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09ICdzdmVsdGU6Y29tcG9uZW50JylcbiAgICAgICAgICAgIG5hbWUgKz0gJyB0aGlzPXsuLi59JztcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGA8JHtuYW1lfT4gaXMgbm90IGEgdmFsaWQgU1NSIGNvbXBvbmVudC4gWW91IG1heSBuZWVkIHRvIHJldmlldyB5b3VyIGJ1aWxkIGNvbmZpZyB0byBlbnN1cmUgdGhhdCBkZXBlbmRlbmNpZXMgYXJlIGNvbXBpbGVkLCByYXRoZXIgdGhhbiBpbXBvcnRlZCBhcyBwcmUtY29tcGlsZWQgbW9kdWxlc2ApO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50O1xufVxuZnVuY3Rpb24gZGVidWcoZmlsZSwgbGluZSwgY29sdW1uLCB2YWx1ZXMpIHtcbiAgICBjb25zb2xlLmxvZyhge0BkZWJ1Z30gJHtmaWxlID8gZmlsZSArICcgJyA6ICcnfSgke2xpbmV9OiR7Y29sdW1ufSlgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2codmFsdWVzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgcmV0dXJuICcnO1xufVxubGV0IG9uX2Rlc3Ryb3k7XG5mdW5jdGlvbiBjcmVhdGVfc3NyX2NvbXBvbmVudChmbikge1xuICAgIGZ1bmN0aW9uICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIGJpbmRpbmdzLCBzbG90cykge1xuICAgICAgICBjb25zdCBwYXJlbnRfY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XG4gICAgICAgIGNvbnN0ICQkID0ge1xuICAgICAgICAgICAgb25fZGVzdHJveSxcbiAgICAgICAgICAgIGNvbnRleHQ6IG5ldyBNYXAocGFyZW50X2NvbXBvbmVudCA/IHBhcmVudF9jb21wb25lbnQuJCQuY29udGV4dCA6IFtdKSxcbiAgICAgICAgICAgIC8vIHRoZXNlIHdpbGwgYmUgaW1tZWRpYXRlbHkgZGlzY2FyZGVkXG4gICAgICAgICAgICBvbl9tb3VudDogW10sXG4gICAgICAgICAgICBiZWZvcmVfdXBkYXRlOiBbXSxcbiAgICAgICAgICAgIGFmdGVyX3VwZGF0ZTogW10sXG4gICAgICAgICAgICBjYWxsYmFja3M6IGJsYW5rX29iamVjdCgpXG4gICAgICAgIH07XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudCh7ICQkIH0pO1xuICAgICAgICBjb25zdCBodG1sID0gZm4ocmVzdWx0LCBwcm9wcywgYmluZGluZ3MsIHNsb3RzKTtcbiAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xuICAgICAgICByZXR1cm4gaHRtbDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVuZGVyOiAocHJvcHMgPSB7fSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgICAgICAgICBvbl9kZXN0cm95ID0gW107XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7IGhlYWQ6ICcnLCBjc3M6IG5ldyBTZXQoKSB9O1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9ICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgIHJ1bl9hbGwob25fZGVzdHJveSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGh0bWwsXG4gICAgICAgICAgICAgICAgY3NzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IEFycmF5LmZyb20ocmVzdWx0LmNzcykubWFwKGNzcyA9PiBjc3MuY29kZSkuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIG1hcDogbnVsbCAvLyBUT0RPXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoZWFkOiByZXN1bHQuaGVhZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgJCRyZW5kZXJcbiAgICB9O1xufVxuZnVuY3Rpb24gYWRkX2F0dHJpYnV0ZShuYW1lLCB2YWx1ZSwgYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IChib29sZWFuICYmICF2YWx1ZSkpXG4gICAgICAgIHJldHVybiAnJztcbiAgICByZXR1cm4gYCAke25hbWV9JHt2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogYD0ke3R5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBKU09OLnN0cmluZ2lmeShlc2NhcGUodmFsdWUpKSA6IGBcIiR7dmFsdWV9XCJgfWB9YDtcbn1cbmZ1bmN0aW9uIGFkZF9jbGFzc2VzKGNsYXNzZXMpIHtcbiAgICByZXR1cm4gY2xhc3NlcyA/IGAgY2xhc3M9XCIke2NsYXNzZXN9XCJgIDogYGA7XG59XG5cbmZ1bmN0aW9uIGJpbmQoY29tcG9uZW50LCBuYW1lLCBjYWxsYmFjaykge1xuICAgIGlmIChjb21wb25lbnQuJCQucHJvcHMuaW5kZXhPZihuYW1lKSA9PT0gLTEpXG4gICAgICAgIHJldHVybjtcbiAgICBjb21wb25lbnQuJCQuYm91bmRbbmFtZV0gPSBjYWxsYmFjaztcbiAgICBjYWxsYmFjayhjb21wb25lbnQuJCQuY3R4W25hbWVdKTtcbn1cbmZ1bmN0aW9uIG1vdW50X2NvbXBvbmVudChjb21wb25lbnQsIHRhcmdldCwgYW5jaG9yKSB7XG4gICAgY29uc3QgeyBmcmFnbWVudCwgb25fbW91bnQsIG9uX2Rlc3Ryb3ksIGFmdGVyX3VwZGF0ZSB9ID0gY29tcG9uZW50LiQkO1xuICAgIGZyYWdtZW50Lm0odGFyZ2V0LCBhbmNob3IpO1xuICAgIC8vIG9uTW91bnQgaGFwcGVucyBiZWZvcmUgdGhlIGluaXRpYWwgYWZ0ZXJVcGRhdGVcbiAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3X29uX2Rlc3Ryb3kgPSBvbl9tb3VudC5tYXAocnVuKS5maWx0ZXIoaXNfZnVuY3Rpb24pO1xuICAgICAgICBpZiAob25fZGVzdHJveSkge1xuICAgICAgICAgICAgb25fZGVzdHJveS5wdXNoKC4uLm5ld19vbl9kZXN0cm95KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEVkZ2UgY2FzZSAtIGNvbXBvbmVudCB3YXMgZGVzdHJveWVkIGltbWVkaWF0ZWx5LFxuICAgICAgICAgICAgLy8gbW9zdCBsaWtlbHkgYXMgYSByZXN1bHQgb2YgYSBiaW5kaW5nIGluaXRpYWxpc2luZ1xuICAgICAgICAgICAgcnVuX2FsbChuZXdfb25fZGVzdHJveSk7XG4gICAgICAgIH1cbiAgICAgICAgY29tcG9uZW50LiQkLm9uX21vdW50ID0gW107XG4gICAgfSk7XG4gICAgYWZ0ZXJfdXBkYXRlLmZvckVhY2goYWRkX3JlbmRlcl9jYWxsYmFjayk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2NvbXBvbmVudChjb21wb25lbnQsIGRldGFjaGluZykge1xuICAgIGlmIChjb21wb25lbnQuJCQuZnJhZ21lbnQpIHtcbiAgICAgICAgcnVuX2FsbChjb21wb25lbnQuJCQub25fZGVzdHJveSk7XG4gICAgICAgIGNvbXBvbmVudC4kJC5mcmFnbWVudC5kKGRldGFjaGluZyk7XG4gICAgICAgIC8vIFRPRE8gbnVsbCBvdXQgb3RoZXIgcmVmcywgaW5jbHVkaW5nIGNvbXBvbmVudC4kJCAoYnV0IG5lZWQgdG9cbiAgICAgICAgLy8gcHJlc2VydmUgZmluYWwgc3RhdGU/KVxuICAgICAgICBjb21wb25lbnQuJCQub25fZGVzdHJveSA9IGNvbXBvbmVudC4kJC5mcmFnbWVudCA9IG51bGw7XG4gICAgICAgIGNvbXBvbmVudC4kJC5jdHggPSB7fTtcbiAgICB9XG59XG5mdW5jdGlvbiBtYWtlX2RpcnR5KGNvbXBvbmVudCwga2V5KSB7XG4gICAgaWYgKCFjb21wb25lbnQuJCQuZGlydHkpIHtcbiAgICAgICAgZGlydHlfY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG4gICAgICAgIHNjaGVkdWxlX3VwZGF0ZSgpO1xuICAgICAgICBjb21wb25lbnQuJCQuZGlydHkgPSBibGFua19vYmplY3QoKTtcbiAgICB9XG4gICAgY29tcG9uZW50LiQkLmRpcnR5W2tleV0gPSB0cnVlO1xufVxuZnVuY3Rpb24gaW5pdChjb21wb25lbnQsIG9wdGlvbnMsIGluc3RhbmNlLCBjcmVhdGVfZnJhZ21lbnQsIG5vdF9lcXVhbCwgcHJvcF9uYW1lcykge1xuICAgIGNvbnN0IHBhcmVudF9jb21wb25lbnQgPSBjdXJyZW50X2NvbXBvbmVudDtcbiAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KTtcbiAgICBjb25zdCBwcm9wcyA9IG9wdGlvbnMucHJvcHMgfHwge307XG4gICAgY29uc3QgJCQgPSBjb21wb25lbnQuJCQgPSB7XG4gICAgICAgIGZyYWdtZW50OiBudWxsLFxuICAgICAgICBjdHg6IG51bGwsXG4gICAgICAgIC8vIHN0YXRlXG4gICAgICAgIHByb3BzOiBwcm9wX25hbWVzLFxuICAgICAgICB1cGRhdGU6IG5vb3AsXG4gICAgICAgIG5vdF9lcXVhbCxcbiAgICAgICAgYm91bmQ6IGJsYW5rX29iamVjdCgpLFxuICAgICAgICAvLyBsaWZlY3ljbGVcbiAgICAgICAgb25fbW91bnQ6IFtdLFxuICAgICAgICBvbl9kZXN0cm95OiBbXSxcbiAgICAgICAgYmVmb3JlX3VwZGF0ZTogW10sXG4gICAgICAgIGFmdGVyX3VwZGF0ZTogW10sXG4gICAgICAgIGNvbnRleHQ6IG5ldyBNYXAocGFyZW50X2NvbXBvbmVudCA/IHBhcmVudF9jb21wb25lbnQuJCQuY29udGV4dCA6IFtdKSxcbiAgICAgICAgLy8gZXZlcnl0aGluZyBlbHNlXG4gICAgICAgIGNhbGxiYWNrczogYmxhbmtfb2JqZWN0KCksXG4gICAgICAgIGRpcnR5OiBudWxsXG4gICAgfTtcbiAgICBsZXQgcmVhZHkgPSBmYWxzZTtcbiAgICAkJC5jdHggPSBpbnN0YW5jZVxuICAgICAgICA/IGluc3RhbmNlKGNvbXBvbmVudCwgcHJvcHMsIChrZXksIHJldCwgdmFsdWUgPSByZXQpID0+IHtcbiAgICAgICAgICAgIGlmICgkJC5jdHggJiYgbm90X2VxdWFsKCQkLmN0eFtrZXldLCAkJC5jdHhba2V5XSA9IHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICgkJC5ib3VuZFtrZXldKVxuICAgICAgICAgICAgICAgICAgICAkJC5ib3VuZFtrZXldKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAocmVhZHkpXG4gICAgICAgICAgICAgICAgICAgIG1ha2VfZGlydHkoY29tcG9uZW50LCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSlcbiAgICAgICAgOiBwcm9wcztcbiAgICAkJC51cGRhdGUoKTtcbiAgICByZWFkeSA9IHRydWU7XG4gICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcbiAgICAkJC5mcmFnbWVudCA9IGNyZWF0ZV9mcmFnbWVudCgkJC5jdHgpO1xuICAgIGlmIChvcHRpb25zLnRhcmdldCkge1xuICAgICAgICBpZiAob3B0aW9ucy5oeWRyYXRlKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgJCQuZnJhZ21lbnQubChjaGlsZHJlbihvcHRpb25zLnRhcmdldCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50LmMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5pbnRybylcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oY29tcG9uZW50LiQkLmZyYWdtZW50KTtcbiAgICAgICAgbW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgb3B0aW9ucy50YXJnZXQsIG9wdGlvbnMuYW5jaG9yKTtcbiAgICAgICAgZmx1c2goKTtcbiAgICB9XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xufVxubGV0IFN2ZWx0ZUVsZW1lbnQ7XG5pZiAodHlwZW9mIEhUTUxFbGVtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIFN2ZWx0ZUVsZW1lbnQgPSBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy4kJC5zbG90dGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBpbXByb3ZlIHR5cGluZ3NcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMuJCQuc2xvdHRlZFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0ciwgX29sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpc1thdHRyXSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgICRkZXN0cm95KCkge1xuICAgICAgICAgICAgZGVzdHJveV9jb21wb25lbnQodGhpcywgMSk7XG4gICAgICAgICAgICB0aGlzLiRkZXN0cm95ID0gbm9vcDtcbiAgICAgICAgfVxuICAgICAgICAkb24odHlwZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIC8vIFRPRE8gc2hvdWxkIHRoaXMgZGVsZWdhdGUgdG8gYWRkRXZlbnRMaXN0ZW5lcj9cbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSB8fCAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gPSBbXSkpO1xuICAgICAgICAgICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgJHNldCgpIHtcbiAgICAgICAgICAgIC8vIG92ZXJyaWRkZW4gYnkgaW5zdGFuY2UsIGlmIGl0IGhhcyBwcm9wc1xuICAgICAgICB9XG4gICAgfTtcbn1cbmNsYXNzIFN2ZWx0ZUNvbXBvbmVudCB7XG4gICAgJGRlc3Ryb3koKSB7XG4gICAgICAgIGRlc3Ryb3lfY29tcG9uZW50KHRoaXMsIDEpO1xuICAgICAgICB0aGlzLiRkZXN0cm95ID0gbm9vcDtcbiAgICB9XG4gICAgJG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSB8fCAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gPSBbXSkpO1xuICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgICRzZXQoKSB7XG4gICAgICAgIC8vIG92ZXJyaWRkZW4gYnkgaW5zdGFuY2UsIGlmIGl0IGhhcyBwcm9wc1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hfZGV2KHR5cGUsIGRldGFpbCkge1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY3VzdG9tX2V2ZW50KHR5cGUsIGRldGFpbCkpO1xufVxuZnVuY3Rpb24gYXBwZW5kX2Rldih0YXJnZXQsIG5vZGUpIHtcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01JbnNlcnRcIiwgeyB0YXJnZXQsIG5vZGUgfSk7XG4gICAgYXBwZW5kKHRhcmdldCwgbm9kZSk7XG59XG5mdW5jdGlvbiBpbnNlcnRfZGV2KHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NSW5zZXJ0XCIsIHsgdGFyZ2V0LCBub2RlLCBhbmNob3IgfSk7XG4gICAgaW5zZXJ0KHRhcmdldCwgbm9kZSwgYW5jaG9yKTtcbn1cbmZ1bmN0aW9uIGRldGFjaF9kZXYobm9kZSkge1xuICAgIGRpc3BhdGNoX2RldihcIlN2ZWx0ZURPTVJlbW92ZVwiLCB7IG5vZGUgfSk7XG4gICAgZGV0YWNoKG5vZGUpO1xufVxuZnVuY3Rpb24gZGV0YWNoX2JldHdlZW5fZGV2KGJlZm9yZSwgYWZ0ZXIpIHtcbiAgICB3aGlsZSAoYmVmb3JlLm5leHRTaWJsaW5nICYmIGJlZm9yZS5uZXh0U2libGluZyAhPT0gYWZ0ZXIpIHtcbiAgICAgICAgZGV0YWNoX2RldihiZWZvcmUubmV4dFNpYmxpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRldGFjaF9iZWZvcmVfZGV2KGFmdGVyKSB7XG4gICAgd2hpbGUgKGFmdGVyLnByZXZpb3VzU2libGluZykge1xuICAgICAgICBkZXRhY2hfZGV2KGFmdGVyLnByZXZpb3VzU2libGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGV0YWNoX2FmdGVyX2RldihiZWZvcmUpIHtcbiAgICB3aGlsZSAoYmVmb3JlLm5leHRTaWJsaW5nKSB7XG4gICAgICAgIGRldGFjaF9kZXYoYmVmb3JlLm5leHRTaWJsaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBsaXN0ZW5fZGV2KG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zLCBoYXNfcHJldmVudF9kZWZhdWx0LCBoYXNfc3RvcF9wcm9wYWdhdGlvbikge1xuICAgIGNvbnN0IG1vZGlmaWVycyA9IG9wdGlvbnMgPT09IHRydWUgPyBbXCJjYXB0dXJlXCJdIDogb3B0aW9ucyA/IEFycmF5LmZyb20oT2JqZWN0LmtleXMob3B0aW9ucykpIDogW107XG4gICAgaWYgKGhhc19wcmV2ZW50X2RlZmF1bHQpXG4gICAgICAgIG1vZGlmaWVycy5wdXNoKCdwcmV2ZW50RGVmYXVsdCcpO1xuICAgIGlmIChoYXNfc3RvcF9wcm9wYWdhdGlvbilcbiAgICAgICAgbW9kaWZpZXJzLnB1c2goJ3N0b3BQcm9wYWdhdGlvbicpO1xuICAgIGRpc3BhdGNoX2RldihcIlN2ZWx0ZURPTUFkZEV2ZW50TGlzdGVuZXJcIiwgeyBub2RlLCBldmVudCwgaGFuZGxlciwgbW9kaWZpZXJzIH0pO1xuICAgIGNvbnN0IGRpc3Bvc2UgPSBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoX2RldihcIlN2ZWx0ZURPTVJlbW92ZUV2ZW50TGlzdGVuZXJcIiwgeyBub2RlLCBldmVudCwgaGFuZGxlciwgbW9kaWZpZXJzIH0pO1xuICAgICAgICBkaXNwb3NlKCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGF0dHJfZGV2KG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBhdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01SZW1vdmVBdHRyaWJ1dGVcIiwgeyBub2RlLCBhdHRyaWJ1dGUgfSk7XG4gICAgZWxzZVxuICAgICAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01TZXRBdHRyaWJ1dGVcIiwgeyBub2RlLCBhdHRyaWJ1dGUsIHZhbHVlIH0pO1xufVxuZnVuY3Rpb24gcHJvcF9kZXYobm9kZSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgbm9kZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01TZXRQcm9wZXJ0eVwiLCB7IG5vZGUsIHByb3BlcnR5LCB2YWx1ZSB9KTtcbn1cbmZ1bmN0aW9uIGRhdGFzZXRfZGV2KG5vZGUsIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIG5vZGUuZGF0YXNldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01TZXREYXRhc2V0XCIsIHsgbm9kZSwgcHJvcGVydHksIHZhbHVlIH0pO1xufVxuZnVuY3Rpb24gc2V0X2RhdGFfZGV2KHRleHQsIGRhdGEpIHtcbiAgICBkYXRhID0gJycgKyBkYXRhO1xuICAgIGlmICh0ZXh0LmRhdGEgPT09IGRhdGEpXG4gICAgICAgIHJldHVybjtcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01TZXREYXRhXCIsIHsgbm9kZTogdGV4dCwgZGF0YSB9KTtcbiAgICB0ZXh0LmRhdGEgPSBkYXRhO1xufVxuY2xhc3MgU3ZlbHRlQ29tcG9uZW50RGV2IGV4dGVuZHMgU3ZlbHRlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucyB8fCAoIW9wdGlvbnMudGFyZ2V0ICYmICFvcHRpb25zLiQkaW5saW5lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAndGFyZ2V0JyBpcyBhIHJlcXVpcmVkIG9wdGlvbmApO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuICAgICRkZXN0cm95KCkge1xuICAgICAgICBzdXBlci4kZGVzdHJveSgpO1xuICAgICAgICB0aGlzLiRkZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBDb21wb25lbnQgd2FzIGFscmVhZHkgZGVzdHJveWVkYCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IHsgSHRtbFRhZywgU3ZlbHRlQ29tcG9uZW50LCBTdmVsdGVDb21wb25lbnREZXYsIFN2ZWx0ZUVsZW1lbnQsIGFkZF9hdHRyaWJ1dGUsIGFkZF9jbGFzc2VzLCBhZGRfZmx1c2hfY2FsbGJhY2ssIGFkZF9sb2NhdGlvbiwgYWRkX3JlbmRlcl9jYWxsYmFjaywgYWRkX3Jlc2l6ZV9saXN0ZW5lciwgYWRkX3RyYW5zZm9ybSwgYWZ0ZXJVcGRhdGUsIGFwcGVuZCwgYXBwZW5kX2RldiwgYXNzaWduLCBhdHRyLCBhdHRyX2RldiwgYmVmb3JlVXBkYXRlLCBiaW5kLCBiaW5kaW5nX2NhbGxiYWNrcywgYmxhbmtfb2JqZWN0LCBidWJibGUsIGNoZWNrX291dHJvcywgY2hpbGRyZW4sIGNsYWltX2VsZW1lbnQsIGNsYWltX3NwYWNlLCBjbGFpbV90ZXh0LCBjbGVhcl9sb29wcywgY29tcG9uZW50X3N1YnNjcmliZSwgY3JlYXRlRXZlbnREaXNwYXRjaGVyLCBjcmVhdGVfYW5pbWF0aW9uLCBjcmVhdGVfYmlkaXJlY3Rpb25hbF90cmFuc2l0aW9uLCBjcmVhdGVfaW5fdHJhbnNpdGlvbiwgY3JlYXRlX291dF90cmFuc2l0aW9uLCBjcmVhdGVfc2xvdCwgY3JlYXRlX3Nzcl9jb21wb25lbnQsIGN1cnJlbnRfY29tcG9uZW50LCBjdXN0b21fZXZlbnQsIGRhdGFzZXRfZGV2LCBkZWJ1ZywgZGVzdHJveV9ibG9jaywgZGVzdHJveV9jb21wb25lbnQsIGRlc3Ryb3lfZWFjaCwgZGV0YWNoLCBkZXRhY2hfYWZ0ZXJfZGV2LCBkZXRhY2hfYmVmb3JlX2RldiwgZGV0YWNoX2JldHdlZW5fZGV2LCBkZXRhY2hfZGV2LCBkaXJ0eV9jb21wb25lbnRzLCBkaXNwYXRjaF9kZXYsIGVhY2gsIGVsZW1lbnQsIGVsZW1lbnRfaXMsIGVtcHR5LCBlc2NhcGUsIGVzY2FwZWQsIGV4Y2x1ZGVfaW50ZXJuYWxfcHJvcHMsIGZpeF9hbmRfZGVzdHJveV9ibG9jaywgZml4X2FuZF9vdXRyb19hbmRfZGVzdHJveV9ibG9jaywgZml4X3Bvc2l0aW9uLCBmbHVzaCwgZ2V0Q29udGV4dCwgZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUsIGdldF9jdXJyZW50X2NvbXBvbmVudCwgZ2V0X3Nsb3RfY2hhbmdlcywgZ2V0X3Nsb3RfY29udGV4dCwgZ2V0X3NwcmVhZF9vYmplY3QsIGdldF9zcHJlYWRfdXBkYXRlLCBnZXRfc3RvcmVfdmFsdWUsIGdsb2JhbHMsIGdyb3VwX291dHJvcywgaGFuZGxlX3Byb21pc2UsIGlkZW50aXR5LCBpbml0LCBpbnNlcnQsIGluc2VydF9kZXYsIGludHJvcywgaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIsIGlzX2NsaWVudCwgaXNfZnVuY3Rpb24sIGlzX3Byb21pc2UsIGxpc3RlbiwgbGlzdGVuX2RldiwgbG9vcCwgbWVhc3VyZSwgbWlzc2luZ19jb21wb25lbnQsIG1vdW50X2NvbXBvbmVudCwgbm9vcCwgbm90X2VxdWFsLCBub3csIG51bGxfdG9fZW1wdHksIG9iamVjdF93aXRob3V0X3Byb3BlcnRpZXMsIG9uRGVzdHJveSwgb25Nb3VudCwgb25jZSwgb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2ssIHByZXZlbnRfZGVmYXVsdCwgcHJvcF9kZXYsIHJhZiwgcnVuLCBydW5fYWxsLCBzYWZlX25vdF9lcXVhbCwgc2NoZWR1bGVfdXBkYXRlLCBzZWxlY3RfbXVsdGlwbGVfdmFsdWUsIHNlbGVjdF9vcHRpb24sIHNlbGVjdF9vcHRpb25zLCBzZWxlY3RfdmFsdWUsIHNlbGYsIHNldENvbnRleHQsIHNldF9hdHRyaWJ1dGVzLCBzZXRfY3VycmVudF9jb21wb25lbnQsIHNldF9jdXN0b21fZWxlbWVudF9kYXRhLCBzZXRfZGF0YSwgc2V0X2RhdGFfZGV2LCBzZXRfaW5wdXRfdHlwZSwgc2V0X2lucHV0X3ZhbHVlLCBzZXRfbm93LCBzZXRfcmFmLCBzZXRfc3RvcmVfdmFsdWUsIHNldF9zdHlsZSwgc2V0X3N2Z19hdHRyaWJ1dGVzLCBzcGFjZSwgc3ByZWFkLCBzdG9wX3Byb3BhZ2F0aW9uLCBzdWJzY3JpYmUsIHN2Z19lbGVtZW50LCB0ZXh0LCB0aWNrLCB0aW1lX3Jhbmdlc190b19hcnJheSwgdG9fbnVtYmVyLCB0b2dnbGVfY2xhc3MsIHRyYW5zaXRpb25faW4sIHRyYW5zaXRpb25fb3V0LCB1cGRhdGVfa2V5ZWRfZWFjaCwgdmFsaWRhdGVfY29tcG9uZW50LCB2YWxpZGF0ZV9zdG9yZSwgeGxpbmtfYXR0ciB9O1xuIiwiPHNjcmlwdCA+XHJcbiAgICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcclxuICAgIGxldCByZXMgPSBbXTtcclxuICAgIGxldCBuYW1lU3RyaW5nID0gW107XHJcbiAgICBsZXQgY3Z2U3RyaW5nID0gW107XHJcbiAgICBsZXQgb24gPSBmYWxzZTtcclxuICAgIGxldCBudW1iZXJGb2N1cyA9IGZhbHNlO1xyXG4gICAgbGV0IG5hbWVGb2N1cyA9IGZhbHNlO1xyXG4gICAgbGV0IGRhdGVGb2N1cyA9IGZhbHNlO1xyXG4gICAgbGV0IG1vbnRoTWFzcyA9IFtcIk1NXCJdO1xyXG4gICAgbGV0IHllYXJNYXNzID0gW1wi0JPQk1wiXTtcclxuICAgIGxldCB0aGlzTnVtYmVyO1xyXG4gICAgbGV0IHRoaXNIb2xkZXI7XHJcbiAgICBsZXQgdGhpc0N2djtcclxuICAgIGxldCB0aGlzTW9udGg7XHJcbiAgICBsZXQgdGhpc1llYXI7XHJcbiAgICBsZXQgZmFrZU1hc3NOdW1iZXIgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldO1xyXG4gICAgbGV0IGZha2VNYXNzTmFtZSA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOSwgMjBdO1xyXG4gICAgbGV0IG1hc3NNb250aCA9IFtcIjAxXCIsIFwiMDJcIiwgXCIwM1wiLCBcIjA0XCIsIFwiMDVcIiwgXCIwNlwiLCBcIjA3XCIsIFwiMDhcIiwgXCIwOVwiLCBcIjEwXCIsIFwiMTFcIiwgXCIxMlwiXTtcclxuICAgIGxldCBtYXNzWWVhciA9IFsyMDE5LCAyMDIwLCAyMDIxLCAyMDIyLCAyMDIzLCAyMDI0LCAyMDI1LCAyMDI2LCAyMDI3LCAyMDI4LCAyMDI5LCAyMDMwXTtcclxuICAgIGxldCBudW1iZXJyO1xyXG5cclxuICAgIGNvbnN0IGZvcm1hdENhcmRDb2RlID0gKCkgPT4ge1xyXG4gICAgICAgbGV0IGNhcmRDb2RlID0gdGhpc051bWJlci52YWx1ZS5yZXBsYWNlKC9bXlxcZF0vZywgJycpLnN1YnN0cmluZygwLDE2KTtcclxuICAgICAgIGNhcmRDb2RlID0gY2FyZENvZGUgIT0gJycgPyBjYXJkQ29kZS5tYXRjaCgvLnsxLDR9L2cpLmpvaW4oJyAnKSA6ICcnO1xyXG4gICAgICAgdGhpc051bWJlci52YWx1ZSA9IGNhcmRDb2RlO1xyXG4gICAgICAgbnVtYmVyci52YWx1ZSA9IHRoaXNOdW1iZXIudmFsdWUuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIik7XHJcbiAgICAgICBsZXQgbWFzcyA9IGNhcmRjb2RlLnZhbHVlLnNwbGl0KCcnKTtcclxuICAgICAgIHJlcyA9IG1hc3MubWFwKChpdGVtLCBpbmRleCwgYXJyYXkpID0+IHtcclxuICAgICAgICAgICBpZihpbmRleCA+IDMgJiYgaW5kZXggPCAxNCl7XHJcbiAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSA0IHx8IGluZGV4ID09IDkgfHwgaW5kZXggPT0gMTQpe1xyXG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0gPSBcIipcIjtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICB9KTtcclxuICAgfVxyXG5cclxuICAgY29uc3QgaW5wdXROYW1lID0gKCkgPT4ge1xyXG4gICAgICAgbmFtZVN0cmluZyA9IHRoaXNIb2xkZXIudmFsdWUuc3BsaXQoXCJcIik7XHJcbiAgIH1cclxuXHJcbiAgIGNvbnN0IGN2diA9ICgpID0+IHtcclxuICAgICAgIGN2dlN0cmluZyA9IHRoaXNDdnYudmFsdWUuc3BsaXQoXCJcIik7XHJcbiAgIH1cclxuXHJcbiAgIGNvbnN0IGNoYW5nZU1vbnRoID0gKHsgdGFyZ2V0OiB7IHZhbHVlIH19KSA9PiB7XHJcbiAgXHQgbW9udGhNYXNzID0gWyAuLi5tb250aE1hc3MsIHZhbHVlIF1cclxuICAgfVxyXG5cclxuICAgJDogb2Zmc2V0ID0gbW9udGhNYXNzICYmIG1vbnRoTWFzcy5sZW5ndGggPiAxID8gb2Zmc2V0IC0gMjQgOiAwO1xyXG5cclxuICAgY29uc3QgY2hhbmdlWWVhciA9ICh7IHRhcmdldDogeyB2YWx1ZSB9fSkgPT4ge1xyXG4gICAgIHllYXJNYXNzID0gWyAuLi55ZWFyTWFzcywgdmFsdWUgXVxyXG4gICB9XHJcblxyXG4gICAkOiBvZmZzZXQyID0geWVhck1hc3MgJiYgeWVhck1hc3MubGVuZ3RoID4gMSA/IG9mZnNldDIgLSAyNCA6IDA7XHJcblxyXG4gICAgY29uc3QgYWN0aXZlID0gKCkgPT4ge29uID0gdHJ1ZX1cclxuICAgIGNvbnN0IGRlYWN0aXZlID0gKCkgPT4ge29uID0gZmFsc2U7IG51bWJlckZvY3VzID0gZmFsc2U7IG5hbWVGb2N1cyA9IGZhbHNlOyBkYXRlRm9jdXMgPSBmYWxzZX1cclxuICAgIGNvbnN0IGZvY3VzTnVtYmVyID0gKCkgPT4ge251bWJlckZvY3VzID0gdHJ1ZX1cclxuICAgIGNvbnN0IGZvY3VzTmFtZSA9ICgpID0+IHtuYW1lRm9jdXMgPSB0cnVlfVxyXG4gICAgY29uc3QgZm9jdXNEYXRlID0gKCkgPT4ge2RhdGVGb2N1cyA9IHRydWV9XHJcblxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZT5cclxuICAgIC53cmFwLWNhcmQge1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIH1cclxuICAgIC5jYXJkIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIHdpZHRoOiA0NTBweDtcclxuICAgICAgICBoZWlnaHQ6IDI3MHB4O1xyXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6ICB1cmwoL21pci1kZXRhaWxzLTAxLnBuZyksIHVybCgvY29sb3IuanBnKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBsZWZ0IDMwcHggdG9wIDMwcHgsIGNlbnRlciBjZW50ZXI7XHJcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdCwgbm8tcmVwZWF0O1xyXG4gICAgICAgIC13ZWJraXQtYmFja2dyb3VuZC1zaXplOiAxNSUsIDEwMCU7XHJcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiAxNSUsIDEwMCU7XHJcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAyMHB4Oy1tb3otYm9yZGVyLXJhZGl1czogMjBweDtib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDE3MHB4IDMwcHggMzBweDtcclxuICAgICAgICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7LW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O2JveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgZm9udC1zaXplOiAwO1xyXG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjhzIGN1YmljLWJlemllcigwLjcxLCAwLjAzLCAwLjU2LCAwLjg1KTtcclxuICAgICAgICAtbW96LXRyYW5zaXRpb246IGFsbCAwLjhzIGN1YmljLWJlemllcigwLjcxLCAwLjAzLCAwLjU2LCAwLjg1KTtcclxuICAgICAgICAtbXMtdHJhbnNpdGlvbjogYWxsIDAuOHMgY3ViaWMtYmV6aWVyKDAuNzEsIDAuMDMsIDAuNTYsIDAuODUpO1xyXG4gICAgICAgIC1vLXRyYW5zaXRpb246IGFsbCAwLjhzIGN1YmljLWJlemllcigwLjcxLCAwLjAzLCAwLjU2LCAwLjg1KTtcclxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC44cyBjdWJpYy1iZXppZXIoMC43MSwgMC4wMywgMC41NiwgMC44NSk7XHJcbiAgICAgICAgYm94LXNoYWRvdzogMCAyMHB4IDYwcHggMCByZ2JhKDE0LCA0MiwgOTAsIDAuNTUpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMjAwMHB4KSByb3RhdGVZKDBkZWcpIHJvdGF0ZVgoMGRlZykgcm90YXRlKDBkZWcpO1xyXG4gICAgICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XHJcbiAgICAgICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xyXG4gICAgICAgIG1hcmdpbjogMCBhdXRvIDMwcHg7XHJcbiAgICB9XHJcbiAgICAud3JhcC1jYXJkLWJhY2sge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgbGVmdDogMDtcclxuICAgIH1cclxuICAgIC5jYXJkLWJhY2sge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgd2lkdGg6IDQ1MHB4O1xyXG4gICAgICAgIGhlaWdodDogMjcwcHg7XHJcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogIHVybCgvY29sb3IuanBnKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xyXG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQsIG5vLXJlcGVhdDtcclxuICAgICAgICAtd2Via2l0LWJhY2tncm91bmQtc2l6ZTogMTAwJTtcclxuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XHJcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAyMHB4Oy1tb3otYm9yZGVyLXJhZGl1czogMjBweDtib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDE3MHB4IDMwcHggMzBweDtcclxuICAgICAgICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7LW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O2JveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgMCAwICMwMDA7LW1vei1ib3gtc2hhZG93OiAwIDAgMCAwICMwMDA7Ym94LXNoYWRvdzogMCAwIDAgMCAjMDAwO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMDtcclxuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICAgICAgbWFyZ2luOiAwIGF1dG8gMzBweDtcclxuICAgICAgICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xyXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMjBweCA2MHB4IDAgcmdiYSgxNCwgNDIsIDkwLCAwLjU1KTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjhzIGN1YmljLWJlemllcigwLjcxLCAwLjAzLCAwLjU2LCAwLjg1KTtcclxuICAgICAgICAtbW96LXRyYW5zaXRpb246IGFsbCAwLjhzIGN1YmljLWJlemllcigwLjcxLCAwLjAzLCAwLjU2LCAwLjg1KTtcclxuICAgICAgICAtbXMtdHJhbnNpdGlvbjogYWxsIDAuOHMgY3ViaWMtYmV6aWVyKDAuNzEsIDAuMDMsIDAuNTYsIDAuODUpO1xyXG4gICAgICAgIC1vLXRyYW5zaXRpb246IGFsbCAwLjhzIGN1YmljLWJlemllcigwLjcxLCAwLjAzLCAwLjU2LCAwLjg1KTtcclxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC44cyBjdWJpYy1iZXppZXIoMC43MSwgMC4wMywgMC41NiwgMC44NSk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDIwMDBweCkgcm90YXRlWSgtMTgwZGVnKSByb3RhdGVYKDBkZWcpIHJvdGF0ZSgwZGVnKSBzY2FsZSgtMSwgMSk7XHJcbiAgICAgICAgLW1vei10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDIwMDBweCkgcm90YXRlWSgtMTgwZGVnKSByb3RhdGVYKDBkZWcpIHJvdGF0ZSgwZGVnKSBzY2FsZSgtMSwgMSk7XHJcbiAgICAgICAgLW1zLXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMjAwMHB4KSByb3RhdGVZKC0xODBkZWcpIHJvdGF0ZVgoMGRlZykgcm90YXRlKDBkZWcpIHNjYWxlKC0xLCAxKTtcclxuICAgICAgICAtby10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDIwMDBweCkgcm90YXRlWSgtMTgwZGVnKSByb3RhdGVYKDBkZWcpIHJvdGF0ZSgwZGVnKSBzY2FsZSgtMSwgMSk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgyMDAwcHgpIHJvdGF0ZVkoLTE4MGRlZykgcm90YXRlWCgwZGVnKSByb3RhdGUoMGRlZykgc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcclxuICAgIH1cclxuICAgIC53cmFwLWNhcmQuYWN0aXZlIC5jYXJkIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwMHB4KSByb3RhdGVZKDE4MGRlZykgcm90YXRlWCgwZGVnKSByb3RhdGUoMGRlZyk7XHJcbiAgICAgICAgLW1vei10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMDBweCkgcm90YXRlWSgxODBkZWcpIHJvdGF0ZVgoMGRlZykgcm90YXRlKDBkZWcpO1xyXG4gICAgICAgIC1tcy10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMDBweCkgcm90YXRlWSgxODBkZWcpIHJvdGF0ZVgoMGRlZykgcm90YXRlKDBkZWcpO1xyXG4gICAgICAgIC1vLXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwMHB4KSByb3RhdGVZKDE4MGRlZykgcm90YXRlWCgwZGVnKSByb3RhdGUoMGRlZyk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDAwcHgpIHJvdGF0ZVkoMTgwZGVnKSByb3RhdGVYKDBkZWcpIHJvdGF0ZSgwZGVnKTtcclxuICAgIH1cclxuICAgIC53cmFwLWNhcmQuYWN0aXZlIC5jYXJkLWJhY2sge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDAwcHgpIHJvdGF0ZVkoMGRlZykgcm90YXRlWCgwZGVnKSByb3RhdGUoMGRlZykgc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIC1tb3otdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDAwcHgpIHJvdGF0ZVkoMGRlZykgcm90YXRlWCgwZGVnKSByb3RhdGUoMGRlZykgc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIC1tcy10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMDBweCkgcm90YXRlWSgwZGVnKSByb3RhdGVYKDBkZWcpIHJvdGF0ZSgwZGVnKSBzY2FsZSgtMSwgMSk7XHJcbiAgICAgICAgLW8tdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDAwcHgpIHJvdGF0ZVkoMGRlZykgcm90YXRlWCgwZGVnKSByb3RhdGUoMGRlZykgc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwMHB4KSByb3RhdGVZKDBkZWcpIHJvdGF0ZVgoMGRlZykgcm90YXRlKDBkZWcpIHNjYWxlKC0xLCAxKTtcclxuICAgIH1cclxuICAgIC5jYXJkLW51bWJlciB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgaGVpZ2h0OiAyNHB4O1xyXG4gICAgICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4Oy1tb3otYm9yZGVyLXJhZGl1czogNXB4O2JvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICAgICBwYWRkaW5nOiAwIDIwcHg7XHJcbiAgICAgICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94Oy1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICB9XHJcbiAgICAuY2FyZC1ob2xkZXJzIHtcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgd2lkdGg6IDI1NXB4O1xyXG4gICAgICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4Oy1tb3otYm9yZGVyLXJhZGl1czogNXB4O2JvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDstbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7Ym94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA1MHB4O1xyXG4gICAgfVxyXG4gICAgLmNhcmQtbW9udGgtd3JhcCB7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgIHdpZHRoOiAzOHB4O1xyXG4gICAgICAgIGhlaWdodDogMjVweDtcclxuICAgICAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgICAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDstbW96LWJvcmRlci1yYWRpdXM6IDVweDtib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICAgICAgcGFkZGluZzogMCA1cHg7XHJcbiAgICAgICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94Oy1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB9XHJcblxyXG4gICAgLmNhcmQtbW9udGgge1xyXG4gICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzO1xyXG4gICAgICAgIHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm07XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgYm90dG9tOiAwO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgIH1cclxuICAgIC5zbGFzaCB7XHJcbiAgICAgICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgfVxyXG4gICAgLmNhcmQteWVhci13cmFwIHtcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgd2lkdGg6IDM4cHg7XHJcbiAgICAgICAgaGVpZ2h0OiAyNXB4O1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7LW1vei1ib3JkZXItcmFkaXVzOiA1cHg7Ym9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDAgNXB4O1xyXG4gICAgICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDstbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7Ym94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIH1cclxuICAgIC5jYXJkLXllYXIge1xyXG4gICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzO1xyXG4gICAgICAgIHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm07XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgYm90dG9tOiAwO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgIH1cclxuICAgIC5kaWdpdC1pdGVtIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAxczstbW96LXRyYW5zaXRpb246IGFsbCAxczstbXMtdHJhbnNpdGlvbjogYWxsIDFzOy1vLXRyYW5zaXRpb246IGFsbCAxczt0cmFuc2l0aW9uOiBhbGwgMXM7XHJcbiAgICB9XHJcbiAgICAuZGlnaXQtaXRlbS5hY3RpdmUge31cclxuICAgIC5pbnB1dC1maWVsZCB7XHJcbiAgICAgICAgd2lkdGg6IDQ1MHB4O1xyXG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgfVxyXG4gICAgLmlucHV0LWZpZWxkIGlucHV0OmZpcnN0LWNoaWxkLFxyXG4gICAgLmlucHV0LWZpZWxkIGlucHV0Om50aC1jaGlsZCgyKSB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbiAgICAuY2FyZC1udW1iZXIgLm51bSB7XHJcbiAgICAgICAgd2lkdGg6IDE4cHg7XHJcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVweDtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4yczstbW96LXRyYW5zaXRpb246IGFsbCAwLjJzOy1tcy10cmFuc2l0aW9uOiBhbGwgMC4yczstby10cmFuc2l0aW9uOiBhbGwgMC4yczt0cmFuc2l0aW9uOiBhbGwgMC4ycztcclxuICAgICAgICBmb250LWZhbWlseTogJ0JlYmFzIE5ldWUnO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjZweDtcclxuICAgIH1cclxuICAgIC5jYXJkLW51bWJlciAubnVtLmFjdGl2ZSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMjVweCk7LW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMjVweCk7LW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yNXB4KTstby10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMjVweCk7dHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTI1cHgpO1xyXG4gICAgfVxyXG4gICAgLmNhcmQtbnVtYmVyIC5kaWdpdC1pdGVtOm50aC1jaGlsZCg2KSAubnVtLmFjdGl2ZSxcclxuICAgIC5jYXJkLW51bWJlciAuZGlnaXQtaXRlbTpudGgtY2hpbGQoNykgLm51bS5hY3RpdmUsXHJcbiAgICAuY2FyZC1udW1iZXIgLmRpZ2l0LWl0ZW06bnRoLWNoaWxkKDgpIC5udW0uYWN0aXZlLFxyXG4gICAgLmNhcmQtbnVtYmVyIC5kaWdpdC1pdGVtOm50aC1jaGlsZCg5KSAubnVtLmFjdGl2ZSxcclxuICAgIC5jYXJkLW51bWJlciAuZGlnaXQtaXRlbTpudGgtY2hpbGQoMTEpIC5udW0uYWN0aXZlLFxyXG4gICAgLmNhcmQtbnVtYmVyIC5kaWdpdC1pdGVtOm50aC1jaGlsZCgxMikgLm51bS5hY3RpdmUsXHJcbiAgICAuY2FyZC1udW1iZXIgLmRpZ2l0LWl0ZW06bnRoLWNoaWxkKDEzKSAubnVtLmFjdGl2ZSxcclxuICAgIC5jYXJkLW51bWJlciAuZGlnaXQtaXRlbTpudGgtY2hpbGQoMTQpIC5udW0uYWN0aXZlIHtcclxuICAgICAgICBsaW5lLWhlaWdodDogMjVweDtcclxuICAgIH1cclxuICAgIC5jYXJkLW51bWJlciAubnVtLm5vdC1hY3RpdmUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTI1cHgpO1xyXG4gICAgICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTI1cHgpO1xyXG4gICAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMjVweCk7XHJcbiAgICAgICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTI1cHgpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yNXB4KTtcclxuICAgIH1cclxuICAgIC5jYXJkLWhvbGRlcnMge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgaGVpZ2h0OiAyNHB4O1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA1cHg7XHJcbiAgICAgICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgfVxyXG4gICAgLmNhcmQtaG9sZGVycyAubnVtIHtcclxuICAgICAgICB3aWR0aDogMTJweDtcclxuICAgICAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICBtYXJnaW4tdG9wOiAycHg7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC41cztcclxuICAgICAgICAtbW96LXRyYW5zaXRpb246IGFsbCAwLjVzO1xyXG4gICAgICAgIC1tcy10cmFuc2l0aW9uOiBhbGwgMC41cztcclxuICAgICAgICAtby10cmFuc2l0aW9uOiBhbGwgMC41cztcclxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC41cztcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDE1cHgsIC0yNXB4KSByb3RhdGUoOTBkZWcpO1xyXG4gICAgICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTVweCwgLTI1cHgpIHJvdGF0ZSg5MGRlZyk7XHJcbiAgICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKDE1cHgsIC0yNXB4KSByb3RhdGUoOTBkZWcpO1xyXG4gICAgICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlKDE1cHgsIC0yNXB4KSByb3RhdGUoOTBkZWcpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDE1cHgsIC0yNXB4KSByb3RhdGUoOTBkZWcpO1xyXG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICAgICAgICBmb250LWZhbWlseTogJ0JlYmFzIE5ldWUnO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIH1cclxuICAgIC5jYXJkLWhvbGRlcnMgLm51bS5hY3RpdmUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTI1cHgpIHJvdGF0ZSgwZGVnKTtcclxuICAgICAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yNXB4KSByb3RhdGUoMGRlZyk7XHJcbiAgICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yNXB4KSByb3RhdGUoMGRlZyk7XHJcbiAgICAgICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTI1cHgpIHJvdGF0ZSgwZGVnKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMjVweCkgcm90YXRlKDBkZWcpO1xyXG4gICAgfVxyXG4gICAgLmNhcmQtaG9sZGVycyAubnVtLm5vdC1hY3RpdmUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTI1cHgpIHJvdGF0ZSgwZGVnKTtcclxuICAgICAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yNXB4KSByb3RhdGUoMGRlZyk7XHJcbiAgICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yNXB4KSByb3RhdGUoMGRlZyk7XHJcbiAgICAgICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTI1cHgpIHJvdGF0ZSgwZGVnKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMjVweCkgcm90YXRlKDBkZWcpO1xyXG4gICAgfVxyXG4gICAgLnBsYWNlaG9sZGVyIHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgZm9udC1mYW1pbHk6ICdCZWJhcyBOZXVlJztcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDI1cHg7XHJcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDQuNHB0O1xyXG4gICAgICAgIHRleHQtaW5kZW50OiA1cHg7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICAgIH1cclxuICAgIC5wbGFjZWhvbGRlci5hY3RpdmUge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjJzOy1tb3otdHJhbnNpdGlvbjogYWxsIDAuMnM7LW1zLXRyYW5zaXRpb246IGFsbCAwLjJzOy1vLXRyYW5zaXRpb246IGFsbCAwLjJzO3RyYW5zaXRpb246IGFsbCAwLjJzO1xyXG4gICAgfVxyXG4gICAgLnBsYWNlaG9sZGVyLm5vdC1hY3RpdmUge1xyXG4gICAgICAgIG1hcmdpbi10b3A6IC0yNXB4O1xyXG4gICAgfVxyXG4gICAgI2NhcmRjb2RlIHtcclxuICAgICAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICAgICAgcGFkZGluZzogNXB4IDE1cHg7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NlZDZlMDtcclxuICAgICAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDstbW96LWJvcmRlci1yYWRpdXM6IDVweDtib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgfVxyXG4gICAgI2NhcmRjb2RlMiB7XHJcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDVweCAxNXB4O1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjZWQ2ZTA7XHJcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7LW1vei1ib3JkZXItcmFkaXVzOiA1cHg7Ym9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIH1cclxuICAgICNjYXJkY29kZTMge1xyXG4gICAgICAgIGhlaWdodDogNTBweDtcclxuICAgICAgICBwYWRkaW5nOiA1cHggMTVweDtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2VkNmUwO1xyXG4gICAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4Oy1tb3otYm9yZGVyLXJhZGl1czogNXB4O2JvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICB9XHJcbiAgICAjY2FyZGNvZGU0IHtcclxuICAgICAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICAgICAgcGFkZGluZzogNXB4IDE1cHg7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NlZDZlMDtcclxuICAgICAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDstbW96LWJvcmRlci1yYWRpdXM6IDVweDtib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgfVxyXG4gICAgI2NhcmRjb2RlNSB7XHJcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDVweCAxNXB4O1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjZWQ2ZTA7XHJcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7LW1vei1ib3JkZXItcmFkaXVzOiA1cHg7Ym9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIH1cclxuICAgIC5jYXJkLWl0ZW0tYmFuZCB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAxOSwgMC44KTtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMzBweDtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgei1pbmRleDogMjtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgbGVmdDogMDtcclxuICAgIH1cclxuICAgIC5jYXJkLWl0ZW0tY3Z2IHtcclxuICAgICAgICB3aWR0aDogMzAwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiA0NXB4O1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xyXG4gICAgICAgIGNvbG9yOiAjMWEzYjVkO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IDEwcHggMjBweCAtN3B4IHJnYmEoMzIsIDU2LCAxMTcsIDAuMzUpO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgtMSwgMSk7XHJcbiAgICAgICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKC0xLCAxKTtcclxuICAgICAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgtMSwgMSk7XHJcbiAgICAgICAgLW8tdHJhbnNmb3JtOiBzY2FsZSgtMSwgMSk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgtMSwgMSk7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHJpZ2h0OiAzMHB4O1xyXG4gICAgICAgIHRvcDogMTAwcHg7XHJcbiAgICAgICAgbGVmdDogYXV0bztcclxuICAgIH1cclxuICAgIC5zdGFyIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDNweCk7XHJcbiAgICAgICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAzcHgpO1xyXG4gICAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAzcHgpO1xyXG4gICAgICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDNweCk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgM3B4KTtcclxuICAgIH1cclxuICAgIC50aHJlZSB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgbWF4LXdpZHRoOiBjYWxjKDMzLjMzJSAtIDNweCk7XHJcbiAgICB9XHJcbiAgICAuY3Z2LWxhYmVsIHtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgdG9wOiAxMDVweDtcclxuICAgICAgICBsZWZ0OiA0NXB4O1xyXG4gICAgICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjNweDtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgtMSwgMSk7XHJcbiAgICAgICAgLW1zLXRyYW5zZm9ybTogc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIC1vLXRyYW5zZm9ybTogc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIHRleHQtc2hhZG93OiAwcHggNHB4IDRweCAjMDAwMDAwO1xyXG4gICAgICAgIGxldHRlci1zcGFjaW5nOiAzcHQ7XHJcbiAgICB9XHJcbiAgICBidXR0b24ge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGhlaWdodDogNTVweDtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjMjM2NGQyO1xyXG4gICAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMnB4O1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCIsIHNhbnMtc2VyaWY7XHJcbiAgICAgICAgYm94LXNoYWRvdzogM3B4IDEwcHggMjBweCAwcHggcmdiYSgzNSwgMTAwLCAyMTAsIDAuMyk7XHJcbiAgICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMjBweDtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB9XHJcbiAgICAubW9udGgsXHJcbiAgICAueWVhciB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4zcztcclxuICAgICAgICAtbW96LXRyYW5zaXRpb246IGFsbCAwLjNzO1xyXG4gICAgICAgIC1tcy10cmFuc2l0aW9uOiBhbGwgMC4zcztcclxuICAgICAgICAtby10cmFuc2l0aW9uOiBhbGwgMC4zcztcclxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLm1vbnRoLnVwLFxyXG4gICAgLnllYXIudXAge1xyXG4gICAgICAgIG1hcmdpbi10b3A6IC0yNHB4ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICAuZm9jdXMge1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgbGVmdDogMDtcclxuICAgICAgICB3aWR0aDogNDUwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiAyNzBweDtcclxuICAgICAgICB6LWluZGV4OiAzO1xyXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICNmZmZmZmY7XHJcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAxNHB4Oy1tb3otYm9yZGVyLXJhZGl1czogMTRweDtib3JkZXItcmFkaXVzOiAxNHB4O1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC4zKTtcclxuICAgICAgICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7LW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O2JveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC41cztcclxuICAgICAgICAtbW96LXRyYW5zaXRpb246IGFsbCAwLjVzO1xyXG4gICAgICAgIC1tcy10cmFuc2l0aW9uOiBhbGwgMC41cztcclxuICAgICAgICAtby10cmFuc2l0aW9uOiBhbGwgMC41cztcclxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC41cztcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgfVxyXG4gICAgLmZvY3VzLmZvY3VzLW51bWJlciB7XHJcbiAgICAgICAgdG9wOiAxNjFweDtcclxuICAgICAgICBsZWZ0OiA0MXB4O1xyXG4gICAgICAgIHdpZHRoOiAzNjdweDtcclxuICAgICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgICAgei1pbmRleDogMztcclxuICAgICAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDRweDstbW96LWJvcmRlci1yYWRpdXM6IDRweDtib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICAgICAgb3BhY2l0eTogMTtcclxuICAgIH1cclxuICAgIC5mb2N1cy5mb2N1cy1uYW1lIHtcclxuICAgICAgICB0b3A6IDIwNnB4O1xyXG4gICAgICAgIGxlZnQ6IDI5cHg7XHJcbiAgICAgICAgd2lkdGg6IDI1N3B4O1xyXG4gICAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgICB6LWluZGV4OiAzO1xyXG4gICAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNHB4Oy1tb3otYm9yZGVyLXJhZGl1czogNHB4O2JvcmRlci1yYWRpdXM6IDRweDtcclxuICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgfVxyXG4gICAgLmZvY3VzLmZvY3VzLWRhdGUge1xyXG4gICAgICAgIHRvcDogMjA2cHg7XHJcbiAgICAgICAgbGVmdDogMzMwcHg7XHJcbiAgICAgICAgd2lkdGg6IDk1cHg7XHJcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICAgIHotaW5kZXg6IDM7XHJcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA0cHg7LW1vei1ib3JkZXItcmFkaXVzOiA0cHg7Ym9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICB9XHJcbiAgICAuY2FyZC1mYWtlLW51bWJlciB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHRvcDogMTYxcHg7XHJcbiAgICAgICAgbGVmdDogNDFweDtcclxuICAgICAgICB3aWR0aDogMzY3cHg7XHJcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICAgIHotaW5kZXg6IDM7XHJcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgIHotaW5kZXg6IDQ7XHJcbiAgICB9XHJcbiAgICAuY2FyZC1mYWtlLWhvbGRlciB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHRvcDogMjA2cHg7XHJcbiAgICAgICAgbGVmdDogMjlweDtcclxuICAgICAgICB3aWR0aDogMjU3cHg7XHJcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICB6LWluZGV4OiA0O1xyXG4gICAgfVxyXG4gICAgLmNhcmQtZmFrZS1tb250aCB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHRvcDogMjA2cHg7XHJcbiAgICAgICAgbGVmdDogMzMwcHg7XHJcbiAgICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICB6LWluZGV4OiA0O1xyXG4gICAgfVxyXG4gICAgLmNhcmQtZmFrZS15ZWFyIHtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgdG9wOiAyMDZweDtcclxuICAgICAgICBsZWZ0OiAzNzVweDtcclxuICAgICAgICB3aWR0aDogNDBweDtcclxuICAgICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgIHotaW5kZXg6IDQ7XHJcbiAgICB9XHJcbjwvc3R5bGU+XHJcblxyXG48ZGl2IGNsYXNzPVwid3JhcC1jYXJkIHtvbiA/ICdhY3RpdmUnIDogJyd9XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb2N1cyB7bnVtYmVyRm9jdXMgPyAnZm9jdXMtbnVtYmVyJyA6ICcnfSB7bmFtZUZvY3VzID8gJ2ZvY3VzLW5hbWUnIDogJyd9IHtkYXRlRm9jdXMgP1xyXG4gICAgICAgICdmb2N1cy1kYXRlJyA6ICcnfVwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLW51bWJlclwiPlxyXG4gICAgICAgICAgICB7I2VhY2ggZmFrZU1hc3NOdW1iZXIgYXMgc3RyaW5nLCBpfVxyXG4gICAgICAgICAgICAgICAgeyNpZiBpID09IDQgfHwgaSA9PSA5IHx8IGkgPT0gMTR9XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpZ2l0LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm51bSB7cmVzLmxlbmd0aCA+IGkgPyAnbm90LWFjdGl2ZScgOiAnJ31cIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHs6ZWxzZX1cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlnaXQtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibnVtIHtyZXMubGVuZ3RoID4gaSA/ICdub3QtYWN0aXZlJyA6ICcnfVwiPiM8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm51bSB7cmVzLmxlbmd0aCA+IGkgPyAnYWN0aXZlJyA6ICcnfVwiPntyZXNbaV0gfHwgXCJcIn08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHsvaWZ9XHJcbiAgICAgICAgICAgIHsvZWFjaH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ob2xkZXJzXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGFjZWhvbGRlciB7bmFtZVN0cmluZy5sZW5ndGggPT0gMCA/ICdhY3RpdmUnIDogJ25vdC1hY3RpdmUnfVwiPlxyXG4gICAgICAgICAgICAgICAgSVZBTiBJVkFOT1ZcclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHsjZWFjaCBmYWtlTWFzc05hbWUgYXMgc3RyaW5nLCBpfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpZ2l0LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibnVtIHtuYW1lU3RyaW5nLmxlbmd0aCA8IGkgPyAnbm90LWFjdGl2ZScgOiAnJ31cIj4gPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm51bSB7bmFtZVN0cmluZy5sZW5ndGggPiBpID8gJ2FjdGl2ZScgOiAnJ31cIj57bmFtZVN0cmluZ1tpXSB8fCBcIlwifTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHsvZWFjaH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1tb250aC13cmFwXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLW1vbnRoXCIgc3R5bGU9XCJ0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoe29mZnNldH1weClcIj5cclxuICAgICAgICAgICAgICAgIHsjZWFjaCBtb250aE1hc3MgYXMgaXRlbX1cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9udGhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW19XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7L2VhY2h9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzbGFzaFwiPi88L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC15ZWFyLXdyYXBcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQteWVhclwiIHN0eWxlPVwidHJhbnNmb3JtOiB0cmFuc2xhdGVZKHtvZmZzZXQyfXB4KVwiPlxyXG4gICAgICAgICAgICAgICAgeyNlYWNoIHllYXJNYXNzIGFzIGl0ZW19XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInllYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0uc3Vic3RyKC0yKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHsvZWFjaH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtZmFrZS1udW1iZXJcIiBvbjptb3VzZWRvd249XCJ7KGUpID0+IHtlLnByZXZlbnREZWZhdWx0KCk7dGhpc051bWJlci5mb2N1cygpO319XCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtZmFrZS1ob2xkZXJcIiBvbjptb3VzZWRvd249XCJ7KGUpID0+IHtlLnByZXZlbnREZWZhdWx0KCk7dGhpc0hvbGRlci5mb2N1cygpO319XCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtZmFrZS1tb250aFwiIG9uOm1vdXNlZG93bj1cInsoZSkgPT4ge2UucHJldmVudERlZmF1bHQoKTt0aGlzTW9udGguZm9jdXMoKTt9fVwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWZha2UteWVhclwiIG9uOm1vdXNlZG93bj1cInsoZSkgPT4ge2UucHJldmVudERlZmF1bHQoKTt0aGlzWWVhci5mb2N1cygpO319XCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWNhcmQtYmFja1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJhY2tcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaXRlbS1iYW5kXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWl0ZW0tY3Z2XCI+XHJcbiAgICAgICAgICAgICAgICB7I2VhY2ggY3Z2U3RyaW5nIGFzIGN2dkRpZ2l0fVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGFyXCI+KjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgey9lYWNofVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImN2di1sYWJlbFwiPkNWVjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuPGZvcm0gbmFtZT1cIm15Zm9ybVwiIGNsYXNzPVwiaW5wdXQtZmllbGRcIj5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiaW5wdXQtbnVtYmVyXCIgaWQ9XCJjYXJkY29kZVwiIHBsYWNlaG9sZGVyPVwi0J3QvtC80LXRgCDQutCw0YDRgtGLXCIgb246Zm9jdXM9e2ZvY3VzTnVtYmVyfVxyXG4gICAgb246Ymx1cj17ZGVhY3RpdmV9IGJpbmQ6dGhpcz17dGhpc051bWJlcn0gb246aW5wdXQ9e2Zvcm1hdENhcmRDb2RlfT5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiaW5wdXQtbmFtZVwiIGlkPVwiY2FyZGNvZGUyXCIgcGxhY2Vob2xkZXI9XCLQmNC80Y8g0KTQsNC80LjQu9C40Y9cIiBvbjpmb2N1cz17Zm9jdXNOYW1lfVxyXG4gICAgb246Ymx1cj17ZGVhY3RpdmV9IGJpbmQ6dGhpcz17dGhpc0hvbGRlcn0gb246aW5wdXQ9e2lucHV0TmFtZX0+XHJcbiAgICA8c2VsZWN0IGlkPVwiY2FyZGNvZGUzXCIgY2xhc3M9XCJ0aHJlZVwiIG9uOmZvY3VzPXtmb2N1c0RhdGV9IG9uOmJsdXI9e2RlYWN0aXZlfSBiaW5kOnRoaXM9e3RoaXNNb250aH0gb246Y2hhbmdlPXtjaGFuZ2VNb250aH0+XHJcbiAgICAgICAgPG9wdGlvbiBzZWxlY3RlZCBkaXNhYmxlZD7QnNC10YHRj9GGPC9vcHRpb24+XHJcbiAgICAgICAgeyNlYWNoIG1hc3NNb250aCBhcyBtb250aCwgaX1cclxuICAgICAgICAgICAgPG9wdGlvbj57bW9udGh9PC9vcHRpb24+XHJcbiAgICAgICAgey9lYWNofVxyXG4gICAgPC9zZWxlY3Q+XHJcbiAgICA8c2VsZWN0IGlkPVwiY2FyZGNvZGU0XCIgY2xhc3M9XCJ0aHJlZVwiIG9uOmZvY3VzPXtmb2N1c0RhdGV9IG9uOmJsdXI9e2RlYWN0aXZlfSBiaW5kOnRoaXM9e3RoaXNZZWFyfVxyXG4gICAgb246Y2hhbmdlPXtjaGFuZ2VZZWFyfT5cclxuICAgICAgICA8b3B0aW9uIHNlbGVjdGVkIGRpc2FibGVkPtCT0L7QtDwvb3B0aW9uPlxyXG4gICAgICAgIHsjZWFjaCBtYXNzWWVhciBhcyB5ZWFyfVxyXG4gICAgICAgICAgICA8b3B0aW9uPnt5ZWFyfTwvb3B0aW9uPlxyXG4gICAgICAgIHsvZWFjaH1cclxuICAgIDwvc2VsZWN0PlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJjYXJkY29kZTVcIiBwbGFjZWhvbGRlcj1cIkNWVlwiIG9uOmZvY3VzPXthY3RpdmV9IG9uOmJsdXI9e2RlYWN0aXZlfSBtYXhsZW5ndGg9XCI0XCJcclxuICAgIGNsYXNzPVwidGhyZWVcIiBvbjppbnB1dD17Y3Z2fSBiaW5kOnRoaXM9e3RoaXNDdnZ9PlxyXG4gICAgPGlucHV0IHR5cGU9aGlkZGVuIG5hbWU9bnVtYmVyIHZhbHVlPVwiXCIgYmluZDp0aGlzPXtudW1iZXJyfT5cclxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPtCe0YLQv9GA0LDQstC40YLRjDwvYnV0dG9uPlxyXG48L2Zvcm0+IiwiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIHByZWxvYWQoeyBwYXJhbXMsIHF1ZXJ5IH0pIHtcclxuXHRcdHJldHVybiB0aGlzLmZldGNoKGBibG9nLmpzb25gKS50aGVuKHIgPT4gci5qc29uKCkpLnRoZW4ocG9zdHMgPT4ge1xyXG5cdFx0XHRyZXR1cm4geyBwb3N0cyB9O1xyXG5cdFx0fSk7XHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzY3JpcHQ+XHJcblx0ZXhwb3J0IGxldCBwb3N0cztcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGU+XHJcblx0dWwge1xyXG5cdFx0bWFyZ2luOiAwIDAgMWVtIDA7XHJcblx0XHRsaW5lLWhlaWdodDogMS41O1xyXG5cdH1cclxuPC9zdHlsZT5cclxuXHJcbjxzdmVsdGU6aGVhZD5cclxuXHQ8dGl0bGU+QmxvZzwvdGl0bGU+XHJcbjwvc3ZlbHRlOmhlYWQ+XHJcblxyXG48aDE+UmVjZW50IHBvc3RzPC9oMT5cclxuXHJcbjx1bD5cclxuXHR7I2VhY2ggcG9zdHMgYXMgcG9zdH1cclxuXHRcdDwhLS0gd2UncmUgdXNpbmcgdGhlIG5vbi1zdGFuZGFyZCBgcmVsPXByZWZldGNoYCBhdHRyaWJ1dGUgdG9cclxuXHRcdFx0XHR0ZWxsIFNhcHBlciB0byBsb2FkIHRoZSBkYXRhIGZvciB0aGUgcGFnZSBhcyBzb29uIGFzXHJcblx0XHRcdFx0dGhlIHVzZXIgaG92ZXJzIG92ZXIgdGhlIGxpbmsgb3IgdGFwcyBpdCwgaW5zdGVhZCBvZlxyXG5cdFx0XHRcdHdhaXRpbmcgZm9yIHRoZSAnY2xpY2snIGV2ZW50IC0tPlxyXG5cdFx0PGxpPjxhIHJlbD0ncHJlZmV0Y2gnIGhyZWY9J2Jsb2cve3Bvc3Quc2x1Z30nPntwb3N0LnRpdGxlfTwvYT48L2xpPlxyXG5cdHsvZWFjaH1cclxuPC91bD4iLCI8c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cclxuXHRleHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJlbG9hZCh7IHBhcmFtcywgcXVlcnkgfSkge1xyXG5cdFx0Ly8gdGhlIGBzbHVnYCBwYXJhbWV0ZXIgaXMgYXZhaWxhYmxlIGJlY2F1c2VcclxuXHRcdC8vIHRoaXMgZmlsZSBpcyBjYWxsZWQgW3NsdWddLnN2ZWx0ZVxyXG5cdFx0Y29uc3QgcmVzID0gYXdhaXQgdGhpcy5mZXRjaChgYmxvZy8ke3BhcmFtcy5zbHVnfS5qc29uYCk7XHJcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuXHJcblx0XHRpZiAocmVzLnN0YXR1cyA9PT0gMjAwKSB7XHJcblx0XHRcdHJldHVybiB7IHBvc3Q6IGRhdGEgfTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuZXJyb3IocmVzLnN0YXR1cywgZGF0YS5tZXNzYWdlKTtcclxuXHRcdH1cclxuXHR9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHNjcmlwdD5cclxuXHRleHBvcnQgbGV0IHBvc3Q7XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlPlxyXG5cdC8qXHJcblx0XHRCeSBkZWZhdWx0LCBDU1MgaXMgbG9jYWxseSBzY29wZWQgdG8gdGhlIGNvbXBvbmVudCxcclxuXHRcdGFuZCBhbnkgdW51c2VkIHN0eWxlcyBhcmUgZGVhZC1jb2RlLWVsaW1pbmF0ZWQuXHJcblx0XHRJbiB0aGlzIHBhZ2UsIFN2ZWx0ZSBjYW4ndCBrbm93IHdoaWNoIGVsZW1lbnRzIGFyZVxyXG5cdFx0Z29pbmcgdG8gYXBwZWFyIGluc2lkZSB0aGUge3t7cG9zdC5odG1sfX19IGJsb2NrLFxyXG5cdFx0c28gd2UgaGF2ZSB0byB1c2UgdGhlIDpnbG9iYWwoLi4uKSBtb2RpZmllciB0byB0YXJnZXRcclxuXHRcdGFsbCBlbGVtZW50cyBpbnNpZGUgLmNvbnRlbnRcclxuXHQqL1xyXG5cdC5jb250ZW50IDpnbG9iYWwoaDIpIHtcclxuXHRcdGZvbnQtc2l6ZTogMS40ZW07XHJcblx0XHRmb250LXdlaWdodDogNTAwO1xyXG5cdH1cclxuXHJcblx0LmNvbnRlbnQgOmdsb2JhbChwcmUpIHtcclxuXHRcdGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XHJcblx0XHRib3gtc2hhZG93OiBpbnNldCAxcHggMXB4IDVweCByZ2JhKDAsMCwwLDAuMDUpO1xyXG5cdFx0cGFkZGluZzogMC41ZW07XHJcblx0XHRib3JkZXItcmFkaXVzOiAycHg7XHJcblx0XHRvdmVyZmxvdy14OiBhdXRvO1xyXG5cdH1cclxuXHJcblx0LmNvbnRlbnQgOmdsb2JhbChwcmUpIDpnbG9iYWwoY29kZSkge1xyXG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcblx0XHRwYWRkaW5nOiAwO1xyXG5cdH1cclxuXHJcblx0LmNvbnRlbnQgOmdsb2JhbCh1bCkge1xyXG5cdFx0bGluZS1oZWlnaHQ6IDEuNTtcclxuXHR9XHJcblxyXG5cdC5jb250ZW50IDpnbG9iYWwobGkpIHtcclxuXHRcdG1hcmdpbjogMCAwIDAuNWVtIDA7XHJcblx0fVxyXG48L3N0eWxlPlxyXG5cclxuPHN2ZWx0ZTpoZWFkPlxyXG5cdDx0aXRsZT57cG9zdC50aXRsZX08L3RpdGxlPlxyXG48L3N2ZWx0ZTpoZWFkPlxyXG5cclxuPGgxPntwb3N0LnRpdGxlfTwvaDE+XHJcblxyXG48ZGl2IGNsYXNzPSdjb250ZW50Jz5cclxuXHR7QGh0bWwgcG9zdC5odG1sfVxyXG48L2Rpdj5cclxuIiwiPHNjcmlwdD5cclxuXHRpbXBvcnQgTmF2IGZyb20gJy4uL2NvbXBvbmVudHMvTmF2LnN2ZWx0ZSc7XHJcblxyXG5cdGV4cG9ydCBsZXQgc2VnbWVudDtcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGU+XHJcblx0bWFpbiB7XHJcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRtYXgtd2lkdGg6IDU2ZW07XHJcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuXHRcdHBhZGRpbmc6IDJlbTtcclxuXHRcdG1hcmdpbjogMCBhdXRvO1xyXG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcclxuXHR9XHJcbjwvc3R5bGU+XHJcblxyXG48IS0tPE5hdiB7c2VnbWVudH0vPi0tPlxyXG5cclxuPG1haW4+XHJcblx0PHNsb3Q+PC9zbG90PlxyXG48L21haW4+IiwiPHNjcmlwdD5cclxuXHRleHBvcnQgbGV0IHN0YXR1cztcclxuXHRleHBvcnQgbGV0IGVycm9yO1xyXG5cclxuXHRjb25zdCBkZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGU+XHJcblx0aDEsIHAge1xyXG5cdFx0bWFyZ2luOiAwIGF1dG87XHJcblx0fVxyXG5cclxuXHRoMSB7XHJcblx0XHRmb250LXNpemU6IDIuOGVtO1xyXG5cdFx0Zm9udC13ZWlnaHQ6IDcwMDtcclxuXHRcdG1hcmdpbjogMCAwIDAuNWVtIDA7XHJcblx0fVxyXG5cclxuXHRwIHtcclxuXHRcdG1hcmdpbjogMWVtIGF1dG87XHJcblx0fVxyXG5cclxuXHRAbWVkaWEgKG1pbi13aWR0aDogNDgwcHgpIHtcclxuXHRcdGgxIHtcclxuXHRcdFx0Zm9udC1zaXplOiA0ZW07XHJcblx0XHR9XHJcblx0fVxyXG48L3N0eWxlPlxyXG5cclxuPHN2ZWx0ZTpoZWFkPlxyXG5cdDx0aXRsZT57c3RhdHVzfTwvdGl0bGU+XHJcbjwvc3ZlbHRlOmhlYWQ+XHJcblxyXG48aDE+e3N0YXR1c308L2gxPlxyXG5cclxuPHA+e2Vycm9yLm1lc3NhZ2V9PC9wPlxyXG5cclxueyNpZiBkZXYgJiYgZXJyb3Iuc3RhY2t9XHJcblx0PHByZT57ZXJyb3Iuc3RhY2t9PC9wcmU+XHJcbnsvaWZ9XHJcbiIsIi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgU2FwcGVyIOKAlCBkbyBub3QgZWRpdCBpdCFcbmltcG9ydCAqIGFzIHJvdXRlXzAgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9ibG9nL2luZGV4Lmpzb24uanNcIjtcbmltcG9ydCAqIGFzIHJvdXRlXzEgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9ibG9nL1tzbHVnXS5qc29uLmpzXCI7XG5pbXBvcnQgY29tcG9uZW50XzAgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9pbmRleC5zdmVsdGVcIjtcbmltcG9ydCBjb21wb25lbnRfMSBmcm9tIFwiLi4vLi4vLi4vcm91dGVzL2Fib3V0LnN2ZWx0ZVwiO1xuaW1wb3J0IGNvbXBvbmVudF8yLCB7IHByZWxvYWQgYXMgcHJlbG9hZF8yIH0gZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9ibG9nL2luZGV4LnN2ZWx0ZVwiO1xuaW1wb3J0IGNvbXBvbmVudF8zLCB7IHByZWxvYWQgYXMgcHJlbG9hZF8zIH0gZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9ibG9nL1tzbHVnXS5zdmVsdGVcIjtcbmltcG9ydCByb290IGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvX2xheW91dC5zdmVsdGVcIjtcbmltcG9ydCBlcnJvciBmcm9tIFwiLi4vLi4vLi4vcm91dGVzL19lcnJvci5zdmVsdGVcIjtcblxuY29uc3QgZCA9IGRlY29kZVVSSUNvbXBvbmVudDtcblxuZXhwb3J0IGNvbnN0IG1hbmlmZXN0ID0ge1xuXHRzZXJ2ZXJfcm91dGVzOiBbXG5cdFx0e1xuXHRcdFx0Ly8gYmxvZy9pbmRleC5qc29uLmpzXG5cdFx0XHRwYXR0ZXJuOiAvXlxcL2Jsb2cuanNvbiQvLFxuXHRcdFx0aGFuZGxlcnM6IHJvdXRlXzAsXG5cdFx0XHRwYXJhbXM6ICgpID0+ICh7fSlcblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0Ly8gYmxvZy9bc2x1Z10uanNvbi5qc1xuXHRcdFx0cGF0dGVybjogL15cXC9ibG9nXFwvKFteXFwvXSs/KS5qc29uJC8sXG5cdFx0XHRoYW5kbGVyczogcm91dGVfMSxcblx0XHRcdHBhcmFtczogbWF0Y2ggPT4gKHsgc2x1ZzogZChtYXRjaFsxXSkgfSlcblx0XHR9XG5cdF0sXG5cblx0cGFnZXM6IFtcblx0XHR7XG5cdFx0XHQvLyBpbmRleC5zdmVsdGVcblx0XHRcdHBhdHRlcm46IC9eXFwvJC8sXG5cdFx0XHRwYXJ0czogW1xuXHRcdFx0XHR7IG5hbWU6IFwiaW5kZXhcIiwgZmlsZTogXCJpbmRleC5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfMCB9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdC8vIGFib3V0LnN2ZWx0ZVxuXHRcdFx0cGF0dGVybjogL15cXC9hYm91dFxcLz8kLyxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdHsgbmFtZTogXCJhYm91dFwiLCBmaWxlOiBcImFib3V0LnN2ZWx0ZVwiLCBjb21wb25lbnQ6IGNvbXBvbmVudF8xIH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0Ly8gYmxvZy9pbmRleC5zdmVsdGVcblx0XHRcdHBhdHRlcm46IC9eXFwvYmxvZ1xcLz8kLyxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdHsgbmFtZTogXCJibG9nXCIsIGZpbGU6IFwiYmxvZy9pbmRleC5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfMiwgcHJlbG9hZDogcHJlbG9hZF8yIH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0Ly8gYmxvZy9bc2x1Z10uc3ZlbHRlXG5cdFx0XHRwYXR0ZXJuOiAvXlxcL2Jsb2dcXC8oW15cXC9dKz8pXFwvPyQvLFxuXHRcdFx0cGFydHM6IFtcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0eyBuYW1lOiBcImJsb2dfJHNsdWdcIiwgZmlsZTogXCJibG9nL1tzbHVnXS5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfMywgcHJlbG9hZDogcHJlbG9hZF8zLCBwYXJhbXM6IG1hdGNoID0+ICh7IHNsdWc6IGQobWF0Y2hbMV0pIH0pIH1cblx0XHRcdF1cblx0XHR9XG5cdF0sXG5cblx0cm9vdCxcblx0cm9vdF9wcmVsb2FkOiAoKSA9PiB7fSxcblx0ZXJyb3Jcbn07XG5cbmV4cG9ydCBjb25zdCBidWlsZF9kaXIgPSBcIl9fc2FwcGVyX18vZGV2XCI7XG5cbmV4cG9ydCBjb25zdCBzcmNfZGlyID0gXCJzcmNcIjtcblxuZXhwb3J0IGNvbnN0IGRldiA9IHRydWU7IiwiaW1wb3J0IHsgc2FmZV9ub3RfZXF1YWwsIG5vb3AsIHJ1bl9hbGwsIGlzX2Z1bmN0aW9uIH0gZnJvbSAnLi4vaW50ZXJuYWwnO1xuZXhwb3J0IHsgZ2V0X3N0b3JlX3ZhbHVlIGFzIGdldCB9IGZyb20gJy4uL2ludGVybmFsJztcblxuY29uc3Qgc3Vic2NyaWJlcl9xdWV1ZSA9IFtdO1xuLyoqXG4gKiBDcmVhdGVzIGEgYFJlYWRhYmxlYCBzdG9yZSB0aGF0IGFsbG93cyByZWFkaW5nIGJ5IHN1YnNjcmlwdGlvbi5cbiAqIEBwYXJhbSB2YWx1ZSBpbml0aWFsIHZhbHVlXG4gKiBAcGFyYW0ge1N0YXJ0U3RvcE5vdGlmaWVyfXN0YXJ0IHN0YXJ0IGFuZCBzdG9wIG5vdGlmaWNhdGlvbnMgZm9yIHN1YnNjcmlwdGlvbnNcbiAqL1xuZnVuY3Rpb24gcmVhZGFibGUodmFsdWUsIHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlOiB3cml0YWJsZSh2YWx1ZSwgc3RhcnQpLnN1YnNjcmliZSxcbiAgICB9O1xufVxuLyoqXG4gKiBDcmVhdGUgYSBgV3JpdGFibGVgIHN0b3JlIHRoYXQgYWxsb3dzIGJvdGggdXBkYXRpbmcgYW5kIHJlYWRpbmcgYnkgc3Vic2NyaXB0aW9uLlxuICogQHBhcmFtIHsqPX12YWx1ZSBpbml0aWFsIHZhbHVlXG4gKiBAcGFyYW0ge1N0YXJ0U3RvcE5vdGlmaWVyPX1zdGFydCBzdGFydCBhbmQgc3RvcCBub3RpZmljYXRpb25zIGZvciBzdWJzY3JpcHRpb25zXG4gKi9cbmZ1bmN0aW9uIHdyaXRhYmxlKHZhbHVlLCBzdGFydCA9IG5vb3ApIHtcbiAgICBsZXQgc3RvcDtcbiAgICBjb25zdCBzdWJzY3JpYmVycyA9IFtdO1xuICAgIGZ1bmN0aW9uIHNldChuZXdfdmFsdWUpIHtcbiAgICAgICAgaWYgKHNhZmVfbm90X2VxdWFsKHZhbHVlLCBuZXdfdmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ld192YWx1ZTtcbiAgICAgICAgICAgIGlmIChzdG9wKSB7IC8vIHN0b3JlIGlzIHJlYWR5XG4gICAgICAgICAgICAgICAgY29uc3QgcnVuX3F1ZXVlID0gIXN1YnNjcmliZXJfcXVldWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcyA9IHN1YnNjcmliZXJzW2ldO1xuICAgICAgICAgICAgICAgICAgICBzWzFdKCk7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJfcXVldWUucHVzaChzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChydW5fcXVldWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlW2ldWzBdKHN1YnNjcmliZXJfcXVldWVbaSArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZShmbikge1xuICAgICAgICBzZXQoZm4odmFsdWUpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3Vic2NyaWJlKHJ1biwgaW52YWxpZGF0ZSA9IG5vb3ApIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaWJlciA9IFtydW4sIGludmFsaWRhdGVdO1xuICAgICAgICBzdWJzY3JpYmVycy5wdXNoKHN1YnNjcmliZXIpO1xuICAgICAgICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBzdG9wID0gc3RhcnQoc2V0KSB8fCBub29wO1xuICAgICAgICB9XG4gICAgICAgIHJ1bih2YWx1ZSk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHN1YnNjcmliZXJzLmluZGV4T2Yoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgICAgICAgICAgc3RvcCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7IHNldCwgdXBkYXRlLCBzdWJzY3JpYmUgfTtcbn1cbi8qKlxuICogRGVyaXZlZCB2YWx1ZSBzdG9yZSBieSBzeW5jaHJvbml6aW5nIG9uZSBvciBtb3JlIHJlYWRhYmxlIHN0b3JlcyBhbmRcbiAqIGFwcGx5aW5nIGFuIGFnZ3JlZ2F0aW9uIGZ1bmN0aW9uIG92ZXIgaXRzIGlucHV0IHZhbHVlcy5cbiAqIEBwYXJhbSB7U3RvcmVzfSBzdG9yZXMgaW5wdXQgc3RvcmVzXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKFN0b3Jlcz0sIGZ1bmN0aW9uKCopPSk6Kn1mbiBmdW5jdGlvbiBjYWxsYmFjayB0aGF0IGFnZ3JlZ2F0ZXMgdGhlIHZhbHVlc1xuICogQHBhcmFtIHsqPX1pbml0aWFsX3ZhbHVlIHdoZW4gdXNlZCBhc3luY2hyb25vdXNseVxuICovXG5mdW5jdGlvbiBkZXJpdmVkKHN0b3JlcywgZm4sIGluaXRpYWxfdmFsdWUpIHtcbiAgICBjb25zdCBzaW5nbGUgPSAhQXJyYXkuaXNBcnJheShzdG9yZXMpO1xuICAgIGNvbnN0IHN0b3Jlc19hcnJheSA9IHNpbmdsZVxuICAgICAgICA/IFtzdG9yZXNdXG4gICAgICAgIDogc3RvcmVzO1xuICAgIGNvbnN0IGF1dG8gPSBmbi5sZW5ndGggPCAyO1xuICAgIHJldHVybiByZWFkYWJsZShpbml0aWFsX3ZhbHVlLCAoc2V0KSA9PiB7XG4gICAgICAgIGxldCBpbml0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgICAgIGxldCBwZW5kaW5nID0gMDtcbiAgICAgICAgbGV0IGNsZWFudXAgPSBub29wO1xuICAgICAgICBjb25zdCBzeW5jID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmbihzaW5nbGUgPyB2YWx1ZXNbMF0gOiB2YWx1ZXMsIHNldCk7XG4gICAgICAgICAgICBpZiAoYXV0bykge1xuICAgICAgICAgICAgICAgIHNldChyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cCA9IGlzX2Z1bmN0aW9uKHJlc3VsdCkgPyByZXN1bHQgOiBub29wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB1bnN1YnNjcmliZXJzID0gc3RvcmVzX2FycmF5Lm1hcCgoc3RvcmUsIGkpID0+IHN0b3JlLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZhbHVlc1tpXSA9IHZhbHVlO1xuICAgICAgICAgICAgcGVuZGluZyAmPSB+KDEgPDwgaSk7XG4gICAgICAgICAgICBpZiAoaW5pdGVkKSB7XG4gICAgICAgICAgICAgICAgc3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBwZW5kaW5nIHw9ICgxIDw8IGkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGluaXRlZCA9IHRydWU7XG4gICAgICAgIHN5bmMoKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgICAgICBydW5fYWxsKHVuc3Vic2NyaWJlcnMpO1xuICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICB9O1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBkZXJpdmVkLCByZWFkYWJsZSwgd3JpdGFibGUgfTtcbiIsImltcG9ydCB7IHdyaXRhYmxlIH0gZnJvbSAnc3ZlbHRlL3N0b3JlJztcblxuZXhwb3J0IGNvbnN0IENPTlRFWFRfS0VZID0ge307XG5cbmV4cG9ydCBjb25zdCBwcmVsb2FkID0gKCkgPT4gKHt9KTsiLCI8IS0tIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgU2FwcGVyIOKAlCBkbyBub3QgZWRpdCBpdCEgLS0+XG48c2NyaXB0PlxuXHRpbXBvcnQgeyBzZXRDb250ZXh0IH0gZnJvbSAnc3ZlbHRlJztcblx0aW1wb3J0IHsgQ09OVEVYVF9LRVkgfSBmcm9tICcuL3NoYXJlZCc7XG5cdGltcG9ydCBMYXlvdXQgZnJvbSAnLi4vLi4vLi4vcm91dGVzL19sYXlvdXQuc3ZlbHRlJztcblx0aW1wb3J0IEVycm9yIGZyb20gJy4uLy4uLy4uL3JvdXRlcy9fZXJyb3Iuc3ZlbHRlJztcblxuXHRleHBvcnQgbGV0IHN0b3Jlcztcblx0ZXhwb3J0IGxldCBlcnJvcjtcblx0ZXhwb3J0IGxldCBzdGF0dXM7XG5cdGV4cG9ydCBsZXQgc2VnbWVudHM7XG5cdGV4cG9ydCBsZXQgbGV2ZWwwO1xuXHRleHBvcnQgbGV0IGxldmVsMSA9IG51bGw7XG5cblx0c2V0Q29udGV4dChDT05URVhUX0tFWSwgc3RvcmVzKTtcbjwvc2NyaXB0PlxuXG48TGF5b3V0IHNlZ21lbnQ9XCJ7c2VnbWVudHNbMF19XCIgey4uLmxldmVsMC5wcm9wc30+XG5cdHsjaWYgZXJyb3J9XG5cdFx0PEVycm9yIHtlcnJvcn0ge3N0YXR1c30vPlxuXHR7OmVsc2V9XG5cdFx0PHN2ZWx0ZTpjb21wb25lbnQgdGhpcz1cIntsZXZlbDEuY29tcG9uZW50fVwiIHsuLi5sZXZlbDEucHJvcHN9Lz5cblx0ey9pZn1cbjwvTGF5b3V0PiIsImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGRldiwgYnVpbGRfZGlyLCBzcmNfZGlyLCBtYW5pZmVzdCB9IGZyb20gJy4vaW50ZXJuYWwvbWFuaWZlc3Qtc2VydmVyJztcbmltcG9ydCB7IHdyaXRhYmxlIH0gZnJvbSAnc3ZlbHRlL3N0b3JlJztcbmltcG9ydCBTdHJlYW0gZnJvbSAnc3RyZWFtJztcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuaW1wb3J0IGh0dHBzIGZyb20gJ2h0dHBzJztcbmltcG9ydCB6bGliIGZyb20gJ3psaWInO1xuaW1wb3J0IEFwcCBmcm9tICcuL2ludGVybmFsL0FwcC5zdmVsdGUnO1xuXG5mdW5jdGlvbiBnZXRfc2VydmVyX3JvdXRlX2hhbmRsZXIocm91dGVzKSB7XG5cdGFzeW5jIGZ1bmN0aW9uIGhhbmRsZV9yb3V0ZShyb3V0ZSwgcmVxLCByZXMsIG5leHQpIHtcblx0XHRyZXEucGFyYW1zID0gcm91dGUucGFyYW1zKHJvdXRlLnBhdHRlcm4uZXhlYyhyZXEucGF0aCkpO1xuXG5cdFx0Y29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuXHRcdC8vICdkZWxldGUnIGNhbm5vdCBiZSBleHBvcnRlZCBmcm9tIGEgbW9kdWxlIGJlY2F1c2UgaXQgaXMgYSBrZXl3b3JkLFxuXHRcdC8vIHNvIGNoZWNrIGZvciAnZGVsJyBpbnN0ZWFkXG5cdFx0Y29uc3QgbWV0aG9kX2V4cG9ydCA9IG1ldGhvZCA9PT0gJ2RlbGV0ZScgPyAnZGVsJyA6IG1ldGhvZDtcblx0XHRjb25zdCBoYW5kbGVfbWV0aG9kID0gcm91dGUuaGFuZGxlcnNbbWV0aG9kX2V4cG9ydF07XG5cdFx0aWYgKGhhbmRsZV9tZXRob2QpIHtcblx0XHRcdGlmIChwcm9jZXNzLmVudi5TQVBQRVJfRVhQT1JUKSB7XG5cdFx0XHRcdGNvbnN0IHsgd3JpdGUsIGVuZCwgc2V0SGVhZGVyIH0gPSByZXM7XG5cdFx0XHRcdGNvbnN0IGNodW5rcyA9IFtdO1xuXHRcdFx0XHRjb25zdCBoZWFkZXJzID0ge307XG5cblx0XHRcdFx0Ly8gaW50ZXJjZXB0IGRhdGEgc28gdGhhdCBpdCBjYW4gYmUgZXhwb3J0ZWRcblx0XHRcdFx0cmVzLndyaXRlID0gZnVuY3Rpb24oY2h1bmspIHtcblx0XHRcdFx0XHRjaHVua3MucHVzaChCdWZmZXIuZnJvbShjaHVuaykpO1xuXHRcdFx0XHRcdHdyaXRlLmFwcGx5KHJlcywgYXJndW1lbnRzKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRyZXMuc2V0SGVhZGVyID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcblx0XHRcdFx0XHRoZWFkZXJzW25hbWUudG9Mb3dlckNhc2UoKV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRzZXRIZWFkZXIuYXBwbHkocmVzLCBhcmd1bWVudHMpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHJlcy5lbmQgPSBmdW5jdGlvbihjaHVuaykge1xuXHRcdFx0XHRcdGlmIChjaHVuaykgY2h1bmtzLnB1c2goQnVmZmVyLmZyb20oY2h1bmspKTtcblx0XHRcdFx0XHRlbmQuYXBwbHkocmVzLCBhcmd1bWVudHMpO1xuXG5cdFx0XHRcdFx0cHJvY2Vzcy5zZW5kKHtcblx0XHRcdFx0XHRcdF9fc2FwcGVyX186IHRydWUsXG5cdFx0XHRcdFx0XHRldmVudDogJ2ZpbGUnLFxuXHRcdFx0XHRcdFx0dXJsOiByZXEudXJsLFxuXHRcdFx0XHRcdFx0bWV0aG9kOiByZXEubWV0aG9kLFxuXHRcdFx0XHRcdFx0c3RhdHVzOiByZXMuc3RhdHVzQ29kZSxcblx0XHRcdFx0XHRcdHR5cGU6IGhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddLFxuXHRcdFx0XHRcdFx0Ym9keTogQnVmZmVyLmNvbmNhdChjaHVua3MpLnRvU3RyaW5nKClcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgaGFuZGxlX25leHQgPSAoZXJyKSA9PiB7XG5cdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRyZXMuc3RhdHVzQ29kZSA9IDUwMDtcblx0XHRcdFx0XHRyZXMuZW5kKGVyci5tZXNzYWdlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRwcm9jZXNzLm5leHRUaWNrKG5leHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRhd2FpdCBoYW5kbGVfbWV0aG9kKHJlcSwgcmVzLCBoYW5kbGVfbmV4dCk7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHRcdFx0XHRoYW5kbGVfbmV4dChlcnIpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBubyBtYXRjaGluZyBoYW5kbGVyIGZvciBtZXRob2Rcblx0XHRcdHByb2Nlc3MubmV4dFRpY2sobmV4dCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGZpbmRfcm91dGUocmVxLCByZXMsIG5leHQpIHtcblx0XHRmb3IgKGNvbnN0IHJvdXRlIG9mIHJvdXRlcykge1xuXHRcdFx0aWYgKHJvdXRlLnBhdHRlcm4udGVzdChyZXEucGF0aCkpIHtcblx0XHRcdFx0aGFuZGxlX3JvdXRlKHJvdXRlLCByZXEsIHJlcywgbmV4dCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRuZXh0KCk7XG5cdH07XG59XG5cbi8qIVxuICogY29va2llXG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IFJvbWFuIFNodHlsbWFuXG4gKiBDb3B5cmlnaHQoYykgMjAxNSBEb3VnbGFzIENocmlzdG9waGVyIFdpbHNvblxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqIEBwdWJsaWNcbiAqL1xuXG52YXIgcGFyc2VfMSA9IHBhcnNlO1xudmFyIHNlcmlhbGl6ZV8xID0gc2VyaWFsaXplO1xuXG4vKipcbiAqIE1vZHVsZSB2YXJpYWJsZXMuXG4gKiBAcHJpdmF0ZVxuICovXG5cbnZhciBkZWNvZGUgPSBkZWNvZGVVUklDb21wb25lbnQ7XG52YXIgZW5jb2RlID0gZW5jb2RlVVJJQ29tcG9uZW50O1xudmFyIHBhaXJTcGxpdFJlZ0V4cCA9IC87ICovO1xuXG4vKipcbiAqIFJlZ0V4cCB0byBtYXRjaCBmaWVsZC1jb250ZW50IGluIFJGQyA3MjMwIHNlYyAzLjJcbiAqXG4gKiBmaWVsZC1jb250ZW50ID0gZmllbGQtdmNoYXIgWyAxKiggU1AgLyBIVEFCICkgZmllbGQtdmNoYXIgXVxuICogZmllbGQtdmNoYXIgICA9IFZDSEFSIC8gb2JzLXRleHRcbiAqIG9icy10ZXh0ICAgICAgPSAleDgwLUZGXG4gKi9cblxudmFyIGZpZWxkQ29udGVudFJlZ0V4cCA9IC9eW1xcdTAwMDlcXHUwMDIwLVxcdTAwN2VcXHUwMDgwLVxcdTAwZmZdKyQvO1xuXG4vKipcbiAqIFBhcnNlIGEgY29va2llIGhlYWRlci5cbiAqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gY29va2llIGhlYWRlciBzdHJpbmcgaW50byBhbiBvYmplY3RcbiAqIFRoZSBvYmplY3QgaGFzIHRoZSB2YXJpb3VzIGNvb2tpZXMgYXMga2V5cyhuYW1lcykgPT4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICogQHJldHVybiB7b2JqZWN0fVxuICogQHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0ciwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzdHIgbXVzdCBiZSBhIHN0cmluZycpO1xuICB9XG5cbiAgdmFyIG9iaiA9IHt9O1xuICB2YXIgb3B0ID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHBhaXJzID0gc3RyLnNwbGl0KHBhaXJTcGxpdFJlZ0V4cCk7XG4gIHZhciBkZWMgPSBvcHQuZGVjb2RlIHx8IGRlY29kZTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHBhaXIgPSBwYWlyc1tpXTtcbiAgICB2YXIgZXFfaWR4ID0gcGFpci5pbmRleE9mKCc9Jyk7XG5cbiAgICAvLyBza2lwIHRoaW5ncyB0aGF0IGRvbid0IGxvb2sgbGlrZSBrZXk9dmFsdWVcbiAgICBpZiAoZXFfaWR4IDwgMCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGtleSA9IHBhaXIuc3Vic3RyKDAsIGVxX2lkeCkudHJpbSgpO1xuICAgIHZhciB2YWwgPSBwYWlyLnN1YnN0cigrK2VxX2lkeCwgcGFpci5sZW5ndGgpLnRyaW0oKTtcblxuICAgIC8vIHF1b3RlZCB2YWx1ZXNcbiAgICBpZiAoJ1wiJyA9PSB2YWxbMF0pIHtcbiAgICAgIHZhbCA9IHZhbC5zbGljZSgxLCAtMSk7XG4gICAgfVxuXG4gICAgLy8gb25seSBhc3NpZ24gb25jZVxuICAgIGlmICh1bmRlZmluZWQgPT0gb2JqW2tleV0pIHtcbiAgICAgIG9ialtrZXldID0gdHJ5RGVjb2RlKHZhbCwgZGVjKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIFNlcmlhbGl6ZSBkYXRhIGludG8gYSBjb29raWUgaGVhZGVyLlxuICpcbiAqIFNlcmlhbGl6ZSB0aGUgYSBuYW1lIHZhbHVlIHBhaXIgaW50byBhIGNvb2tpZSBzdHJpbmcgc3VpdGFibGUgZm9yXG4gKiBodHRwIGhlYWRlcnMuIEFuIG9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IHNwZWNpZmllZCBjb29raWUgcGFyYW1ldGVycy5cbiAqXG4gKiBzZXJpYWxpemUoJ2ZvbycsICdiYXInLCB7IGh0dHBPbmx5OiB0cnVlIH0pXG4gKiAgID0+IFwiZm9vPWJhcjsgaHR0cE9ubHlcIlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cblxuZnVuY3Rpb24gc2VyaWFsaXplKG5hbWUsIHZhbCwgb3B0aW9ucykge1xuICB2YXIgb3B0ID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGVuYyA9IG9wdC5lbmNvZGUgfHwgZW5jb2RlO1xuXG4gIGlmICh0eXBlb2YgZW5jICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIGVuY29kZSBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICBpZiAoIWZpZWxkQ29udGVudFJlZ0V4cC50ZXN0KG5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgbmFtZSBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICB2YXIgdmFsdWUgPSBlbmModmFsKTtcblxuICBpZiAodmFsdWUgJiYgIWZpZWxkQ29udGVudFJlZ0V4cC50ZXN0KHZhbHVlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IHZhbCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICB2YXIgc3RyID0gbmFtZSArICc9JyArIHZhbHVlO1xuXG4gIGlmIChudWxsICE9IG9wdC5tYXhBZ2UpIHtcbiAgICB2YXIgbWF4QWdlID0gb3B0Lm1heEFnZSAtIDA7XG4gICAgaWYgKGlzTmFOKG1heEFnZSkpIHRocm93IG5ldyBFcnJvcignbWF4QWdlIHNob3VsZCBiZSBhIE51bWJlcicpO1xuICAgIHN0ciArPSAnOyBNYXgtQWdlPScgKyBNYXRoLmZsb29yKG1heEFnZSk7XG4gIH1cblxuICBpZiAob3B0LmRvbWFpbikge1xuICAgIGlmICghZmllbGRDb250ZW50UmVnRXhwLnRlc3Qob3B0LmRvbWFpbikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBkb21haW4gaXMgaW52YWxpZCcpO1xuICAgIH1cblxuICAgIHN0ciArPSAnOyBEb21haW49JyArIG9wdC5kb21haW47XG4gIH1cblxuICBpZiAob3B0LnBhdGgpIHtcbiAgICBpZiAoIWZpZWxkQ29udGVudFJlZ0V4cC50ZXN0KG9wdC5wYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIHBhdGggaXMgaW52YWxpZCcpO1xuICAgIH1cblxuICAgIHN0ciArPSAnOyBQYXRoPScgKyBvcHQucGF0aDtcbiAgfVxuXG4gIGlmIChvcHQuZXhwaXJlcykge1xuICAgIGlmICh0eXBlb2Ygb3B0LmV4cGlyZXMudG9VVENTdHJpbmcgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBleHBpcmVzIGlzIGludmFsaWQnKTtcbiAgICB9XG5cbiAgICBzdHIgKz0gJzsgRXhwaXJlcz0nICsgb3B0LmV4cGlyZXMudG9VVENTdHJpbmcoKTtcbiAgfVxuXG4gIGlmIChvcHQuaHR0cE9ubHkpIHtcbiAgICBzdHIgKz0gJzsgSHR0cE9ubHknO1xuICB9XG5cbiAgaWYgKG9wdC5zZWN1cmUpIHtcbiAgICBzdHIgKz0gJzsgU2VjdXJlJztcbiAgfVxuXG4gIGlmIChvcHQuc2FtZVNpdGUpIHtcbiAgICB2YXIgc2FtZVNpdGUgPSB0eXBlb2Ygb3B0LnNhbWVTaXRlID09PSAnc3RyaW5nJ1xuICAgICAgPyBvcHQuc2FtZVNpdGUudG9Mb3dlckNhc2UoKSA6IG9wdC5zYW1lU2l0ZTtcblxuICAgIHN3aXRjaCAoc2FtZVNpdGUpIHtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgc3RyICs9ICc7IFNhbWVTaXRlPVN0cmljdCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGF4JzpcbiAgICAgICAgc3RyICs9ICc7IFNhbWVTaXRlPUxheCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3RyaWN0JzpcbiAgICAgICAgc3RyICs9ICc7IFNhbWVTaXRlPVN0cmljdCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgIHN0ciArPSAnOyBTYW1lU2l0ZT1Ob25lJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gc2FtZVNpdGUgaXMgaW52YWxpZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogVHJ5IGRlY29kaW5nIGEgc3RyaW5nIHVzaW5nIGEgZGVjb2RpbmcgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHBhcmFtIHtmdW5jdGlvbn0gZGVjb2RlXG4gKiBAcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHRyeURlY29kZShzdHIsIGRlY29kZSkge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGUoc3RyKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxudmFyIGNvb2tpZSA9IHtcblx0cGFyc2U6IHBhcnNlXzEsXG5cdHNlcmlhbGl6ZTogc2VyaWFsaXplXzFcbn07XG5cbnZhciBjaGFycyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXyQnO1xudmFyIHVuc2FmZUNoYXJzID0gL1s8PlxcYlxcZlxcblxcclxcdFxcMFxcdTIwMjhcXHUyMDI5XS9nO1xudmFyIHJlc2VydmVkID0gL14oPzpkb3xpZnxpbnxmb3J8aW50fGxldHxuZXd8dHJ5fHZhcnxieXRlfGNhc2V8Y2hhcnxlbHNlfGVudW18Z290b3xsb25nfHRoaXN8dm9pZHx3aXRofGF3YWl0fGJyZWFrfGNhdGNofGNsYXNzfGNvbnN0fGZpbmFsfGZsb2F0fHNob3J0fHN1cGVyfHRocm93fHdoaWxlfHlpZWxkfGRlbGV0ZXxkb3VibGV8ZXhwb3J0fGltcG9ydHxuYXRpdmV8cmV0dXJufHN3aXRjaHx0aHJvd3N8dHlwZW9mfGJvb2xlYW58ZGVmYXVsdHxleHRlbmRzfGZpbmFsbHl8cGFja2FnZXxwcml2YXRlfGFic3RyYWN0fGNvbnRpbnVlfGRlYnVnZ2VyfGZ1bmN0aW9ufHZvbGF0aWxlfGludGVyZmFjZXxwcm90ZWN0ZWR8dHJhbnNpZW50fGltcGxlbWVudHN8aW5zdGFuY2VvZnxzeW5jaHJvbml6ZWQpJC87XG52YXIgZXNjYXBlZCA9IHtcbiAgICAnPCc6ICdcXFxcdTAwM0MnLFxuICAgICc+JzogJ1xcXFx1MDAzRScsXG4gICAgJy8nOiAnXFxcXHUwMDJGJyxcbiAgICAnXFxcXCc6ICdcXFxcXFxcXCcsXG4gICAgJ1xcYic6ICdcXFxcYicsXG4gICAgJ1xcZic6ICdcXFxcZicsXG4gICAgJ1xcbic6ICdcXFxcbicsXG4gICAgJ1xccic6ICdcXFxccicsXG4gICAgJ1xcdCc6ICdcXFxcdCcsXG4gICAgJ1xcMCc6ICdcXFxcMCcsXG4gICAgJ1xcdTIwMjgnOiAnXFxcXHUyMDI4JyxcbiAgICAnXFx1MjAyOSc6ICdcXFxcdTIwMjknXG59O1xudmFyIG9iamVjdFByb3RvT3duUHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE9iamVjdC5wcm90b3R5cGUpLnNvcnQoKS5qb2luKCdcXDAnKTtcbmZ1bmN0aW9uIGRldmFsdWUodmFsdWUpIHtcbiAgICB2YXIgY291bnRzID0gbmV3IE1hcCgpO1xuICAgIGZ1bmN0aW9uIHdhbGsodGhpbmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHN0cmluZ2lmeSBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudHMuaGFzKHRoaW5nKSkge1xuICAgICAgICAgICAgY291bnRzLnNldCh0aGluZywgY291bnRzLmdldCh0aGluZykgKyAxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb3VudHMuc2V0KHRoaW5nLCAxKTtcbiAgICAgICAgaWYgKCFpc1ByaW1pdGl2ZSh0aGluZykpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gZ2V0VHlwZSh0aGluZyk7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdOdW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1N0cmluZyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnQm9vbGVhbic6XG4gICAgICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0FycmF5JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpbmcuZm9yRWFjaCh3YWxrKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnU2V0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdNYXAnOlxuICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHRoaW5nKS5mb3JFYWNoKHdhbGspO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpbmcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvdG8gIT09IE9iamVjdC5wcm90b3R5cGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3RvICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90bykuc29ydCgpLmpvaW4oJ1xcMCcpICE9PSBvYmplY3RQcm90b093blByb3BlcnR5TmFtZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzdHJpbmdpZnkgYXJiaXRyYXJ5IG5vbi1QT0pPc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0aGluZykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHN0cmluZ2lmeSBQT0pPcyB3aXRoIHN5bWJvbGljIGtleXNcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGhpbmcpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gd2Fsayh0aGluZ1trZXldKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2Fsayh2YWx1ZSk7XG4gICAgdmFyIG5hbWVzID0gbmV3IE1hcCgpO1xuICAgIEFycmF5LmZyb20oY291bnRzKVxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChlbnRyeSkgeyByZXR1cm4gZW50cnlbMV0gPiAxOyB9KVxuICAgICAgICAuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYlsxXSAtIGFbMV07IH0pXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSwgaSkge1xuICAgICAgICBuYW1lcy5zZXQoZW50cnlbMF0sIGdldE5hbWUoaSkpO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeSh0aGluZykge1xuICAgICAgICBpZiAobmFtZXMuaGFzKHRoaW5nKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWVzLmdldCh0aGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJpbWl0aXZlKHRoaW5nKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ2lmeVByaW1pdGl2ZSh0aGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHR5cGUgPSBnZXRUeXBlKHRoaW5nKTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdOdW1iZXInOlxuICAgICAgICAgICAgY2FzZSAnU3RyaW5nJzpcbiAgICAgICAgICAgIGNhc2UgJ0Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIk9iamVjdChcIiArIHN0cmluZ2lmeSh0aGluZy52YWx1ZU9mKCkpICsgXCIpXCI7XG4gICAgICAgICAgICBjYXNlICdSZWdFeHAnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGluZy50b1N0cmluZygpO1xuICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibmV3IERhdGUoXCIgKyB0aGluZy5nZXRUaW1lKCkgKyBcIilcIjtcbiAgICAgICAgICAgIGNhc2UgJ0FycmF5JzpcbiAgICAgICAgICAgICAgICB2YXIgbWVtYmVycyA9IHRoaW5nLm1hcChmdW5jdGlvbiAodiwgaSkgeyByZXR1cm4gaSBpbiB0aGluZyA/IHN0cmluZ2lmeSh2KSA6ICcnOyB9KTtcbiAgICAgICAgICAgICAgICB2YXIgdGFpbCA9IHRoaW5nLmxlbmd0aCA9PT0gMCB8fCAodGhpbmcubGVuZ3RoIC0gMSBpbiB0aGluZykgPyAnJyA6ICcsJztcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbXCIgKyBtZW1iZXJzLmpvaW4oJywnKSArIHRhaWwgKyBcIl1cIjtcbiAgICAgICAgICAgIGNhc2UgJ1NldCc6XG4gICAgICAgICAgICBjYXNlICdNYXAnOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIm5ldyBcIiArIHR5cGUgKyBcIihbXCIgKyBBcnJheS5mcm9tKHRoaW5nKS5tYXAoc3RyaW5naWZ5KS5qb2luKCcsJykgKyBcIl0pXCI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHZhciBvYmogPSBcIntcIiArIE9iamVjdC5rZXlzKHRoaW5nKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gc2FmZUtleShrZXkpICsgXCI6XCIgKyBzdHJpbmdpZnkodGhpbmdba2V5XSk7IH0pLmpvaW4oJywnKSArIFwifVwiO1xuICAgICAgICAgICAgICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGluZyk7XG4gICAgICAgICAgICAgICAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGluZykubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIk9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShudWxsKSxcIiArIG9iaiArIFwiKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiT2JqZWN0LmNyZWF0ZShudWxsKVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBzdHIgPSBzdHJpbmdpZnkodmFsdWUpO1xuICAgIGlmIChuYW1lcy5zaXplKSB7XG4gICAgICAgIHZhciBwYXJhbXNfMSA9IFtdO1xuICAgICAgICB2YXIgc3RhdGVtZW50c18xID0gW107XG4gICAgICAgIHZhciB2YWx1ZXNfMSA9IFtdO1xuICAgICAgICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lLCB0aGluZykge1xuICAgICAgICAgICAgcGFyYW1zXzEucHVzaChuYW1lKTtcbiAgICAgICAgICAgIGlmIChpc1ByaW1pdGl2ZSh0aGluZykpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKHN0cmluZ2lmeVByaW1pdGl2ZSh0aGluZykpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0eXBlID0gZ2V0VHlwZSh0aGluZyk7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdOdW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1N0cmluZyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnQm9vbGVhbic6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goXCJPYmplY3QoXCIgKyBzdHJpbmdpZnkodGhpbmcudmFsdWVPZigpKSArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaCh0aGluZy50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goXCJuZXcgRGF0ZShcIiArIHRoaW5nLmdldFRpbWUoKSArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyYXknOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKFwiQXJyYXkoXCIgKyB0aGluZy5sZW5ndGggKyBcIilcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaW5nLmZvckVhY2goZnVuY3Rpb24gKHYsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKG5hbWUgKyBcIltcIiArIGkgKyBcIl09XCIgKyBzdHJpbmdpZnkodikpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnU2V0JzpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChcIm5ldyBTZXRcIik7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKG5hbWUgKyBcIi5cIiArIEFycmF5LmZyb20odGhpbmcpLm1hcChmdW5jdGlvbiAodikgeyByZXR1cm4gXCJhZGQoXCIgKyBzdHJpbmdpZnkodikgKyBcIilcIjsgfSkuam9pbignLicpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnTWFwJzpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChcIm5ldyBNYXBcIik7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKG5hbWUgKyBcIi5cIiArIEFycmF5LmZyb20odGhpbmcpLm1hcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrID0gX2FbMF0sIHYgPSBfYVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInNldChcIiArIHN0cmluZ2lmeShrKSArIFwiLCBcIiArIHN0cmluZ2lmeSh2KSArIFwiKVwiO1xuICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcuJykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGluZykgPT09IG51bGwgPyAnT2JqZWN0LmNyZWF0ZShudWxsKScgOiAne30nKTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGhpbmcpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50c18xLnB1c2goXCJcIiArIG5hbWUgKyBzYWZlUHJvcChrZXkpICsgXCI9XCIgKyBzdHJpbmdpZnkodGhpbmdba2V5XSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKFwicmV0dXJuIFwiICsgc3RyKTtcbiAgICAgICAgcmV0dXJuIFwiKGZ1bmN0aW9uKFwiICsgcGFyYW1zXzEuam9pbignLCcpICsgXCIpe1wiICsgc3RhdGVtZW50c18xLmpvaW4oJzsnKSArIFwifShcIiArIHZhbHVlc18xLmpvaW4oJywnKSArIFwiKSlcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0TmFtZShudW0pIHtcbiAgICB2YXIgbmFtZSA9ICcnO1xuICAgIGRvIHtcbiAgICAgICAgbmFtZSA9IGNoYXJzW251bSAlIGNoYXJzLmxlbmd0aF0gKyBuYW1lO1xuICAgICAgICBudW0gPSB+fihudW0gLyBjaGFycy5sZW5ndGgpIC0gMTtcbiAgICB9IHdoaWxlIChudW0gPj0gMCk7XG4gICAgcmV0dXJuIHJlc2VydmVkLnRlc3QobmFtZSkgPyBuYW1lICsgXCJfXCIgOiBuYW1lO1xufVxuZnVuY3Rpb24gaXNQcmltaXRpdmUodGhpbmcpIHtcbiAgICByZXR1cm4gT2JqZWN0KHRoaW5nKSAhPT0gdGhpbmc7XG59XG5mdW5jdGlvbiBzdHJpbmdpZnlQcmltaXRpdmUodGhpbmcpIHtcbiAgICBpZiAodHlwZW9mIHRoaW5nID09PSAnc3RyaW5nJylcbiAgICAgICAgcmV0dXJuIHN0cmluZ2lmeVN0cmluZyh0aGluZyk7XG4gICAgaWYgKHRoaW5nID09PSB2b2lkIDApXG4gICAgICAgIHJldHVybiAndm9pZCAwJztcbiAgICBpZiAodGhpbmcgPT09IDAgJiYgMSAvIHRoaW5nIDwgMClcbiAgICAgICAgcmV0dXJuICctMCc7XG4gICAgdmFyIHN0ciA9IFN0cmluZyh0aGluZyk7XG4gICAgaWYgKHR5cGVvZiB0aGluZyA9PT0gJ251bWJlcicpXG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXigtKT8wXFwuLywgJyQxLicpO1xuICAgIHJldHVybiBzdHI7XG59XG5mdW5jdGlvbiBnZXRUeXBlKHRoaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGluZykuc2xpY2UoOCwgLTEpO1xufVxuZnVuY3Rpb24gZXNjYXBlVW5zYWZlQ2hhcihjKSB7XG4gICAgcmV0dXJuIGVzY2FwZWRbY10gfHwgYztcbn1cbmZ1bmN0aW9uIGVzY2FwZVVuc2FmZUNoYXJzKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSh1bnNhZmVDaGFycywgZXNjYXBlVW5zYWZlQ2hhcik7XG59XG5mdW5jdGlvbiBzYWZlS2V5KGtleSkge1xuICAgIHJldHVybiAvXltfJGEtekEtWl1bXyRhLXpBLVowLTldKiQvLnRlc3Qoa2V5KSA/IGtleSA6IGVzY2FwZVVuc2FmZUNoYXJzKEpTT04uc3RyaW5naWZ5KGtleSkpO1xufVxuZnVuY3Rpb24gc2FmZVByb3Aoa2V5KSB7XG4gICAgcmV0dXJuIC9eW18kYS16QS1aXVtfJGEtekEtWjAtOV0qJC8udGVzdChrZXkpID8gXCIuXCIgKyBrZXkgOiBcIltcIiArIGVzY2FwZVVuc2FmZUNoYXJzKEpTT04uc3RyaW5naWZ5KGtleSkpICsgXCJdXCI7XG59XG5mdW5jdGlvbiBzdHJpbmdpZnlTdHJpbmcoc3RyKSB7XG4gICAgdmFyIHJlc3VsdCA9ICdcIic7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdmFyIGNoYXIgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICB2YXIgY29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgaWYgKGNoYXIgPT09ICdcIicpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAnXFxcXFwiJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjaGFyIGluIGVzY2FwZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBlc2NhcGVkW2NoYXJdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvZGUgPj0gMHhkODAwICYmIGNvZGUgPD0gMHhkZmZmKSB7XG4gICAgICAgICAgICB2YXIgbmV4dCA9IHN0ci5jaGFyQ29kZUF0KGkgKyAxKTtcbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgdGhlIGJlZ2lubmluZyBvZiBhIFtoaWdoLCBsb3ddIHN1cnJvZ2F0ZSBwYWlyLFxuICAgICAgICAgICAgLy8gYWRkIHRoZSBuZXh0IHR3byBjaGFyYWN0ZXJzLCBvdGhlcndpc2UgZXNjYXBlXG4gICAgICAgICAgICBpZiAoY29kZSA8PSAweGRiZmYgJiYgKG5leHQgPj0gMHhkYzAwICYmIG5leHQgPD0gMHhkZmZmKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBjaGFyICsgc3RyWysraV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCJcXFxcdVwiICsgY29kZS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBjaGFyO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCArPSAnXCInO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIEJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS90bXB2YXIvanNkb20vYmxvYi9hYTg1YjJhYmYwNzc2NmZmN2JmNWMxZjZkYWFmYjM3MjZmMmYyZGI1L2xpYi9qc2RvbS9saXZpbmcvYmxvYi5qc1xuXG4vLyBmaXggZm9yIFwiUmVhZGFibGVcIiBpc24ndCBhIG5hbWVkIGV4cG9ydCBpc3N1ZVxuY29uc3QgUmVhZGFibGUgPSBTdHJlYW0uUmVhZGFibGU7XG5cbmNvbnN0IEJVRkZFUiA9IFN5bWJvbCgnYnVmZmVyJyk7XG5jb25zdCBUWVBFID0gU3ltYm9sKCd0eXBlJyk7XG5cbmNsYXNzIEJsb2Ige1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzW1RZUEVdID0gJyc7XG5cblx0XHRjb25zdCBibG9iUGFydHMgPSBhcmd1bWVudHNbMF07XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IGFyZ3VtZW50c1sxXTtcblxuXHRcdGNvbnN0IGJ1ZmZlcnMgPSBbXTtcblx0XHRsZXQgc2l6ZSA9IDA7XG5cblx0XHRpZiAoYmxvYlBhcnRzKSB7XG5cdFx0XHRjb25zdCBhID0gYmxvYlBhcnRzO1xuXHRcdFx0Y29uc3QgbGVuZ3RoID0gTnVtYmVyKGEubGVuZ3RoKTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29uc3QgZWxlbWVudCA9IGFbaV07XG5cdFx0XHRcdGxldCBidWZmZXI7XG5cdFx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQnVmZmVyKSB7XG5cdFx0XHRcdFx0YnVmZmVyID0gZWxlbWVudDtcblx0XHRcdFx0fSBlbHNlIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoZWxlbWVudCkpIHtcblx0XHRcdFx0XHRidWZmZXIgPSBCdWZmZXIuZnJvbShlbGVtZW50LmJ1ZmZlciwgZWxlbWVudC5ieXRlT2Zmc2V0LCBlbGVtZW50LmJ5dGVMZW5ndGgpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuXHRcdFx0XHRcdGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGVsZW1lbnQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCbG9iKSB7XG5cdFx0XHRcdFx0YnVmZmVyID0gZWxlbWVudFtCVUZGRVJdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyA/IGVsZW1lbnQgOiBTdHJpbmcoZWxlbWVudCkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNpemUgKz0gYnVmZmVyLmxlbmd0aDtcblx0XHRcdFx0YnVmZmVycy5wdXNoKGJ1ZmZlcik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpc1tCVUZGRVJdID0gQnVmZmVyLmNvbmNhdChidWZmZXJzKTtcblxuXHRcdGxldCB0eXBlID0gb3B0aW9ucyAmJiBvcHRpb25zLnR5cGUgIT09IHVuZGVmaW5lZCAmJiBTdHJpbmcob3B0aW9ucy50eXBlKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGlmICh0eXBlICYmICEvW15cXHUwMDIwLVxcdTAwN0VdLy50ZXN0KHR5cGUpKSB7XG5cdFx0XHR0aGlzW1RZUEVdID0gdHlwZTtcblx0XHR9XG5cdH1cblx0Z2V0IHNpemUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbQlVGRkVSXS5sZW5ndGg7XG5cdH1cblx0Z2V0IHR5cGUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbVFlQRV07XG5cdH1cblx0dGV4dCgpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXNbQlVGRkVSXS50b1N0cmluZygpKTtcblx0fVxuXHRhcnJheUJ1ZmZlcigpIHtcblx0XHRjb25zdCBidWYgPSB0aGlzW0JVRkZFUl07XG5cdFx0Y29uc3QgYWIgPSBidWYuYnVmZmVyLnNsaWNlKGJ1Zi5ieXRlT2Zmc2V0LCBidWYuYnl0ZU9mZnNldCArIGJ1Zi5ieXRlTGVuZ3RoKTtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFiKTtcblx0fVxuXHRzdHJlYW0oKSB7XG5cdFx0Y29uc3QgcmVhZGFibGUgPSBuZXcgUmVhZGFibGUoKTtcblx0XHRyZWFkYWJsZS5fcmVhZCA9IGZ1bmN0aW9uICgpIHt9O1xuXHRcdHJlYWRhYmxlLnB1c2godGhpc1tCVUZGRVJdKTtcblx0XHRyZWFkYWJsZS5wdXNoKG51bGwpO1xuXHRcdHJldHVybiByZWFkYWJsZTtcblx0fVxuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gJ1tvYmplY3QgQmxvYl0nO1xuXHR9XG5cdHNsaWNlKCkge1xuXHRcdGNvbnN0IHNpemUgPSB0aGlzLnNpemU7XG5cblx0XHRjb25zdCBzdGFydCA9IGFyZ3VtZW50c1swXTtcblx0XHRjb25zdCBlbmQgPSBhcmd1bWVudHNbMV07XG5cdFx0bGV0IHJlbGF0aXZlU3RhcnQsIHJlbGF0aXZlRW5kO1xuXHRcdGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZWxhdGl2ZVN0YXJ0ID0gMDtcblx0XHR9IGVsc2UgaWYgKHN0YXJ0IDwgMCkge1xuXHRcdFx0cmVsYXRpdmVTdGFydCA9IE1hdGgubWF4KHNpemUgKyBzdGFydCwgMCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbGF0aXZlU3RhcnQgPSBNYXRoLm1pbihzdGFydCwgc2l6ZSk7XG5cdFx0fVxuXHRcdGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmVsYXRpdmVFbmQgPSBzaXplO1xuXHRcdH0gZWxzZSBpZiAoZW5kIDwgMCkge1xuXHRcdFx0cmVsYXRpdmVFbmQgPSBNYXRoLm1heChzaXplICsgZW5kLCAwKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVsYXRpdmVFbmQgPSBNYXRoLm1pbihlbmQsIHNpemUpO1xuXHRcdH1cblx0XHRjb25zdCBzcGFuID0gTWF0aC5tYXgocmVsYXRpdmVFbmQgLSByZWxhdGl2ZVN0YXJ0LCAwKTtcblxuXHRcdGNvbnN0IGJ1ZmZlciA9IHRoaXNbQlVGRkVSXTtcblx0XHRjb25zdCBzbGljZWRCdWZmZXIgPSBidWZmZXIuc2xpY2UocmVsYXRpdmVTdGFydCwgcmVsYXRpdmVTdGFydCArIHNwYW4pO1xuXHRcdGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbXSwgeyB0eXBlOiBhcmd1bWVudHNbMl0gfSk7XG5cdFx0YmxvYltCVUZGRVJdID0gc2xpY2VkQnVmZmVyO1xuXHRcdHJldHVybiBibG9iO1xuXHR9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEJsb2IucHJvdG90eXBlLCB7XG5cdHNpemU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHR0eXBlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0c2xpY2U6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJsb2IucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcblx0dmFsdWU6ICdCbG9iJyxcblx0d3JpdGFibGU6IGZhbHNlLFxuXHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0Y29uZmlndXJhYmxlOiB0cnVlXG59KTtcblxuLyoqXG4gKiBmZXRjaC1lcnJvci5qc1xuICpcbiAqIEZldGNoRXJyb3IgaW50ZXJmYWNlIGZvciBvcGVyYXRpb25hbCBlcnJvcnNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBGZXRjaEVycm9yIGluc3RhbmNlXG4gKlxuICogQHBhcmFtICAgU3RyaW5nICAgICAgbWVzc2FnZSAgICAgIEVycm9yIG1lc3NhZ2UgZm9yIGh1bWFuXG4gKiBAcGFyYW0gICBTdHJpbmcgICAgICB0eXBlICAgICAgICAgRXJyb3IgdHlwZSBmb3IgbWFjaGluZVxuICogQHBhcmFtICAgU3RyaW5nICAgICAgc3lzdGVtRXJyb3IgIEZvciBOb2RlLmpzIHN5c3RlbSBlcnJvclxuICogQHJldHVybiAgRmV0Y2hFcnJvclxuICovXG5mdW5jdGlvbiBGZXRjaEVycm9yKG1lc3NhZ2UsIHR5cGUsIHN5c3RlbUVycm9yKSB7XG4gIEVycm9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy50eXBlID0gdHlwZTtcblxuICAvLyB3aGVuIGVyci50eXBlIGlzIGBzeXN0ZW1gLCBlcnIuY29kZSBjb250YWlucyBzeXN0ZW0gZXJyb3IgY29kZVxuICBpZiAoc3lzdGVtRXJyb3IpIHtcbiAgICB0aGlzLmNvZGUgPSB0aGlzLmVycm5vID0gc3lzdGVtRXJyb3IuY29kZTtcbiAgfVxuXG4gIC8vIGhpZGUgY3VzdG9tIGVycm9yIGltcGxlbWVudGF0aW9uIGRldGFpbHMgZnJvbSBlbmQtdXNlcnNcbiAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG59XG5cbkZldGNoRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuRmV0Y2hFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGZXRjaEVycm9yO1xuRmV0Y2hFcnJvci5wcm90b3R5cGUubmFtZSA9ICdGZXRjaEVycm9yJztcblxubGV0IGNvbnZlcnQ7XG50cnkge1xuXHRjb252ZXJ0ID0gcmVxdWlyZSgnZW5jb2RpbmcnKS5jb252ZXJ0O1xufSBjYXRjaCAoZSkge31cblxuY29uc3QgSU5URVJOQUxTID0gU3ltYm9sKCdCb2R5IGludGVybmFscycpO1xuXG4vLyBmaXggYW4gaXNzdWUgd2hlcmUgXCJQYXNzVGhyb3VnaFwiIGlzbid0IGEgbmFtZWQgZXhwb3J0IGZvciBub2RlIDwxMFxuY29uc3QgUGFzc1Rocm91Z2ggPSBTdHJlYW0uUGFzc1Rocm91Z2g7XG5cbi8qKlxuICogQm9keSBtaXhpblxuICpcbiAqIFJlZjogaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2JvZHlcbiAqXG4gKiBAcGFyYW0gICBTdHJlYW0gIGJvZHkgIFJlYWRhYmxlIHN0cmVhbVxuICogQHBhcmFtICAgT2JqZWN0ICBvcHRzICBSZXNwb25zZSBvcHRpb25zXG4gKiBAcmV0dXJuICBWb2lkXG4gKi9cbmZ1bmN0aW9uIEJvZHkoYm9keSkge1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fSxcblx0ICAgIF9yZWYkc2l6ZSA9IF9yZWYuc2l6ZTtcblxuXHRsZXQgc2l6ZSA9IF9yZWYkc2l6ZSA9PT0gdW5kZWZpbmVkID8gMCA6IF9yZWYkc2l6ZTtcblx0dmFyIF9yZWYkdGltZW91dCA9IF9yZWYudGltZW91dDtcblx0bGV0IHRpbWVvdXQgPSBfcmVmJHRpbWVvdXQgPT09IHVuZGVmaW5lZCA/IDAgOiBfcmVmJHRpbWVvdXQ7XG5cblx0aWYgKGJvZHkgPT0gbnVsbCkge1xuXHRcdC8vIGJvZHkgaXMgdW5kZWZpbmVkIG9yIG51bGxcblx0XHRib2R5ID0gbnVsbDtcblx0fSBlbHNlIGlmIChpc1VSTFNlYXJjaFBhcmFtcyhib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgYSBVUkxTZWFyY2hQYXJhbXNcblx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keS50b1N0cmluZygpKTtcblx0fSBlbHNlIGlmIChpc0Jsb2IoYm9keSkpIDsgZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSA7IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChib2R5KSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJykge1xuXHRcdC8vIGJvZHkgaXMgQXJyYXlCdWZmZXJcblx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keSk7XG5cdH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBBcnJheUJ1ZmZlclZpZXdcblx0XHRib2R5ID0gQnVmZmVyLmZyb20oYm9keS5idWZmZXIsIGJvZHkuYnl0ZU9mZnNldCwgYm9keS5ieXRlTGVuZ3RoKTtcblx0fSBlbHNlIGlmIChib2R5IGluc3RhbmNlb2YgU3RyZWFtKSA7IGVsc2Uge1xuXHRcdC8vIG5vbmUgb2YgdGhlIGFib3ZlXG5cdFx0Ly8gY29lcmNlIHRvIHN0cmluZyB0aGVuIGJ1ZmZlclxuXHRcdGJvZHkgPSBCdWZmZXIuZnJvbShTdHJpbmcoYm9keSkpO1xuXHR9XG5cdHRoaXNbSU5URVJOQUxTXSA9IHtcblx0XHRib2R5LFxuXHRcdGRpc3R1cmJlZDogZmFsc2UsXG5cdFx0ZXJyb3I6IG51bGxcblx0fTtcblx0dGhpcy5zaXplID0gc2l6ZTtcblx0dGhpcy50aW1lb3V0ID0gdGltZW91dDtcblxuXHRpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkge1xuXHRcdGJvZHkub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuXHRcdFx0Y29uc3QgZXJyb3IgPSBlcnIubmFtZSA9PT0gJ0Fib3J0RXJyb3InID8gZXJyIDogbmV3IEZldGNoRXJyb3IoYEludmFsaWQgcmVzcG9uc2UgYm9keSB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggJHtfdGhpcy51cmx9OiAke2Vyci5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnIpO1xuXHRcdFx0X3RoaXNbSU5URVJOQUxTXS5lcnJvciA9IGVycm9yO1xuXHRcdH0pO1xuXHR9XG59XG5cbkJvZHkucHJvdG90eXBlID0ge1xuXHRnZXQgYm9keSgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFNdLmJvZHk7XG5cdH0sXG5cblx0Z2V0IGJvZHlVc2VkKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uZGlzdHVyYmVkO1xuXHR9LFxuXG5cdC8qKlxuICAqIERlY29kZSByZXNwb25zZSBhcyBBcnJheUJ1ZmZlclxuICAqXG4gICogQHJldHVybiAgUHJvbWlzZVxuICAqL1xuXHRhcnJheUJ1ZmZlcigpIHtcblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKS50aGVuKGZ1bmN0aW9uIChidWYpIHtcblx0XHRcdHJldHVybiBidWYuYnVmZmVyLnNsaWNlKGJ1Zi5ieXRlT2Zmc2V0LCBidWYuYnl0ZU9mZnNldCArIGJ1Zi5ieXRlTGVuZ3RoKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKipcbiAgKiBSZXR1cm4gcmF3IHJlc3BvbnNlIGFzIEJsb2JcbiAgKlxuICAqIEByZXR1cm4gUHJvbWlzZVxuICAqL1xuXHRibG9iKCkge1xuXHRcdGxldCBjdCA9IHRoaXMuaGVhZGVycyAmJiB0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSB8fCAnJztcblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKS50aGVuKGZ1bmN0aW9uIChidWYpIHtcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKFxuXHRcdFx0Ly8gUHJldmVudCBjb3B5aW5nXG5cdFx0XHRuZXcgQmxvYihbXSwge1xuXHRcdFx0XHR0eXBlOiBjdC50b0xvd2VyQ2FzZSgpXG5cdFx0XHR9KSwge1xuXHRcdFx0XHRbQlVGRkVSXTogYnVmXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSxcblxuXHQvKipcbiAgKiBEZWNvZGUgcmVzcG9uc2UgYXMganNvblxuICAqXG4gICogQHJldHVybiAgUHJvbWlzZVxuICAqL1xuXHRqc29uKCkge1xuXHRcdHZhciBfdGhpczIgPSB0aGlzO1xuXG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcykudGhlbihmdW5jdGlvbiAoYnVmZmVyKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXR1cm4gSlNPTi5wYXJzZShidWZmZXIudG9TdHJpbmcoKSk7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0cmV0dXJuIEJvZHkuUHJvbWlzZS5yZWplY3QobmV3IEZldGNoRXJyb3IoYGludmFsaWQganNvbiByZXNwb25zZSBib2R5IGF0ICR7X3RoaXMyLnVybH0gcmVhc29uOiAke2Vyci5tZXNzYWdlfWAsICdpbnZhbGlkLWpzb24nKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqXG4gICogRGVjb2RlIHJlc3BvbnNlIGFzIHRleHRcbiAgKlxuICAqIEByZXR1cm4gIFByb21pc2VcbiAgKi9cblx0dGV4dCgpIHtcblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKS50aGVuKGZ1bmN0aW9uIChidWZmZXIpIHtcblx0XHRcdHJldHVybiBidWZmZXIudG9TdHJpbmcoKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKipcbiAgKiBEZWNvZGUgcmVzcG9uc2UgYXMgYnVmZmVyIChub24tc3BlYyBhcGkpXG4gICpcbiAgKiBAcmV0dXJuICBQcm9taXNlXG4gICovXG5cdGJ1ZmZlcigpIHtcblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKTtcblx0fSxcblxuXHQvKipcbiAgKiBEZWNvZGUgcmVzcG9uc2UgYXMgdGV4dCwgd2hpbGUgYXV0b21hdGljYWxseSBkZXRlY3RpbmcgdGhlIGVuY29kaW5nIGFuZFxuICAqIHRyeWluZyB0byBkZWNvZGUgdG8gVVRGLTggKG5vbi1zcGVjIGFwaSlcbiAgKlxuICAqIEByZXR1cm4gIFByb21pc2VcbiAgKi9cblx0dGV4dENvbnZlcnRlZCgpIHtcblx0XHR2YXIgX3RoaXMzID0gdGhpcztcblxuXHRcdHJldHVybiBjb25zdW1lQm9keS5jYWxsKHRoaXMpLnRoZW4oZnVuY3Rpb24gKGJ1ZmZlcikge1xuXHRcdFx0cmV0dXJuIGNvbnZlcnRCb2R5KGJ1ZmZlciwgX3RoaXMzLmhlYWRlcnMpO1xuXHRcdH0pO1xuXHR9XG59O1xuXG4vLyBJbiBicm93c2VycywgYWxsIHByb3BlcnRpZXMgYXJlIGVudW1lcmFibGUuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhCb2R5LnByb3RvdHlwZSwge1xuXHRib2R5OiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0Ym9keVVzZWQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRhcnJheUJ1ZmZlcjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGJsb2I6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRqc29uOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0dGV4dDogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuXG5Cb2R5Lm1peEluID0gZnVuY3Rpb24gKHByb3RvKSB7XG5cdGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhCb2R5LnByb3RvdHlwZSkpIHtcblx0XHQvLyBpc3RhbmJ1bCBpZ25vcmUgZWxzZTogZnV0dXJlIHByb29mXG5cdFx0aWYgKCEobmFtZSBpbiBwcm90bykpIHtcblx0XHRcdGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEJvZHkucHJvdG90eXBlLCBuYW1lKTtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgbmFtZSwgZGVzYyk7XG5cdFx0fVxuXHR9XG59O1xuXG4vKipcbiAqIENvbnN1bWUgYW5kIGNvbnZlcnQgYW4gZW50aXJlIEJvZHkgdG8gYSBCdWZmZXIuXG4gKlxuICogUmVmOiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1ib2R5LWNvbnN1bWUtYm9keVxuICpcbiAqIEByZXR1cm4gIFByb21pc2VcbiAqL1xuZnVuY3Rpb24gY29uc3VtZUJvZHkoKSB7XG5cdHZhciBfdGhpczQgPSB0aGlzO1xuXG5cdGlmICh0aGlzW0lOVEVSTkFMU10uZGlzdHVyYmVkKSB7XG5cdFx0cmV0dXJuIEJvZHkuUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcihgYm9keSB1c2VkIGFscmVhZHkgZm9yOiAke3RoaXMudXJsfWApKTtcblx0fVxuXG5cdHRoaXNbSU5URVJOQUxTXS5kaXN0dXJiZWQgPSB0cnVlO1xuXG5cdGlmICh0aGlzW0lOVEVSTkFMU10uZXJyb3IpIHtcblx0XHRyZXR1cm4gQm9keS5Qcm9taXNlLnJlamVjdCh0aGlzW0lOVEVSTkFMU10uZXJyb3IpO1xuXHR9XG5cblx0bGV0IGJvZHkgPSB0aGlzLmJvZHk7XG5cblx0Ly8gYm9keSBpcyBudWxsXG5cdGlmIChib2R5ID09PSBudWxsKSB7XG5cdFx0cmV0dXJuIEJvZHkuUHJvbWlzZS5yZXNvbHZlKEJ1ZmZlci5hbGxvYygwKSk7XG5cdH1cblxuXHQvLyBib2R5IGlzIGJsb2Jcblx0aWYgKGlzQmxvYihib2R5KSkge1xuXHRcdGJvZHkgPSBib2R5LnN0cmVhbSgpO1xuXHR9XG5cblx0Ly8gYm9keSBpcyBidWZmZXJcblx0aWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xuXHRcdHJldHVybiBCb2R5LlByb21pc2UucmVzb2x2ZShib2R5KTtcblx0fVxuXG5cdC8vIGlzdGFuYnVsIGlnbm9yZSBpZjogc2hvdWxkIG5ldmVyIGhhcHBlblxuXHRpZiAoIShib2R5IGluc3RhbmNlb2YgU3RyZWFtKSkge1xuXHRcdHJldHVybiBCb2R5LlByb21pc2UucmVzb2x2ZShCdWZmZXIuYWxsb2MoMCkpO1xuXHR9XG5cblx0Ly8gYm9keSBpcyBzdHJlYW1cblx0Ly8gZ2V0IHJlYWR5IHRvIGFjdHVhbGx5IGNvbnN1bWUgdGhlIGJvZHlcblx0bGV0IGFjY3VtID0gW107XG5cdGxldCBhY2N1bUJ5dGVzID0gMDtcblx0bGV0IGFib3J0ID0gZmFsc2U7XG5cblx0cmV0dXJuIG5ldyBCb2R5LlByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdGxldCByZXNUaW1lb3V0O1xuXG5cdFx0Ly8gYWxsb3cgdGltZW91dCBvbiBzbG93IHJlc3BvbnNlIGJvZHlcblx0XHRpZiAoX3RoaXM0LnRpbWVvdXQpIHtcblx0XHRcdHJlc1RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0YWJvcnQgPSB0cnVlO1xuXHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYFJlc3BvbnNlIHRpbWVvdXQgd2hpbGUgdHJ5aW5nIHRvIGZldGNoICR7X3RoaXM0LnVybH0gKG92ZXIgJHtfdGhpczQudGltZW91dH1tcylgLCAnYm9keS10aW1lb3V0JykpO1xuXHRcdFx0fSwgX3RoaXM0LnRpbWVvdXQpO1xuXHRcdH1cblxuXHRcdC8vIGhhbmRsZSBzdHJlYW0gZXJyb3JzXG5cdFx0Ym9keS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRpZiAoZXJyLm5hbWUgPT09ICdBYm9ydEVycm9yJykge1xuXHRcdFx0XHQvLyBpZiB0aGUgcmVxdWVzdCB3YXMgYWJvcnRlZCwgcmVqZWN0IHdpdGggdGhpcyBFcnJvclxuXHRcdFx0XHRhYm9ydCA9IHRydWU7XG5cdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gb3RoZXIgZXJyb3JzLCBzdWNoIGFzIGluY29ycmVjdCBjb250ZW50LWVuY29kaW5nXG5cdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgSW52YWxpZCByZXNwb25zZSBib2R5IHdoaWxlIHRyeWluZyB0byBmZXRjaCAke190aGlzNC51cmx9OiAke2Vyci5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnIpKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGJvZHkub24oJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcblx0XHRcdGlmIChhYm9ydCB8fCBjaHVuayA9PT0gbnVsbCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChfdGhpczQuc2l6ZSAmJiBhY2N1bUJ5dGVzICsgY2h1bmsubGVuZ3RoID4gX3RoaXM0LnNpemUpIHtcblx0XHRcdFx0YWJvcnQgPSB0cnVlO1xuXHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYGNvbnRlbnQgc2l6ZSBhdCAke190aGlzNC51cmx9IG92ZXIgbGltaXQ6ICR7X3RoaXM0LnNpemV9YCwgJ21heC1zaXplJykpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGFjY3VtQnl0ZXMgKz0gY2h1bmsubGVuZ3RoO1xuXHRcdFx0YWNjdW0ucHVzaChjaHVuayk7XG5cdFx0fSk7XG5cblx0XHRib2R5Lm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoYWJvcnQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjbGVhclRpbWVvdXQocmVzVGltZW91dCk7XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJlc29sdmUoQnVmZmVyLmNvbmNhdChhY2N1bSwgYWNjdW1CeXRlcykpO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdC8vIGhhbmRsZSBzdHJlYW1zIHRoYXQgaGF2ZSBhY2N1bXVsYXRlZCB0b28gbXVjaCBkYXRhIChpc3N1ZSAjNDE0KVxuXHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYENvdWxkIG5vdCBjcmVhdGUgQnVmZmVyIGZyb20gcmVzcG9uc2UgYm9keSBmb3IgJHtfdGhpczQudXJsfTogJHtlcnIubWVzc2FnZX1gLCAnc3lzdGVtJywgZXJyKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xufVxuXG4vKipcbiAqIERldGVjdCBidWZmZXIgZW5jb2RpbmcgYW5kIGNvbnZlcnQgdG8gdGFyZ2V0IGVuY29kaW5nXG4gKiByZWY6IGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvV0QtaHRtbDUtMjAxMTAxMTMvcGFyc2luZy5odG1sI2RldGVybWluaW5nLXRoZS1jaGFyYWN0ZXItZW5jb2RpbmdcbiAqXG4gKiBAcGFyYW0gICBCdWZmZXIgIGJ1ZmZlciAgICBJbmNvbWluZyBidWZmZXJcbiAqIEBwYXJhbSAgIFN0cmluZyAgZW5jb2RpbmcgIFRhcmdldCBlbmNvZGluZ1xuICogQHJldHVybiAgU3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRCb2R5KGJ1ZmZlciwgaGVhZGVycykge1xuXHRpZiAodHlwZW9mIGNvbnZlcnQgIT09ICdmdW5jdGlvbicpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBwYWNrYWdlIGBlbmNvZGluZ2AgbXVzdCBiZSBpbnN0YWxsZWQgdG8gdXNlIHRoZSB0ZXh0Q29udmVydGVkKCkgZnVuY3Rpb24nKTtcblx0fVxuXG5cdGNvbnN0IGN0ID0gaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpO1xuXHRsZXQgY2hhcnNldCA9ICd1dGYtOCc7XG5cdGxldCByZXMsIHN0cjtcblxuXHQvLyBoZWFkZXJcblx0aWYgKGN0KSB7XG5cdFx0cmVzID0gL2NoYXJzZXQ9KFteO10qKS9pLmV4ZWMoY3QpO1xuXHR9XG5cblx0Ly8gbm8gY2hhcnNldCBpbiBjb250ZW50IHR5cGUsIHBlZWsgYXQgcmVzcG9uc2UgYm9keSBmb3IgYXQgbW9zdCAxMDI0IGJ5dGVzXG5cdHN0ciA9IGJ1ZmZlci5zbGljZSgwLCAxMDI0KS50b1N0cmluZygpO1xuXG5cdC8vIGh0bWw1XG5cdGlmICghcmVzICYmIHN0cikge1xuXHRcdHJlcyA9IC88bWV0YS4rP2NoYXJzZXQ9KFsnXCJdKSguKz8pXFwxL2kuZXhlYyhzdHIpO1xuXHR9XG5cblx0Ly8gaHRtbDRcblx0aWYgKCFyZXMgJiYgc3RyKSB7XG5cdFx0cmVzID0gLzxtZXRhW1xcc10rP2h0dHAtZXF1aXY9KFsnXCJdKWNvbnRlbnQtdHlwZVxcMVtcXHNdKz9jb250ZW50PShbJ1wiXSkoLis/KVxcMi9pLmV4ZWMoc3RyKTtcblxuXHRcdGlmIChyZXMpIHtcblx0XHRcdHJlcyA9IC9jaGFyc2V0PSguKikvaS5leGVjKHJlcy5wb3AoKSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8geG1sXG5cdGlmICghcmVzICYmIHN0cikge1xuXHRcdHJlcyA9IC88XFw/eG1sLis/ZW5jb2Rpbmc9KFsnXCJdKSguKz8pXFwxL2kuZXhlYyhzdHIpO1xuXHR9XG5cblx0Ly8gZm91bmQgY2hhcnNldFxuXHRpZiAocmVzKSB7XG5cdFx0Y2hhcnNldCA9IHJlcy5wb3AoKTtcblxuXHRcdC8vIHByZXZlbnQgZGVjb2RlIGlzc3VlcyB3aGVuIHNpdGVzIHVzZSBpbmNvcnJlY3QgZW5jb2Rpbmdcblx0XHQvLyByZWY6IGh0dHBzOi8vaHNpdm9uZW4uZmkvZW5jb2RpbmctbWVudS9cblx0XHRpZiAoY2hhcnNldCA9PT0gJ2diMjMxMicgfHwgY2hhcnNldCA9PT0gJ2diaycpIHtcblx0XHRcdGNoYXJzZXQgPSAnZ2IxODAzMCc7XG5cdFx0fVxuXHR9XG5cblx0Ly8gdHVybiByYXcgYnVmZmVycyBpbnRvIGEgc2luZ2xlIHV0Zi04IGJ1ZmZlclxuXHRyZXR1cm4gY29udmVydChidWZmZXIsICdVVEYtOCcsIGNoYXJzZXQpLnRvU3RyaW5nKCk7XG59XG5cbi8qKlxuICogRGV0ZWN0IGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICogcmVmOiBodHRwczovL2dpdGh1Yi5jb20vYml0aW5uL25vZGUtZmV0Y2gvaXNzdWVzLzI5NiNpc3N1ZWNvbW1lbnQtMzA3NTk4MTQzXG4gKlxuICogQHBhcmFtICAgT2JqZWN0ICBvYmogICAgIE9iamVjdCB0byBkZXRlY3QgYnkgdHlwZSBvciBicmFuZFxuICogQHJldHVybiAgU3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKG9iaikge1xuXHQvLyBEdWNrLXR5cGluZyBhcyBhIG5lY2Vzc2FyeSBjb25kaXRpb24uXG5cdGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqLmFwcGVuZCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygb2JqLmRlbGV0ZSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygb2JqLmdldCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygb2JqLmdldEFsbCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygb2JqLmhhcyAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygb2JqLnNldCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIEJyYW5kLWNoZWNraW5nIGFuZCBtb3JlIGR1Y2stdHlwaW5nIGFzIG9wdGlvbmFsIGNvbmRpdGlvbi5cblx0cmV0dXJuIG9iai5jb25zdHJ1Y3Rvci5uYW1lID09PSAnVVJMU2VhcmNoUGFyYW1zJyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgVVJMU2VhcmNoUGFyYW1zXScgfHwgdHlwZW9mIG9iai5zb3J0ID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGEgVzNDIGBCbG9iYCBvYmplY3QgKHdoaWNoIGBGaWxlYCBpbmhlcml0cyBmcm9tKVxuICogQHBhcmFtICB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0Jsb2Iob2JqKSB7XG5cdHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLmFycmF5QnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmoudHlwZSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIG9iai5zdHJlYW0gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdzdHJpbmcnICYmIC9eKEJsb2J8RmlsZSkkLy50ZXN0KG9iai5jb25zdHJ1Y3Rvci5uYW1lKSAmJiAvXihCbG9ifEZpbGUpJC8udGVzdChvYmpbU3ltYm9sLnRvU3RyaW5nVGFnXSk7XG59XG5cbi8qKlxuICogQ2xvbmUgYm9keSBnaXZlbiBSZXMvUmVxIGluc3RhbmNlXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgIGluc3RhbmNlICBSZXNwb25zZSBvciBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcmV0dXJuICBNaXhlZFxuICovXG5mdW5jdGlvbiBjbG9uZShpbnN0YW5jZSkge1xuXHRsZXQgcDEsIHAyO1xuXHRsZXQgYm9keSA9IGluc3RhbmNlLmJvZHk7XG5cblx0Ly8gZG9uJ3QgYWxsb3cgY2xvbmluZyBhIHVzZWQgYm9keVxuXHRpZiAoaW5zdGFuY2UuYm9keVVzZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBjbG9uZSBib2R5IGFmdGVyIGl0IGlzIHVzZWQnKTtcblx0fVxuXG5cdC8vIGNoZWNrIHRoYXQgYm9keSBpcyBhIHN0cmVhbSBhbmQgbm90IGZvcm0tZGF0YSBvYmplY3Rcblx0Ly8gbm90ZTogd2UgY2FuJ3QgY2xvbmUgdGhlIGZvcm0tZGF0YSBvYmplY3Qgd2l0aG91dCBoYXZpbmcgaXQgYXMgYSBkZXBlbmRlbmN5XG5cdGlmIChib2R5IGluc3RhbmNlb2YgU3RyZWFtICYmIHR5cGVvZiBib2R5LmdldEJvdW5kYXJ5ICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0Ly8gdGVlIGluc3RhbmNlIGJvZHlcblx0XHRwMSA9IG5ldyBQYXNzVGhyb3VnaCgpO1xuXHRcdHAyID0gbmV3IFBhc3NUaHJvdWdoKCk7XG5cdFx0Ym9keS5waXBlKHAxKTtcblx0XHRib2R5LnBpcGUocDIpO1xuXHRcdC8vIHNldCBpbnN0YW5jZSBib2R5IHRvIHRlZWQgYm9keSBhbmQgcmV0dXJuIHRoZSBvdGhlciB0ZWVkIGJvZHlcblx0XHRpbnN0YW5jZVtJTlRFUk5BTFNdLmJvZHkgPSBwMTtcblx0XHRib2R5ID0gcDI7XG5cdH1cblxuXHRyZXR1cm4gYm9keTtcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyB0aGUgb3BlcmF0aW9uIFwiZXh0cmFjdCBhIGBDb250ZW50LVR5cGVgIHZhbHVlIGZyb20gfG9iamVjdHxcIiBhc1xuICogc3BlY2lmaWVkIGluIHRoZSBzcGVjaWZpY2F0aW9uOlxuICogaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtYm9keWluaXQtZXh0cmFjdFxuICpcbiAqIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGluc3RhbmNlLmJvZHkgaXMgcHJlc2VudC5cbiAqXG4gKiBAcGFyYW0gICBNaXhlZCAgaW5zdGFuY2UgIEFueSBvcHRpb25zLmJvZHkgaW5wdXRcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdENvbnRlbnRUeXBlKGJvZHkpIHtcblx0aWYgKGJvZHkgPT09IG51bGwpIHtcblx0XHQvLyBib2R5IGlzIG51bGxcblx0XHRyZXR1cm4gbnVsbDtcblx0fSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcblx0XHQvLyBib2R5IGlzIHN0cmluZ1xuXHRcdHJldHVybiAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jztcblx0fSBlbHNlIGlmIChpc1VSTFNlYXJjaFBhcmFtcyhib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgYSBVUkxTZWFyY2hQYXJhbXNcblx0XHRyZXR1cm4gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04Jztcblx0fSBlbHNlIGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIGJsb2Jcblx0XHRyZXR1cm4gYm9keS50eXBlIHx8IG51bGw7XG5cdH0gZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBidWZmZXJcblx0XHRyZXR1cm4gbnVsbDtcblx0fSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYm9keSkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXScpIHtcblx0XHQvLyBib2R5IGlzIEFycmF5QnVmZmVyXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBBcnJheUJ1ZmZlclZpZXdcblx0XHRyZXR1cm4gbnVsbDtcblx0fSBlbHNlIGlmICh0eXBlb2YgYm9keS5nZXRCb3VuZGFyeSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdC8vIGRldGVjdCBmb3JtIGRhdGEgaW5wdXQgZnJvbSBmb3JtLWRhdGEgbW9kdWxlXG5cdFx0cmV0dXJuIGBtdWx0aXBhcnQvZm9ybS1kYXRhO2JvdW5kYXJ5PSR7Ym9keS5nZXRCb3VuZGFyeSgpfWA7XG5cdH0gZWxzZSBpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkge1xuXHRcdC8vIGJvZHkgaXMgc3RyZWFtXG5cdFx0Ly8gY2FuJ3QgcmVhbGx5IGRvIG11Y2ggYWJvdXQgdGhpc1xuXHRcdHJldHVybiBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdC8vIEJvZHkgY29uc3RydWN0b3IgZGVmYXVsdHMgb3RoZXIgdGhpbmdzIHRvIHN0cmluZ1xuXHRcdHJldHVybiAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jztcblx0fVxufVxuXG4vKipcbiAqIFRoZSBGZXRjaCBTdGFuZGFyZCB0cmVhdHMgdGhpcyBhcyBpZiBcInRvdGFsIGJ5dGVzXCIgaXMgYSBwcm9wZXJ0eSBvbiB0aGUgYm9keS5cbiAqIEZvciB1cywgd2UgaGF2ZSB0byBleHBsaWNpdGx5IGdldCBpdCB3aXRoIGEgZnVuY3Rpb24uXG4gKlxuICogcmVmOiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1ib2R5LXRvdGFsLWJ5dGVzXG4gKlxuICogQHBhcmFtICAgQm9keSAgICBpbnN0YW5jZSAgIEluc3RhbmNlIG9mIEJvZHlcbiAqIEByZXR1cm4gIE51bWJlcj8gICAgICAgICAgICBOdW1iZXIgb2YgYnl0ZXMsIG9yIG51bGwgaWYgbm90IHBvc3NpYmxlXG4gKi9cbmZ1bmN0aW9uIGdldFRvdGFsQnl0ZXMoaW5zdGFuY2UpIHtcblx0Y29uc3QgYm9keSA9IGluc3RhbmNlLmJvZHk7XG5cblxuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdC8vIGJvZHkgaXMgbnVsbFxuXHRcdHJldHVybiAwO1xuXHR9IGVsc2UgaWYgKGlzQmxvYihib2R5KSkge1xuXHRcdHJldHVybiBib2R5LnNpemU7XG5cdH0gZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBidWZmZXJcblx0XHRyZXR1cm4gYm9keS5sZW5ndGg7XG5cdH0gZWxzZSBpZiAoYm9keSAmJiB0eXBlb2YgYm9keS5nZXRMZW5ndGhTeW5jID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0Ly8gZGV0ZWN0IGZvcm0gZGF0YSBpbnB1dCBmcm9tIGZvcm0tZGF0YSBtb2R1bGVcblx0XHRpZiAoYm9keS5fbGVuZ3RoUmV0cmlldmVycyAmJiBib2R5Ll9sZW5ndGhSZXRyaWV2ZXJzLmxlbmd0aCA9PSAwIHx8IC8vIDEueFxuXHRcdGJvZHkuaGFzS25vd25MZW5ndGggJiYgYm9keS5oYXNLbm93bkxlbmd0aCgpKSB7XG5cdFx0XHQvLyAyLnhcblx0XHRcdHJldHVybiBib2R5LmdldExlbmd0aFN5bmMoKTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gYm9keSBpcyBzdHJlYW1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG4vKipcbiAqIFdyaXRlIGEgQm9keSB0byBhIE5vZGUuanMgV3JpdGFibGVTdHJlYW0gKGUuZy4gaHR0cC5SZXF1ZXN0KSBvYmplY3QuXG4gKlxuICogQHBhcmFtICAgQm9keSAgICBpbnN0YW5jZSAgIEluc3RhbmNlIG9mIEJvZHlcbiAqIEByZXR1cm4gIFZvaWRcbiAqL1xuZnVuY3Rpb24gd3JpdGVUb1N0cmVhbShkZXN0LCBpbnN0YW5jZSkge1xuXHRjb25zdCBib2R5ID0gaW5zdGFuY2UuYm9keTtcblxuXG5cdGlmIChib2R5ID09PSBudWxsKSB7XG5cdFx0Ly8gYm9keSBpcyBudWxsXG5cdFx0ZGVzdC5lbmQoKTtcblx0fSBlbHNlIGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHRib2R5LnN0cmVhbSgpLnBpcGUoZGVzdCk7XG5cdH0gZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBidWZmZXJcblx0XHRkZXN0LndyaXRlKGJvZHkpO1xuXHRcdGRlc3QuZW5kKCk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gYm9keSBpcyBzdHJlYW1cblx0XHRib2R5LnBpcGUoZGVzdCk7XG5cdH1cbn1cblxuLy8gZXhwb3NlIFByb21pc2VcbkJvZHkuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xuXG4vKipcbiAqIGhlYWRlcnMuanNcbiAqXG4gKiBIZWFkZXJzIGNsYXNzIG9mZmVycyBjb252ZW5pZW50IGhlbHBlcnNcbiAqL1xuXG5jb25zdCBpbnZhbGlkVG9rZW5SZWdleCA9IC9bXlxcXl9gYS16QS1aXFwtMC05ISMkJSYnKisufH5dLztcbmNvbnN0IGludmFsaWRIZWFkZXJDaGFyUmVnZXggPSAvW15cXHRcXHgyMC1cXHg3ZVxceDgwLVxceGZmXS87XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTmFtZShuYW1lKSB7XG5cdG5hbWUgPSBgJHtuYW1lfWA7XG5cdGlmIChpbnZhbGlkVG9rZW5SZWdleC50ZXN0KG5hbWUpIHx8IG5hbWUgPT09ICcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgJHtuYW1lfSBpcyBub3QgYSBsZWdhbCBIVFRQIGhlYWRlciBuYW1lYCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVWYWx1ZSh2YWx1ZSkge1xuXHR2YWx1ZSA9IGAke3ZhbHVlfWA7XG5cdGlmIChpbnZhbGlkSGVhZGVyQ2hhclJlZ2V4LnRlc3QodmFsdWUpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgJHt2YWx1ZX0gaXMgbm90IGEgbGVnYWwgSFRUUCBoZWFkZXIgdmFsdWVgKTtcblx0fVxufVxuXG4vKipcbiAqIEZpbmQgdGhlIGtleSBpbiB0aGUgbWFwIG9iamVjdCBnaXZlbiBhIGhlYWRlciBuYW1lLlxuICpcbiAqIFJldHVybnMgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbiAqXG4gKiBAcGFyYW0gICBTdHJpbmcgIG5hbWUgIEhlYWRlciBuYW1lXG4gKiBAcmV0dXJuICBTdHJpbmd8VW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGZpbmQobWFwLCBuYW1lKSB7XG5cdG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cdGZvciAoY29uc3Qga2V5IGluIG1hcCkge1xuXHRcdGlmIChrZXkudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSkge1xuXHRcdFx0cmV0dXJuIGtleTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuY29uc3QgTUFQID0gU3ltYm9sKCdtYXAnKTtcbmNsYXNzIEhlYWRlcnMge1xuXHQvKipcbiAgKiBIZWFkZXJzIGNsYXNzXG4gICpcbiAgKiBAcGFyYW0gICBPYmplY3QgIGhlYWRlcnMgIFJlc3BvbnNlIGhlYWRlcnNcbiAgKiBAcmV0dXJuICBWb2lkXG4gICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGxldCBpbml0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQ7XG5cblx0XHR0aGlzW01BUF0gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5cdFx0aWYgKGluaXQgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG5cdFx0XHRjb25zdCByYXdIZWFkZXJzID0gaW5pdC5yYXcoKTtcblx0XHRcdGNvbnN0IGhlYWRlck5hbWVzID0gT2JqZWN0LmtleXMocmF3SGVhZGVycyk7XG5cblx0XHRcdGZvciAoY29uc3QgaGVhZGVyTmFtZSBvZiBoZWFkZXJOYW1lcykge1xuXHRcdFx0XHRmb3IgKGNvbnN0IHZhbHVlIG9mIHJhd0hlYWRlcnNbaGVhZGVyTmFtZV0pIHtcblx0XHRcdFx0XHR0aGlzLmFwcGVuZChoZWFkZXJOYW1lLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFdlIGRvbid0IHdvcnJ5IGFib3V0IGNvbnZlcnRpbmcgcHJvcCB0byBCeXRlU3RyaW5nIGhlcmUgYXMgYXBwZW5kKClcblx0XHQvLyB3aWxsIGhhbmRsZSBpdC5cblx0XHRpZiAoaW5pdCA9PSBudWxsKSA7IGVsc2UgaWYgKHR5cGVvZiBpbml0ID09PSAnb2JqZWN0Jykge1xuXHRcdFx0Y29uc3QgbWV0aG9kID0gaW5pdFtTeW1ib2wuaXRlcmF0b3JdO1xuXHRcdFx0aWYgKG1ldGhvZCAhPSBudWxsKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgbWV0aG9kICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignSGVhZGVyIHBhaXJzIG11c3QgYmUgaXRlcmFibGUnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHNlcXVlbmNlPHNlcXVlbmNlPEJ5dGVTdHJpbmc+PlxuXHRcdFx0XHQvLyBOb3RlOiBwZXIgc3BlYyB3ZSBoYXZlIHRvIGZpcnN0IGV4aGF1c3QgdGhlIGxpc3RzIHRoZW4gcHJvY2VzcyB0aGVtXG5cdFx0XHRcdGNvbnN0IHBhaXJzID0gW107XG5cdFx0XHRcdGZvciAoY29uc3QgcGFpciBvZiBpbml0KSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBwYWlyICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgcGFpcltTeW1ib2wuaXRlcmF0b3JdICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFYWNoIGhlYWRlciBwYWlyIG11c3QgYmUgaXRlcmFibGUnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cGFpcnMucHVzaChBcnJheS5mcm9tKHBhaXIpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAoY29uc3QgcGFpciBvZiBwYWlycykge1xuXHRcdFx0XHRcdGlmIChwYWlyLmxlbmd0aCAhPT0gMikge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRWFjaCBoZWFkZXIgcGFpciBtdXN0IGJlIGEgbmFtZS92YWx1ZSB0dXBsZScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLmFwcGVuZChwYWlyWzBdLCBwYWlyWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gcmVjb3JkPEJ5dGVTdHJpbmcsIEJ5dGVTdHJpbmc+XG5cdFx0XHRcdGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGluaXQpKSB7XG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBpbml0W2tleV07XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignUHJvdmlkZWQgaW5pdGlhbGl6ZXIgbXVzdCBiZSBhbiBvYmplY3QnKTtcblx0XHR9XG5cdH1cblxuXHQvKipcbiAgKiBSZXR1cm4gY29tYmluZWQgaGVhZGVyIHZhbHVlIGdpdmVuIG5hbWVcbiAgKlxuICAqIEBwYXJhbSAgIFN0cmluZyAgbmFtZSAgSGVhZGVyIG5hbWVcbiAgKiBAcmV0dXJuICBNaXhlZFxuICAqL1xuXHRnZXQobmFtZSkge1xuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XG5cdFx0dmFsaWRhdGVOYW1lKG5hbWUpO1xuXHRcdGNvbnN0IGtleSA9IGZpbmQodGhpc1tNQVBdLCBuYW1lKTtcblx0XHRpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzW01BUF1ba2V5XS5qb2luKCcsICcpO1xuXHR9XG5cblx0LyoqXG4gICogSXRlcmF0ZSBvdmVyIGFsbCBoZWFkZXJzXG4gICpcbiAgKiBAcGFyYW0gICBGdW5jdGlvbiAgY2FsbGJhY2sgIEV4ZWN1dGVkIGZvciBlYWNoIGl0ZW0gd2l0aCBwYXJhbWV0ZXJzICh2YWx1ZSwgbmFtZSwgdGhpc0FyZylcbiAgKiBAcGFyYW0gICBCb29sZWFuICAgdGhpc0FyZyAgIGB0aGlzYCBjb250ZXh0IGZvciBjYWxsYmFjayBmdW5jdGlvblxuICAqIEByZXR1cm4gIFZvaWRcbiAgKi9cblx0Zm9yRWFjaChjYWxsYmFjaykge1xuXHRcdGxldCB0aGlzQXJnID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG5cblx0XHRsZXQgcGFpcnMgPSBnZXRIZWFkZXJzKHRoaXMpO1xuXHRcdGxldCBpID0gMDtcblx0XHR3aGlsZSAoaSA8IHBhaXJzLmxlbmd0aCkge1xuXHRcdFx0dmFyIF9wYWlycyRpID0gcGFpcnNbaV07XG5cdFx0XHRjb25zdCBuYW1lID0gX3BhaXJzJGlbMF0sXG5cdFx0XHQgICAgICB2YWx1ZSA9IF9wYWlycyRpWzFdO1xuXG5cdFx0XHRjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHZhbHVlLCBuYW1lLCB0aGlzKTtcblx0XHRcdHBhaXJzID0gZ2V0SGVhZGVycyh0aGlzKTtcblx0XHRcdGkrKztcblx0XHR9XG5cdH1cblxuXHQvKipcbiAgKiBPdmVyd3JpdGUgaGVhZGVyIHZhbHVlcyBnaXZlbiBuYW1lXG4gICpcbiAgKiBAcGFyYW0gICBTdHJpbmcgIG5hbWUgICBIZWFkZXIgbmFtZVxuICAqIEBwYXJhbSAgIFN0cmluZyAgdmFsdWUgIEhlYWRlciB2YWx1ZVxuICAqIEByZXR1cm4gIFZvaWRcbiAgKi9cblx0c2V0KG5hbWUsIHZhbHVlKSB7XG5cdFx0bmFtZSA9IGAke25hbWV9YDtcblx0XHR2YWx1ZSA9IGAke3ZhbHVlfWA7XG5cdFx0dmFsaWRhdGVOYW1lKG5hbWUpO1xuXHRcdHZhbGlkYXRlVmFsdWUodmFsdWUpO1xuXHRcdGNvbnN0IGtleSA9IGZpbmQodGhpc1tNQVBdLCBuYW1lKTtcblx0XHR0aGlzW01BUF1ba2V5ICE9PSB1bmRlZmluZWQgPyBrZXkgOiBuYW1lXSA9IFt2YWx1ZV07XG5cdH1cblxuXHQvKipcbiAgKiBBcHBlbmQgYSB2YWx1ZSBvbnRvIGV4aXN0aW5nIGhlYWRlclxuICAqXG4gICogQHBhcmFtICAgU3RyaW5nICBuYW1lICAgSGVhZGVyIG5hbWVcbiAgKiBAcGFyYW0gICBTdHJpbmcgIHZhbHVlICBIZWFkZXIgdmFsdWVcbiAgKiBAcmV0dXJuICBWb2lkXG4gICovXG5cdGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XG5cdFx0dmFsdWUgPSBgJHt2YWx1ZX1gO1xuXHRcdHZhbGlkYXRlTmFtZShuYW1lKTtcblx0XHR2YWxpZGF0ZVZhbHVlKHZhbHVlKTtcblx0XHRjb25zdCBrZXkgPSBmaW5kKHRoaXNbTUFQXSwgbmFtZSk7XG5cdFx0aWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzW01BUF1ba2V5XS5wdXNoKHZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpc1tNQVBdW25hbWVdID0gW3ZhbHVlXTtcblx0XHR9XG5cdH1cblxuXHQvKipcbiAgKiBDaGVjayBmb3IgaGVhZGVyIG5hbWUgZXhpc3RlbmNlXG4gICpcbiAgKiBAcGFyYW0gICBTdHJpbmcgICBuYW1lICBIZWFkZXIgbmFtZVxuICAqIEByZXR1cm4gIEJvb2xlYW5cbiAgKi9cblx0aGFzKG5hbWUpIHtcblx0XHRuYW1lID0gYCR7bmFtZX1gO1xuXHRcdHZhbGlkYXRlTmFtZShuYW1lKTtcblx0XHRyZXR1cm4gZmluZCh0aGlzW01BUF0sIG5hbWUpICE9PSB1bmRlZmluZWQ7XG5cdH1cblxuXHQvKipcbiAgKiBEZWxldGUgYWxsIGhlYWRlciB2YWx1ZXMgZ2l2ZW4gbmFtZVxuICAqXG4gICogQHBhcmFtICAgU3RyaW5nICBuYW1lICBIZWFkZXIgbmFtZVxuICAqIEByZXR1cm4gIFZvaWRcbiAgKi9cblx0ZGVsZXRlKG5hbWUpIHtcblx0XHRuYW1lID0gYCR7bmFtZX1gO1xuXHRcdHZhbGlkYXRlTmFtZShuYW1lKTtcblx0XHRjb25zdCBrZXkgPSBmaW5kKHRoaXNbTUFQXSwgbmFtZSk7XG5cdFx0aWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRkZWxldGUgdGhpc1tNQVBdW2tleV07XG5cdFx0fVxuXHR9XG5cblx0LyoqXG4gICogUmV0dXJuIHJhdyBoZWFkZXJzIChub24tc3BlYyBhcGkpXG4gICpcbiAgKiBAcmV0dXJuICBPYmplY3RcbiAgKi9cblx0cmF3KCkge1xuXHRcdHJldHVybiB0aGlzW01BUF07XG5cdH1cblxuXHQvKipcbiAgKiBHZXQgYW4gaXRlcmF0b3Igb24ga2V5cy5cbiAgKlxuICAqIEByZXR1cm4gIEl0ZXJhdG9yXG4gICovXG5cdGtleXMoKSB7XG5cdFx0cmV0dXJuIGNyZWF0ZUhlYWRlcnNJdGVyYXRvcih0aGlzLCAna2V5Jyk7XG5cdH1cblxuXHQvKipcbiAgKiBHZXQgYW4gaXRlcmF0b3Igb24gdmFsdWVzLlxuICAqXG4gICogQHJldHVybiAgSXRlcmF0b3JcbiAgKi9cblx0dmFsdWVzKCkge1xuXHRcdHJldHVybiBjcmVhdGVIZWFkZXJzSXRlcmF0b3IodGhpcywgJ3ZhbHVlJyk7XG5cdH1cblxuXHQvKipcbiAgKiBHZXQgYW4gaXRlcmF0b3Igb24gZW50cmllcy5cbiAgKlxuICAqIFRoaXMgaXMgdGhlIGRlZmF1bHQgaXRlcmF0b3Igb2YgdGhlIEhlYWRlcnMgb2JqZWN0LlxuICAqXG4gICogQHJldHVybiAgSXRlcmF0b3JcbiAgKi9cblx0W1N5bWJvbC5pdGVyYXRvcl0oKSB7XG5cdFx0cmV0dXJuIGNyZWF0ZUhlYWRlcnNJdGVyYXRvcih0aGlzLCAna2V5K3ZhbHVlJyk7XG5cdH1cbn1cbkhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoSGVhZGVycy5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuXHR2YWx1ZTogJ0hlYWRlcnMnLFxuXHR3cml0YWJsZTogZmFsc2UsXG5cdGVudW1lcmFibGU6IGZhbHNlLFxuXHRjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhIZWFkZXJzLnByb3RvdHlwZSwge1xuXHRnZXQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRmb3JFYWNoOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0c2V0OiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0YXBwZW5kOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0aGFzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0ZGVsZXRlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0a2V5czogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHZhbHVlczogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGVudHJpZXM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcblxuZnVuY3Rpb24gZ2V0SGVhZGVycyhoZWFkZXJzKSB7XG5cdGxldCBraW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAna2V5K3ZhbHVlJztcblxuXHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoaGVhZGVyc1tNQVBdKS5zb3J0KCk7XG5cdHJldHVybiBrZXlzLm1hcChraW5kID09PSAna2V5JyA/IGZ1bmN0aW9uIChrKSB7XG5cdFx0cmV0dXJuIGsudG9Mb3dlckNhc2UoKTtcblx0fSA6IGtpbmQgPT09ICd2YWx1ZScgPyBmdW5jdGlvbiAoaykge1xuXHRcdHJldHVybiBoZWFkZXJzW01BUF1ba10uam9pbignLCAnKTtcblx0fSA6IGZ1bmN0aW9uIChrKSB7XG5cdFx0cmV0dXJuIFtrLnRvTG93ZXJDYXNlKCksIGhlYWRlcnNbTUFQXVtrXS5qb2luKCcsICcpXTtcblx0fSk7XG59XG5cbmNvbnN0IElOVEVSTkFMID0gU3ltYm9sKCdpbnRlcm5hbCcpO1xuXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXJzSXRlcmF0b3IodGFyZ2V0LCBraW5kKSB7XG5cdGNvbnN0IGl0ZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShIZWFkZXJzSXRlcmF0b3JQcm90b3R5cGUpO1xuXHRpdGVyYXRvcltJTlRFUk5BTF0gPSB7XG5cdFx0dGFyZ2V0LFxuXHRcdGtpbmQsXG5cdFx0aW5kZXg6IDBcblx0fTtcblx0cmV0dXJuIGl0ZXJhdG9yO1xufVxuXG5jb25zdCBIZWFkZXJzSXRlcmF0b3JQcm90b3R5cGUgPSBPYmplY3Quc2V0UHJvdG90eXBlT2Yoe1xuXHRuZXh0KCkge1xuXHRcdC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuXHRcdGlmICghdGhpcyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykgIT09IEhlYWRlcnNJdGVyYXRvclByb3RvdHlwZSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgb2YgYHRoaXNgIGlzIG5vdCBhIEhlYWRlcnNJdGVyYXRvcicpO1xuXHRcdH1cblxuXHRcdHZhciBfSU5URVJOQUwgPSB0aGlzW0lOVEVSTkFMXTtcblx0XHRjb25zdCB0YXJnZXQgPSBfSU5URVJOQUwudGFyZ2V0LFxuXHRcdCAgICAgIGtpbmQgPSBfSU5URVJOQUwua2luZCxcblx0XHQgICAgICBpbmRleCA9IF9JTlRFUk5BTC5pbmRleDtcblxuXHRcdGNvbnN0IHZhbHVlcyA9IGdldEhlYWRlcnModGFyZ2V0LCBraW5kKTtcblx0XHRjb25zdCBsZW4gPSB2YWx1ZXMubGVuZ3RoO1xuXHRcdGlmIChpbmRleCA+PSBsZW4pIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHZhbHVlOiB1bmRlZmluZWQsXG5cdFx0XHRcdGRvbmU6IHRydWVcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0dGhpc1tJTlRFUk5BTF0uaW5kZXggPSBpbmRleCArIDE7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWU6IHZhbHVlc1tpbmRleF0sXG5cdFx0XHRkb25lOiBmYWxzZVxuXHRcdH07XG5cdH1cbn0sIE9iamVjdC5nZXRQcm90b3R5cGVPZihPYmplY3QuZ2V0UHJvdG90eXBlT2YoW11bU3ltYm9sLml0ZXJhdG9yXSgpKSkpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoSGVhZGVyc0l0ZXJhdG9yUHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcblx0dmFsdWU6ICdIZWFkZXJzSXRlcmF0b3InLFxuXHR3cml0YWJsZTogZmFsc2UsXG5cdGVudW1lcmFibGU6IGZhbHNlLFxuXHRjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG4vKipcbiAqIEV4cG9ydCB0aGUgSGVhZGVycyBvYmplY3QgaW4gYSBmb3JtIHRoYXQgTm9kZS5qcyBjYW4gY29uc3VtZS5cbiAqXG4gKiBAcGFyYW0gICBIZWFkZXJzICBoZWFkZXJzXG4gKiBAcmV0dXJuICBPYmplY3RcbiAqL1xuZnVuY3Rpb24gZXhwb3J0Tm9kZUNvbXBhdGlibGVIZWFkZXJzKGhlYWRlcnMpIHtcblx0Y29uc3Qgb2JqID0gT2JqZWN0LmFzc2lnbih7IF9fcHJvdG9fXzogbnVsbCB9LCBoZWFkZXJzW01BUF0pO1xuXG5cdC8vIGh0dHAucmVxdWVzdCgpIG9ubHkgc3VwcG9ydHMgc3RyaW5nIGFzIEhvc3QgaGVhZGVyLiBUaGlzIGhhY2sgbWFrZXNcblx0Ly8gc3BlY2lmeWluZyBjdXN0b20gSG9zdCBoZWFkZXIgcG9zc2libGUuXG5cdGNvbnN0IGhvc3RIZWFkZXJLZXkgPSBmaW5kKGhlYWRlcnNbTUFQXSwgJ0hvc3QnKTtcblx0aWYgKGhvc3RIZWFkZXJLZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdG9ialtob3N0SGVhZGVyS2V5XSA9IG9ialtob3N0SGVhZGVyS2V5XVswXTtcblx0fVxuXG5cdHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgSGVhZGVycyBvYmplY3QgZnJvbSBhbiBvYmplY3Qgb2YgaGVhZGVycywgaWdub3JpbmcgdGhvc2UgdGhhdCBkb1xuICogbm90IGNvbmZvcm0gdG8gSFRUUCBncmFtbWFyIHByb2R1Y3Rpb25zLlxuICpcbiAqIEBwYXJhbSAgIE9iamVjdCAgb2JqICBPYmplY3Qgb2YgaGVhZGVyc1xuICogQHJldHVybiAgSGVhZGVyc1xuICovXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXJzTGVuaWVudChvYmopIHtcblx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG5cdGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3Qua2V5cyhvYmopKSB7XG5cdFx0aWYgKGludmFsaWRUb2tlblJlZ2V4LnRlc3QobmFtZSkpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0XHRpZiAoQXJyYXkuaXNBcnJheShvYmpbbmFtZV0pKSB7XG5cdFx0XHRmb3IgKGNvbnN0IHZhbCBvZiBvYmpbbmFtZV0pIHtcblx0XHRcdFx0aWYgKGludmFsaWRIZWFkZXJDaGFyUmVnZXgudGVzdCh2YWwpKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGhlYWRlcnNbTUFQXVtuYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0aGVhZGVyc1tNQVBdW25hbWVdID0gW3ZhbF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aGVhZGVyc1tNQVBdW25hbWVdLnB1c2godmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoIWludmFsaWRIZWFkZXJDaGFyUmVnZXgudGVzdChvYmpbbmFtZV0pKSB7XG5cdFx0XHRoZWFkZXJzW01BUF1bbmFtZV0gPSBbb2JqW25hbWVdXTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGhlYWRlcnM7XG59XG5cbmNvbnN0IElOVEVSTkFMUyQxID0gU3ltYm9sKCdSZXNwb25zZSBpbnRlcm5hbHMnKTtcblxuLy8gZml4IGFuIGlzc3VlIHdoZXJlIFwiU1RBVFVTX0NPREVTXCIgYXJlbid0IGEgbmFtZWQgZXhwb3J0IGZvciBub2RlIDwxMFxuY29uc3QgU1RBVFVTX0NPREVTID0gaHR0cC5TVEFUVVNfQ09ERVM7XG5cbi8qKlxuICogUmVzcG9uc2UgY2xhc3NcbiAqXG4gKiBAcGFyYW0gICBTdHJlYW0gIGJvZHkgIFJlYWRhYmxlIHN0cmVhbVxuICogQHBhcmFtICAgT2JqZWN0ICBvcHRzICBSZXNwb25zZSBvcHRpb25zXG4gKiBAcmV0dXJuICBWb2lkXG4gKi9cbmNsYXNzIFJlc3BvbnNlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0bGV0IGJvZHkgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IG51bGw7XG5cdFx0bGV0IG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG5cdFx0Qm9keS5jYWxsKHRoaXMsIGJvZHksIG9wdHMpO1xuXG5cdFx0Y29uc3Qgc3RhdHVzID0gb3B0cy5zdGF0dXMgfHwgMjAwO1xuXHRcdGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRzLmhlYWRlcnMpO1xuXG5cdFx0aWYgKGJvZHkgIT0gbnVsbCAmJiAhaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpKSB7XG5cdFx0XHRjb25zdCBjb250ZW50VHlwZSA9IGV4dHJhY3RDb250ZW50VHlwZShib2R5KTtcblx0XHRcdGlmIChjb250ZW50VHlwZSkge1xuXHRcdFx0XHRoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgY29udGVudFR5cGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXNbSU5URVJOQUxTJDFdID0ge1xuXHRcdFx0dXJsOiBvcHRzLnVybCxcblx0XHRcdHN0YXR1cyxcblx0XHRcdHN0YXR1c1RleHQ6IG9wdHMuc3RhdHVzVGV4dCB8fCBTVEFUVVNfQ09ERVNbc3RhdHVzXSxcblx0XHRcdGhlYWRlcnMsXG5cdFx0XHRjb3VudGVyOiBvcHRzLmNvdW50ZXJcblx0XHR9O1xuXHR9XG5cblx0Z2V0IHVybCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0udXJsIHx8ICcnO1xuXHR9XG5cblx0Z2V0IHN0YXR1cygpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uc3RhdHVzO1xuXHR9XG5cblx0LyoqXG4gICogQ29udmVuaWVuY2UgcHJvcGVydHkgcmVwcmVzZW50aW5nIGlmIHRoZSByZXF1ZXN0IGVuZGVkIG5vcm1hbGx5XG4gICovXG5cdGdldCBvaygpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uc3RhdHVzID49IDIwMCAmJiB0aGlzW0lOVEVSTkFMUyQxXS5zdGF0dXMgPCAzMDA7XG5cdH1cblxuXHRnZXQgcmVkaXJlY3RlZCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uY291bnRlciA+IDA7XG5cdH1cblxuXHRnZXQgc3RhdHVzVGV4dCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uc3RhdHVzVGV4dDtcblx0fVxuXG5cdGdldCBoZWFkZXJzKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5oZWFkZXJzO1xuXHR9XG5cblx0LyoqXG4gICogQ2xvbmUgdGhpcyByZXNwb25zZVxuICAqXG4gICogQHJldHVybiAgUmVzcG9uc2VcbiAgKi9cblx0Y2xvbmUoKSB7XG5cdFx0cmV0dXJuIG5ldyBSZXNwb25zZShjbG9uZSh0aGlzKSwge1xuXHRcdFx0dXJsOiB0aGlzLnVybCxcblx0XHRcdHN0YXR1czogdGhpcy5zdGF0dXMsXG5cdFx0XHRzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG5cdFx0XHRoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG5cdFx0XHRvazogdGhpcy5vayxcblx0XHRcdHJlZGlyZWN0ZWQ6IHRoaXMucmVkaXJlY3RlZFxuXHRcdH0pO1xuXHR9XG59XG5cbkJvZHkubWl4SW4oUmVzcG9uc2UucHJvdG90eXBlKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVzcG9uc2UucHJvdG90eXBlLCB7XG5cdHVybDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHN0YXR1czogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdG9rOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0cmVkaXJlY3RlZDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHN0YXR1c1RleHQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRoZWFkZXJzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0Y2xvbmU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlc3BvbnNlLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG5cdHZhbHVlOiAnUmVzcG9uc2UnLFxuXHR3cml0YWJsZTogZmFsc2UsXG5cdGVudW1lcmFibGU6IGZhbHNlLFxuXHRjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG5jb25zdCBJTlRFUk5BTFMkMiA9IFN5bWJvbCgnUmVxdWVzdCBpbnRlcm5hbHMnKTtcblxuLy8gZml4IGFuIGlzc3VlIHdoZXJlIFwiZm9ybWF0XCIsIFwicGFyc2VcIiBhcmVuJ3QgYSBuYW1lZCBleHBvcnQgZm9yIG5vZGUgPDEwXG5jb25zdCBwYXJzZV91cmwgPSBVcmwucGFyc2U7XG5jb25zdCBmb3JtYXRfdXJsID0gVXJsLmZvcm1hdDtcblxuY29uc3Qgc3RyZWFtRGVzdHJ1Y3Rpb25TdXBwb3J0ZWQgPSAnZGVzdHJveScgaW4gU3RyZWFtLlJlYWRhYmxlLnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVjayBpZiBhIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIFJlcXVlc3QuXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgICBpbnB1dFxuICogQHJldHVybiAgQm9vbGVhblxuICovXG5mdW5jdGlvbiBpc1JlcXVlc3QoaW5wdXQpIHtcblx0cmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGlucHV0W0lOVEVSTkFMUyQyXSA9PT0gJ29iamVjdCc7XG59XG5cbmZ1bmN0aW9uIGlzQWJvcnRTaWduYWwoc2lnbmFsKSB7XG5cdGNvbnN0IHByb3RvID0gc2lnbmFsICYmIHR5cGVvZiBzaWduYWwgPT09ICdvYmplY3QnICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihzaWduYWwpO1xuXHRyZXR1cm4gISEocHJvdG8gJiYgcHJvdG8uY29uc3RydWN0b3IubmFtZSA9PT0gJ0Fib3J0U2lnbmFsJyk7XG59XG5cbi8qKlxuICogUmVxdWVzdCBjbGFzc1xuICpcbiAqIEBwYXJhbSAgIE1peGVkICAgaW5wdXQgIFVybCBvciBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcGFyYW0gICBPYmplY3QgIGluaXQgICBDdXN0b20gb3B0aW9uc1xuICogQHJldHVybiAgVm9pZFxuICovXG5jbGFzcyBSZXF1ZXN0IHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRsZXQgaW5pdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cblx0XHRsZXQgcGFyc2VkVVJMO1xuXG5cdFx0Ly8gbm9ybWFsaXplIGlucHV0XG5cdFx0aWYgKCFpc1JlcXVlc3QoaW5wdXQpKSB7XG5cdFx0XHRpZiAoaW5wdXQgJiYgaW5wdXQuaHJlZikge1xuXHRcdFx0XHQvLyBpbiBvcmRlciB0byBzdXBwb3J0IE5vZGUuanMnIFVybCBvYmplY3RzOyB0aG91Z2ggV0hBVFdHJ3MgVVJMIG9iamVjdHNcblx0XHRcdFx0Ly8gd2lsbCBmYWxsIGludG8gdGhpcyBicmFuY2ggYWxzbyAoc2luY2UgdGhlaXIgYHRvU3RyaW5nKClgIHdpbGwgcmV0dXJuXG5cdFx0XHRcdC8vIGBocmVmYCBwcm9wZXJ0eSBhbnl3YXkpXG5cdFx0XHRcdHBhcnNlZFVSTCA9IHBhcnNlX3VybChpbnB1dC5ocmVmKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGNvZXJjZSBpbnB1dCB0byBhIHN0cmluZyBiZWZvcmUgYXR0ZW1wdGluZyB0byBwYXJzZVxuXHRcdFx0XHRwYXJzZWRVUkwgPSBwYXJzZV91cmwoYCR7aW5wdXR9YCk7XG5cdFx0XHR9XG5cdFx0XHRpbnB1dCA9IHt9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXJzZWRVUkwgPSBwYXJzZV91cmwoaW5wdXQudXJsKTtcblx0XHR9XG5cblx0XHRsZXQgbWV0aG9kID0gaW5pdC5tZXRob2QgfHwgaW5wdXQubWV0aG9kIHx8ICdHRVQnO1xuXHRcdG1ldGhvZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpO1xuXG5cdFx0aWYgKChpbml0LmJvZHkgIT0gbnVsbCB8fCBpc1JlcXVlc3QoaW5wdXQpICYmIGlucHV0LmJvZHkgIT09IG51bGwpICYmIChtZXRob2QgPT09ICdHRVQnIHx8IG1ldGhvZCA9PT0gJ0hFQUQnKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignUmVxdWVzdCB3aXRoIEdFVC9IRUFEIG1ldGhvZCBjYW5ub3QgaGF2ZSBib2R5Jyk7XG5cdFx0fVxuXG5cdFx0bGV0IGlucHV0Qm9keSA9IGluaXQuYm9keSAhPSBudWxsID8gaW5pdC5ib2R5IDogaXNSZXF1ZXN0KGlucHV0KSAmJiBpbnB1dC5ib2R5ICE9PSBudWxsID8gY2xvbmUoaW5wdXQpIDogbnVsbDtcblxuXHRcdEJvZHkuY2FsbCh0aGlzLCBpbnB1dEJvZHksIHtcblx0XHRcdHRpbWVvdXQ6IGluaXQudGltZW91dCB8fCBpbnB1dC50aW1lb3V0IHx8IDAsXG5cdFx0XHRzaXplOiBpbml0LnNpemUgfHwgaW5wdXQuc2l6ZSB8fCAwXG5cdFx0fSk7XG5cblx0XHRjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5pdC5oZWFkZXJzIHx8IGlucHV0LmhlYWRlcnMgfHwge30pO1xuXG5cdFx0aWYgKGlucHV0Qm9keSAhPSBudWxsICYmICFoZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJykpIHtcblx0XHRcdGNvbnN0IGNvbnRlbnRUeXBlID0gZXh0cmFjdENvbnRlbnRUeXBlKGlucHV0Qm9keSk7XG5cdFx0XHRpZiAoY29udGVudFR5cGUpIHtcblx0XHRcdFx0aGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsZXQgc2lnbmFsID0gaXNSZXF1ZXN0KGlucHV0KSA/IGlucHV0LnNpZ25hbCA6IG51bGw7XG5cdFx0aWYgKCdzaWduYWwnIGluIGluaXQpIHNpZ25hbCA9IGluaXQuc2lnbmFsO1xuXG5cdFx0aWYgKHNpZ25hbCAhPSBudWxsICYmICFpc0Fib3J0U2lnbmFsKHNpZ25hbCkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHNpZ25hbCB0byBiZSBhbiBpbnN0YW5jZW9mIEFib3J0U2lnbmFsJyk7XG5cdFx0fVxuXG5cdFx0dGhpc1tJTlRFUk5BTFMkMl0gPSB7XG5cdFx0XHRtZXRob2QsXG5cdFx0XHRyZWRpcmVjdDogaW5pdC5yZWRpcmVjdCB8fCBpbnB1dC5yZWRpcmVjdCB8fCAnZm9sbG93Jyxcblx0XHRcdGhlYWRlcnMsXG5cdFx0XHRwYXJzZWRVUkwsXG5cdFx0XHRzaWduYWxcblx0XHR9O1xuXG5cdFx0Ly8gbm9kZS1mZXRjaC1vbmx5IG9wdGlvbnNcblx0XHR0aGlzLmZvbGxvdyA9IGluaXQuZm9sbG93ICE9PSB1bmRlZmluZWQgPyBpbml0LmZvbGxvdyA6IGlucHV0LmZvbGxvdyAhPT0gdW5kZWZpbmVkID8gaW5wdXQuZm9sbG93IDogMjA7XG5cdFx0dGhpcy5jb21wcmVzcyA9IGluaXQuY29tcHJlc3MgIT09IHVuZGVmaW5lZCA/IGluaXQuY29tcHJlc3MgOiBpbnB1dC5jb21wcmVzcyAhPT0gdW5kZWZpbmVkID8gaW5wdXQuY29tcHJlc3MgOiB0cnVlO1xuXHRcdHRoaXMuY291bnRlciA9IGluaXQuY291bnRlciB8fCBpbnB1dC5jb3VudGVyIHx8IDA7XG5cdFx0dGhpcy5hZ2VudCA9IGluaXQuYWdlbnQgfHwgaW5wdXQuYWdlbnQ7XG5cdH1cblxuXHRnZXQgbWV0aG9kKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQyXS5tZXRob2Q7XG5cdH1cblxuXHRnZXQgdXJsKCkge1xuXHRcdHJldHVybiBmb3JtYXRfdXJsKHRoaXNbSU5URVJOQUxTJDJdLnBhcnNlZFVSTCk7XG5cdH1cblxuXHRnZXQgaGVhZGVycygpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMl0uaGVhZGVycztcblx0fVxuXG5cdGdldCByZWRpcmVjdCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMl0ucmVkaXJlY3Q7XG5cdH1cblxuXHRnZXQgc2lnbmFsKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQyXS5zaWduYWw7XG5cdH1cblxuXHQvKipcbiAgKiBDbG9uZSB0aGlzIHJlcXVlc3RcbiAgKlxuICAqIEByZXR1cm4gIFJlcXVlc3RcbiAgKi9cblx0Y2xvbmUoKSB7XG5cdFx0cmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMpO1xuXHR9XG59XG5cbkJvZHkubWl4SW4oUmVxdWVzdC5wcm90b3R5cGUpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUmVxdWVzdC5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuXHR2YWx1ZTogJ1JlcXVlc3QnLFxuXHR3cml0YWJsZTogZmFsc2UsXG5cdGVudW1lcmFibGU6IGZhbHNlLFxuXHRjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZXF1ZXN0LnByb3RvdHlwZSwge1xuXHRtZXRob2Q6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHR1cmw6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRoZWFkZXJzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0cmVkaXJlY3Q6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRjbG9uZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHNpZ25hbDogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBSZXF1ZXN0IHRvIE5vZGUuanMgaHR0cCByZXF1ZXN0IG9wdGlvbnMuXG4gKlxuICogQHBhcmFtICAgUmVxdWVzdCAgQSBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcmV0dXJuICBPYmplY3QgICBUaGUgb3B0aW9ucyBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIGh0dHAucmVxdWVzdFxuICovXG5mdW5jdGlvbiBnZXROb2RlUmVxdWVzdE9wdGlvbnMocmVxdWVzdCkge1xuXHRjb25zdCBwYXJzZWRVUkwgPSByZXF1ZXN0W0lOVEVSTkFMUyQyXS5wYXJzZWRVUkw7XG5cdGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhyZXF1ZXN0W0lOVEVSTkFMUyQyXS5oZWFkZXJzKTtcblxuXHQvLyBmZXRjaCBzdGVwIDEuM1xuXHRpZiAoIWhlYWRlcnMuaGFzKCdBY2NlcHQnKSkge1xuXHRcdGhlYWRlcnMuc2V0KCdBY2NlcHQnLCAnKi8qJyk7XG5cdH1cblxuXHQvLyBCYXNpYyBmZXRjaFxuXHRpZiAoIXBhcnNlZFVSTC5wcm90b2NvbCB8fCAhcGFyc2VkVVJMLmhvc3RuYW1lKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT25seSBhYnNvbHV0ZSBVUkxzIGFyZSBzdXBwb3J0ZWQnKTtcblx0fVxuXG5cdGlmICghL15odHRwcz86JC8udGVzdChwYXJzZWRVUkwucHJvdG9jb2wpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT25seSBIVFRQKFMpIHByb3RvY29scyBhcmUgc3VwcG9ydGVkJyk7XG5cdH1cblxuXHRpZiAocmVxdWVzdC5zaWduYWwgJiYgcmVxdWVzdC5ib2R5IGluc3RhbmNlb2YgU3RyZWFtLlJlYWRhYmxlICYmICFzdHJlYW1EZXN0cnVjdGlvblN1cHBvcnRlZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignQ2FuY2VsbGF0aW9uIG9mIHN0cmVhbWVkIHJlcXVlc3RzIHdpdGggQWJvcnRTaWduYWwgaXMgbm90IHN1cHBvcnRlZCBpbiBub2RlIDwgOCcpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrLW9yLWNhY2hlIGZldGNoIHN0ZXBzIDIuNC0yLjdcblx0bGV0IGNvbnRlbnRMZW5ndGhWYWx1ZSA9IG51bGw7XG5cdGlmIChyZXF1ZXN0LmJvZHkgPT0gbnVsbCAmJiAvXihQT1NUfFBVVCkkL2kudGVzdChyZXF1ZXN0Lm1ldGhvZCkpIHtcblx0XHRjb250ZW50TGVuZ3RoVmFsdWUgPSAnMCc7XG5cdH1cblx0aWYgKHJlcXVlc3QuYm9keSAhPSBudWxsKSB7XG5cdFx0Y29uc3QgdG90YWxCeXRlcyA9IGdldFRvdGFsQnl0ZXMocmVxdWVzdCk7XG5cdFx0aWYgKHR5cGVvZiB0b3RhbEJ5dGVzID09PSAnbnVtYmVyJykge1xuXHRcdFx0Y29udGVudExlbmd0aFZhbHVlID0gU3RyaW5nKHRvdGFsQnl0ZXMpO1xuXHRcdH1cblx0fVxuXHRpZiAoY29udGVudExlbmd0aFZhbHVlKSB7XG5cdFx0aGVhZGVycy5zZXQoJ0NvbnRlbnQtTGVuZ3RoJywgY29udGVudExlbmd0aFZhbHVlKTtcblx0fVxuXG5cdC8vIEhUVFAtbmV0d29yay1vci1jYWNoZSBmZXRjaCBzdGVwIDIuMTFcblx0aWYgKCFoZWFkZXJzLmhhcygnVXNlci1BZ2VudCcpKSB7XG5cdFx0aGVhZGVycy5zZXQoJ1VzZXItQWdlbnQnLCAnbm9kZS1mZXRjaC8xLjAgKCtodHRwczovL2dpdGh1Yi5jb20vYml0aW5uL25vZGUtZmV0Y2gpJyk7XG5cdH1cblxuXHQvLyBIVFRQLW5ldHdvcmstb3ItY2FjaGUgZmV0Y2ggc3RlcCAyLjE1XG5cdGlmIChyZXF1ZXN0LmNvbXByZXNzICYmICFoZWFkZXJzLmhhcygnQWNjZXB0LUVuY29kaW5nJykpIHtcblx0XHRoZWFkZXJzLnNldCgnQWNjZXB0LUVuY29kaW5nJywgJ2d6aXAsZGVmbGF0ZScpO1xuXHR9XG5cblx0bGV0IGFnZW50ID0gcmVxdWVzdC5hZ2VudDtcblx0aWYgKHR5cGVvZiBhZ2VudCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGFnZW50ID0gYWdlbnQocGFyc2VkVVJMKTtcblx0fVxuXG5cdGlmICghaGVhZGVycy5oYXMoJ0Nvbm5lY3Rpb24nKSAmJiAhYWdlbnQpIHtcblx0XHRoZWFkZXJzLnNldCgnQ29ubmVjdGlvbicsICdjbG9zZScpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrIGZldGNoIHN0ZXAgNC4yXG5cdC8vIGNodW5rZWQgZW5jb2RpbmcgaXMgaGFuZGxlZCBieSBOb2RlLmpzXG5cblx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHBhcnNlZFVSTCwge1xuXHRcdG1ldGhvZDogcmVxdWVzdC5tZXRob2QsXG5cdFx0aGVhZGVyczogZXhwb3J0Tm9kZUNvbXBhdGlibGVIZWFkZXJzKGhlYWRlcnMpLFxuXHRcdGFnZW50XG5cdH0pO1xufVxuXG4vKipcbiAqIGFib3J0LWVycm9yLmpzXG4gKlxuICogQWJvcnRFcnJvciBpbnRlcmZhY2UgZm9yIGNhbmNlbGxlZCByZXF1ZXN0c1xuICovXG5cbi8qKlxuICogQ3JlYXRlIEFib3J0RXJyb3IgaW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0gICBTdHJpbmcgICAgICBtZXNzYWdlICAgICAgRXJyb3IgbWVzc2FnZSBmb3IgaHVtYW5cbiAqIEByZXR1cm4gIEFib3J0RXJyb3JcbiAqL1xuZnVuY3Rpb24gQWJvcnRFcnJvcihtZXNzYWdlKSB7XG4gIEVycm9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgdGhpcy50eXBlID0gJ2Fib3J0ZWQnO1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gIC8vIGhpZGUgY3VzdG9tIGVycm9yIGltcGxlbWVudGF0aW9uIGRldGFpbHMgZnJvbSBlbmQtdXNlcnNcbiAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG59XG5cbkFib3J0RXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuQWJvcnRFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBYm9ydEVycm9yO1xuQWJvcnRFcnJvci5wcm90b3R5cGUubmFtZSA9ICdBYm9ydEVycm9yJztcblxuLy8gZml4IGFuIGlzc3VlIHdoZXJlIFwiUGFzc1Rocm91Z2hcIiwgXCJyZXNvbHZlXCIgYXJlbid0IGEgbmFtZWQgZXhwb3J0IGZvciBub2RlIDwxMFxuY29uc3QgUGFzc1Rocm91Z2gkMSA9IFN0cmVhbS5QYXNzVGhyb3VnaDtcbmNvbnN0IHJlc29sdmVfdXJsID0gVXJsLnJlc29sdmU7XG5cbi8qKlxuICogRmV0Y2ggZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gICBNaXhlZCAgICB1cmwgICBBYnNvbHV0ZSB1cmwgb3IgUmVxdWVzdCBpbnN0YW5jZVxuICogQHBhcmFtICAgT2JqZWN0ICAgb3B0cyAgRmV0Y2ggb3B0aW9uc1xuICogQHJldHVybiAgUHJvbWlzZVxuICovXG5mdW5jdGlvbiBmZXRjaCh1cmwsIG9wdHMpIHtcblxuXHQvLyBhbGxvdyBjdXN0b20gcHJvbWlzZVxuXHRpZiAoIWZldGNoLlByb21pc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ25hdGl2ZSBwcm9taXNlIG1pc3NpbmcsIHNldCBmZXRjaC5Qcm9taXNlIHRvIHlvdXIgZmF2b3JpdGUgYWx0ZXJuYXRpdmUnKTtcblx0fVxuXG5cdEJvZHkuUHJvbWlzZSA9IGZldGNoLlByb21pc2U7XG5cblx0Ly8gd3JhcCBodHRwLnJlcXVlc3QgaW50byBmZXRjaFxuXHRyZXR1cm4gbmV3IGZldGNoLlByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdC8vIGJ1aWxkIHJlcXVlc3Qgb2JqZWN0XG5cdFx0Y29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwgb3B0cyk7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IGdldE5vZGVSZXF1ZXN0T3B0aW9ucyhyZXF1ZXN0KTtcblxuXHRcdGNvbnN0IHNlbmQgPSAob3B0aW9ucy5wcm90b2NvbCA9PT0gJ2h0dHBzOicgPyBodHRwcyA6IGh0dHApLnJlcXVlc3Q7XG5cdFx0Y29uc3Qgc2lnbmFsID0gcmVxdWVzdC5zaWduYWw7XG5cblx0XHRsZXQgcmVzcG9uc2UgPSBudWxsO1xuXG5cdFx0Y29uc3QgYWJvcnQgPSBmdW5jdGlvbiBhYm9ydCgpIHtcblx0XHRcdGxldCBlcnJvciA9IG5ldyBBYm9ydEVycm9yKCdUaGUgdXNlciBhYm9ydGVkIGEgcmVxdWVzdC4nKTtcblx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRpZiAocmVxdWVzdC5ib2R5ICYmIHJlcXVlc3QuYm9keSBpbnN0YW5jZW9mIFN0cmVhbS5SZWFkYWJsZSkge1xuXHRcdFx0XHRyZXF1ZXN0LmJvZHkuZGVzdHJveShlcnJvcik7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXJlc3BvbnNlIHx8ICFyZXNwb25zZS5ib2R5KSByZXR1cm47XG5cdFx0XHRyZXNwb25zZS5ib2R5LmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuXHRcdH07XG5cblx0XHRpZiAoc2lnbmFsICYmIHNpZ25hbC5hYm9ydGVkKSB7XG5cdFx0XHRhYm9ydCgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGFib3J0QW5kRmluYWxpemUgPSBmdW5jdGlvbiBhYm9ydEFuZEZpbmFsaXplKCkge1xuXHRcdFx0YWJvcnQoKTtcblx0XHRcdGZpbmFsaXplKCk7XG5cdFx0fTtcblxuXHRcdC8vIHNlbmQgcmVxdWVzdFxuXHRcdGNvbnN0IHJlcSA9IHNlbmQob3B0aW9ucyk7XG5cdFx0bGV0IHJlcVRpbWVvdXQ7XG5cblx0XHRpZiAoc2lnbmFsKSB7XG5cdFx0XHRzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydEFuZEZpbmFsaXplKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBmaW5hbGl6ZSgpIHtcblx0XHRcdHJlcS5hYm9ydCgpO1xuXHRcdFx0aWYgKHNpZ25hbCkgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XG5cdFx0XHRjbGVhclRpbWVvdXQocmVxVGltZW91dCk7XG5cdFx0fVxuXG5cdFx0aWYgKHJlcXVlc3QudGltZW91dCkge1xuXHRcdFx0cmVxLm9uY2UoJ3NvY2tldCcsIGZ1bmN0aW9uIChzb2NrZXQpIHtcblx0XHRcdFx0cmVxVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgbmV0d29yayB0aW1lb3V0IGF0OiAke3JlcXVlc3QudXJsfWAsICdyZXF1ZXN0LXRpbWVvdXQnKSk7XG5cdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0fSwgcmVxdWVzdC50aW1lb3V0KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJlcS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYHJlcXVlc3QgdG8gJHtyZXF1ZXN0LnVybH0gZmFpbGVkLCByZWFzb246ICR7ZXJyLm1lc3NhZ2V9YCwgJ3N5c3RlbScsIGVycikpO1xuXHRcdFx0ZmluYWxpemUoKTtcblx0XHR9KTtcblxuXHRcdHJlcS5vbigncmVzcG9uc2UnLCBmdW5jdGlvbiAocmVzKSB7XG5cdFx0XHRjbGVhclRpbWVvdXQocmVxVGltZW91dCk7XG5cblx0XHRcdGNvbnN0IGhlYWRlcnMgPSBjcmVhdGVIZWFkZXJzTGVuaWVudChyZXMuaGVhZGVycyk7XG5cblx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1XG5cdFx0XHRpZiAoZmV0Y2guaXNSZWRpcmVjdChyZXMuc3RhdHVzQ29kZSkpIHtcblx0XHRcdFx0Ly8gSFRUUCBmZXRjaCBzdGVwIDUuMlxuXHRcdFx0XHRjb25zdCBsb2NhdGlvbiA9IGhlYWRlcnMuZ2V0KCdMb2NhdGlvbicpO1xuXG5cdFx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1LjNcblx0XHRcdFx0Y29uc3QgbG9jYXRpb25VUkwgPSBsb2NhdGlvbiA9PT0gbnVsbCA/IG51bGwgOiByZXNvbHZlX3VybChyZXF1ZXN0LnVybCwgbG9jYXRpb24pO1xuXG5cdFx0XHRcdC8vIEhUVFAgZmV0Y2ggc3RlcCA1LjVcblx0XHRcdFx0c3dpdGNoIChyZXF1ZXN0LnJlZGlyZWN0KSB7XG5cdFx0XHRcdFx0Y2FzZSAnZXJyb3InOlxuXHRcdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGByZWRpcmVjdCBtb2RlIGlzIHNldCB0byBlcnJvcjogJHtyZXF1ZXN0LnVybH1gLCAnbm8tcmVkaXJlY3QnKSk7XG5cdFx0XHRcdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdGNhc2UgJ21hbnVhbCc6XG5cdFx0XHRcdFx0XHQvLyBub2RlLWZldGNoLXNwZWNpZmljIHN0ZXA6IG1ha2UgbWFudWFsIHJlZGlyZWN0IGEgYml0IGVhc2llciB0byB1c2UgYnkgc2V0dGluZyB0aGUgTG9jYXRpb24gaGVhZGVyIHZhbHVlIHRvIHRoZSByZXNvbHZlZCBVUkwuXG5cdFx0XHRcdFx0XHRpZiAobG9jYXRpb25VUkwgIT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0Ly8gaGFuZGxlIGNvcnJ1cHRlZCBoZWFkZXJcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRoZWFkZXJzLnNldCgnTG9jYXRpb24nLCBsb2NhdGlvblVSTCk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBub2RlanMgc2VydmVyIHByZXZlbnQgaW52YWxpZCByZXNwb25zZSBoZWFkZXJzLCB3ZSBjYW4ndCB0ZXN0IHRoaXMgdGhyb3VnaCBub3JtYWwgcmVxdWVzdFxuXHRcdFx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdmb2xsb3cnOlxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDJcblx0XHRcdFx0XHRcdGlmIChsb2NhdGlvblVSTCA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDVcblx0XHRcdFx0XHRcdGlmIChyZXF1ZXN0LmNvdW50ZXIgPj0gcmVxdWVzdC5mb2xsb3cpIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBtYXhpbXVtIHJlZGlyZWN0IHJlYWNoZWQgYXQ6ICR7cmVxdWVzdC51cmx9YCwgJ21heC1yZWRpcmVjdCcpKTtcblx0XHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgNiAoY291bnRlciBpbmNyZW1lbnQpXG5cdFx0XHRcdFx0XHQvLyBDcmVhdGUgYSBuZXcgUmVxdWVzdCBvYmplY3QuXG5cdFx0XHRcdFx0XHRjb25zdCByZXF1ZXN0T3B0cyA9IHtcblx0XHRcdFx0XHRcdFx0aGVhZGVyczogbmV3IEhlYWRlcnMocmVxdWVzdC5oZWFkZXJzKSxcblx0XHRcdFx0XHRcdFx0Zm9sbG93OiByZXF1ZXN0LmZvbGxvdyxcblx0XHRcdFx0XHRcdFx0Y291bnRlcjogcmVxdWVzdC5jb3VudGVyICsgMSxcblx0XHRcdFx0XHRcdFx0YWdlbnQ6IHJlcXVlc3QuYWdlbnQsXG5cdFx0XHRcdFx0XHRcdGNvbXByZXNzOiByZXF1ZXN0LmNvbXByZXNzLFxuXHRcdFx0XHRcdFx0XHRtZXRob2Q6IHJlcXVlc3QubWV0aG9kLFxuXHRcdFx0XHRcdFx0XHRib2R5OiByZXF1ZXN0LmJvZHksXG5cdFx0XHRcdFx0XHRcdHNpZ25hbDogcmVxdWVzdC5zaWduYWwsXG5cdFx0XHRcdFx0XHRcdHRpbWVvdXQ6IHJlcXVlc3QudGltZW91dFxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDlcblx0XHRcdFx0XHRcdGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMzAzICYmIHJlcXVlc3QuYm9keSAmJiBnZXRUb3RhbEJ5dGVzKHJlcXVlc3QpID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcignQ2Fubm90IGZvbGxvdyByZWRpcmVjdCB3aXRoIGJvZHkgYmVpbmcgYSByZWFkYWJsZSBzdHJlYW0nLCAndW5zdXBwb3J0ZWQtcmVkaXJlY3QnKSk7XG5cdFx0XHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDExXG5cdFx0XHRcdFx0XHRpZiAocmVzLnN0YXR1c0NvZGUgPT09IDMwMyB8fCAocmVzLnN0YXR1c0NvZGUgPT09IDMwMSB8fCByZXMuc3RhdHVzQ29kZSA9PT0gMzAyKSAmJiByZXF1ZXN0Lm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RPcHRzLm1ldGhvZCA9ICdHRVQnO1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0T3B0cy5ib2R5ID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0T3B0cy5oZWFkZXJzLmRlbGV0ZSgnY29udGVudC1sZW5ndGgnKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDE1XG5cdFx0XHRcdFx0XHRyZXNvbHZlKGZldGNoKG5ldyBSZXF1ZXN0KGxvY2F0aW9uVVJMLCByZXF1ZXN0T3B0cykpKTtcblx0XHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gcHJlcGFyZSByZXNwb25zZVxuXHRcdFx0cmVzLm9uY2UoJ2VuZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKHNpZ25hbCkgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XG5cdFx0XHR9KTtcblx0XHRcdGxldCBib2R5ID0gcmVzLnBpcGUobmV3IFBhc3NUaHJvdWdoJDEoKSk7XG5cblx0XHRcdGNvbnN0IHJlc3BvbnNlX29wdGlvbnMgPSB7XG5cdFx0XHRcdHVybDogcmVxdWVzdC51cmwsXG5cdFx0XHRcdHN0YXR1czogcmVzLnN0YXR1c0NvZGUsXG5cdFx0XHRcdHN0YXR1c1RleHQ6IHJlcy5zdGF0dXNNZXNzYWdlLFxuXHRcdFx0XHRoZWFkZXJzOiBoZWFkZXJzLFxuXHRcdFx0XHRzaXplOiByZXF1ZXN0LnNpemUsXG5cdFx0XHRcdHRpbWVvdXQ6IHJlcXVlc3QudGltZW91dCxcblx0XHRcdFx0Y291bnRlcjogcmVxdWVzdC5jb3VudGVyXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBIVFRQLW5ldHdvcmsgZmV0Y2ggc3RlcCAxMi4xLjEuM1xuXHRcdFx0Y29uc3QgY29kaW5ncyA9IGhlYWRlcnMuZ2V0KCdDb250ZW50LUVuY29kaW5nJyk7XG5cblx0XHRcdC8vIEhUVFAtbmV0d29yayBmZXRjaCBzdGVwIDEyLjEuMS40OiBoYW5kbGUgY29udGVudCBjb2RpbmdzXG5cblx0XHRcdC8vIGluIGZvbGxvd2luZyBzY2VuYXJpb3Mgd2UgaWdub3JlIGNvbXByZXNzaW9uIHN1cHBvcnRcblx0XHRcdC8vIDEuIGNvbXByZXNzaW9uIHN1cHBvcnQgaXMgZGlzYWJsZWRcblx0XHRcdC8vIDIuIEhFQUQgcmVxdWVzdFxuXHRcdFx0Ly8gMy4gbm8gQ29udGVudC1FbmNvZGluZyBoZWFkZXJcblx0XHRcdC8vIDQuIG5vIGNvbnRlbnQgcmVzcG9uc2UgKDIwNClcblx0XHRcdC8vIDUuIGNvbnRlbnQgbm90IG1vZGlmaWVkIHJlc3BvbnNlICgzMDQpXG5cdFx0XHRpZiAoIXJlcXVlc3QuY29tcHJlc3MgfHwgcmVxdWVzdC5tZXRob2QgPT09ICdIRUFEJyB8fCBjb2RpbmdzID09PSBudWxsIHx8IHJlcy5zdGF0dXNDb2RlID09PSAyMDQgfHwgcmVzLnN0YXR1c0NvZGUgPT09IDMwNCkge1xuXHRcdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZV9vcHRpb25zKTtcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9yIE5vZGUgdjYrXG5cdFx0XHQvLyBCZSBsZXNzIHN0cmljdCB3aGVuIGRlY29kaW5nIGNvbXByZXNzZWQgcmVzcG9uc2VzLCBzaW5jZSBzb21ldGltZXNcblx0XHRcdC8vIHNlcnZlcnMgc2VuZCBzbGlnaHRseSBpbnZhbGlkIHJlc3BvbnNlcyB0aGF0IGFyZSBzdGlsbCBhY2NlcHRlZFxuXHRcdFx0Ly8gYnkgY29tbW9uIGJyb3dzZXJzLlxuXHRcdFx0Ly8gQWx3YXlzIHVzaW5nIFpfU1lOQ19GTFVTSCBpcyB3aGF0IGNVUkwgZG9lcy5cblx0XHRcdGNvbnN0IHpsaWJPcHRpb25zID0ge1xuXHRcdFx0XHRmbHVzaDogemxpYi5aX1NZTkNfRkxVU0gsXG5cdFx0XHRcdGZpbmlzaEZsdXNoOiB6bGliLlpfU1lOQ19GTFVTSFxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gZm9yIGd6aXBcblx0XHRcdGlmIChjb2RpbmdzID09ICdnemlwJyB8fCBjb2RpbmdzID09ICd4LWd6aXAnKSB7XG5cdFx0XHRcdGJvZHkgPSBib2R5LnBpcGUoemxpYi5jcmVhdGVHdW56aXAoemxpYk9wdGlvbnMpKTtcblx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2Vfb3B0aW9ucyk7XG5cdFx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIGZvciBkZWZsYXRlXG5cdFx0XHRpZiAoY29kaW5ncyA9PSAnZGVmbGF0ZScgfHwgY29kaW5ncyA9PSAneC1kZWZsYXRlJykge1xuXHRcdFx0XHQvLyBoYW5kbGUgdGhlIGluZmFtb3VzIHJhdyBkZWZsYXRlIHJlc3BvbnNlIGZyb20gb2xkIHNlcnZlcnNcblx0XHRcdFx0Ly8gYSBoYWNrIGZvciBvbGQgSUlTIGFuZCBBcGFjaGUgc2VydmVyc1xuXHRcdFx0XHRjb25zdCByYXcgPSByZXMucGlwZShuZXcgUGFzc1Rocm91Z2gkMSgpKTtcblx0XHRcdFx0cmF3Lm9uY2UoJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcblx0XHRcdFx0XHQvLyBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNzUxOTgyOFxuXHRcdFx0XHRcdGlmICgoY2h1bmtbMF0gJiAweDBGKSA9PT0gMHgwOCkge1xuXHRcdFx0XHRcdFx0Ym9keSA9IGJvZHkucGlwZSh6bGliLmNyZWF0ZUluZmxhdGUoKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGJvZHkgPSBib2R5LnBpcGUoemxpYi5jcmVhdGVJbmZsYXRlUmF3KCkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZV9vcHRpb25zKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZm9yIGJyXG5cdFx0XHRpZiAoY29kaW5ncyA9PSAnYnInICYmIHR5cGVvZiB6bGliLmNyZWF0ZUJyb3RsaURlY29tcHJlc3MgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0Ym9keSA9IGJvZHkucGlwZSh6bGliLmNyZWF0ZUJyb3RsaURlY29tcHJlc3MoKSk7XG5cdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlX29wdGlvbnMpO1xuXHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBvdGhlcndpc2UsIHVzZSByZXNwb25zZSBhcy1pc1xuXHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2Vfb3B0aW9ucyk7XG5cdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHR9KTtcblxuXHRcdHdyaXRlVG9TdHJlYW0ocmVxLCByZXF1ZXN0KTtcblx0fSk7XG59XG4vKipcbiAqIFJlZGlyZWN0IGNvZGUgbWF0Y2hpbmdcbiAqXG4gKiBAcGFyYW0gICBOdW1iZXIgICBjb2RlICBTdGF0dXMgY29kZVxuICogQHJldHVybiAgQm9vbGVhblxuICovXG5mZXRjaC5pc1JlZGlyZWN0ID0gZnVuY3Rpb24gKGNvZGUpIHtcblx0cmV0dXJuIGNvZGUgPT09IDMwMSB8fCBjb2RlID09PSAzMDIgfHwgY29kZSA9PT0gMzAzIHx8IGNvZGUgPT09IDMwNyB8fCBjb2RlID09PSAzMDg7XG59O1xuXG4vLyBleHBvc2UgUHJvbWlzZVxuZmV0Y2guUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xuXG5mdW5jdGlvbiBnZXRfcGFnZV9oYW5kbGVyKFxuXHRtYW5pZmVzdCxcblx0c2Vzc2lvbl9nZXR0ZXJcbikge1xuXHRjb25zdCBnZXRfYnVpbGRfaW5mbyA9IGRldlxuXHRcdD8gKCkgPT4gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ2J1aWxkLmpzb24nKSwgJ3V0Zi04JykpXG5cdFx0OiAoYXNzZXRzID0+ICgpID0+IGFzc2V0cykoSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ2J1aWxkLmpzb24nKSwgJ3V0Zi04JykpKTtcblxuXHRjb25zdCB0ZW1wbGF0ZSA9IGRldlxuXHRcdD8gKCkgPT4gcmVhZF90ZW1wbGF0ZShzcmNfZGlyKVxuXHRcdDogKHN0ciA9PiAoKSA9PiBzdHIpKHJlYWRfdGVtcGxhdGUoYnVpbGRfZGlyKSk7XG5cblx0Y29uc3QgaGFzX3NlcnZpY2Vfd29ya2VyID0gZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCAnc2VydmljZS13b3JrZXIuanMnKSk7XG5cblx0Y29uc3QgeyBzZXJ2ZXJfcm91dGVzLCBwYWdlcyB9ID0gbWFuaWZlc3Q7XG5cdGNvbnN0IGVycm9yX3JvdXRlID0gbWFuaWZlc3QuZXJyb3I7XG5cblx0ZnVuY3Rpb24gYmFpbChyZXEsIHJlcywgZXJyKSB7XG5cdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXG5cdFx0Y29uc3QgbWVzc2FnZSA9IGRldiA/IGVzY2FwZV9odG1sKGVyci5tZXNzYWdlKSA6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InO1xuXG5cdFx0cmVzLnN0YXR1c0NvZGUgPSA1MDA7XG5cdFx0cmVzLmVuZChgPHByZT4ke21lc3NhZ2V9PC9wcmU+YCk7XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVfZXJyb3IocmVxLCByZXMsIHN0YXR1c0NvZGUsIGVycm9yKSB7XG5cdFx0aGFuZGxlX3BhZ2Uoe1xuXHRcdFx0cGF0dGVybjogbnVsbCxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdHsgbmFtZTogbnVsbCwgY29tcG9uZW50OiBlcnJvcl9yb3V0ZSB9XG5cdFx0XHRdXG5cdFx0fSwgcmVxLCByZXMsIHN0YXR1c0NvZGUsIGVycm9yIHx8IG5ldyBFcnJvcignVW5rbm93biBlcnJvciBpbiBwcmVsb2FkIGZ1bmN0aW9uJykpO1xuXHR9XG5cblx0YXN5bmMgZnVuY3Rpb24gaGFuZGxlX3BhZ2UocGFnZSwgcmVxLCByZXMsIHN0YXR1cyA9IDIwMCwgZXJyb3IgPSBudWxsKSB7XG5cdFx0Y29uc3QgaXNfc2VydmljZV93b3JrZXJfaW5kZXggPSByZXEucGF0aCA9PT0gJy9zZXJ2aWNlLXdvcmtlci1pbmRleC5odG1sJztcblx0XHRjb25zdCBidWlsZF9pbmZvXG5cblxuXG5cbiA9IGdldF9idWlsZF9pbmZvKCk7XG5cblx0XHRyZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC9odG1sJyk7XG5cdFx0cmVzLnNldEhlYWRlcignQ2FjaGUtQ29udHJvbCcsIGRldiA/ICduby1jYWNoZScgOiAnbWF4LWFnZT02MDAnKTtcblxuXHRcdC8vIHByZWxvYWQgbWFpbi5qcyBhbmQgY3VycmVudCByb3V0ZVxuXHRcdC8vIFRPRE8gZGV0ZWN0IG90aGVyIHN0dWZmIHdlIGNhbiBwcmVsb2FkPyBpbWFnZXMsIENTUywgZm9udHM/XG5cdFx0bGV0IHByZWxvYWRlZF9jaHVua3MgPSBBcnJheS5pc0FycmF5KGJ1aWxkX2luZm8uYXNzZXRzLm1haW4pID8gYnVpbGRfaW5mby5hc3NldHMubWFpbiA6IFtidWlsZF9pbmZvLmFzc2V0cy5tYWluXTtcblx0XHRpZiAoIWVycm9yICYmICFpc19zZXJ2aWNlX3dvcmtlcl9pbmRleCkge1xuXHRcdFx0cGFnZS5wYXJ0cy5mb3JFYWNoKHBhcnQgPT4ge1xuXHRcdFx0XHRpZiAoIXBhcnQpIHJldHVybjtcblxuXHRcdFx0XHQvLyB1c2luZyBjb25jYXQgYmVjYXVzZSBpdCBjb3VsZCBiZSBhIHN0cmluZyBvciBhbiBhcnJheS4gdGhhbmtzIHdlYnBhY2shXG5cdFx0XHRcdHByZWxvYWRlZF9jaHVua3MgPSBwcmVsb2FkZWRfY2h1bmtzLmNvbmNhdChidWlsZF9pbmZvLmFzc2V0c1twYXJ0Lm5hbWVdKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmIChidWlsZF9pbmZvLmJ1bmRsZXIgPT09ICdyb2xsdXAnKSB7XG5cdFx0XHQvLyBUT0RPIGFkZCBkZXBlbmRlbmNpZXMgYW5kIENTU1xuXHRcdFx0Y29uc3QgbGluayA9IHByZWxvYWRlZF9jaHVua3Ncblx0XHRcdFx0LmZpbHRlcihmaWxlID0+IGZpbGUgJiYgIWZpbGUubWF0Y2goL1xcLm1hcCQvKSlcblx0XHRcdFx0Lm1hcChmaWxlID0+IGA8JHtyZXEuYmFzZVVybH0vY2xpZW50LyR7ZmlsZX0+O3JlbD1cIm1vZHVsZXByZWxvYWRcImApXG5cdFx0XHRcdC5qb2luKCcsICcpO1xuXG5cdFx0XHRyZXMuc2V0SGVhZGVyKCdMaW5rJywgbGluayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGxpbmsgPSBwcmVsb2FkZWRfY2h1bmtzXG5cdFx0XHRcdC5maWx0ZXIoZmlsZSA9PiBmaWxlICYmICFmaWxlLm1hdGNoKC9cXC5tYXAkLykpXG5cdFx0XHRcdC5tYXAoKGZpbGUpID0+IHtcblx0XHRcdFx0XHRjb25zdCBhcyA9IC9cXC5jc3MkLy50ZXN0KGZpbGUpID8gJ3N0eWxlJyA6ICdzY3JpcHQnO1xuXHRcdFx0XHRcdHJldHVybiBgPCR7cmVxLmJhc2VVcmx9L2NsaWVudC8ke2ZpbGV9PjtyZWw9XCJwcmVsb2FkXCI7YXM9XCIke2FzfVwiYDtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmpvaW4oJywgJyk7XG5cblx0XHRcdHJlcy5zZXRIZWFkZXIoJ0xpbmsnLCBsaW5rKTtcblx0XHR9XG5cblx0XHRjb25zdCBzZXNzaW9uID0gc2Vzc2lvbl9nZXR0ZXIocmVxLCByZXMpO1xuXG5cdFx0bGV0IHJlZGlyZWN0O1xuXHRcdGxldCBwcmVsb2FkX2Vycm9yO1xuXG5cdFx0Y29uc3QgcHJlbG9hZF9jb250ZXh0ID0ge1xuXHRcdFx0cmVkaXJlY3Q6IChzdGF0dXNDb2RlLCBsb2NhdGlvbikgPT4ge1xuXHRcdFx0XHRpZiAocmVkaXJlY3QgJiYgKHJlZGlyZWN0LnN0YXR1c0NvZGUgIT09IHN0YXR1c0NvZGUgfHwgcmVkaXJlY3QubG9jYXRpb24gIT09IGxvY2F0aW9uKSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihgQ29uZmxpY3RpbmcgcmVkaXJlY3RzYCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bG9jYXRpb24gPSBsb2NhdGlvbi5yZXBsYWNlKC9eXFwvL2csICcnKTsgLy8gbGVhZGluZyBzbGFzaCAob25seSlcblx0XHRcdFx0cmVkaXJlY3QgPSB7IHN0YXR1c0NvZGUsIGxvY2F0aW9uIH07XG5cdFx0XHR9LFxuXHRcdFx0ZXJyb3I6IChzdGF0dXNDb2RlLCBtZXNzYWdlKSA9PiB7XG5cdFx0XHRcdHByZWxvYWRfZXJyb3IgPSB7IHN0YXR1c0NvZGUsIG1lc3NhZ2UgfTtcblx0XHRcdH0sXG5cdFx0XHRmZXRjaDogKHVybCwgb3B0cykgPT4ge1xuXHRcdFx0XHRjb25zdCBwYXJzZWQgPSBuZXcgVXJsLlVSTCh1cmwsIGBodHRwOi8vMTI3LjAuMC4xOiR7cHJvY2Vzcy5lbnYuUE9SVH0ke3JlcS5iYXNlVXJsID8gcmVxLmJhc2VVcmwgKyAnLycgOicnfWApO1xuXG5cdFx0XHRcdGlmIChvcHRzKSB7XG5cdFx0XHRcdFx0b3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpO1xuXG5cdFx0XHRcdFx0Y29uc3QgaW5jbHVkZV9jb29raWVzID0gKFxuXHRcdFx0XHRcdFx0b3B0cy5jcmVkZW50aWFscyA9PT0gJ2luY2x1ZGUnIHx8XG5cdFx0XHRcdFx0XHRvcHRzLmNyZWRlbnRpYWxzID09PSAnc2FtZS1vcmlnaW4nICYmIHBhcnNlZC5vcmlnaW4gPT09IGBodHRwOi8vMTI3LjAuMC4xOiR7cHJvY2Vzcy5lbnYuUE9SVH1gXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdGlmIChpbmNsdWRlX2Nvb2tpZXMpIHtcblx0XHRcdFx0XHRcdG9wdHMuaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMuaGVhZGVycyk7XG5cblx0XHRcdFx0XHRcdGNvbnN0IGNvb2tpZXMgPSBPYmplY3QuYXNzaWduKFxuXHRcdFx0XHRcdFx0XHR7fSxcblx0XHRcdFx0XHRcdFx0Y29va2llLnBhcnNlKHJlcS5oZWFkZXJzLmNvb2tpZSB8fCAnJyksXG5cdFx0XHRcdFx0XHRcdGNvb2tpZS5wYXJzZShvcHRzLmhlYWRlcnMuY29va2llIHx8ICcnKVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0Y29uc3Qgc2V0X2Nvb2tpZSA9IHJlcy5nZXRIZWFkZXIoJ1NldC1Db29raWUnKTtcblx0XHRcdFx0XHRcdChBcnJheS5pc0FycmF5KHNldF9jb29raWUpID8gc2V0X2Nvb2tpZSA6IFtzZXRfY29va2llXSkuZm9yRWFjaChzdHIgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IC8oW149XSspPShbXjtdKykvLmV4ZWMoc3RyKTtcblx0XHRcdFx0XHRcdFx0aWYgKG1hdGNoKSBjb29raWVzW21hdGNoWzFdXSA9IG1hdGNoWzJdO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdGNvbnN0IHN0ciA9IE9iamVjdC5rZXlzKGNvb2tpZXMpXG5cdFx0XHRcdFx0XHRcdC5tYXAoa2V5ID0+IGAke2tleX09JHtjb29raWVzW2tleV19YClcblx0XHRcdFx0XHRcdFx0LmpvaW4oJzsgJyk7XG5cblx0XHRcdFx0XHRcdG9wdHMuaGVhZGVycy5jb29raWUgPSBzdHI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGZldGNoKHBhcnNlZC5ocmVmLCBvcHRzKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0bGV0IHByZWxvYWRlZDtcblx0XHRsZXQgbWF0Y2g7XG5cdFx0bGV0IHBhcmFtcztcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByb290X3ByZWxvYWRlZCA9IG1hbmlmZXN0LnJvb3RfcHJlbG9hZFxuXHRcdFx0XHQ/IG1hbmlmZXN0LnJvb3RfcHJlbG9hZC5jYWxsKHByZWxvYWRfY29udGV4dCwge1xuXHRcdFx0XHRcdGhvc3Q6IHJlcS5oZWFkZXJzLmhvc3QsXG5cdFx0XHRcdFx0cGF0aDogcmVxLnBhdGgsXG5cdFx0XHRcdFx0cXVlcnk6IHJlcS5xdWVyeSxcblx0XHRcdFx0XHRwYXJhbXM6IHt9XG5cdFx0XHRcdH0sIHNlc3Npb24pXG5cdFx0XHRcdDoge307XG5cblx0XHRcdG1hdGNoID0gZXJyb3IgPyBudWxsIDogcGFnZS5wYXR0ZXJuLmV4ZWMocmVxLnBhdGgpO1xuXG5cblx0XHRcdGxldCB0b1ByZWxvYWQgPSBbcm9vdF9wcmVsb2FkZWRdO1xuXHRcdFx0aWYgKCFpc19zZXJ2aWNlX3dvcmtlcl9pbmRleCkge1xuXHRcdFx0XHR0b1ByZWxvYWQgPSB0b1ByZWxvYWQuY29uY2F0KHBhZ2UucGFydHMubWFwKHBhcnQgPT4ge1xuXHRcdFx0XHRcdGlmICghcGFydCkgcmV0dXJuIG51bGw7XG5cblx0XHRcdFx0XHQvLyB0aGUgZGVlcGVzdCBsZXZlbCBpcyB1c2VkIGJlbG93LCB0byBpbml0aWFsaXNlIHRoZSBzdG9yZVxuXHRcdFx0XHRcdHBhcmFtcyA9IHBhcnQucGFyYW1zID8gcGFydC5wYXJhbXMobWF0Y2gpIDoge307XG5cblx0XHRcdFx0XHRyZXR1cm4gcGFydC5wcmVsb2FkXG5cdFx0XHRcdFx0XHQ/IHBhcnQucHJlbG9hZC5jYWxsKHByZWxvYWRfY29udGV4dCwge1xuXHRcdFx0XHRcdFx0XHRob3N0OiByZXEuaGVhZGVycy5ob3N0LFxuXHRcdFx0XHRcdFx0XHRwYXRoOiByZXEucGF0aCxcblx0XHRcdFx0XHRcdFx0cXVlcnk6IHJlcS5xdWVyeSxcblx0XHRcdFx0XHRcdFx0cGFyYW1zXG5cdFx0XHRcdFx0XHR9LCBzZXNzaW9uKVxuXHRcdFx0XHRcdFx0OiB7fTtcblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXG5cdFx0XHRwcmVsb2FkZWQgPSBhd2FpdCBQcm9taXNlLmFsbCh0b1ByZWxvYWQpO1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdHJldHVybiBiYWlsKHJlcSwgcmVzLCBlcnIpXG5cdFx0XHR9XG5cblx0XHRcdHByZWxvYWRfZXJyb3IgPSB7IHN0YXR1c0NvZGU6IDUwMCwgbWVzc2FnZTogZXJyIH07XG5cdFx0XHRwcmVsb2FkZWQgPSBbXTsgLy8gYXBwZWFzZSBUeXBlU2NyaXB0XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdGlmIChyZWRpcmVjdCkge1xuXHRcdFx0XHRjb25zdCBsb2NhdGlvbiA9IFVybC5yZXNvbHZlKChyZXEuYmFzZVVybCB8fCAnJykgKyAnLycsIHJlZGlyZWN0LmxvY2F0aW9uKTtcblxuXHRcdFx0XHRyZXMuc3RhdHVzQ29kZSA9IHJlZGlyZWN0LnN0YXR1c0NvZGU7XG5cdFx0XHRcdHJlcy5zZXRIZWFkZXIoJ0xvY2F0aW9uJywgbG9jYXRpb24pO1xuXHRcdFx0XHRyZXMuZW5kKCk7XG5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocHJlbG9hZF9lcnJvcikge1xuXHRcdFx0XHRoYW5kbGVfZXJyb3IocmVxLCByZXMsIHByZWxvYWRfZXJyb3Iuc3RhdHVzQ29kZSwgcHJlbG9hZF9lcnJvci5tZXNzYWdlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBzZWdtZW50cyA9IHJlcS5wYXRoLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xuXG5cdFx0XHQvLyBUT0RPIG1ha2UgdGhpcyBsZXNzIGNvbmZ1c2luZ1xuXHRcdFx0Y29uc3QgbGF5b3V0X3NlZ21lbnRzID0gW3NlZ21lbnRzWzBdXTtcblx0XHRcdGxldCBsID0gMTtcblxuXHRcdFx0cGFnZS5wYXJ0cy5mb3JFYWNoKChwYXJ0LCBpKSA9PiB7XG5cdFx0XHRcdGxheW91dF9zZWdtZW50c1tsXSA9IHNlZ21lbnRzW2kgKyAxXTtcblx0XHRcdFx0aWYgKCFwYXJ0KSByZXR1cm4gbnVsbDtcblx0XHRcdFx0bCsrO1xuXHRcdFx0fSk7XG5cblx0XHRcdGNvbnN0IHByb3BzID0ge1xuXHRcdFx0XHRzdG9yZXM6IHtcblx0XHRcdFx0XHRwYWdlOiB7XG5cdFx0XHRcdFx0XHRzdWJzY3JpYmU6IHdyaXRhYmxlKHtcblx0XHRcdFx0XHRcdFx0aG9zdDogcmVxLmhlYWRlcnMuaG9zdCxcblx0XHRcdFx0XHRcdFx0cGF0aDogcmVxLnBhdGgsXG5cdFx0XHRcdFx0XHRcdHF1ZXJ5OiByZXEucXVlcnksXG5cdFx0XHRcdFx0XHRcdHBhcmFtc1xuXHRcdFx0XHRcdFx0fSkuc3Vic2NyaWJlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwcmVsb2FkaW5nOiB7XG5cdFx0XHRcdFx0XHRzdWJzY3JpYmU6IHdyaXRhYmxlKG51bGwpLnN1YnNjcmliZVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2Vzc2lvbjogd3JpdGFibGUoc2Vzc2lvbilcblx0XHRcdFx0fSxcblx0XHRcdFx0c2VnbWVudHM6IGxheW91dF9zZWdtZW50cyxcblx0XHRcdFx0c3RhdHVzOiBlcnJvciA/IHN0YXR1cyA6IDIwMCxcblx0XHRcdFx0ZXJyb3I6IGVycm9yID8gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yIDogeyBtZXNzYWdlOiBlcnJvciB9IDogbnVsbCxcblx0XHRcdFx0bGV2ZWwwOiB7XG5cdFx0XHRcdFx0cHJvcHM6IHByZWxvYWRlZFswXVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRsZXZlbDE6IHtcblx0XHRcdFx0XHRzZWdtZW50OiBzZWdtZW50c1swXSxcblx0XHRcdFx0XHRwcm9wczoge31cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0aWYgKCFpc19zZXJ2aWNlX3dvcmtlcl9pbmRleCkge1xuXHRcdFx0XHRsZXQgbCA9IDE7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZS5wYXJ0cy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRcdGNvbnN0IHBhcnQgPSBwYWdlLnBhcnRzW2ldO1xuXHRcdFx0XHRcdGlmICghcGFydCkgY29udGludWU7XG5cblx0XHRcdFx0XHRwcm9wc1tgbGV2ZWwke2wrK31gXSA9IHtcblx0XHRcdFx0XHRcdGNvbXBvbmVudDogcGFydC5jb21wb25lbnQsXG5cdFx0XHRcdFx0XHRwcm9wczogcHJlbG9hZGVkW2kgKyAxXSB8fCB7fSxcblx0XHRcdFx0XHRcdHNlZ21lbnQ6IHNlZ21lbnRzW2ldXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCB7IGh0bWwsIGhlYWQsIGNzcyB9ID0gQXBwLnJlbmRlcihwcm9wcyk7XG5cblx0XHRcdGNvbnN0IHNlcmlhbGl6ZWQgPSB7XG5cdFx0XHRcdHByZWxvYWRlZDogYFske3ByZWxvYWRlZC5tYXAoZGF0YSA9PiB0cnlfc2VyaWFsaXplKGRhdGEpKS5qb2luKCcsJyl9XWAsXG5cdFx0XHRcdHNlc3Npb246IHNlc3Npb24gJiYgdHJ5X3NlcmlhbGl6ZShzZXNzaW9uLCBlcnIgPT4ge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHNlcmlhbGl6ZSBzZXNzaW9uIGRhdGE6ICR7ZXJyLm1lc3NhZ2V9YCk7XG5cdFx0XHRcdH0pLFxuXHRcdFx0XHRlcnJvcjogZXJyb3IgJiYgdHJ5X3NlcmlhbGl6ZShwcm9wcy5lcnJvcilcblx0XHRcdH07XG5cblx0XHRcdGxldCBzY3JpcHQgPSBgX19TQVBQRVJfXz17JHtbXG5cdFx0XHRcdGVycm9yICYmIGBlcnJvcjoke3NlcmlhbGl6ZWQuZXJyb3J9LHN0YXR1czoke3N0YXR1c31gLFxuXHRcdFx0XHRgYmFzZVVybDpcIiR7cmVxLmJhc2VVcmx9XCJgLFxuXHRcdFx0XHRzZXJpYWxpemVkLnByZWxvYWRlZCAmJiBgcHJlbG9hZGVkOiR7c2VyaWFsaXplZC5wcmVsb2FkZWR9YCxcblx0XHRcdFx0c2VyaWFsaXplZC5zZXNzaW9uICYmIGBzZXNzaW9uOiR7c2VyaWFsaXplZC5zZXNzaW9ufWBcblx0XHRcdF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJywnKX19O2A7XG5cblx0XHRcdGlmIChoYXNfc2VydmljZV93b3JrZXIpIHtcblx0XHRcdFx0c2NyaXB0ICs9IGBpZignc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKW5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcke3JlcS5iYXNlVXJsfS9zZXJ2aWNlLXdvcmtlci5qcycpO2A7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGZpbGUgPSBbXS5jb25jYXQoYnVpbGRfaW5mby5hc3NldHMubWFpbikuZmlsdGVyKGZpbGUgPT4gZmlsZSAmJiAvXFwuanMkLy50ZXN0KGZpbGUpKVswXTtcblx0XHRcdGNvbnN0IG1haW4gPSBgJHtyZXEuYmFzZVVybH0vY2xpZW50LyR7ZmlsZX1gO1xuXG5cdFx0XHRpZiAoYnVpbGRfaW5mby5idW5kbGVyID09PSAncm9sbHVwJykge1xuXHRcdFx0XHRpZiAoYnVpbGRfaW5mby5sZWdhY3lfYXNzZXRzKSB7XG5cdFx0XHRcdFx0Y29uc3QgbGVnYWN5X21haW4gPSBgJHtyZXEuYmFzZVVybH0vY2xpZW50L2xlZ2FjeS8ke2J1aWxkX2luZm8ubGVnYWN5X2Fzc2V0cy5tYWlufWA7XG5cdFx0XHRcdFx0c2NyaXB0ICs9IGAoZnVuY3Rpb24oKXt0cnl7ZXZhbChcImFzeW5jIGZ1bmN0aW9uIHgoKXt9XCIpO3ZhciBtYWluPVwiJHttYWlufVwifWNhdGNoKGUpe21haW49XCIke2xlZ2FjeV9tYWlufVwifTt2YXIgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO3RyeXtuZXcgRnVuY3Rpb24oXCJpZigwKWltcG9ydCgnJylcIikoKTtzLnNyYz1tYWluO3MudHlwZT1cIm1vZHVsZVwiO3MuY3Jvc3NPcmlnaW49XCJ1c2UtY3JlZGVudGlhbHNcIjt9Y2F0Y2goZSl7cy5zcmM9XCIke3JlcS5iYXNlVXJsfS9jbGllbnQvc2hpbXBvcnRAJHtidWlsZF9pbmZvLnNoaW1wb3J0fS5qc1wiO3Muc2V0QXR0cmlidXRlKFwiZGF0YS1tYWluXCIsbWFpbik7fWRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7fSgpKTtgO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNjcmlwdCArPSBgdmFyIHM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTt0cnl7bmV3IEZ1bmN0aW9uKFwiaWYoMClpbXBvcnQoJycpXCIpKCk7cy5zcmM9XCIke21haW59XCI7cy50eXBlPVwibW9kdWxlXCI7cy5jcm9zc09yaWdpbj1cInVzZS1jcmVkZW50aWFsc1wiO31jYXRjaChlKXtzLnNyYz1cIiR7cmVxLmJhc2VVcmx9L2NsaWVudC9zaGltcG9ydEAke2J1aWxkX2luZm8uc2hpbXBvcnR9LmpzXCI7cy5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1haW5cIixcIiR7bWFpbn1cIil9ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKWA7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNjcmlwdCArPSBgPC9zY3JpcHQ+PHNjcmlwdCBzcmM9XCIke21haW59XCI+YDtcblx0XHRcdH1cblxuXHRcdFx0bGV0IHN0eWxlcztcblxuXHRcdFx0Ly8gVE9ETyBtYWtlIHRoaXMgY29uc2lzdGVudCBhY3Jvc3MgYXBwc1xuXHRcdFx0Ly8gVE9ETyBlbWJlZCBidWlsZF9pbmZvIGluIHBsYWNlaG9sZGVyLnRzXG5cdFx0XHRpZiAoYnVpbGRfaW5mby5jc3MgJiYgYnVpbGRfaW5mby5jc3MubWFpbikge1xuXHRcdFx0XHRjb25zdCBjc3NfY2h1bmtzID0gbmV3IFNldCgpO1xuXHRcdFx0XHRpZiAoYnVpbGRfaW5mby5jc3MubWFpbikgY3NzX2NodW5rcy5hZGQoYnVpbGRfaW5mby5jc3MubWFpbik7XG5cdFx0XHRcdHBhZ2UucGFydHMuZm9yRWFjaChwYXJ0ID0+IHtcblx0XHRcdFx0XHRpZiAoIXBhcnQpIHJldHVybjtcblx0XHRcdFx0XHRjb25zdCBjc3NfY2h1bmtzX2Zvcl9wYXJ0ID0gYnVpbGRfaW5mby5jc3MuY2h1bmtzW3BhcnQuZmlsZV07XG5cblx0XHRcdFx0XHRpZiAoY3NzX2NodW5rc19mb3JfcGFydCkge1xuXHRcdFx0XHRcdFx0Y3NzX2NodW5rc19mb3JfcGFydC5mb3JFYWNoKGZpbGUgPT4ge1xuXHRcdFx0XHRcdFx0XHRjc3NfY2h1bmtzLmFkZChmaWxlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0c3R5bGVzID0gQXJyYXkuZnJvbShjc3NfY2h1bmtzKVxuXHRcdFx0XHRcdC5tYXAoaHJlZiA9PiBgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJjbGllbnQvJHtocmVmfVwiPmApXG5cdFx0XHRcdFx0LmpvaW4oJycpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c3R5bGVzID0gKGNzcyAmJiBjc3MuY29kZSA/IGA8c3R5bGU+JHtjc3MuY29kZX08L3N0eWxlPmAgOiAnJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHVzZXJzIGNhbiBzZXQgYSBDU1Agbm9uY2UgdXNpbmcgcmVzLmxvY2Fscy5ub25jZVxuXHRcdFx0Y29uc3Qgbm9uY2VfYXR0ciA9IChyZXMubG9jYWxzICYmIHJlcy5sb2NhbHMubm9uY2UpID8gYCBub25jZT1cIiR7cmVzLmxvY2Fscy5ub25jZX1cImAgOiAnJztcblxuXHRcdFx0Y29uc3QgYm9keSA9IHRlbXBsYXRlKClcblx0XHRcdFx0LnJlcGxhY2UoJyVzYXBwZXIuYmFzZSUnLCAoKSA9PiBgPGJhc2UgaHJlZj1cIiR7cmVxLmJhc2VVcmx9L1wiPmApXG5cdFx0XHRcdC5yZXBsYWNlKCclc2FwcGVyLnNjcmlwdHMlJywgKCkgPT4gYDxzY3JpcHQke25vbmNlX2F0dHJ9PiR7c2NyaXB0fTwvc2NyaXB0PmApXG5cdFx0XHRcdC5yZXBsYWNlKCclc2FwcGVyLmh0bWwlJywgKCkgPT4gaHRtbClcblx0XHRcdFx0LnJlcGxhY2UoJyVzYXBwZXIuaGVhZCUnLCAoKSA9PiBgPG5vc2NyaXB0IGlkPSdzYXBwZXItaGVhZC1zdGFydCc+PC9ub3NjcmlwdD4ke2hlYWR9PG5vc2NyaXB0IGlkPSdzYXBwZXItaGVhZC1lbmQnPjwvbm9zY3JpcHQ+YClcblx0XHRcdFx0LnJlcGxhY2UoJyVzYXBwZXIuc3R5bGVzJScsICgpID0+IHN0eWxlcyk7XG5cblx0XHRcdHJlcy5zdGF0dXNDb2RlID0gc3RhdHVzO1xuXHRcdFx0cmVzLmVuZChib2R5KTtcblx0XHR9IGNhdGNoKGVycikge1xuXHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdGJhaWwocmVxLCByZXMsIGVycik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRoYW5kbGVfZXJyb3IocmVxLCByZXMsIDUwMCwgZXJyKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZnVuY3Rpb24gZmluZF9yb3V0ZShyZXEsIHJlcywgbmV4dCkge1xuXHRcdGlmIChyZXEucGF0aCA9PT0gJy9zZXJ2aWNlLXdvcmtlci1pbmRleC5odG1sJykge1xuXHRcdFx0Y29uc3QgaG9tZVBhZ2UgPSBwYWdlcy5maW5kKHBhZ2UgPT4gcGFnZS5wYXR0ZXJuLnRlc3QoJy8nKSk7XG5cdFx0XHRoYW5kbGVfcGFnZShob21lUGFnZSwgcmVxLCByZXMpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuXHRcdFx0aWYgKHBhZ2UucGF0dGVybi50ZXN0KHJlcS5wYXRoKSkge1xuXHRcdFx0XHRoYW5kbGVfcGFnZShwYWdlLCByZXEsIHJlcyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRoYW5kbGVfZXJyb3IocmVxLCByZXMsIDQwNCwgJ05vdCBmb3VuZCcpO1xuXHR9O1xufVxuXG5mdW5jdGlvbiByZWFkX3RlbXBsYXRlKGRpciA9IGJ1aWxkX2Rpcikge1xuXHRyZXR1cm4gZnMucmVhZEZpbGVTeW5jKGAke2Rpcn0vdGVtcGxhdGUuaHRtbGAsICd1dGYtOCcpO1xufVxuXG5mdW5jdGlvbiB0cnlfc2VyaWFsaXplKGRhdGEsIGZhaWwpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gZGV2YWx1ZShkYXRhKTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0aWYgKGZhaWwpIGZhaWwoZXJyKTtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5mdW5jdGlvbiBlc2NhcGVfaHRtbChodG1sKSB7XG5cdGNvbnN0IGNoYXJzID0ge1xuXHRcdCdcIicgOiAncXVvdCcsXG5cdFx0XCInXCI6ICcjMzknLFxuXHRcdCcmJzogJ2FtcCcsXG5cdFx0JzwnIDogJ2x0Jyxcblx0XHQnPicgOiAnZ3QnXG5cdH07XG5cblx0cmV0dXJuIGh0bWwucmVwbGFjZSgvW1wiJyY8Pl0vZywgYyA9PiBgJiR7Y2hhcnNbY119O2ApO1xufVxuXG52YXIgbWltZV9yYXcgPSBcImFwcGxpY2F0aW9uL2FuZHJldy1pbnNldFxcdFxcdFxcdGV6XFxuYXBwbGljYXRpb24vYXBwbGl4d2FyZVxcdFxcdFxcdFxcdGF3XFxuYXBwbGljYXRpb24vYXRvbSt4bWxcXHRcXHRcXHRcXHRhdG9tXFxuYXBwbGljYXRpb24vYXRvbWNhdCt4bWxcXHRcXHRcXHRcXHRhdG9tY2F0XFxuYXBwbGljYXRpb24vYXRvbXN2Yyt4bWxcXHRcXHRcXHRcXHRhdG9tc3ZjXFxuYXBwbGljYXRpb24vY2N4bWwreG1sXFx0XFx0XFx0XFx0Y2N4bWxcXG5hcHBsaWNhdGlvbi9jZG1pLWNhcGFiaWxpdHlcXHRcXHRcXHRjZG1pYVxcbmFwcGxpY2F0aW9uL2NkbWktY29udGFpbmVyXFx0XFx0XFx0Y2RtaWNcXG5hcHBsaWNhdGlvbi9jZG1pLWRvbWFpblxcdFxcdFxcdFxcdGNkbWlkXFxuYXBwbGljYXRpb24vY2RtaS1vYmplY3RcXHRcXHRcXHRcXHRjZG1pb1xcbmFwcGxpY2F0aW9uL2NkbWktcXVldWVcXHRcXHRcXHRcXHRjZG1pcVxcbmFwcGxpY2F0aW9uL2N1LXNlZW1lXFx0XFx0XFx0XFx0Y3VcXG5hcHBsaWNhdGlvbi9kYXZtb3VudCt4bWxcXHRcXHRcXHRkYXZtb3VudFxcbmFwcGxpY2F0aW9uL2RvY2Jvb2sreG1sXFx0XFx0XFx0XFx0ZGJrXFxuYXBwbGljYXRpb24vZHNzYytkZXJcXHRcXHRcXHRcXHRkc3NjXFxuYXBwbGljYXRpb24vZHNzYyt4bWxcXHRcXHRcXHRcXHR4ZHNzY1xcbmFwcGxpY2F0aW9uL2VjbWFzY3JpcHRcXHRcXHRcXHRcXHRlY21hXFxuYXBwbGljYXRpb24vZW1tYSt4bWxcXHRcXHRcXHRcXHRlbW1hXFxuYXBwbGljYXRpb24vZXB1Yit6aXBcXHRcXHRcXHRcXHRlcHViXFxuYXBwbGljYXRpb24vZXhpXFx0XFx0XFx0XFx0XFx0ZXhpXFxuYXBwbGljYXRpb24vZm9udC10ZHBmclxcdFxcdFxcdFxcdHBmclxcbmFwcGxpY2F0aW9uL2dtbCt4bWxcXHRcXHRcXHRcXHRnbWxcXG5hcHBsaWNhdGlvbi9ncHgreG1sXFx0XFx0XFx0XFx0Z3B4XFxuYXBwbGljYXRpb24vZ3hmXFx0XFx0XFx0XFx0XFx0Z3hmXFxuYXBwbGljYXRpb24vaHlwZXJzdHVkaW9cXHRcXHRcXHRcXHRzdGtcXG5hcHBsaWNhdGlvbi9pbmttbCt4bWxcXHRcXHRcXHRcXHRpbmsgaW5rbWxcXG5hcHBsaWNhdGlvbi9pcGZpeFxcdFxcdFxcdFxcdGlwZml4XFxuYXBwbGljYXRpb24vamF2YS1hcmNoaXZlXFx0XFx0XFx0amFyXFxuYXBwbGljYXRpb24vamF2YS1zZXJpYWxpemVkLW9iamVjdFxcdFxcdHNlclxcbmFwcGxpY2F0aW9uL2phdmEtdm1cXHRcXHRcXHRcXHRjbGFzc1xcbmFwcGxpY2F0aW9uL2phdmFzY3JpcHRcXHRcXHRcXHRcXHRqc1xcbmFwcGxpY2F0aW9uL2pzb25cXHRcXHRcXHRcXHRqc29uIG1hcFxcbmFwcGxpY2F0aW9uL2pzb25tbCtqc29uXFx0XFx0XFx0XFx0anNvbm1sXFxuYXBwbGljYXRpb24vbG9zdCt4bWxcXHRcXHRcXHRcXHRsb3N0eG1sXFxuYXBwbGljYXRpb24vbWFjLWJpbmhleDQwXFx0XFx0XFx0aHF4XFxuYXBwbGljYXRpb24vbWFjLWNvbXBhY3Rwcm9cXHRcXHRcXHRjcHRcXG5hcHBsaWNhdGlvbi9tYWRzK3htbFxcdFxcdFxcdFxcdG1hZHNcXG5hcHBsaWNhdGlvbi9tYXJjXFx0XFx0XFx0XFx0bXJjXFxuYXBwbGljYXRpb24vbWFyY3htbCt4bWxcXHRcXHRcXHRcXHRtcmN4XFxuYXBwbGljYXRpb24vbWF0aGVtYXRpY2FcXHRcXHRcXHRcXHRtYSBuYiBtYlxcbmFwcGxpY2F0aW9uL21hdGhtbCt4bWxcXHRcXHRcXHRcXHRtYXRobWxcXG5hcHBsaWNhdGlvbi9tYm94XFx0XFx0XFx0XFx0bWJveFxcbmFwcGxpY2F0aW9uL21lZGlhc2VydmVyY29udHJvbCt4bWxcXHRcXHRtc2NtbFxcbmFwcGxpY2F0aW9uL21ldGFsaW5rK3htbFxcdFxcdFxcdG1ldGFsaW5rXFxuYXBwbGljYXRpb24vbWV0YWxpbms0K3htbFxcdFxcdFxcdG1ldGE0XFxuYXBwbGljYXRpb24vbWV0cyt4bWxcXHRcXHRcXHRcXHRtZXRzXFxuYXBwbGljYXRpb24vbW9kcyt4bWxcXHRcXHRcXHRcXHRtb2RzXFxuYXBwbGljYXRpb24vbXAyMVxcdFxcdFxcdFxcdG0yMSBtcDIxXFxuYXBwbGljYXRpb24vbXA0XFx0XFx0XFx0XFx0XFx0bXA0c1xcbmFwcGxpY2F0aW9uL21zd29yZFxcdFxcdFxcdFxcdGRvYyBkb3RcXG5hcHBsaWNhdGlvbi9teGZcXHRcXHRcXHRcXHRcXHRteGZcXG5hcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cXHRiaW4gZG1zIGxyZiBtYXIgc28gZGlzdCBkaXN0eiBwa2cgYnBrIGR1bXAgZWxjIGRlcGxveVxcbmFwcGxpY2F0aW9uL29kYVxcdFxcdFxcdFxcdFxcdG9kYVxcbmFwcGxpY2F0aW9uL29lYnBzLXBhY2thZ2UreG1sXFx0XFx0XFx0b3BmXFxuYXBwbGljYXRpb24vb2dnXFx0XFx0XFx0XFx0XFx0b2d4XFxuYXBwbGljYXRpb24vb21kb2MreG1sXFx0XFx0XFx0XFx0b21kb2NcXG5hcHBsaWNhdGlvbi9vbmVub3RlXFx0XFx0XFx0XFx0b25ldG9jIG9uZXRvYzIgb25ldG1wIG9uZXBrZ1xcbmFwcGxpY2F0aW9uL294cHNcXHRcXHRcXHRcXHRveHBzXFxuYXBwbGljYXRpb24vcGF0Y2gtb3BzLWVycm9yK3htbFxcdFxcdFxcdHhlclxcbmFwcGxpY2F0aW9uL3BkZlxcdFxcdFxcdFxcdFxcdHBkZlxcbmFwcGxpY2F0aW9uL3BncC1lbmNyeXB0ZWRcXHRcXHRcXHRwZ3BcXG5hcHBsaWNhdGlvbi9wZ3Atc2lnbmF0dXJlXFx0XFx0XFx0YXNjIHNpZ1xcbmFwcGxpY2F0aW9uL3BpY3MtcnVsZXNcXHRcXHRcXHRcXHRwcmZcXG5hcHBsaWNhdGlvbi9wa2NzMTBcXHRcXHRcXHRcXHRwMTBcXG5hcHBsaWNhdGlvbi9wa2NzNy1taW1lXFx0XFx0XFx0XFx0cDdtIHA3Y1xcbmFwcGxpY2F0aW9uL3BrY3M3LXNpZ25hdHVyZVxcdFxcdFxcdHA3c1xcbmFwcGxpY2F0aW9uL3BrY3M4XFx0XFx0XFx0XFx0cDhcXG5hcHBsaWNhdGlvbi9wa2l4LWF0dHItY2VydFxcdFxcdFxcdGFjXFxuYXBwbGljYXRpb24vcGtpeC1jZXJ0XFx0XFx0XFx0XFx0Y2VyXFxuYXBwbGljYXRpb24vcGtpeC1jcmxcXHRcXHRcXHRcXHRjcmxcXG5hcHBsaWNhdGlvbi9wa2l4LXBraXBhdGhcXHRcXHRcXHRwa2lwYXRoXFxuYXBwbGljYXRpb24vcGtpeGNtcFxcdFxcdFxcdFxcdHBraVxcbmFwcGxpY2F0aW9uL3Bscyt4bWxcXHRcXHRcXHRcXHRwbHNcXG5hcHBsaWNhdGlvbi9wb3N0c2NyaXB0XFx0XFx0XFx0XFx0YWkgZXBzIHBzXFxuYXBwbGljYXRpb24vcHJzLmN3d1xcdFxcdFxcdFxcdGN3d1xcbmFwcGxpY2F0aW9uL3Bza2MreG1sXFx0XFx0XFx0XFx0cHNrY3htbFxcbmFwcGxpY2F0aW9uL3JkZit4bWxcXHRcXHRcXHRcXHRyZGZcXG5hcHBsaWNhdGlvbi9yZWdpbmZvK3htbFxcdFxcdFxcdFxcdHJpZlxcbmFwcGxpY2F0aW9uL3JlbGF4LW5nLWNvbXBhY3Qtc3ludGF4XFx0XFx0cm5jXFxuYXBwbGljYXRpb24vcmVzb3VyY2UtbGlzdHMreG1sXFx0XFx0XFx0cmxcXG5hcHBsaWNhdGlvbi9yZXNvdXJjZS1saXN0cy1kaWZmK3htbFxcdFxcdHJsZFxcbmFwcGxpY2F0aW9uL3Jscy1zZXJ2aWNlcyt4bWxcXHRcXHRcXHRyc1xcbmFwcGxpY2F0aW9uL3Jwa2ktZ2hvc3RidXN0ZXJzXFx0XFx0XFx0Z2JyXFxuYXBwbGljYXRpb24vcnBraS1tYW5pZmVzdFxcdFxcdFxcdG1mdFxcbmFwcGxpY2F0aW9uL3Jwa2ktcm9hXFx0XFx0XFx0XFx0cm9hXFxuYXBwbGljYXRpb24vcnNkK3htbFxcdFxcdFxcdFxcdHJzZFxcbmFwcGxpY2F0aW9uL3Jzcyt4bWxcXHRcXHRcXHRcXHRyc3NcXG5hcHBsaWNhdGlvbi9ydGZcXHRcXHRcXHRcXHRcXHRydGZcXG5hcHBsaWNhdGlvbi9zYm1sK3htbFxcdFxcdFxcdFxcdHNibWxcXG5hcHBsaWNhdGlvbi9zY3ZwLWN2LXJlcXVlc3RcXHRcXHRcXHRzY3FcXG5hcHBsaWNhdGlvbi9zY3ZwLWN2LXJlc3BvbnNlXFx0XFx0XFx0c2NzXFxuYXBwbGljYXRpb24vc2N2cC12cC1yZXF1ZXN0XFx0XFx0XFx0c3BxXFxuYXBwbGljYXRpb24vc2N2cC12cC1yZXNwb25zZVxcdFxcdFxcdHNwcFxcbmFwcGxpY2F0aW9uL3NkcFxcdFxcdFxcdFxcdFxcdHNkcFxcbmFwcGxpY2F0aW9uL3NldC1wYXltZW50LWluaXRpYXRpb25cXHRcXHRzZXRwYXlcXG5hcHBsaWNhdGlvbi9zZXQtcmVnaXN0cmF0aW9uLWluaXRpYXRpb25cXHRcXHRzZXRyZWdcXG5hcHBsaWNhdGlvbi9zaGYreG1sXFx0XFx0XFx0XFx0c2hmXFxuYXBwbGljYXRpb24vc21pbCt4bWxcXHRcXHRcXHRcXHRzbWkgc21pbFxcbmFwcGxpY2F0aW9uL3NwYXJxbC1xdWVyeVxcdFxcdFxcdHJxXFxuYXBwbGljYXRpb24vc3BhcnFsLXJlc3VsdHMreG1sXFx0XFx0XFx0c3J4XFxuYXBwbGljYXRpb24vc3Jnc1xcdFxcdFxcdFxcdGdyYW1cXG5hcHBsaWNhdGlvbi9zcmdzK3htbFxcdFxcdFxcdFxcdGdyeG1sXFxuYXBwbGljYXRpb24vc3J1K3htbFxcdFxcdFxcdFxcdHNydVxcbmFwcGxpY2F0aW9uL3NzZGwreG1sXFx0XFx0XFx0XFx0c3NkbFxcbmFwcGxpY2F0aW9uL3NzbWwreG1sXFx0XFx0XFx0XFx0c3NtbFxcbmFwcGxpY2F0aW9uL3RlaSt4bWxcXHRcXHRcXHRcXHR0ZWkgdGVpY29ycHVzXFxuYXBwbGljYXRpb24vdGhyYXVkK3htbFxcdFxcdFxcdFxcdHRmaVxcbmFwcGxpY2F0aW9uL3RpbWVzdGFtcGVkLWRhdGFcXHRcXHRcXHR0c2RcXG5hcHBsaWNhdGlvbi92bmQuM2dwcC5waWMtYnctbGFyZ2VcXHRcXHRwbGJcXG5hcHBsaWNhdGlvbi92bmQuM2dwcC5waWMtYnctc21hbGxcXHRcXHRwc2JcXG5hcHBsaWNhdGlvbi92bmQuM2dwcC5waWMtYnctdmFyXFx0XFx0XFx0cHZiXFxuYXBwbGljYXRpb24vdm5kLjNncHAyLnRjYXBcXHRcXHRcXHR0Y2FwXFxuYXBwbGljYXRpb24vdm5kLjNtLnBvc3QtaXQtbm90ZXNcXHRcXHRwd25cXG5hcHBsaWNhdGlvbi92bmQuYWNjcGFjLnNpbXBseS5hc29cXHRcXHRhc29cXG5hcHBsaWNhdGlvbi92bmQuYWNjcGFjLnNpbXBseS5pbXBcXHRcXHRpbXBcXG5hcHBsaWNhdGlvbi92bmQuYWN1Y29ib2xcXHRcXHRcXHRhY3VcXG5hcHBsaWNhdGlvbi92bmQuYWN1Y29ycFxcdFxcdFxcdFxcdGF0YyBhY3V0Y1xcbmFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5haXItYXBwbGljYXRpb24taW5zdGFsbGVyLXBhY2thZ2UremlwXFx0YWlyXFxuYXBwbGljYXRpb24vdm5kLmFkb2JlLmZvcm1zY2VudHJhbC5mY2R0XFx0XFx0ZmNkdFxcbmFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5meHBcXHRcXHRcXHRmeHAgZnhwbFxcbmFwcGxpY2F0aW9uL3ZuZC5hZG9iZS54ZHAreG1sXFx0XFx0XFx0eGRwXFxuYXBwbGljYXRpb24vdm5kLmFkb2JlLnhmZGZcXHRcXHRcXHR4ZmRmXFxuYXBwbGljYXRpb24vdm5kLmFoZWFkLnNwYWNlXFx0XFx0XFx0YWhlYWRcXG5hcHBsaWNhdGlvbi92bmQuYWlyemlwLmZpbGVzZWN1cmUuYXpmXFx0XFx0YXpmXFxuYXBwbGljYXRpb24vdm5kLmFpcnppcC5maWxlc2VjdXJlLmF6c1xcdFxcdGF6c1xcbmFwcGxpY2F0aW9uL3ZuZC5hbWF6b24uZWJvb2tcXHRcXHRcXHRhendcXG5hcHBsaWNhdGlvbi92bmQuYW1lcmljYW5keW5hbWljcy5hY2NcXHRcXHRhY2NcXG5hcHBsaWNhdGlvbi92bmQuYW1pZ2EuYW1pXFx0XFx0XFx0YW1pXFxuYXBwbGljYXRpb24vdm5kLmFuZHJvaWQucGFja2FnZS1hcmNoaXZlXFx0XFx0YXBrXFxuYXBwbGljYXRpb24vdm5kLmFuc2VyLXdlYi1jZXJ0aWZpY2F0ZS1pc3N1ZS1pbml0aWF0aW9uXFx0Y2lpXFxuYXBwbGljYXRpb24vdm5kLmFuc2VyLXdlYi1mdW5kcy10cmFuc2Zlci1pbml0aWF0aW9uXFx0ZnRpXFxuYXBwbGljYXRpb24vdm5kLmFudGl4LmdhbWUtY29tcG9uZW50XFx0XFx0YXR4XFxuYXBwbGljYXRpb24vdm5kLmFwcGxlLmluc3RhbGxlcit4bWxcXHRcXHRtcGtnXFxuYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmxcXHRcXHRcXHRtM3U4XFxuYXBwbGljYXRpb24vdm5kLmFyaXN0YW5ldHdvcmtzLnN3aVxcdFxcdHN3aVxcbmFwcGxpY2F0aW9uL3ZuZC5hc3RyYWVhLXNvZnR3YXJlLmlvdGFcXHRcXHRpb3RhXFxuYXBwbGljYXRpb24vdm5kLmF1ZGlvZ3JhcGhcXHRcXHRcXHRhZXBcXG5hcHBsaWNhdGlvbi92bmQuYmx1ZWljZS5tdWx0aXBhc3NcXHRcXHRtcG1cXG5hcHBsaWNhdGlvbi92bmQuYm1pXFx0XFx0XFx0XFx0Ym1pXFxuYXBwbGljYXRpb24vdm5kLmJ1c2luZXNzb2JqZWN0c1xcdFxcdFxcdHJlcFxcbmFwcGxpY2F0aW9uL3ZuZC5jaGVtZHJhdyt4bWxcXHRcXHRcXHRjZHhtbFxcbmFwcGxpY2F0aW9uL3ZuZC5jaGlwbnV0cy5rYXJhb2tlLW1tZFxcdFxcdG1tZFxcbmFwcGxpY2F0aW9uL3ZuZC5jaW5kZXJlbGxhXFx0XFx0XFx0Y2R5XFxuYXBwbGljYXRpb24vdm5kLmNsYXltb3JlXFx0XFx0XFx0Y2xhXFxuYXBwbGljYXRpb24vdm5kLmNsb2FudG8ucnA5XFx0XFx0XFx0cnA5XFxuYXBwbGljYXRpb24vdm5kLmNsb25rLmM0Z3JvdXBcXHRcXHRcXHRjNGcgYzRkIGM0ZiBjNHAgYzR1XFxuYXBwbGljYXRpb24vdm5kLmNsdWV0cnVzdC5jYXJ0b21vYmlsZS1jb25maWdcXHRcXHRjMTFhbWNcXG5hcHBsaWNhdGlvbi92bmQuY2x1ZXRydXN0LmNhcnRvbW9iaWxlLWNvbmZpZy1wa2dcXHRjMTFhbXpcXG5hcHBsaWNhdGlvbi92bmQuY29tbW9uc3BhY2VcXHRcXHRcXHRjc3BcXG5hcHBsaWNhdGlvbi92bmQuY29udGFjdC5jbXNnXFx0XFx0XFx0Y2RiY21zZ1xcbmFwcGxpY2F0aW9uL3ZuZC5jb3Ntb2NhbGxlclxcdFxcdFxcdGNtY1xcbmFwcGxpY2F0aW9uL3ZuZC5jcmljay5jbGlja2VyXFx0XFx0XFx0Y2xreFxcbmFwcGxpY2F0aW9uL3ZuZC5jcmljay5jbGlja2VyLmtleWJvYXJkXFx0XFx0Y2xra1xcbmFwcGxpY2F0aW9uL3ZuZC5jcmljay5jbGlja2VyLnBhbGV0dGVcXHRcXHRjbGtwXFxuYXBwbGljYXRpb24vdm5kLmNyaWNrLmNsaWNrZXIudGVtcGxhdGVcXHRcXHRjbGt0XFxuYXBwbGljYXRpb24vdm5kLmNyaWNrLmNsaWNrZXIud29yZGJhbmtcXHRcXHRjbGt3XFxuYXBwbGljYXRpb24vdm5kLmNyaXRpY2FsdG9vbHMud2JzK3htbFxcdFxcdHdic1xcbmFwcGxpY2F0aW9uL3ZuZC5jdGMtcG9zbWxcXHRcXHRcXHRwbWxcXG5hcHBsaWNhdGlvbi92bmQuY3Vwcy1wcGRcXHRcXHRcXHRwcGRcXG5hcHBsaWNhdGlvbi92bmQuY3VybC5jYXJcXHRcXHRcXHRjYXJcXG5hcHBsaWNhdGlvbi92bmQuY3VybC5wY3VybFxcdFxcdFxcdHBjdXJsXFxuYXBwbGljYXRpb24vdm5kLmRhcnRcXHRcXHRcXHRcXHRkYXJ0XFxuYXBwbGljYXRpb24vdm5kLmRhdGEtdmlzaW9uLnJkelxcdFxcdFxcdHJkelxcbmFwcGxpY2F0aW9uL3ZuZC5kZWNlLmRhdGFcXHRcXHRcXHR1dmYgdXZ2ZiB1dmQgdXZ2ZFxcbmFwcGxpY2F0aW9uL3ZuZC5kZWNlLnR0bWwreG1sXFx0XFx0XFx0dXZ0IHV2dnRcXG5hcHBsaWNhdGlvbi92bmQuZGVjZS51bnNwZWNpZmllZFxcdFxcdHV2eCB1dnZ4XFxuYXBwbGljYXRpb24vdm5kLmRlY2UuemlwXFx0XFx0XFx0dXZ6IHV2dnpcXG5hcHBsaWNhdGlvbi92bmQuZGVub3ZvLmZjc2VsYXlvdXQtbGlua1xcdFxcdGZlX2xhdW5jaFxcbmFwcGxpY2F0aW9uL3ZuZC5kbmFcXHRcXHRcXHRcXHRkbmFcXG5hcHBsaWNhdGlvbi92bmQuZG9sYnkubWxwXFx0XFx0XFx0bWxwXFxuYXBwbGljYXRpb24vdm5kLmRwZ3JhcGhcXHRcXHRcXHRcXHRkcGdcXG5hcHBsaWNhdGlvbi92bmQuZHJlYW1mYWN0b3J5XFx0XFx0XFx0ZGZhY1xcbmFwcGxpY2F0aW9uL3ZuZC5kcy1rZXlwb2ludFxcdFxcdFxcdGtweHhcXG5hcHBsaWNhdGlvbi92bmQuZHZiLmFpdFxcdFxcdFxcdFxcdGFpdFxcbmFwcGxpY2F0aW9uL3ZuZC5kdmIuc2VydmljZVxcdFxcdFxcdHN2Y1xcbmFwcGxpY2F0aW9uL3ZuZC5keW5hZ2VvXFx0XFx0XFx0XFx0Z2VvXFxuYXBwbGljYXRpb24vdm5kLmVjb3dpbi5jaGFydFxcdFxcdFxcdG1hZ1xcbmFwcGxpY2F0aW9uL3ZuZC5lbmxpdmVuXFx0XFx0XFx0XFx0bm1sXFxuYXBwbGljYXRpb24vdm5kLmVwc29uLmVzZlxcdFxcdFxcdGVzZlxcbmFwcGxpY2F0aW9uL3ZuZC5lcHNvbi5tc2ZcXHRcXHRcXHRtc2ZcXG5hcHBsaWNhdGlvbi92bmQuZXBzb24ucXVpY2thbmltZVxcdFxcdHFhbVxcbmFwcGxpY2F0aW9uL3ZuZC5lcHNvbi5zYWx0XFx0XFx0XFx0c2x0XFxuYXBwbGljYXRpb24vdm5kLmVwc29uLnNzZlxcdFxcdFxcdHNzZlxcbmFwcGxpY2F0aW9uL3ZuZC5lc3ppZ25vMyt4bWxcXHRcXHRcXHRlczMgZXQzXFxuYXBwbGljYXRpb24vdm5kLmV6cGl4LWFsYnVtXFx0XFx0XFx0ZXoyXFxuYXBwbGljYXRpb24vdm5kLmV6cGl4LXBhY2thZ2VcXHRcXHRcXHRlejNcXG5hcHBsaWNhdGlvbi92bmQuZmRmXFx0XFx0XFx0XFx0ZmRmXFxuYXBwbGljYXRpb24vdm5kLmZkc24ubXNlZWRcXHRcXHRcXHRtc2VlZFxcbmFwcGxpY2F0aW9uL3ZuZC5mZHNuLnNlZWRcXHRcXHRcXHRzZWVkIGRhdGFsZXNzXFxuYXBwbGljYXRpb24vdm5kLmZsb2dyYXBoaXRcXHRcXHRcXHRncGhcXG5hcHBsaWNhdGlvbi92bmQuZmx1eHRpbWUuY2xpcFxcdFxcdFxcdGZ0Y1xcbmFwcGxpY2F0aW9uL3ZuZC5mcmFtZW1ha2VyXFx0XFx0XFx0Zm0gZnJhbWUgbWFrZXIgYm9va1xcbmFwcGxpY2F0aW9uL3ZuZC5mcm9nYW5zLmZuY1xcdFxcdFxcdGZuY1xcbmFwcGxpY2F0aW9uL3ZuZC5mcm9nYW5zLmx0ZlxcdFxcdFxcdGx0ZlxcbmFwcGxpY2F0aW9uL3ZuZC5mc2Mud2VibGF1bmNoXFx0XFx0XFx0ZnNjXFxuYXBwbGljYXRpb24vdm5kLmZ1aml0c3Uub2FzeXNcXHRcXHRcXHRvYXNcXG5hcHBsaWNhdGlvbi92bmQuZnVqaXRzdS5vYXN5czJcXHRcXHRcXHRvYTJcXG5hcHBsaWNhdGlvbi92bmQuZnVqaXRzdS5vYXN5czNcXHRcXHRcXHRvYTNcXG5hcHBsaWNhdGlvbi92bmQuZnVqaXRzdS5vYXN5c2dwXFx0XFx0XFx0Zmc1XFxuYXBwbGljYXRpb24vdm5kLmZ1aml0c3Uub2FzeXNwcnNcXHRcXHRiaDJcXG5hcHBsaWNhdGlvbi92bmQuZnVqaXhlcm94LmRkZFxcdFxcdFxcdGRkZFxcbmFwcGxpY2F0aW9uL3ZuZC5mdWppeGVyb3guZG9jdXdvcmtzXFx0XFx0eGR3XFxuYXBwbGljYXRpb24vdm5kLmZ1aml4ZXJveC5kb2N1d29ya3MuYmluZGVyXFx0eGJkXFxuYXBwbGljYXRpb24vdm5kLmZ1enp5c2hlZXRcXHRcXHRcXHRmenNcXG5hcHBsaWNhdGlvbi92bmQuZ2Vub21hdGl4LnR1eGVkb1xcdFxcdHR4ZFxcbmFwcGxpY2F0aW9uL3ZuZC5nZW9nZWJyYS5maWxlXFx0XFx0XFx0Z2diXFxuYXBwbGljYXRpb24vdm5kLmdlb2dlYnJhLnRvb2xcXHRcXHRcXHRnZ3RcXG5hcHBsaWNhdGlvbi92bmQuZ2VvbWV0cnktZXhwbG9yZXJcXHRcXHRnZXggZ3JlXFxuYXBwbGljYXRpb24vdm5kLmdlb25leHRcXHRcXHRcXHRcXHRneHRcXG5hcHBsaWNhdGlvbi92bmQuZ2VvcGxhblxcdFxcdFxcdFxcdGcyd1xcbmFwcGxpY2F0aW9uL3ZuZC5nZW9zcGFjZVxcdFxcdFxcdGczd1xcbmFwcGxpY2F0aW9uL3ZuZC5nbXhcXHRcXHRcXHRcXHRnbXhcXG5hcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWVhcnRoLmttbCt4bWxcXHRcXHRrbWxcXG5hcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWVhcnRoLmttelxcdFxcdGttelxcbmFwcGxpY2F0aW9uL3ZuZC5ncmFmZXFcXHRcXHRcXHRcXHRncWYgZ3FzXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS1hY2NvdW50XFx0XFx0XFx0Z2FjXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS1oZWxwXFx0XFx0XFx0Z2hmXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS1pZGVudGl0eS1tZXNzYWdlXFx0XFx0Z2ltXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS1pbmplY3RvclxcdFxcdFxcdGdydlxcbmFwcGxpY2F0aW9uL3ZuZC5ncm9vdmUtdG9vbC1tZXNzYWdlXFx0XFx0Z3RtXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS10b29sLXRlbXBsYXRlXFx0XFx0dHBsXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS12Y2FyZFxcdFxcdFxcdHZjZ1xcbmFwcGxpY2F0aW9uL3ZuZC5oYWwreG1sXFx0XFx0XFx0XFx0aGFsXFxuYXBwbGljYXRpb24vdm5kLmhhbmRoZWxkLWVudGVydGFpbm1lbnQreG1sXFx0em1tXFxuYXBwbGljYXRpb24vdm5kLmhiY2lcXHRcXHRcXHRcXHRoYmNpXFxuYXBwbGljYXRpb24vdm5kLmhoZS5sZXNzb24tcGxheWVyXFx0XFx0bGVzXFxuYXBwbGljYXRpb24vdm5kLmhwLWhwZ2xcXHRcXHRcXHRcXHRocGdsXFxuYXBwbGljYXRpb24vdm5kLmhwLWhwaWRcXHRcXHRcXHRcXHRocGlkXFxuYXBwbGljYXRpb24vdm5kLmhwLWhwc1xcdFxcdFxcdFxcdGhwc1xcbmFwcGxpY2F0aW9uL3ZuZC5ocC1qbHl0XFx0XFx0XFx0XFx0amx0XFxuYXBwbGljYXRpb24vdm5kLmhwLXBjbFxcdFxcdFxcdFxcdHBjbFxcbmFwcGxpY2F0aW9uL3ZuZC5ocC1wY2x4bFxcdFxcdFxcdHBjbHhsXFxuYXBwbGljYXRpb24vdm5kLmh5ZHJvc3RhdGl4LnNvZi1kYXRhXFx0XFx0c2ZkLWhkc3R4XFxuYXBwbGljYXRpb24vdm5kLmlibS5taW5pcGF5XFx0XFx0XFx0bXB5XFxuYXBwbGljYXRpb24vdm5kLmlibS5tb2RjYXBcXHRcXHRcXHRhZnAgbGlzdGFmcCBsaXN0MzgyMFxcbmFwcGxpY2F0aW9uL3ZuZC5pYm0ucmlnaHRzLW1hbmFnZW1lbnRcXHRcXHRpcm1cXG5hcHBsaWNhdGlvbi92bmQuaWJtLnNlY3VyZS1jb250YWluZXJcXHRcXHRzY1xcbmFwcGxpY2F0aW9uL3ZuZC5pY2Nwcm9maWxlXFx0XFx0XFx0aWNjIGljbVxcbmFwcGxpY2F0aW9uL3ZuZC5pZ2xvYWRlclxcdFxcdFxcdGlnbFxcbmFwcGxpY2F0aW9uL3ZuZC5pbW1lcnZpc2lvbi1pdnBcXHRcXHRcXHRpdnBcXG5hcHBsaWNhdGlvbi92bmQuaW1tZXJ2aXNpb24taXZ1XFx0XFx0XFx0aXZ1XFxuYXBwbGljYXRpb24vdm5kLmluc29ycy5pZ21cXHRcXHRcXHRpZ21cXG5hcHBsaWNhdGlvbi92bmQuaW50ZXJjb24uZm9ybW5ldFxcdFxcdHhwdyB4cHhcXG5hcHBsaWNhdGlvbi92bmQuaW50ZXJnZW9cXHRcXHRcXHRpMmdcXG5hcHBsaWNhdGlvbi92bmQuaW50dS5xYm9cXHRcXHRcXHRxYm9cXG5hcHBsaWNhdGlvbi92bmQuaW50dS5xZnhcXHRcXHRcXHRxZnhcXG5hcHBsaWNhdGlvbi92bmQuaXB1bnBsdWdnZWQucmNwcm9maWxlXFx0XFx0cmNwcm9maWxlXFxuYXBwbGljYXRpb24vdm5kLmlyZXBvc2l0b3J5LnBhY2thZ2UreG1sXFx0XFx0aXJwXFxuYXBwbGljYXRpb24vdm5kLmlzLXhwclxcdFxcdFxcdFxcdHhwclxcbmFwcGxpY2F0aW9uL3ZuZC5pc2FjLmZjc1xcdFxcdFxcdGZjc1xcbmFwcGxpY2F0aW9uL3ZuZC5qYW1cXHRcXHRcXHRcXHRqYW1cXG5hcHBsaWNhdGlvbi92bmQuamNwLmphdmFtZS5taWRsZXQtcm1zXFx0XFx0cm1zXFxuYXBwbGljYXRpb24vdm5kLmppc3BcXHRcXHRcXHRcXHRqaXNwXFxuYXBwbGljYXRpb24vdm5kLmpvb3N0LmpvZGEtYXJjaGl2ZVxcdFxcdGpvZGFcXG5hcHBsaWNhdGlvbi92bmQua2Fob290elxcdFxcdFxcdFxcdGt0eiBrdHJcXG5hcHBsaWNhdGlvbi92bmQua2RlLmthcmJvblxcdFxcdFxcdGthcmJvblxcbmFwcGxpY2F0aW9uL3ZuZC5rZGUua2NoYXJ0XFx0XFx0XFx0Y2hydFxcbmFwcGxpY2F0aW9uL3ZuZC5rZGUua2Zvcm11bGFcXHRcXHRcXHRrZm9cXG5hcHBsaWNhdGlvbi92bmQua2RlLmtpdmlvXFx0XFx0XFx0Zmx3XFxuYXBwbGljYXRpb24vdm5kLmtkZS5rb250b3VyXFx0XFx0XFx0a29uXFxuYXBwbGljYXRpb24vdm5kLmtkZS5rcHJlc2VudGVyXFx0XFx0XFx0a3ByIGtwdFxcbmFwcGxpY2F0aW9uL3ZuZC5rZGUua3NwcmVhZFxcdFxcdFxcdGtzcFxcbmFwcGxpY2F0aW9uL3ZuZC5rZGUua3dvcmRcXHRcXHRcXHRrd2Qga3d0XFxuYXBwbGljYXRpb24vdm5kLmtlbmFtZWFhcHBcXHRcXHRcXHRodGtlXFxuYXBwbGljYXRpb24vdm5kLmtpZHNwaXJhdGlvblxcdFxcdFxcdGtpYVxcbmFwcGxpY2F0aW9uL3ZuZC5raW5hclxcdFxcdFxcdFxcdGtuZSBrbnBcXG5hcHBsaWNhdGlvbi92bmQua29hblxcdFxcdFxcdFxcdHNrcCBza2Qgc2t0IHNrbVxcbmFwcGxpY2F0aW9uL3ZuZC5rb2Rhay1kZXNjcmlwdG9yXFx0XFx0c3NlXFxuYXBwbGljYXRpb24vdm5kLmxhcy5sYXMreG1sXFx0XFx0XFx0bGFzeG1sXFxuYXBwbGljYXRpb24vdm5kLmxsYW1hZ3JhcGhpY3MubGlmZS1iYWxhbmNlLmRlc2t0b3BcXHRsYmRcXG5hcHBsaWNhdGlvbi92bmQubGxhbWFncmFwaGljcy5saWZlLWJhbGFuY2UuZXhjaGFuZ2UreG1sXFx0bGJlXFxuYXBwbGljYXRpb24vdm5kLmxvdHVzLTEtMi0zXFx0XFx0XFx0MTIzXFxuYXBwbGljYXRpb24vdm5kLmxvdHVzLWFwcHJvYWNoXFx0XFx0XFx0YXByXFxuYXBwbGljYXRpb24vdm5kLmxvdHVzLWZyZWVsYW5jZVxcdFxcdFxcdHByZVxcbmFwcGxpY2F0aW9uL3ZuZC5sb3R1cy1ub3Rlc1xcdFxcdFxcdG5zZlxcbmFwcGxpY2F0aW9uL3ZuZC5sb3R1cy1vcmdhbml6ZXJcXHRcXHRcXHRvcmdcXG5hcHBsaWNhdGlvbi92bmQubG90dXMtc2NyZWVuY2FtXFx0XFx0XFx0c2NtXFxuYXBwbGljYXRpb24vdm5kLmxvdHVzLXdvcmRwcm9cXHRcXHRcXHRsd3BcXG5hcHBsaWNhdGlvbi92bmQubWFjcG9ydHMucG9ydHBrZ1xcdFxcdHBvcnRwa2dcXG5hcHBsaWNhdGlvbi92bmQubWNkXFx0XFx0XFx0XFx0bWNkXFxuYXBwbGljYXRpb24vdm5kLm1lZGNhbGNkYXRhXFx0XFx0XFx0bWMxXFxuYXBwbGljYXRpb24vdm5kLm1lZGlhc3RhdGlvbi5jZGtleVxcdFxcdGNka2V5XFxuYXBwbGljYXRpb24vdm5kLm1mZXJcXHRcXHRcXHRcXHRtd2ZcXG5hcHBsaWNhdGlvbi92bmQubWZtcFxcdFxcdFxcdFxcdG1mbVxcbmFwcGxpY2F0aW9uL3ZuZC5taWNyb2dyYWZ4LmZsb1xcdFxcdFxcdGZsb1xcbmFwcGxpY2F0aW9uL3ZuZC5taWNyb2dyYWZ4LmlneFxcdFxcdFxcdGlneFxcbmFwcGxpY2F0aW9uL3ZuZC5taWZcXHRcXHRcXHRcXHRtaWZcXG5hcHBsaWNhdGlvbi92bmQubW9iaXVzLmRhZlxcdFxcdFxcdGRhZlxcbmFwcGxpY2F0aW9uL3ZuZC5tb2JpdXMuZGlzXFx0XFx0XFx0ZGlzXFxuYXBwbGljYXRpb24vdm5kLm1vYml1cy5tYmtcXHRcXHRcXHRtYmtcXG5hcHBsaWNhdGlvbi92bmQubW9iaXVzLm1xeVxcdFxcdFxcdG1xeVxcbmFwcGxpY2F0aW9uL3ZuZC5tb2JpdXMubXNsXFx0XFx0XFx0bXNsXFxuYXBwbGljYXRpb24vdm5kLm1vYml1cy5wbGNcXHRcXHRcXHRwbGNcXG5hcHBsaWNhdGlvbi92bmQubW9iaXVzLnR4ZlxcdFxcdFxcdHR4ZlxcbmFwcGxpY2F0aW9uL3ZuZC5tb3BodW4uYXBwbGljYXRpb25cXHRcXHRtcG5cXG5hcHBsaWNhdGlvbi92bmQubW9waHVuLmNlcnRpZmljYXRlXFx0XFx0bXBjXFxuYXBwbGljYXRpb24vdm5kLm1vemlsbGEueHVsK3htbFxcdFxcdFxcdHh1bFxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1hcnRnYWxyeVxcdFxcdFxcdGNpbFxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1jYWItY29tcHJlc3NlZFxcdFxcdGNhYlxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbFxcdFxcdFxcdHhscyB4bG0geGxhIHhsYyB4bHQgeGx3XFxuYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsLmFkZGluLm1hY3JvZW5hYmxlZC4xMlxcdFxcdHhsYW1cXG5hcHBsaWNhdGlvbi92bmQubXMtZXhjZWwuc2hlZXQuYmluYXJ5Lm1hY3JvZW5hYmxlZC4xMlxcdHhsc2JcXG5hcHBsaWNhdGlvbi92bmQubXMtZXhjZWwuc2hlZXQubWFjcm9lbmFibGVkLjEyXFx0XFx0eGxzbVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbC50ZW1wbGF0ZS5tYWNyb2VuYWJsZWQuMTJcXHR4bHRtXFxuYXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3RcXHRcXHRcXHRlb3RcXG5hcHBsaWNhdGlvbi92bmQubXMtaHRtbGhlbHBcXHRcXHRcXHRjaG1cXG5hcHBsaWNhdGlvbi92bmQubXMtaW1zXFx0XFx0XFx0XFx0aW1zXFxuYXBwbGljYXRpb24vdm5kLm1zLWxybVxcdFxcdFxcdFxcdGxybVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1vZmZpY2V0aGVtZVxcdFxcdFxcdHRobXhcXG5hcHBsaWNhdGlvbi92bmQubXMtcGtpLnNlY2NhdFxcdFxcdFxcdGNhdFxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1wa2kuc3RsXFx0XFx0XFx0c3RsXFxuYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnRcXHRcXHRcXHRwcHQgcHBzIHBvdFxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50LmFkZGluLm1hY3JvZW5hYmxlZC4xMlxcdFxcdHBwYW1cXG5hcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludC5wcmVzZW50YXRpb24ubWFjcm9lbmFibGVkLjEyXFx0cHB0bVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50LnNsaWRlLm1hY3JvZW5hYmxlZC4xMlxcdFxcdHNsZG1cXG5hcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludC5zbGlkZXNob3cubWFjcm9lbmFibGVkLjEyXFx0XFx0cHBzbVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50LnRlbXBsYXRlLm1hY3JvZW5hYmxlZC4xMlxcdFxcdHBvdG1cXG5hcHBsaWNhdGlvbi92bmQubXMtcHJvamVjdFxcdFxcdFxcdG1wcCBtcHRcXG5hcHBsaWNhdGlvbi92bmQubXMtd29yZC5kb2N1bWVudC5tYWNyb2VuYWJsZWQuMTJcXHRkb2NtXFxuYXBwbGljYXRpb24vdm5kLm1zLXdvcmQudGVtcGxhdGUubWFjcm9lbmFibGVkLjEyXFx0ZG90bVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy13b3Jrc1xcdFxcdFxcdHdwcyB3a3Mgd2NtIHdkYlxcbmFwcGxpY2F0aW9uL3ZuZC5tcy13cGxcXHRcXHRcXHRcXHR3cGxcXG5hcHBsaWNhdGlvbi92bmQubXMteHBzZG9jdW1lbnRcXHRcXHRcXHR4cHNcXG5hcHBsaWNhdGlvbi92bmQubXNlcVxcdFxcdFxcdFxcdG1zZXFcXG5hcHBsaWNhdGlvbi92bmQubXVzaWNpYW5cXHRcXHRcXHRtdXNcXG5hcHBsaWNhdGlvbi92bmQubXV2ZWUuc3R5bGVcXHRcXHRcXHRtc3R5XFxuYXBwbGljYXRpb24vdm5kLm15bmZjXFx0XFx0XFx0XFx0dGFnbGV0XFxuYXBwbGljYXRpb24vdm5kLm5ldXJvbGFuZ3VhZ2Uubmx1XFx0XFx0bmx1XFxuYXBwbGljYXRpb24vdm5kLm5pdGZcXHRcXHRcXHRcXHRudGYgbml0ZlxcbmFwcGxpY2F0aW9uL3ZuZC5ub2JsZW5ldC1kaXJlY3RvcnlcXHRcXHRubmRcXG5hcHBsaWNhdGlvbi92bmQubm9ibGVuZXQtc2VhbGVyXFx0XFx0XFx0bm5zXFxuYXBwbGljYXRpb24vdm5kLm5vYmxlbmV0LXdlYlxcdFxcdFxcdG5ud1xcbmFwcGxpY2F0aW9uL3ZuZC5ub2tpYS5uLWdhZ2UuZGF0YVxcdFxcdG5nZGF0XFxuYXBwbGljYXRpb24vdm5kLm5va2lhLm4tZ2FnZS5zeW1iaWFuLmluc3RhbGxcXHRuLWdhZ2VcXG5hcHBsaWNhdGlvbi92bmQubm9raWEucmFkaW8tcHJlc2V0XFx0XFx0cnBzdFxcbmFwcGxpY2F0aW9uL3ZuZC5ub2tpYS5yYWRpby1wcmVzZXRzXFx0XFx0cnBzc1xcbmFwcGxpY2F0aW9uL3ZuZC5ub3ZhZGlnbS5lZG1cXHRcXHRcXHRlZG1cXG5hcHBsaWNhdGlvbi92bmQubm92YWRpZ20uZWR4XFx0XFx0XFx0ZWR4XFxuYXBwbGljYXRpb24vdm5kLm5vdmFkaWdtLmV4dFxcdFxcdFxcdGV4dFxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuY2hhcnRcXHRcXHRvZGNcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LmNoYXJ0LXRlbXBsYXRlXFx0b3RjXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5kYXRhYmFzZVxcdFxcdG9kYlxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuZm9ybXVsYVxcdFxcdG9kZlxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuZm9ybXVsYS10ZW1wbGF0ZVxcdG9kZnRcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LmdyYXBoaWNzXFx0XFx0b2RnXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5ncmFwaGljcy10ZW1wbGF0ZVxcdG90Z1xcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuaW1hZ2VcXHRcXHRvZGlcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LmltYWdlLXRlbXBsYXRlXFx0b3RpXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5wcmVzZW50YXRpb25cXHRcXHRvZHBcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnByZXNlbnRhdGlvbi10ZW1wbGF0ZVxcdG90cFxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuc3ByZWFkc2hlZXRcXHRcXHRvZHNcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnNwcmVhZHNoZWV0LXRlbXBsYXRlXFx0b3RzXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0XFx0XFx0XFx0b2R0XFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0LW1hc3RlclxcdFxcdG9kbVxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQudGV4dC10ZW1wbGF0ZVxcdG90dFxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQudGV4dC13ZWJcXHRcXHRvdGhcXG5hcHBsaWNhdGlvbi92bmQub2xwYy1zdWdhclxcdFxcdFxcdHhvXFxuYXBwbGljYXRpb24vdm5kLm9tYS5kZDIreG1sXFx0XFx0XFx0ZGQyXFxuYXBwbGljYXRpb24vdm5kLm9wZW5vZmZpY2VvcmcuZXh0ZW5zaW9uXFx0XFx0b3h0XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnByZXNlbnRhdGlvblxcdHBwdHhcXG5hcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwuc2xpZGVcXHRzbGR4XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnNsaWRlc2hvd1xcdHBwc3hcXG5hcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwudGVtcGxhdGVcXHRwb3R4XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXRcXHR4bHN4XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwudGVtcGxhdGVcXHR4bHR4XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnRcXHRkb2N4XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwudGVtcGxhdGVcXHRkb3R4XFxuYXBwbGljYXRpb24vdm5kLm9zZ2VvLm1hcGd1aWRlLnBhY2thZ2VcXHRcXHRtZ3BcXG5hcHBsaWNhdGlvbi92bmQub3NnaS5kcFxcdFxcdFxcdFxcdGRwXFxuYXBwbGljYXRpb24vdm5kLm9zZ2kuc3Vic3lzdGVtXFx0XFx0XFx0ZXNhXFxuYXBwbGljYXRpb24vdm5kLnBhbG1cXHRcXHRcXHRcXHRwZGIgcHFhIG9wcmNcXG5hcHBsaWNhdGlvbi92bmQucGF3YWFmaWxlXFx0XFx0XFx0cGF3XFxuYXBwbGljYXRpb24vdm5kLnBnLmZvcm1hdFxcdFxcdFxcdHN0clxcbmFwcGxpY2F0aW9uL3ZuZC5wZy5vc2FzbGlcXHRcXHRcXHRlaTZcXG5hcHBsaWNhdGlvbi92bmQucGljc2VsXFx0XFx0XFx0XFx0ZWZpZlxcbmFwcGxpY2F0aW9uL3ZuZC5wbWkud2lkZ2V0XFx0XFx0XFx0d2dcXG5hcHBsaWNhdGlvbi92bmQucG9ja2V0bGVhcm5cXHRcXHRcXHRwbGZcXG5hcHBsaWNhdGlvbi92bmQucG93ZXJidWlsZGVyNlxcdFxcdFxcdHBiZFxcbmFwcGxpY2F0aW9uL3ZuZC5wcmV2aWV3c3lzdGVtcy5ib3hcXHRcXHRib3hcXG5hcHBsaWNhdGlvbi92bmQucHJvdGV1cy5tYWdhemluZVxcdFxcdG1nelxcbmFwcGxpY2F0aW9uL3ZuZC5wdWJsaXNoYXJlLWRlbHRhLXRyZWVcXHRcXHRxcHNcXG5hcHBsaWNhdGlvbi92bmQucHZpLnB0aWQxXFx0XFx0XFx0cHRpZFxcbmFwcGxpY2F0aW9uL3ZuZC5xdWFyay5xdWFya3hwcmVzc1xcdFxcdHF4ZCBxeHQgcXdkIHF3dCBxeGwgcXhiXFxuYXBwbGljYXRpb24vdm5kLnJlYWx2bmMuYmVkXFx0XFx0XFx0YmVkXFxuYXBwbGljYXRpb24vdm5kLnJlY29yZGFyZS5tdXNpY3htbFxcdFxcdG14bFxcbmFwcGxpY2F0aW9uL3ZuZC5yZWNvcmRhcmUubXVzaWN4bWwreG1sXFx0XFx0bXVzaWN4bWxcXG5hcHBsaWNhdGlvbi92bmQucmlnLmNyeXB0b25vdGVcXHRcXHRcXHRjcnlwdG9ub3RlXFxuYXBwbGljYXRpb24vdm5kLnJpbS5jb2RcXHRcXHRcXHRcXHRjb2RcXG5hcHBsaWNhdGlvbi92bmQucm4tcmVhbG1lZGlhXFx0XFx0XFx0cm1cXG5hcHBsaWNhdGlvbi92bmQucm4tcmVhbG1lZGlhLXZiclxcdFxcdHJtdmJcXG5hcHBsaWNhdGlvbi92bmQucm91dGU2Ni5saW5rNjYreG1sXFx0XFx0bGluazY2XFxuYXBwbGljYXRpb24vdm5kLnNhaWxpbmd0cmFja2VyLnRyYWNrXFx0XFx0c3RcXG5hcHBsaWNhdGlvbi92bmQuc2VlbWFpbFxcdFxcdFxcdFxcdHNlZVxcbmFwcGxpY2F0aW9uL3ZuZC5zZW1hXFx0XFx0XFx0XFx0c2VtYVxcbmFwcGxpY2F0aW9uL3ZuZC5zZW1kXFx0XFx0XFx0XFx0c2VtZFxcbmFwcGxpY2F0aW9uL3ZuZC5zZW1mXFx0XFx0XFx0XFx0c2VtZlxcbmFwcGxpY2F0aW9uL3ZuZC5zaGFuYS5pbmZvcm1lZC5mb3JtZGF0YVxcdFxcdGlmbVxcbmFwcGxpY2F0aW9uL3ZuZC5zaGFuYS5pbmZvcm1lZC5mb3JtdGVtcGxhdGVcXHRpdHBcXG5hcHBsaWNhdGlvbi92bmQuc2hhbmEuaW5mb3JtZWQuaW50ZXJjaGFuZ2VcXHRpaWZcXG5hcHBsaWNhdGlvbi92bmQuc2hhbmEuaW5mb3JtZWQucGFja2FnZVxcdFxcdGlwa1xcbmFwcGxpY2F0aW9uL3ZuZC5zaW10ZWNoLW1pbmRtYXBwZXJcXHRcXHR0d2QgdHdkc1xcbmFwcGxpY2F0aW9uL3ZuZC5zbWFmXFx0XFx0XFx0XFx0bW1mXFxuYXBwbGljYXRpb24vdm5kLnNtYXJ0LnRlYWNoZXJcXHRcXHRcXHR0ZWFjaGVyXFxuYXBwbGljYXRpb24vdm5kLnNvbGVudC5zZGttK3htbFxcdFxcdFxcdHNka20gc2RrZFxcbmFwcGxpY2F0aW9uL3ZuZC5zcG90ZmlyZS5keHBcXHRcXHRcXHRkeHBcXG5hcHBsaWNhdGlvbi92bmQuc3BvdGZpcmUuc2ZzXFx0XFx0XFx0c2ZzXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi5jYWxjXFx0XFx0c2RjXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi5kcmF3XFx0XFx0c2RhXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi5pbXByZXNzXFx0XFx0c2RkXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi5tYXRoXFx0XFx0c21mXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi53cml0ZXJcXHRcXHRzZHcgdm9yXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi53cml0ZXItZ2xvYmFsXFx0c2dsXFxuYXBwbGljYXRpb24vdm5kLnN0ZXBtYW5pYS5wYWNrYWdlXFx0XFx0c216aXBcXG5hcHBsaWNhdGlvbi92bmQuc3RlcG1hbmlhLnN0ZXBjaGFydFxcdFxcdHNtXFxuYXBwbGljYXRpb24vdm5kLnN1bi54bWwuY2FsY1xcdFxcdFxcdHN4Y1xcbmFwcGxpY2F0aW9uL3ZuZC5zdW4ueG1sLmNhbGMudGVtcGxhdGVcXHRcXHRzdGNcXG5hcHBsaWNhdGlvbi92bmQuc3VuLnhtbC5kcmF3XFx0XFx0XFx0c3hkXFxuYXBwbGljYXRpb24vdm5kLnN1bi54bWwuZHJhdy50ZW1wbGF0ZVxcdFxcdHN0ZFxcbmFwcGxpY2F0aW9uL3ZuZC5zdW4ueG1sLmltcHJlc3NcXHRcXHRcXHRzeGlcXG5hcHBsaWNhdGlvbi92bmQuc3VuLnhtbC5pbXByZXNzLnRlbXBsYXRlXFx0c3RpXFxuYXBwbGljYXRpb24vdm5kLnN1bi54bWwubWF0aFxcdFxcdFxcdHN4bVxcbmFwcGxpY2F0aW9uL3ZuZC5zdW4ueG1sLndyaXRlclxcdFxcdFxcdHN4d1xcbmFwcGxpY2F0aW9uL3ZuZC5zdW4ueG1sLndyaXRlci5nbG9iYWxcXHRcXHRzeGdcXG5hcHBsaWNhdGlvbi92bmQuc3VuLnhtbC53cml0ZXIudGVtcGxhdGVcXHRcXHRzdHdcXG5hcHBsaWNhdGlvbi92bmQuc3VzLWNhbGVuZGFyXFx0XFx0XFx0c3VzIHN1c3BcXG5hcHBsaWNhdGlvbi92bmQuc3ZkXFx0XFx0XFx0XFx0c3ZkXFxuYXBwbGljYXRpb24vdm5kLnN5bWJpYW4uaW5zdGFsbFxcdFxcdFxcdHNpcyBzaXN4XFxuYXBwbGljYXRpb24vdm5kLnN5bmNtbCt4bWxcXHRcXHRcXHR4c21cXG5hcHBsaWNhdGlvbi92bmQuc3luY21sLmRtK3dieG1sXFx0XFx0XFx0YmRtXFxuYXBwbGljYXRpb24vdm5kLnN5bmNtbC5kbSt4bWxcXHRcXHRcXHR4ZG1cXG5hcHBsaWNhdGlvbi92bmQudGFvLmludGVudC1tb2R1bGUtYXJjaGl2ZVxcdHRhb1xcbmFwcGxpY2F0aW9uL3ZuZC50Y3BkdW1wLnBjYXBcXHRcXHRcXHRwY2FwIGNhcCBkbXBcXG5hcHBsaWNhdGlvbi92bmQudG1vYmlsZS1saXZldHZcXHRcXHRcXHR0bW9cXG5hcHBsaWNhdGlvbi92bmQudHJpZC50cHRcXHRcXHRcXHR0cHRcXG5hcHBsaWNhdGlvbi92bmQudHJpc2NhcGUubXhzXFx0XFx0XFx0bXhzXFxuYXBwbGljYXRpb24vdm5kLnRydWVhcHBcXHRcXHRcXHRcXHR0cmFcXG5hcHBsaWNhdGlvbi92bmQudWZkbFxcdFxcdFxcdFxcdHVmZCB1ZmRsXFxuYXBwbGljYXRpb24vdm5kLnVpcS50aGVtZVxcdFxcdFxcdHV0elxcbmFwcGxpY2F0aW9uL3ZuZC51bWFqaW5cXHRcXHRcXHRcXHR1bWpcXG5hcHBsaWNhdGlvbi92bmQudW5pdHlcXHRcXHRcXHRcXHR1bml0eXdlYlxcbmFwcGxpY2F0aW9uL3ZuZC51b21sK3htbFxcdFxcdFxcdHVvbWxcXG5hcHBsaWNhdGlvbi92bmQudmN4XFx0XFx0XFx0XFx0dmN4XFxuYXBwbGljYXRpb24vdm5kLnZpc2lvXFx0XFx0XFx0XFx0dnNkIHZzdCB2c3MgdnN3XFxuYXBwbGljYXRpb24vdm5kLnZpc2lvbmFyeVxcdFxcdFxcdHZpc1xcbmFwcGxpY2F0aW9uL3ZuZC52c2ZcXHRcXHRcXHRcXHR2c2ZcXG5hcHBsaWNhdGlvbi92bmQud2FwLndieG1sXFx0XFx0XFx0d2J4bWxcXG5hcHBsaWNhdGlvbi92bmQud2FwLndtbGNcXHRcXHRcXHR3bWxjXFxuYXBwbGljYXRpb24vdm5kLndhcC53bWxzY3JpcHRjXFx0XFx0XFx0d21sc2NcXG5hcHBsaWNhdGlvbi92bmQud2VidHVyYm9cXHRcXHRcXHR3dGJcXG5hcHBsaWNhdGlvbi92bmQud29sZnJhbS5wbGF5ZXJcXHRcXHRcXHRuYnBcXG5hcHBsaWNhdGlvbi92bmQud29yZHBlcmZlY3RcXHRcXHRcXHR3cGRcXG5hcHBsaWNhdGlvbi92bmQud3FkXFx0XFx0XFx0XFx0d3FkXFxuYXBwbGljYXRpb24vdm5kLnd0LnN0ZlxcdFxcdFxcdFxcdHN0ZlxcbmFwcGxpY2F0aW9uL3ZuZC54YXJhXFx0XFx0XFx0XFx0eGFyXFxuYXBwbGljYXRpb24vdm5kLnhmZGxcXHRcXHRcXHRcXHR4ZmRsXFxuYXBwbGljYXRpb24vdm5kLnlhbWFoYS5odi1kaWNcXHRcXHRcXHRodmRcXG5hcHBsaWNhdGlvbi92bmQueWFtYWhhLmh2LXNjcmlwdFxcdFxcdGh2c1xcbmFwcGxpY2F0aW9uL3ZuZC55YW1haGEuaHYtdm9pY2VcXHRcXHRcXHRodnBcXG5hcHBsaWNhdGlvbi92bmQueWFtYWhhLm9wZW5zY29yZWZvcm1hdFxcdFxcdFxcdG9zZlxcbmFwcGxpY2F0aW9uL3ZuZC55YW1haGEub3BlbnNjb3JlZm9ybWF0Lm9zZnB2Zyt4bWxcXHRvc2ZwdmdcXG5hcHBsaWNhdGlvbi92bmQueWFtYWhhLnNtYWYtYXVkaW9cXHRcXHRzYWZcXG5hcHBsaWNhdGlvbi92bmQueWFtYWhhLnNtYWYtcGhyYXNlXFx0XFx0c3BmXFxuYXBwbGljYXRpb24vdm5kLnllbGxvd3JpdmVyLWN1c3RvbS1tZW51XFx0XFx0Y21wXFxuYXBwbGljYXRpb24vdm5kLnp1bFxcdFxcdFxcdFxcdHppciB6aXJ6XFxuYXBwbGljYXRpb24vdm5kLnp6YXp6LmRlY2sreG1sXFx0XFx0XFx0emF6XFxuYXBwbGljYXRpb24vdm9pY2V4bWwreG1sXFx0XFx0XFx0dnhtbFxcbmFwcGxpY2F0aW9uL3dhc21cXHRcXHRcXHRcXHR3YXNtXFxuYXBwbGljYXRpb24vd2lkZ2V0XFx0XFx0XFx0XFx0d2d0XFxuYXBwbGljYXRpb24vd2luaGxwXFx0XFx0XFx0XFx0aGxwXFxuYXBwbGljYXRpb24vd3NkbCt4bWxcXHRcXHRcXHRcXHR3c2RsXFxuYXBwbGljYXRpb24vd3Nwb2xpY3kreG1sXFx0XFx0XFx0d3Nwb2xpY3lcXG5hcHBsaWNhdGlvbi94LTd6LWNvbXByZXNzZWRcXHRcXHRcXHQ3elxcbmFwcGxpY2F0aW9uL3gtYWJpd29yZFxcdFxcdFxcdFxcdGFid1xcbmFwcGxpY2F0aW9uL3gtYWNlLWNvbXByZXNzZWRcXHRcXHRcXHRhY2VcXG5hcHBsaWNhdGlvbi94LWFwcGxlLWRpc2tpbWFnZVxcdFxcdFxcdGRtZ1xcbmFwcGxpY2F0aW9uL3gtYXV0aG9yd2FyZS1iaW5cXHRcXHRcXHRhYWIgeDMyIHUzMiB2b3hcXG5hcHBsaWNhdGlvbi94LWF1dGhvcndhcmUtbWFwXFx0XFx0XFx0YWFtXFxuYXBwbGljYXRpb24veC1hdXRob3J3YXJlLXNlZ1xcdFxcdFxcdGFhc1xcbmFwcGxpY2F0aW9uL3gtYmNwaW9cXHRcXHRcXHRcXHRiY3Bpb1xcbmFwcGxpY2F0aW9uL3gtYml0dG9ycmVudFxcdFxcdFxcdHRvcnJlbnRcXG5hcHBsaWNhdGlvbi94LWJsb3JiXFx0XFx0XFx0XFx0YmxiIGJsb3JiXFxuYXBwbGljYXRpb24veC1iemlwXFx0XFx0XFx0XFx0YnpcXG5hcHBsaWNhdGlvbi94LWJ6aXAyXFx0XFx0XFx0XFx0YnoyIGJvelxcbmFwcGxpY2F0aW9uL3gtY2JyXFx0XFx0XFx0XFx0Y2JyIGNiYSBjYnQgY2J6IGNiN1xcbmFwcGxpY2F0aW9uL3gtY2RsaW5rXFx0XFx0XFx0XFx0dmNkXFxuYXBwbGljYXRpb24veC1jZnMtY29tcHJlc3NlZFxcdFxcdFxcdGNmc1xcbmFwcGxpY2F0aW9uL3gtY2hhdFxcdFxcdFxcdFxcdGNoYXRcXG5hcHBsaWNhdGlvbi94LWNoZXNzLXBnblxcdFxcdFxcdFxcdHBnblxcbmFwcGxpY2F0aW9uL3gtY29uZmVyZW5jZVxcdFxcdFxcdG5zY1xcbmFwcGxpY2F0aW9uL3gtY3Bpb1xcdFxcdFxcdFxcdGNwaW9cXG5hcHBsaWNhdGlvbi94LWNzaFxcdFxcdFxcdFxcdGNzaFxcbmFwcGxpY2F0aW9uL3gtZGViaWFuLXBhY2thZ2VcXHRcXHRcXHRkZWIgdWRlYlxcbmFwcGxpY2F0aW9uL3gtZGdjLWNvbXByZXNzZWRcXHRcXHRcXHRkZ2NcXG5hcHBsaWNhdGlvbi94LWRpcmVjdG9yXFx0XFx0XFx0ZGlyIGRjciBkeHIgY3N0IGNjdCBjeHQgdzNkIGZnZCBzd2FcXG5hcHBsaWNhdGlvbi94LWRvb21cXHRcXHRcXHRcXHR3YWRcXG5hcHBsaWNhdGlvbi94LWR0Ym5jeCt4bWxcXHRcXHRcXHRuY3hcXG5hcHBsaWNhdGlvbi94LWR0Ym9vayt4bWxcXHRcXHRcXHRkdGJcXG5hcHBsaWNhdGlvbi94LWR0YnJlc291cmNlK3htbFxcdFxcdFxcdHJlc1xcbmFwcGxpY2F0aW9uL3gtZHZpXFx0XFx0XFx0XFx0ZHZpXFxuYXBwbGljYXRpb24veC1lbnZveVxcdFxcdFxcdFxcdGV2eVxcbmFwcGxpY2F0aW9uL3gtZXZhXFx0XFx0XFx0XFx0ZXZhXFxuYXBwbGljYXRpb24veC1mb250LWJkZlxcdFxcdFxcdFxcdGJkZlxcbmFwcGxpY2F0aW9uL3gtZm9udC1naG9zdHNjcmlwdFxcdFxcdFxcdGdzZlxcbmFwcGxpY2F0aW9uL3gtZm9udC1saW51eC1wc2ZcXHRcXHRcXHRwc2ZcXG5hcHBsaWNhdGlvbi94LWZvbnQtcGNmXFx0XFx0XFx0XFx0cGNmXFxuYXBwbGljYXRpb24veC1mb250LXNuZlxcdFxcdFxcdFxcdHNuZlxcbmFwcGxpY2F0aW9uL3gtZm9udC10eXBlMVxcdFxcdFxcdHBmYSBwZmIgcGZtIGFmbVxcbmFwcGxpY2F0aW9uL3gtZnJlZWFyY1xcdFxcdFxcdFxcdGFyY1xcbmFwcGxpY2F0aW9uL3gtZnV0dXJlc3BsYXNoXFx0XFx0XFx0c3BsXFxuYXBwbGljYXRpb24veC1nY2EtY29tcHJlc3NlZFxcdFxcdFxcdGdjYVxcbmFwcGxpY2F0aW9uL3gtZ2x1bHhcXHRcXHRcXHRcXHR1bHhcXG5hcHBsaWNhdGlvbi94LWdudW1lcmljXFx0XFx0XFx0XFx0Z251bWVyaWNcXG5hcHBsaWNhdGlvbi94LWdyYW1wcy14bWxcXHRcXHRcXHRncmFtcHNcXG5hcHBsaWNhdGlvbi94LWd0YXJcXHRcXHRcXHRcXHRndGFyXFxuYXBwbGljYXRpb24veC1oZGZcXHRcXHRcXHRcXHRoZGZcXG5hcHBsaWNhdGlvbi94LWluc3RhbGwtaW5zdHJ1Y3Rpb25zXFx0XFx0aW5zdGFsbFxcbmFwcGxpY2F0aW9uL3gtaXNvOTY2MC1pbWFnZVxcdFxcdFxcdGlzb1xcbmFwcGxpY2F0aW9uL3gtamF2YS1qbmxwLWZpbGVcXHRcXHRcXHRqbmxwXFxuYXBwbGljYXRpb24veC1sYXRleFxcdFxcdFxcdFxcdGxhdGV4XFxuYXBwbGljYXRpb24veC1semgtY29tcHJlc3NlZFxcdFxcdFxcdGx6aCBsaGFcXG5hcHBsaWNhdGlvbi94LW1pZVxcdFxcdFxcdFxcdG1pZVxcbmFwcGxpY2F0aW9uL3gtbW9iaXBvY2tldC1lYm9va1xcdFxcdFxcdHByYyBtb2JpXFxuYXBwbGljYXRpb24veC1tcy1hcHBsaWNhdGlvblxcdFxcdFxcdGFwcGxpY2F0aW9uXFxuYXBwbGljYXRpb24veC1tcy1zaG9ydGN1dFxcdFxcdFxcdGxua1xcbmFwcGxpY2F0aW9uL3gtbXMtd21kXFx0XFx0XFx0XFx0d21kXFxuYXBwbGljYXRpb24veC1tcy13bXpcXHRcXHRcXHRcXHR3bXpcXG5hcHBsaWNhdGlvbi94LW1zLXhiYXBcXHRcXHRcXHRcXHR4YmFwXFxuYXBwbGljYXRpb24veC1tc2FjY2Vzc1xcdFxcdFxcdFxcdG1kYlxcbmFwcGxpY2F0aW9uL3gtbXNiaW5kZXJcXHRcXHRcXHRcXHRvYmRcXG5hcHBsaWNhdGlvbi94LW1zY2FyZGZpbGVcXHRcXHRcXHRjcmRcXG5hcHBsaWNhdGlvbi94LW1zY2xpcFxcdFxcdFxcdFxcdGNscFxcbmFwcGxpY2F0aW9uL3gtbXNkb3dubG9hZFxcdFxcdFxcdGV4ZSBkbGwgY29tIGJhdCBtc2lcXG5hcHBsaWNhdGlvbi94LW1zbWVkaWF2aWV3XFx0XFx0XFx0bXZiIG0xMyBtMTRcXG5hcHBsaWNhdGlvbi94LW1zbWV0YWZpbGVcXHRcXHRcXHR3bWYgd216IGVtZiBlbXpcXG5hcHBsaWNhdGlvbi94LW1zbW9uZXlcXHRcXHRcXHRcXHRtbnlcXG5hcHBsaWNhdGlvbi94LW1zcHVibGlzaGVyXFx0XFx0XFx0cHViXFxuYXBwbGljYXRpb24veC1tc3NjaGVkdWxlXFx0XFx0XFx0c2NkXFxuYXBwbGljYXRpb24veC1tc3Rlcm1pbmFsXFx0XFx0XFx0dHJtXFxuYXBwbGljYXRpb24veC1tc3dyaXRlXFx0XFx0XFx0XFx0d3JpXFxuYXBwbGljYXRpb24veC1uZXRjZGZcXHRcXHRcXHRcXHRuYyBjZGZcXG5hcHBsaWNhdGlvbi94LW56YlxcdFxcdFxcdFxcdG56YlxcbmFwcGxpY2F0aW9uL3gtcGtjczEyXFx0XFx0XFx0XFx0cDEyIHBmeFxcbmFwcGxpY2F0aW9uL3gtcGtjczctY2VydGlmaWNhdGVzXFx0XFx0cDdiIHNwY1xcbmFwcGxpY2F0aW9uL3gtcGtjczctY2VydHJlcXJlc3BcXHRcXHRcXHRwN3JcXG5hcHBsaWNhdGlvbi94LXJhci1jb21wcmVzc2VkXFx0XFx0XFx0cmFyXFxuYXBwbGljYXRpb24veC1yZXNlYXJjaC1pbmZvLXN5c3RlbXNcXHRcXHRyaXNcXG5hcHBsaWNhdGlvbi94LXNoXFx0XFx0XFx0XFx0c2hcXG5hcHBsaWNhdGlvbi94LXNoYXJcXHRcXHRcXHRcXHRzaGFyXFxuYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcXHRcXHRcXHRzd2ZcXG5hcHBsaWNhdGlvbi94LXNpbHZlcmxpZ2h0LWFwcFxcdFxcdFxcdHhhcFxcbmFwcGxpY2F0aW9uL3gtc3FsXFx0XFx0XFx0XFx0c3FsXFxuYXBwbGljYXRpb24veC1zdHVmZml0XFx0XFx0XFx0XFx0c2l0XFxuYXBwbGljYXRpb24veC1zdHVmZml0eFxcdFxcdFxcdFxcdHNpdHhcXG5hcHBsaWNhdGlvbi94LXN1YnJpcFxcdFxcdFxcdFxcdHNydFxcbmFwcGxpY2F0aW9uL3gtc3Y0Y3Bpb1xcdFxcdFxcdFxcdHN2NGNwaW9cXG5hcHBsaWNhdGlvbi94LXN2NGNyY1xcdFxcdFxcdFxcdHN2NGNyY1xcbmFwcGxpY2F0aW9uL3gtdDN2bS1pbWFnZVxcdFxcdFxcdHQzXFxuYXBwbGljYXRpb24veC10YWRzXFx0XFx0XFx0XFx0Z2FtXFxuYXBwbGljYXRpb24veC10YXJcXHRcXHRcXHRcXHR0YXJcXG5hcHBsaWNhdGlvbi94LXRjbFxcdFxcdFxcdFxcdHRjbFxcbmFwcGxpY2F0aW9uL3gtdGV4XFx0XFx0XFx0XFx0dGV4XFxuYXBwbGljYXRpb24veC10ZXgtdGZtXFx0XFx0XFx0XFx0dGZtXFxuYXBwbGljYXRpb24veC10ZXhpbmZvXFx0XFx0XFx0XFx0dGV4aW5mbyB0ZXhpXFxuYXBwbGljYXRpb24veC10Z2lmXFx0XFx0XFx0XFx0b2JqXFxuYXBwbGljYXRpb24veC11c3RhclxcdFxcdFxcdFxcdHVzdGFyXFxuYXBwbGljYXRpb24veC13YWlzLXNvdXJjZVxcdFxcdFxcdHNyY1xcbmFwcGxpY2F0aW9uL3gteDUwOS1jYS1jZXJ0XFx0XFx0XFx0ZGVyIGNydFxcbmFwcGxpY2F0aW9uL3gteGZpZ1xcdFxcdFxcdFxcdGZpZ1xcbmFwcGxpY2F0aW9uL3gteGxpZmYreG1sXFx0XFx0XFx0XFx0eGxmXFxuYXBwbGljYXRpb24veC14cGluc3RhbGxcXHRcXHRcXHRcXHR4cGlcXG5hcHBsaWNhdGlvbi94LXh6XFx0XFx0XFx0XFx0eHpcXG5hcHBsaWNhdGlvbi94LXptYWNoaW5lXFx0XFx0XFx0XFx0ejEgejIgejMgejQgejUgejYgejcgejhcXG5hcHBsaWNhdGlvbi94YW1sK3htbFxcdFxcdFxcdFxcdHhhbWxcXG5hcHBsaWNhdGlvbi94Y2FwLWRpZmYreG1sXFx0XFx0XFx0eGRmXFxuYXBwbGljYXRpb24veGVuYyt4bWxcXHRcXHRcXHRcXHR4ZW5jXFxuYXBwbGljYXRpb24veGh0bWwreG1sXFx0XFx0XFx0XFx0eGh0bWwgeGh0XFxuYXBwbGljYXRpb24veG1sXFx0XFx0XFx0XFx0XFx0eG1sIHhzbFxcbmFwcGxpY2F0aW9uL3htbC1kdGRcXHRcXHRcXHRcXHRkdGRcXG5hcHBsaWNhdGlvbi94b3AreG1sXFx0XFx0XFx0XFx0eG9wXFxuYXBwbGljYXRpb24veHByb2MreG1sXFx0XFx0XFx0XFx0eHBsXFxuYXBwbGljYXRpb24veHNsdCt4bWxcXHRcXHRcXHRcXHR4c2x0XFxuYXBwbGljYXRpb24veHNwZit4bWxcXHRcXHRcXHRcXHR4c3BmXFxuYXBwbGljYXRpb24veHYreG1sXFx0XFx0XFx0XFx0bXhtbCB4aHZtbCB4dm1sIHh2bVxcbmFwcGxpY2F0aW9uL3lhbmdcXHRcXHRcXHRcXHR5YW5nXFxuYXBwbGljYXRpb24veWluK3htbFxcdFxcdFxcdFxcdHlpblxcbmFwcGxpY2F0aW9uL3ppcFxcdFxcdFxcdFxcdFxcdHppcFxcbmF1ZGlvL2FkcGNtXFx0XFx0XFx0XFx0XFx0YWRwXFxuYXVkaW8vYmFzaWNcXHRcXHRcXHRcXHRcXHRhdSBzbmRcXG5hdWRpby9taWRpXFx0XFx0XFx0XFx0XFx0bWlkIG1pZGkga2FyIHJtaVxcbmF1ZGlvL21wNFxcdFxcdFxcdFxcdFxcdG00YSBtcDRhXFxuYXVkaW8vbXBlZ1xcdFxcdFxcdFxcdFxcdG1wZ2EgbXAyIG1wMmEgbXAzIG0yYSBtM2FcXG5hdWRpby9vZ2dcXHRcXHRcXHRcXHRcXHRvZ2Egb2dnIHNweFxcbmF1ZGlvL3MzbVxcdFxcdFxcdFxcdFxcdHMzbVxcbmF1ZGlvL3NpbGtcXHRcXHRcXHRcXHRcXHRzaWxcXG5hdWRpby92bmQuZGVjZS5hdWRpb1xcdFxcdFxcdFxcdHV2YSB1dnZhXFxuYXVkaW8vdm5kLmRpZ2l0YWwtd2luZHNcXHRcXHRcXHRcXHRlb2xcXG5hdWRpby92bmQuZHJhXFx0XFx0XFx0XFx0XFx0ZHJhXFxuYXVkaW8vdm5kLmR0c1xcdFxcdFxcdFxcdFxcdGR0c1xcbmF1ZGlvL3ZuZC5kdHMuaGRcXHRcXHRcXHRcXHRkdHNoZFxcbmF1ZGlvL3ZuZC5sdWNlbnQudm9pY2VcXHRcXHRcXHRcXHRsdnBcXG5hdWRpby92bmQubXMtcGxheXJlYWR5Lm1lZGlhLnB5YVxcdFxcdHB5YVxcbmF1ZGlvL3ZuZC5udWVyYS5lY2VscDQ4MDBcXHRcXHRcXHRlY2VscDQ4MDBcXG5hdWRpby92bmQubnVlcmEuZWNlbHA3NDcwXFx0XFx0XFx0ZWNlbHA3NDcwXFxuYXVkaW8vdm5kLm51ZXJhLmVjZWxwOTYwMFxcdFxcdFxcdGVjZWxwOTYwMFxcbmF1ZGlvL3ZuZC5yaXBcXHRcXHRcXHRcXHRcXHRyaXBcXG5hdWRpby93ZWJtXFx0XFx0XFx0XFx0XFx0d2ViYVxcbmF1ZGlvL3gtYWFjXFx0XFx0XFx0XFx0XFx0YWFjXFxuYXVkaW8veC1haWZmXFx0XFx0XFx0XFx0XFx0YWlmIGFpZmYgYWlmY1xcbmF1ZGlvL3gtY2FmXFx0XFx0XFx0XFx0XFx0Y2FmXFxuYXVkaW8veC1mbGFjXFx0XFx0XFx0XFx0XFx0ZmxhY1xcbmF1ZGlvL3gtbWF0cm9za2FcXHRcXHRcXHRcXHRta2FcXG5hdWRpby94LW1wZWd1cmxcXHRcXHRcXHRcXHRcXHRtM3VcXG5hdWRpby94LW1zLXdheFxcdFxcdFxcdFxcdFxcdHdheFxcbmF1ZGlvL3gtbXMtd21hXFx0XFx0XFx0XFx0XFx0d21hXFxuYXVkaW8veC1wbi1yZWFsYXVkaW9cXHRcXHRcXHRcXHRyYW0gcmFcXG5hdWRpby94LXBuLXJlYWxhdWRpby1wbHVnaW5cXHRcXHRcXHRybXBcXG5hdWRpby94LXdhdlxcdFxcdFxcdFxcdFxcdHdhdlxcbmF1ZGlvL3htXFx0XFx0XFx0XFx0XFx0eG1cXG5jaGVtaWNhbC94LWNkeFxcdFxcdFxcdFxcdFxcdGNkeFxcbmNoZW1pY2FsL3gtY2lmXFx0XFx0XFx0XFx0XFx0Y2lmXFxuY2hlbWljYWwveC1jbWRmXFx0XFx0XFx0XFx0XFx0Y21kZlxcbmNoZW1pY2FsL3gtY21sXFx0XFx0XFx0XFx0XFx0Y21sXFxuY2hlbWljYWwveC1jc21sXFx0XFx0XFx0XFx0XFx0Y3NtbFxcbmNoZW1pY2FsL3gteHl6XFx0XFx0XFx0XFx0XFx0eHl6XFxuZm9udC9jb2xsZWN0aW9uXFx0XFx0XFx0XFx0XFx0dHRjXFxuZm9udC9vdGZcXHRcXHRcXHRcXHRcXHRvdGZcXG5mb250L3R0ZlxcdFxcdFxcdFxcdFxcdHR0ZlxcbmZvbnQvd29mZlxcdFxcdFxcdFxcdFxcdHdvZmZcXG5mb250L3dvZmYyXFx0XFx0XFx0XFx0XFx0d29mZjJcXG5pbWFnZS9ibXBcXHRcXHRcXHRcXHRcXHRibXBcXG5pbWFnZS9jZ21cXHRcXHRcXHRcXHRcXHRjZ21cXG5pbWFnZS9nM2ZheFxcdFxcdFxcdFxcdFxcdGczXFxuaW1hZ2UvZ2lmXFx0XFx0XFx0XFx0XFx0Z2lmXFxuaW1hZ2UvaWVmXFx0XFx0XFx0XFx0XFx0aWVmXFxuaW1hZ2UvanBlZ1xcdFxcdFxcdFxcdFxcdGpwZWcganBnIGpwZVxcbmltYWdlL2t0eFxcdFxcdFxcdFxcdFxcdGt0eFxcbmltYWdlL3BuZ1xcdFxcdFxcdFxcdFxcdHBuZ1xcbmltYWdlL3Bycy5idGlmXFx0XFx0XFx0XFx0XFx0YnRpZlxcbmltYWdlL3NnaVxcdFxcdFxcdFxcdFxcdHNnaVxcbmltYWdlL3N2Zyt4bWxcXHRcXHRcXHRcXHRcXHRzdmcgc3ZnelxcbmltYWdlL3RpZmZcXHRcXHRcXHRcXHRcXHR0aWZmIHRpZlxcbmltYWdlL3ZuZC5hZG9iZS5waG90b3Nob3BcXHRcXHRcXHRwc2RcXG5pbWFnZS92bmQuZGVjZS5ncmFwaGljXFx0XFx0XFx0XFx0dXZpIHV2dmkgdXZnIHV2dmdcXG5pbWFnZS92bmQuZGp2dVxcdFxcdFxcdFxcdFxcdGRqdnUgZGp2XFxuaW1hZ2Uvdm5kLmR2Yi5zdWJ0aXRsZVxcdFxcdFxcdFxcdHN1YlxcbmltYWdlL3ZuZC5kd2dcXHRcXHRcXHRcXHRcXHRkd2dcXG5pbWFnZS92bmQuZHhmXFx0XFx0XFx0XFx0XFx0ZHhmXFxuaW1hZ2Uvdm5kLmZhc3RiaWRzaGVldFxcdFxcdFxcdFxcdGZic1xcbmltYWdlL3ZuZC5mcHhcXHRcXHRcXHRcXHRcXHRmcHhcXG5pbWFnZS92bmQuZnN0XFx0XFx0XFx0XFx0XFx0ZnN0XFxuaW1hZ2Uvdm5kLmZ1aml4ZXJveC5lZG1pY3MtbW1yXFx0XFx0XFx0bW1yXFxuaW1hZ2Uvdm5kLmZ1aml4ZXJveC5lZG1pY3MtcmxjXFx0XFx0XFx0cmxjXFxuaW1hZ2Uvdm5kLm1zLW1vZGlcXHRcXHRcXHRcXHRtZGlcXG5pbWFnZS92bmQubXMtcGhvdG9cXHRcXHRcXHRcXHR3ZHBcXG5pbWFnZS92bmQubmV0LWZweFxcdFxcdFxcdFxcdG5weFxcbmltYWdlL3ZuZC53YXAud2JtcFxcdFxcdFxcdFxcdHdibXBcXG5pbWFnZS92bmQueGlmZlxcdFxcdFxcdFxcdFxcdHhpZlxcbmltYWdlL3dlYnBcXHRcXHRcXHRcXHRcXHR3ZWJwXFxuaW1hZ2UveC0zZHNcXHRcXHRcXHRcXHRcXHQzZHNcXG5pbWFnZS94LWNtdS1yYXN0ZXJcXHRcXHRcXHRcXHRyYXNcXG5pbWFnZS94LWNteFxcdFxcdFxcdFxcdFxcdGNteFxcbmltYWdlL3gtZnJlZWhhbmRcXHRcXHRcXHRcXHRmaCBmaGMgZmg0IGZoNSBmaDdcXG5pbWFnZS94LWljb25cXHRcXHRcXHRcXHRcXHRpY29cXG5pbWFnZS94LW1yc2lkLWltYWdlXFx0XFx0XFx0XFx0c2lkXFxuaW1hZ2UveC1wY3hcXHRcXHRcXHRcXHRcXHRwY3hcXG5pbWFnZS94LXBpY3RcXHRcXHRcXHRcXHRcXHRwaWMgcGN0XFxuaW1hZ2UveC1wb3J0YWJsZS1hbnltYXBcXHRcXHRcXHRcXHRwbm1cXG5pbWFnZS94LXBvcnRhYmxlLWJpdG1hcFxcdFxcdFxcdFxcdHBibVxcbmltYWdlL3gtcG9ydGFibGUtZ3JheW1hcFxcdFxcdFxcdHBnbVxcbmltYWdlL3gtcG9ydGFibGUtcGl4bWFwXFx0XFx0XFx0XFx0cHBtXFxuaW1hZ2UveC1yZ2JcXHRcXHRcXHRcXHRcXHRyZ2JcXG5pbWFnZS94LXRnYVxcdFxcdFxcdFxcdFxcdHRnYVxcbmltYWdlL3gteGJpdG1hcFxcdFxcdFxcdFxcdFxcdHhibVxcbmltYWdlL3gteHBpeG1hcFxcdFxcdFxcdFxcdFxcdHhwbVxcbmltYWdlL3gteHdpbmRvd2R1bXBcXHRcXHRcXHRcXHR4d2RcXG5tZXNzYWdlL3JmYzgyMlxcdFxcdFxcdFxcdFxcdGVtbCBtaW1lXFxubW9kZWwvaWdlc1xcdFxcdFxcdFxcdFxcdGlncyBpZ2VzXFxubW9kZWwvbWVzaFxcdFxcdFxcdFxcdFxcdG1zaCBtZXNoIHNpbG9cXG5tb2RlbC92bmQuY29sbGFkYSt4bWxcXHRcXHRcXHRcXHRkYWVcXG5tb2RlbC92bmQuZHdmXFx0XFx0XFx0XFx0XFx0ZHdmXFxubW9kZWwvdm5kLmdkbFxcdFxcdFxcdFxcdFxcdGdkbFxcbm1vZGVsL3ZuZC5ndHdcXHRcXHRcXHRcXHRcXHRndHdcXG5tb2RlbC92bmQubXRzXFx0XFx0XFx0XFx0XFx0bXRzXFxubW9kZWwvdm5kLnZ0dVxcdFxcdFxcdFxcdFxcdHZ0dVxcbm1vZGVsL3ZybWxcXHRcXHRcXHRcXHRcXHR3cmwgdnJtbFxcbm1vZGVsL3gzZCtiaW5hcnlcXHRcXHRcXHRcXHR4M2RiIHgzZGJ6XFxubW9kZWwveDNkK3ZybWxcXHRcXHRcXHRcXHRcXHR4M2R2IHgzZHZ6XFxubW9kZWwveDNkK3htbFxcdFxcdFxcdFxcdFxcdHgzZCB4M2R6XFxudGV4dC9jYWNoZS1tYW5pZmVzdFxcdFxcdFxcdFxcdGFwcGNhY2hlXFxudGV4dC9jYWxlbmRhclxcdFxcdFxcdFxcdFxcdGljcyBpZmJcXG50ZXh0L2Nzc1xcdFxcdFxcdFxcdFxcdGNzc1xcbnRleHQvY3N2XFx0XFx0XFx0XFx0XFx0Y3N2XFxudGV4dC9odG1sXFx0XFx0XFx0XFx0XFx0aHRtbCBodG1cXG50ZXh0L24zXFx0XFx0XFx0XFx0XFx0XFx0bjNcXG50ZXh0L3BsYWluXFx0XFx0XFx0XFx0XFx0dHh0IHRleHQgY29uZiBkZWYgbGlzdCBsb2cgaW5cXG50ZXh0L3Bycy5saW5lcy50YWdcXHRcXHRcXHRcXHRkc2NcXG50ZXh0L3JpY2h0ZXh0XFx0XFx0XFx0XFx0XFx0cnR4XFxudGV4dC9zZ21sXFx0XFx0XFx0XFx0XFx0c2dtbCBzZ21cXG50ZXh0L3RhYi1zZXBhcmF0ZWQtdmFsdWVzXFx0XFx0XFx0dHN2XFxudGV4dC90cm9mZlxcdFxcdFxcdFxcdFxcdHQgdHIgcm9mZiBtYW4gbWUgbXNcXG50ZXh0L3R1cnRsZVxcdFxcdFxcdFxcdFxcdHR0bFxcbnRleHQvdXJpLWxpc3RcXHRcXHRcXHRcXHRcXHR1cmkgdXJpcyB1cmxzXFxudGV4dC92Y2FyZFxcdFxcdFxcdFxcdFxcdHZjYXJkXFxudGV4dC92bmQuY3VybFxcdFxcdFxcdFxcdFxcdGN1cmxcXG50ZXh0L3ZuZC5jdXJsLmRjdXJsXFx0XFx0XFx0XFx0ZGN1cmxcXG50ZXh0L3ZuZC5jdXJsLm1jdXJsXFx0XFx0XFx0XFx0bWN1cmxcXG50ZXh0L3ZuZC5jdXJsLnNjdXJsXFx0XFx0XFx0XFx0c2N1cmxcXG50ZXh0L3ZuZC5kdmIuc3VidGl0bGVcXHRcXHRcXHRcXHRzdWJcXG50ZXh0L3ZuZC5mbHlcXHRcXHRcXHRcXHRcXHRmbHlcXG50ZXh0L3ZuZC5mbWkuZmxleHN0b3JcXHRcXHRcXHRcXHRmbHhcXG50ZXh0L3ZuZC5ncmFwaHZpelxcdFxcdFxcdFxcdGd2XFxudGV4dC92bmQuaW4zZC4zZG1sXFx0XFx0XFx0XFx0M2RtbFxcbnRleHQvdm5kLmluM2Quc3BvdFxcdFxcdFxcdFxcdHNwb3RcXG50ZXh0L3ZuZC5zdW4uajJtZS5hcHAtZGVzY3JpcHRvclxcdFxcdGphZFxcbnRleHQvdm5kLndhcC53bWxcXHRcXHRcXHRcXHR3bWxcXG50ZXh0L3ZuZC53YXAud21sc2NyaXB0XFx0XFx0XFx0XFx0d21sc1xcbnRleHQveC1hc21cXHRcXHRcXHRcXHRcXHRzIGFzbVxcbnRleHQveC1jXFx0XFx0XFx0XFx0XFx0YyBjYyBjeHggY3BwIGggaGggZGljXFxudGV4dC94LWZvcnRyYW5cXHRcXHRcXHRcXHRcXHRmIGZvciBmNzcgZjkwXFxudGV4dC94LWphdmEtc291cmNlXFx0XFx0XFx0XFx0amF2YVxcbnRleHQveC1uZm9cXHRcXHRcXHRcXHRcXHRuZm9cXG50ZXh0L3gtb3BtbFxcdFxcdFxcdFxcdFxcdG9wbWxcXG50ZXh0L3gtcGFzY2FsXFx0XFx0XFx0XFx0XFx0cCBwYXNcXG50ZXh0L3gtc2V0ZXh0XFx0XFx0XFx0XFx0XFx0ZXR4XFxudGV4dC94LXNmdlxcdFxcdFxcdFxcdFxcdHNmdlxcbnRleHQveC11dWVuY29kZVxcdFxcdFxcdFxcdFxcdHV1XFxudGV4dC94LXZjYWxlbmRhclxcdFxcdFxcdFxcdHZjc1xcbnRleHQveC12Y2FyZFxcdFxcdFxcdFxcdFxcdHZjZlxcbnZpZGVvLzNncHBcXHRcXHRcXHRcXHRcXHQzZ3BcXG52aWRlby8zZ3BwMlxcdFxcdFxcdFxcdFxcdDNnMlxcbnZpZGVvL2gyNjFcXHRcXHRcXHRcXHRcXHRoMjYxXFxudmlkZW8vaDI2M1xcdFxcdFxcdFxcdFxcdGgyNjNcXG52aWRlby9oMjY0XFx0XFx0XFx0XFx0XFx0aDI2NFxcbnZpZGVvL2pwZWdcXHRcXHRcXHRcXHRcXHRqcGd2XFxudmlkZW8vanBtXFx0XFx0XFx0XFx0XFx0anBtIGpwZ21cXG52aWRlby9tajJcXHRcXHRcXHRcXHRcXHRtajIgbWpwMlxcbnZpZGVvL21wNFxcdFxcdFxcdFxcdFxcdG1wNCBtcDR2IG1wZzRcXG52aWRlby9tcGVnXFx0XFx0XFx0XFx0XFx0bXBlZyBtcGcgbXBlIG0xdiBtMnZcXG52aWRlby9vZ2dcXHRcXHRcXHRcXHRcXHRvZ3ZcXG52aWRlby9xdWlja3RpbWVcXHRcXHRcXHRcXHRcXHRxdCBtb3ZcXG52aWRlby92bmQuZGVjZS5oZFxcdFxcdFxcdFxcdHV2aCB1dnZoXFxudmlkZW8vdm5kLmRlY2UubW9iaWxlXFx0XFx0XFx0XFx0dXZtIHV2dm1cXG52aWRlby92bmQuZGVjZS5wZFxcdFxcdFxcdFxcdHV2cCB1dnZwXFxudmlkZW8vdm5kLmRlY2Uuc2RcXHRcXHRcXHRcXHR1dnMgdXZ2c1xcbnZpZGVvL3ZuZC5kZWNlLnZpZGVvXFx0XFx0XFx0XFx0dXZ2IHV2dnZcXG52aWRlby92bmQuZHZiLmZpbGVcXHRcXHRcXHRcXHRkdmJcXG52aWRlby92bmQuZnZ0XFx0XFx0XFx0XFx0XFx0ZnZ0XFxudmlkZW8vdm5kLm1wZWd1cmxcXHRcXHRcXHRcXHRteHUgbTR1XFxudmlkZW8vdm5kLm1zLXBsYXlyZWFkeS5tZWRpYS5weXZcXHRcXHRweXZcXG52aWRlby92bmQudXZ2dS5tcDRcXHRcXHRcXHRcXHR1dnUgdXZ2dVxcbnZpZGVvL3ZuZC52aXZvXFx0XFx0XFx0XFx0XFx0dml2XFxudmlkZW8vd2VibVxcdFxcdFxcdFxcdFxcdHdlYm1cXG52aWRlby94LWY0dlxcdFxcdFxcdFxcdFxcdGY0dlxcbnZpZGVvL3gtZmxpXFx0XFx0XFx0XFx0XFx0ZmxpXFxudmlkZW8veC1mbHZcXHRcXHRcXHRcXHRcXHRmbHZcXG52aWRlby94LW00dlxcdFxcdFxcdFxcdFxcdG00dlxcbnZpZGVvL3gtbWF0cm9za2FcXHRcXHRcXHRcXHRta3YgbWszZCBta3NcXG52aWRlby94LW1uZ1xcdFxcdFxcdFxcdFxcdG1uZ1xcbnZpZGVvL3gtbXMtYXNmXFx0XFx0XFx0XFx0XFx0YXNmIGFzeFxcbnZpZGVvL3gtbXMtdm9iXFx0XFx0XFx0XFx0XFx0dm9iXFxudmlkZW8veC1tcy13bVxcdFxcdFxcdFxcdFxcdHdtXFxudmlkZW8veC1tcy13bXZcXHRcXHRcXHRcXHRcXHR3bXZcXG52aWRlby94LW1zLXdteFxcdFxcdFxcdFxcdFxcdHdteFxcbnZpZGVvL3gtbXMtd3Z4XFx0XFx0XFx0XFx0XFx0d3Z4XFxudmlkZW8veC1tc3ZpZGVvXFx0XFx0XFx0XFx0XFx0YXZpXFxudmlkZW8veC1zZ2ktbW92aWVcXHRcXHRcXHRcXHRtb3ZpZVxcbnZpZGVvL3gtc212XFx0XFx0XFx0XFx0XFx0c212XFxueC1jb25mZXJlbmNlL3gtY29vbHRhbGtcXHRcXHRcXHRcXHRpY2VcXG5cIjtcblxuY29uc3QgbWFwID0gbmV3IE1hcCgpO1xuXG5taW1lX3Jhdy5zcGxpdCgnXFxuJykuZm9yRWFjaCgocm93KSA9PiB7XG5cdGNvbnN0IG1hdGNoID0gLyguKz8pXFx0KyguKykvLmV4ZWMocm93KTtcblx0aWYgKCFtYXRjaCkgcmV0dXJuO1xuXG5cdGNvbnN0IHR5cGUgPSBtYXRjaFsxXTtcblx0Y29uc3QgZXh0ZW5zaW9ucyA9IG1hdGNoWzJdLnNwbGl0KCcgJyk7XG5cblx0ZXh0ZW5zaW9ucy5mb3JFYWNoKGV4dCA9PiB7XG5cdFx0bWFwLnNldChleHQsIHR5cGUpO1xuXHR9KTtcbn0pO1xuXG5mdW5jdGlvbiBsb29rdXAoZmlsZSkge1xuXHRjb25zdCBtYXRjaCA9IC9cXC4oW15cXC5dKykkLy5leGVjKGZpbGUpO1xuXHRyZXR1cm4gbWF0Y2ggJiYgbWFwLmdldChtYXRjaFsxXSk7XG59XG5cbmZ1bmN0aW9uIG1pZGRsZXdhcmUob3B0c1xuXG5cbiA9IHt9KSB7XG5cdGNvbnN0IHsgc2Vzc2lvbiwgaWdub3JlIH0gPSBvcHRzO1xuXG5cdGxldCBlbWl0dGVkX2Jhc2VwYXRoID0gZmFsc2U7XG5cblx0cmV0dXJuIGNvbXBvc2VfaGFuZGxlcnMoaWdub3JlLCBbXG5cdFx0KHJlcSwgcmVzLCBuZXh0KSA9PiB7XG5cdFx0XHRpZiAocmVxLmJhc2VVcmwgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRsZXQgeyBvcmlnaW5hbFVybCB9ID0gcmVxO1xuXHRcdFx0XHRpZiAocmVxLnVybCA9PT0gJy8nICYmIG9yaWdpbmFsVXJsW29yaWdpbmFsVXJsLmxlbmd0aCAtIDFdICE9PSAnLycpIHtcblx0XHRcdFx0XHRvcmlnaW5hbFVybCArPSAnLyc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXEuYmFzZVVybCA9IG9yaWdpbmFsVXJsXG5cdFx0XHRcdFx0PyBvcmlnaW5hbFVybC5zbGljZSgwLCAtcmVxLnVybC5sZW5ndGgpXG5cdFx0XHRcdFx0OiAnJztcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFlbWl0dGVkX2Jhc2VwYXRoICYmIHByb2Nlc3Muc2VuZCkge1xuXHRcdFx0XHRwcm9jZXNzLnNlbmQoe1xuXHRcdFx0XHRcdF9fc2FwcGVyX186IHRydWUsXG5cdFx0XHRcdFx0ZXZlbnQ6ICdiYXNlcGF0aCcsXG5cdFx0XHRcdFx0YmFzZXBhdGg6IHJlcS5iYXNlVXJsXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGVtaXR0ZWRfYmFzZXBhdGggPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocmVxLnBhdGggPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRyZXEucGF0aCA9IHJlcS51cmwucmVwbGFjZSgvXFw/LiovLCAnJyk7XG5cdFx0XHR9XG5cblx0XHRcdG5leHQoKTtcblx0XHR9LFxuXG5cdFx0ZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCAnc2VydmljZS13b3JrZXIuanMnKSkgJiYgc2VydmUoe1xuXHRcdFx0cGF0aG5hbWU6ICcvc2VydmljZS13b3JrZXIuanMnLFxuXHRcdFx0Y2FjaGVfY29udHJvbDogJ25vLWNhY2hlLCBuby1zdG9yZSwgbXVzdC1yZXZhbGlkYXRlJ1xuXHRcdH0pLFxuXG5cdFx0ZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCAnc2VydmljZS13b3JrZXIuanMubWFwJykpICYmIHNlcnZlKHtcblx0XHRcdHBhdGhuYW1lOiAnL3NlcnZpY2Utd29ya2VyLmpzLm1hcCcsXG5cdFx0XHRjYWNoZV9jb250cm9sOiAnbm8tY2FjaGUsIG5vLXN0b3JlLCBtdXN0LXJldmFsaWRhdGUnXG5cdFx0fSksXG5cblx0XHRzZXJ2ZSh7XG5cdFx0XHRwcmVmaXg6ICcvY2xpZW50LycsXG5cdFx0XHRjYWNoZV9jb250cm9sOiBkZXYgPyAnbm8tY2FjaGUnIDogJ21heC1hZ2U9MzE1MzYwMDAsIGltbXV0YWJsZSdcblx0XHR9KSxcblxuXHRcdGdldF9zZXJ2ZXJfcm91dGVfaGFuZGxlcihtYW5pZmVzdC5zZXJ2ZXJfcm91dGVzKSxcblxuXHRcdGdldF9wYWdlX2hhbmRsZXIobWFuaWZlc3QsIHNlc3Npb24gfHwgbm9vcClcblx0XS5maWx0ZXIoQm9vbGVhbikpO1xufVxuXG5mdW5jdGlvbiBjb21wb3NlX2hhbmRsZXJzKGlnbm9yZSwgaGFuZGxlcnMpIHtcblx0Y29uc3QgdG90YWwgPSBoYW5kbGVycy5sZW5ndGg7XG5cblx0ZnVuY3Rpb24gbnRoX2hhbmRsZXIobiwgcmVxLCByZXMsIG5leHQpIHtcblx0XHRpZiAobiA+PSB0b3RhbCkge1xuXHRcdFx0cmV0dXJuIG5leHQoKTtcblx0XHR9XG5cblx0XHRoYW5kbGVyc1tuXShyZXEsIHJlcywgKCkgPT4gbnRoX2hhbmRsZXIobisxLCByZXEsIHJlcywgbmV4dCkpO1xuXHR9XG5cblx0cmV0dXJuICFpZ25vcmVcblx0XHQ/IChyZXEsIHJlcywgbmV4dCkgPT4gbnRoX2hhbmRsZXIoMCwgcmVxLCByZXMsIG5leHQpXG5cdFx0OiAocmVxLCByZXMsIG5leHQpID0+IHtcblx0XHRcdGlmIChzaG91bGRfaWdub3JlKHJlcS5wYXRoLCBpZ25vcmUpKSB7XG5cdFx0XHRcdG5leHQoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG50aF9oYW5kbGVyKDAsIHJlcSwgcmVzLCBuZXh0KTtcblx0XHRcdH1cblx0XHR9O1xufVxuXG5mdW5jdGlvbiBzaG91bGRfaWdub3JlKHVyaSwgdmFsKSB7XG5cdGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHJldHVybiB2YWwuc29tZSh4ID0+IHNob3VsZF9pZ25vcmUodXJpLCB4KSk7XG5cdGlmICh2YWwgaW5zdGFuY2VvZiBSZWdFeHApIHJldHVybiB2YWwudGVzdCh1cmkpO1xuXHRpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbCh1cmkpO1xuXHRyZXR1cm4gdXJpLnN0YXJ0c1dpdGgodmFsLmNoYXJDb2RlQXQoMCkgPT09IDQ3ID8gdmFsIDogYC8ke3ZhbH1gKTtcbn1cblxuZnVuY3Rpb24gc2VydmUoeyBwcmVmaXgsIHBhdGhuYW1lLCBjYWNoZV9jb250cm9sIH1cblxuXG5cbikge1xuXHRjb25zdCBmaWx0ZXIgPSBwYXRobmFtZVxuXHRcdD8gKHJlcSkgPT4gcmVxLnBhdGggPT09IHBhdGhuYW1lXG5cdFx0OiAocmVxKSA9PiByZXEucGF0aC5zdGFydHNXaXRoKHByZWZpeCk7XG5cblx0Y29uc3QgY2FjaGUgPSBuZXcgTWFwKCk7XG5cblx0Y29uc3QgcmVhZCA9IGRldlxuXHRcdD8gKGZpbGUpID0+IGZzLnJlYWRGaWxlU3luYyhwYXRoLnJlc29sdmUoYnVpbGRfZGlyLCBmaWxlKSlcblx0XHQ6IChmaWxlKSA9PiAoY2FjaGUuaGFzKGZpbGUpID8gY2FjaGUgOiBjYWNoZS5zZXQoZmlsZSwgZnMucmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShidWlsZF9kaXIsIGZpbGUpKSkpLmdldChmaWxlKTtcblxuXHRyZXR1cm4gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG5cdFx0aWYgKGZpbHRlcihyZXEpKSB7XG5cdFx0XHRjb25zdCB0eXBlID0gbG9va3VwKHJlcS5wYXRoKTtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgZmlsZSA9IGRlY29kZVVSSUNvbXBvbmVudChyZXEucGF0aC5zbGljZSgxKSk7XG5cdFx0XHRcdGNvbnN0IGRhdGEgPSByZWFkKGZpbGUpO1xuXG5cdFx0XHRcdHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIHR5cGUpO1xuXHRcdFx0XHRyZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgY2FjaGVfY29udHJvbCk7XG5cdFx0XHRcdHJlcy5lbmQoZGF0YSk7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0cmVzLnN0YXR1c0NvZGUgPSA0MDQ7XG5cdFx0XHRcdHJlcy5lbmQoJ25vdCBmb3VuZCcpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRuZXh0KCk7XG5cdFx0fVxuXHR9O1xufVxuXG5mdW5jdGlvbiBub29wKCl7fVxuXG5leHBvcnQgeyBtaWRkbGV3YXJlIH07XG4iLCJpbXBvcnQgc2lydiBmcm9tICdzaXJ2JztcclxuaW1wb3J0IHBvbGthIGZyb20gJ3BvbGthJztcclxuaW1wb3J0IGNvbXByZXNzaW9uIGZyb20gJ2NvbXByZXNzaW9uJztcclxuaW1wb3J0ICogYXMgc2FwcGVyIGZyb20gJ0BzYXBwZXIvc2VydmVyJztcclxuXHJcbmNvbnN0IHsgUE9SVCwgTk9ERV9FTlYgfSA9IHByb2Nlc3MuZW52O1xyXG5jb25zdCBkZXYgPSBOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcclxuXHJcbnBvbGthKCkgLy8gWW91IGNhbiBhbHNvIHVzZSBFeHByZXNzXHJcblx0LnVzZShcclxuXHRcdGNvbXByZXNzaW9uKHsgdGhyZXNob2xkOiAwIH0pLFxyXG5cdFx0c2lydignc3RhdGljJywgeyBkZXYgfSksXHJcblx0XHRzYXBwZXIubWlkZGxld2FyZSgpXHJcblx0KVxyXG5cdC5saXN0ZW4oUE9SVCwgZXJyID0+IHtcclxuXHRcdGlmIChlcnIpIGNvbnNvbGUubG9nKCdlcnJvcicsIGVycik7XHJcblx0fSk7XHJcbiJdLCJuYW1lcyI6WyJnZXQiLCJwcmVsb2FkIiwiY29tcG9uZW50XzAiLCJjb21wb25lbnRfMSIsImNvbXBvbmVudF8yIiwicHJlbG9hZF8yIiwiY29tcG9uZW50XzMiLCJwcmVsb2FkXzMiLCJyb290IiwiZXJyb3IiLCJlc2NhcGVkIiwibG9va3VwIiwibm9vcCIsInNhcHBlci5taWRkbGV3YXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7O0FBU0EsTUFBTSxLQUFLLEdBQUc7Q0FDYjtFQUNDLEtBQUssRUFBRSxpQkFBaUI7RUFDeEIsSUFBSSxFQUFFLGdCQUFnQjtFQUN0QixJQUFJLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7OztFQWFQLENBQUM7RUFDRDs7Q0FFRDtFQUNDLEtBQUssRUFBRSxtQkFBbUI7RUFDMUIsSUFBSSxFQUFFLG1CQUFtQjtFQUN6QixJQUFJLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBa0JQLENBQUM7RUFDRDs7Q0FFRDtFQUNDLEtBQUssRUFBRSxlQUFlO0VBQ3RCLElBQUksRUFBRSxjQUFjO0VBQ3BCLElBQUksRUFBRSxDQUFDOzs7O0VBSVAsQ0FBQztFQUNEOztDQUVEO0VBQ0MsS0FBSyxFQUFFLHVDQUF1QztFQUM5QyxJQUFJLEVBQUUsbUNBQW1DO0VBQ3pDLElBQUksRUFBRSxDQUFDOzs7Ozs7Ozs7RUFTUCxDQUFDO0VBQ0Q7O0NBRUQ7RUFDQyxLQUFLLEVBQUUseUJBQXlCO0VBQ2hDLElBQUksRUFBRSx3QkFBd0I7RUFDOUIsSUFBSSxFQUFFLENBQUM7O0VBRVAsQ0FBQztFQUNEO0NBQ0QsQ0FBQzs7QUFFRixLQUFLLENBQUMsT0FB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
