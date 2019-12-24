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
	code: ".wrap-card.svelte-lvlf1o{position:relative}.card.svelte-lvlf1o{display:flex;width:450px;height:270px;background-image:url(/mir-details-01.png), url(/color.jpg);background-position:left 30px top 30px, center center;background-repeat:no-repeat, no-repeat;-webkit-background-size:15%, 100%;background-size:15%, 100%;-webkit-border-radius:20px;-moz-border-radius:20px;border-radius:20px;padding:170px 30px 30px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-size:0;flex-wrap:wrap;-webkit-transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);-moz-transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);-ms-transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);-o-transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);box-shadow:0 20px 60px 0 rgba(14, 42, 90, 0.55);transform:perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg);transform-style:preserve-3d;backface-visibility:hidden;margin:0 auto 30px;position:relative;z-index:5}.wrap-card-back.svelte-lvlf1o{width:100%;position:absolute;top:0;left:0}.card-back.svelte-lvlf1o{display:flex;width:450px;height:270px;background-image:url(/color.jpg);background-position:center center;background-repeat:no-repeat, no-repeat;-webkit-background-size:100%;background-size:100%;-webkit-border-radius:20px;-moz-border-radius:20px;border-radius:20px;padding:170px 30px 30px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0 0 0 0 #000;-moz-box-shadow:0 0 0 0 #000;box-shadow:0 0 0 0 #000;font-size:0;flex-wrap:wrap;margin:0 auto 30px;transform-style:preserve-3d;box-shadow:0 20px 60px 0 rgba(14, 42, 90, 0.55);-webkit-transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);-moz-transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);-ms-transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);-o-transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);transition:all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);-webkit-transform:perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);-moz-transform:perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);-ms-transform:perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);-o-transform:perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);transform:perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);backface-visibility:hidden}.wrap-card.active.svelte-lvlf1o .card.svelte-lvlf1o{-webkit-transform:perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);-moz-transform:perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);-ms-transform:perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);-o-transform:perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);transform:perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg)}.wrap-card.active.svelte-lvlf1o .card-back.svelte-lvlf1o{-webkit-transform:perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);-moz-transform:perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);-ms-transform:perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);-o-transform:perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);transform:perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1)}.card-number.svelte-lvlf1o{display:flex;max-width:100%;width:100%;height:24px;color:#ffffff;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;padding:0 20px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin-bottom:20px;font-size:16px;overflow:hidden}.card-holders.svelte-lvlf1o{display:inline-block;width:255px;color:#ffffff;font-weight:bold;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-size:16px;margin-right:50px}.card-month-wrap.svelte-lvlf1o{display:inline-block;width:38px;height:25px;color:#ffffff;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;padding:0 5px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-size:16px;text-align:center;overflow:hidden;position:relative}.card-month.svelte-lvlf1o{transition:transform 0.3s;will-change:transform;position:absolute;left:0;bottom:0;width:100%;height:100%}.slash.svelte-lvlf1o{color:#ffffff;font-size:16px}.card-year-wrap.svelte-lvlf1o{display:inline-block;width:38px;height:25px;overflow:hidden;color:#ffffff;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;padding:0 5px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-size:16px;text-align:center;position:relative}.card-year.svelte-lvlf1o{transition:transform 0.3s;will-change:transform;position:absolute;left:0;bottom:0;width:100%;height:100%}.digit-item.svelte-lvlf1o{-webkit-transition:all 1s;-moz-transition:all 1s;-ms-transition:all 1s;-o-transition:all 1s;transition:all 1s}.digit-item.active.svelte-lvlf1o{}.input-field.svelte-lvlf1o{width:450px;margin:0 auto}.input-field.svelte-lvlf1o input.svelte-lvlf1o:first-child,.input-field.svelte-lvlf1o input.svelte-lvlf1o:nth-child(2){width:100%}.card-number.svelte-lvlf1o .num.svelte-lvlf1o{width:18px;height:20px;overflow:hidden;margin-top:2px;margin-bottom:5px;text-align:center;line-height:20px;-webkit-transition:all 0.2s;-moz-transition:all 0.2s;-ms-transition:all 0.2s;-o-transition:all 0.2s;transition:all 0.2s;font-family:'Bebas Neue';font-size:26px}.card-number.svelte-lvlf1o .num.active.svelte-lvlf1o{-webkit-transform:translate(0, -25px);-moz-transform:translate(0, -25px);-ms-transform:translate(0, -25px);-o-transform:translate(0, -25px);transform:translate(0, -25px)}.card-number.svelte-lvlf1o .digit-item:nth-child(6) .num.active.svelte-lvlf1o,.card-number.svelte-lvlf1o .digit-item:nth-child(7) .num.active.svelte-lvlf1o,.card-number.svelte-lvlf1o .digit-item:nth-child(8) .num.active.svelte-lvlf1o,.card-number.svelte-lvlf1o .digit-item:nth-child(9) .num.active.svelte-lvlf1o,.card-number.svelte-lvlf1o .digit-item:nth-child(11) .num.active.svelte-lvlf1o,.card-number.svelte-lvlf1o .digit-item:nth-child(12) .num.active.svelte-lvlf1o,.card-number.svelte-lvlf1o .digit-item:nth-child(13) .num.active.svelte-lvlf1o,.card-number.svelte-lvlf1o .digit-item:nth-child(14) .num.active.svelte-lvlf1o{line-height:25px}.card-number.svelte-lvlf1o .num.not-active.svelte-lvlf1o{-webkit-transform:translate(0, -25px);-moz-transform:translate(0, -25px);-ms-transform:translate(0, -25px);-o-transform:translate(0, -25px);transform:translate(0, -25px)}.card-holders.svelte-lvlf1o{display:flex;height:24px;overflow:hidden;padding-left:5px;flex-wrap:wrap}.card-holders.svelte-lvlf1o .num.svelte-lvlf1o{width:12px;height:20px;overflow:hidden;margin-top:2px;margin-bottom:5px;text-align:center;font-size:11px;line-height:20px;-webkit-transition:all 0.5s;-moz-transition:all 0.5s;-ms-transition:all 0.5s;-o-transition:all 0.5s;transition:all 0.5s;-webkit-transform:translate(15px, -25px) rotate(90deg);-moz-transform:translate(15px, -25px) rotate(90deg);-ms-transform:translate(15px, -25px) rotate(90deg);-o-transform:translate(15px, -25px) rotate(90deg);transform:translate(15px, -25px) rotate(90deg);text-transform:uppercase;font-weight:normal;font-family:'Bebas Neue';font-size:20px}.card-holders.svelte-lvlf1o .num.active.svelte-lvlf1o{-webkit-transform:translate(0, -25px) rotate(0deg);-moz-transform:translate(0, -25px) rotate(0deg);-ms-transform:translate(0, -25px) rotate(0deg);-o-transform:translate(0, -25px) rotate(0deg);transform:translate(0, -25px) rotate(0deg)}.card-holders.svelte-lvlf1o .num.not-active.svelte-lvlf1o{-webkit-transform:translate(0, -25px) rotate(0deg);-moz-transform:translate(0, -25px) rotate(0deg);-ms-transform:translate(0, -25px) rotate(0deg);-o-transform:translate(0, -25px) rotate(0deg);transform:translate(0, -25px) rotate(0deg)}.placeholder.svelte-lvlf1o{width:100%;max-width:100%;font-family:'Bebas Neue';font-size:20px;line-height:25px;letter-spacing:4.4pt;text-indent:5px;font-weight:normal}.placeholder.active.svelte-lvlf1o{width:100%;max-width:100%;-webkit-transition:all 0.2s;-moz-transition:all 0.2s;-ms-transition:all 0.2s;-o-transition:all 0.2s;transition:all 0.2s}.placeholder.not-active.svelte-lvlf1o{margin-top:-25px}#cardcode.svelte-lvlf1o{height:50px;padding:5px 15px;border:1px solid #ced6e0;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;margin-bottom:20px;box-sizing:border-box}#cardcode2.svelte-lvlf1o{height:50px;padding:5px 15px;border:1px solid #ced6e0;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;margin-bottom:20px;box-sizing:border-box}#cardcode3.svelte-lvlf1o{height:50px;padding:5px 15px;border:1px solid #ced6e0;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;margin-bottom:20px;box-sizing:border-box}#cardcode4.svelte-lvlf1o{height:50px;padding:5px 15px;border:1px solid #ced6e0;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;margin-bottom:20px;box-sizing:border-box}#cardcode5.svelte-lvlf1o{height:50px;padding:5px 15px;border:1px solid #ced6e0;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;margin-bottom:20px;box-sizing:border-box}.card-item-band.svelte-lvlf1o{background:rgba(0, 0, 19, 0.8);width:100%;height:50px;margin-top:30px;position:absolute;z-index:2;top:0;left:0}.card-item-cvv.svelte-lvlf1o{width:300px;height:45px;background:#fff;margin-bottom:30px;text-align:right;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;color:#1a3b5d;font-size:18px;border-radius:4px;box-shadow:0px 10px 20px -7px rgba(32, 56, 117, 0.35);-webkit-transform:scale(-1, 1);-moz-transform:scale(-1, 1);-ms-transform:scale(-1, 1);-o-transform:scale(-1, 1);transform:scale(-1, 1);position:absolute;right:30px;top:100px;left:auto}.star.svelte-lvlf1o{-webkit-transform:translate(0, 3px);-moz-transform:translate(0, 3px);-ms-transform:translate(0, 3px);-o-transform:translate(0, 3px);transform:translate(0, 3px)}.three.svelte-lvlf1o{width:100%;max-width:calc(33.33% - 3px)}.cvv-label.svelte-lvlf1o{position:absolute;top:105px;left:45px;color:#ffffff;font-size:23px;-webkit-transform:scale(-1, 1);-moz-transform:scale(-1, 1);-ms-transform:scale(-1, 1);-o-transform:scale(-1, 1);transform:scale(-1, 1);text-shadow:0px 4px 4px #000000;letter-spacing:3pt}button.svelte-lvlf1o{width:100%;height:55px;background:#2364d2;border:none;border-radius:5px;font-size:22px;font-weight:500;font-family:\"Source Sans Pro\", sans-serif;box-shadow:3px 10px 20px 0px rgba(35, 100, 210, 0.3);color:#fff;margin-top:20px;cursor:pointer}.month.svelte-lvlf1o,.year.svelte-lvlf1o{-webkit-transition:all 0.3s;-moz-transition:all 0.3s;-ms-transition:all 0.3s;-o-transition:all 0.3s;transition:all 0.3s !important}.focus.svelte-lvlf1o{position:absolute;top:0;left:0;width:450px;height:270px;z-index:3;border:2px solid #ffffff;-webkit-border-radius:14px;-moz-border-radius:14px;border-radius:14px;background-color:rgba(0,0,0,0.3);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-transition:all 0.5s;-moz-transition:all 0.5s;-ms-transition:all 0.5s;-o-transition:all 0.5s;transition:all 0.5s;opacity:0}.focus.numberFocus.svelte-lvlf1o{top:161px;left:41px;width:367px;height:40px;z-index:3;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;opacity:1}.focus.nameFocus.svelte-lvlf1o{top:206px;left:29px;width:257px;height:40px;z-index:3;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;opacity:1}.focus.dateFocus.svelte-lvlf1o{top:206px;left:330px;width:95px;height:40px;z-index:3;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;opacity:1}.card-fake-number.svelte-lvlf1o{position:absolute;top:161px;left:41px;width:367px;height:40px;z-index:3;cursor:pointer;z-index:4}.card-fake-holder.svelte-lvlf1o{position:absolute;top:206px;left:29px;width:257px;height:40px;cursor:pointer;z-index:4}.card-fake-month.svelte-lvlf1o{position:absolute;top:206px;left:330px;width:40px;height:40px;cursor:pointer;z-index:4}.card-fake-year.svelte-lvlf1o{position:absolute;top:206px;left:375px;width:40px;height:40px;cursor:pointer;z-index:4}",
	map: "{\"version\":3,\"file\":\"Card.svelte\",\"sources\":[\"Card.svelte\"],\"sourcesContent\":[\"<script >\\r\\n    import { onMount } from 'svelte';\\r\\n    let res = [],\\r\\n        nameString = [],\\r\\n        cvvString = [],\\r\\n        on = false,\\r\\n        numberFocus = false,\\r\\n        nameFocus = false,\\r\\n        dateFocus = false,\\r\\n        monthMass = [\\\"MM\\\"],\\r\\n        yearMass = [\\\"ГГ\\\"],\\r\\n        thisNumber,\\r\\n        thisHolder,\\r\\n        thisCvv,\\r\\n        thisMonth,\\r\\n        thisYear,\\r\\n        fakeMassNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],\\r\\n        fakeMassName = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],\\r\\n        massMonth = [\\\"01\\\", \\\"02\\\", \\\"03\\\", \\\"04\\\", \\\"05\\\", \\\"06\\\", \\\"07\\\", \\\"08\\\", \\\"09\\\", \\\"10\\\", \\\"11\\\", \\\"12\\\"],\\r\\n        massYear = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],\\r\\n        numberr;\\r\\n\\r\\n    const formatCardCode = () => {\\r\\n       let cardCode = thisNumber.value.replace(/[^\\\\d]/g, '').substring(0,16);\\r\\n       cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';\\r\\n       thisNumber.value = cardCode;\\r\\n       numberr.value = thisNumber.value.split(\\\" \\\").join(\\\"\\\");\\r\\n       let mass = cardcode.value.split('');\\r\\n       res = mass.map((item, index, array) => {\\r\\n           if(index > 3 && index < 14){\\r\\n               if (index == 4 || index == 9 || index == 14){\\r\\n                   return item;\\r\\n               }\\r\\n               return item = \\\"*\\\";\\r\\n           }\\r\\n           return item;\\r\\n       });\\r\\n   }\\r\\n\\r\\n   const inputName = () => nameString = thisHolder.value.split(\\\"\\\");\\r\\n\\r\\n   const cvv = () => cvvString = thisCvv.value.split(\\\"\\\");\\r\\n\\r\\n   const changeMonth = ({ target: { value }}) => monthMass = [ ...monthMass, value ];\\r\\n\\r\\n   $: offsetMonth = monthMass && monthMass.length > 1 ? offsetMonth - 24 : 0;\\r\\n\\r\\n   const changeYear = ({ target: { value }}) => yearMass = [ ...yearMass, value ];\\r\\n\\r\\n   $: offsetYear = yearMass && yearMass.length > 1 ? offsetYear - 24 : 0;\\r\\n\\r\\n   const active = () => on = true;\\r\\n   const deactive = () => {on = false; numberFocus = false; nameFocus = false; dateFocus = false};\\r\\n   const focusNumber = () => numberFocus = true;\\r\\n   const focusName = () => nameFocus = true;\\r\\n   const focusDate = () => dateFocus = true;\\r\\n\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n    .wrap-card {\\r\\n        position: relative;\\r\\n    }\\r\\n    .card {\\r\\n        display: flex;\\r\\n        width: 450px;\\r\\n        height: 270px;\\r\\n        background-image:  url(/mir-details-01.png), url(/color.jpg);\\r\\n        background-position: left 30px top 30px, center center;\\r\\n        background-repeat: no-repeat, no-repeat;\\r\\n        -webkit-background-size: 15%, 100%;\\r\\n        background-size: 15%, 100%;\\r\\n        -webkit-border-radius: 20px;-moz-border-radius: 20px;border-radius: 20px;\\r\\n        padding: 170px 30px 30px;\\r\\n        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;\\r\\n        font-size: 0;\\r\\n        flex-wrap: wrap;\\r\\n        -webkit-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        -moz-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        -ms-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        -o-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.55);\\r\\n        transform: perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg);\\r\\n        transform-style: preserve-3d;\\r\\n        backface-visibility: hidden;\\r\\n        margin: 0 auto 30px;\\r\\n        position: relative;\\r\\n        z-index: 5;\\r\\n    }\\r\\n    .wrap-card-back {\\r\\n        width: 100%;\\r\\n        position: absolute;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n    }\\r\\n    .card-back {\\r\\n        display: flex;\\r\\n        width: 450px;\\r\\n        height: 270px;\\r\\n        background-image:  url(/color.jpg);\\r\\n        background-position: center center;\\r\\n        background-repeat: no-repeat, no-repeat;\\r\\n        -webkit-background-size: 100%;\\r\\n        background-size: 100%;\\r\\n        -webkit-border-radius: 20px;-moz-border-radius: 20px;border-radius: 20px;\\r\\n        padding: 170px 30px 30px;\\r\\n        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;\\r\\n        -webkit-box-shadow: 0 0 0 0 #000;-moz-box-shadow: 0 0 0 0 #000;box-shadow: 0 0 0 0 #000;\\r\\n        font-size: 0;\\r\\n        flex-wrap: wrap;\\r\\n        margin: 0 auto 30px;\\r\\n        transform-style: preserve-3d;\\r\\n        box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.55);\\r\\n        -webkit-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        -moz-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        -ms-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        -o-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);\\r\\n        -webkit-transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        -moz-transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        -ms-transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        -o-transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        backface-visibility: hidden;\\r\\n    }\\r\\n    .wrap-card.active .card {\\r\\n        -webkit-transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);\\r\\n        -moz-transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);\\r\\n        -ms-transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);\\r\\n        -o-transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);\\r\\n        transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);\\r\\n    }\\r\\n    .wrap-card.active .card-back {\\r\\n        -webkit-transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        -moz-transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        -ms-transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        -o-transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n        transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);\\r\\n    }\\r\\n    .card-number {\\r\\n        display: flex;\\r\\n        max-width: 100%;\\r\\n        width: 100%;\\r\\n        height: 24px;\\r\\n        color: #ffffff;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        padding: 0 20px;\\r\\n        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;\\r\\n        margin-bottom: 20px;\\r\\n        font-size: 16px;\\r\\n        overflow: hidden;\\r\\n    }\\r\\n    .card-holders {\\r\\n        display: inline-block;\\r\\n        width: 255px;\\r\\n        color: #ffffff;\\r\\n        font-weight: bold;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        padding: 0;\\r\\n        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;\\r\\n        font-size: 16px;\\r\\n        margin-right: 50px;\\r\\n    }\\r\\n    .card-month-wrap {\\r\\n        display: inline-block;\\r\\n        width: 38px;\\r\\n        height: 25px;\\r\\n        color: #ffffff;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        padding: 0 5px;\\r\\n        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;\\r\\n        font-size: 16px;\\r\\n        text-align: center;\\r\\n        overflow: hidden;\\r\\n        position: relative;\\r\\n    }\\r\\n\\r\\n    .card-month {\\r\\n        transition: transform 0.3s;\\r\\n        will-change: transform;\\r\\n        position: absolute;\\r\\n        left: 0;\\r\\n        bottom: 0;\\r\\n        width: 100%;\\r\\n        height: 100%;\\r\\n    }\\r\\n    .slash {\\r\\n        color: #ffffff;\\r\\n        font-size: 16px;\\r\\n    }\\r\\n    .card-year-wrap {\\r\\n        display: inline-block;\\r\\n        width: 38px;\\r\\n        height: 25px;\\r\\n        overflow: hidden;\\r\\n        color: #ffffff;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        padding: 0 5px;\\r\\n        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;\\r\\n        font-size: 16px;\\r\\n        text-align: center;\\r\\n        position: relative;\\r\\n    }\\r\\n    .card-year {\\r\\n        transition: transform 0.3s;\\r\\n        will-change: transform;\\r\\n        position: absolute;\\r\\n        left: 0;\\r\\n        bottom: 0;\\r\\n        width: 100%;\\r\\n        height: 100%;\\r\\n    }\\r\\n    .digit-item {\\r\\n        -webkit-transition: all 1s;-moz-transition: all 1s;-ms-transition: all 1s;-o-transition: all 1s;transition: all 1s;\\r\\n    }\\r\\n    .digit-item.active {}\\r\\n    .input-field {\\r\\n        width: 450px;\\r\\n        margin: 0 auto;\\r\\n    }\\r\\n    .input-field input:first-child,\\r\\n    .input-field input:nth-child(2) {\\r\\n        width: 100%;\\r\\n    }\\r\\n    .card-number .num {\\r\\n        width: 18px;\\r\\n        height: 20px;\\r\\n        overflow: hidden;\\r\\n        margin-top: 2px;\\r\\n        margin-bottom: 5px;\\r\\n        text-align: center;\\r\\n        line-height: 20px;\\r\\n        -webkit-transition: all 0.2s;-moz-transition: all 0.2s;-ms-transition: all 0.2s;-o-transition: all 0.2s;transition: all 0.2s;\\r\\n        font-family: 'Bebas Neue';\\r\\n        font-size: 26px;\\r\\n    }\\r\\n    .card-number .num.active {\\r\\n        -webkit-transform: translate(0, -25px);-moz-transform: translate(0, -25px);-ms-transform: translate(0, -25px);-o-transform: translate(0, -25px);transform: translate(0, -25px);\\r\\n    }\\r\\n    .card-number .digit-item:nth-child(6) .num.active,\\r\\n    .card-number .digit-item:nth-child(7) .num.active,\\r\\n    .card-number .digit-item:nth-child(8) .num.active,\\r\\n    .card-number .digit-item:nth-child(9) .num.active,\\r\\n    .card-number .digit-item:nth-child(11) .num.active,\\r\\n    .card-number .digit-item:nth-child(12) .num.active,\\r\\n    .card-number .digit-item:nth-child(13) .num.active,\\r\\n    .card-number .digit-item:nth-child(14) .num.active {\\r\\n        line-height: 25px;\\r\\n    }\\r\\n    .card-number .num.not-active {\\r\\n        -webkit-transform: translate(0, -25px);\\r\\n        -moz-transform: translate(0, -25px);\\r\\n        -ms-transform: translate(0, -25px);\\r\\n        -o-transform: translate(0, -25px);\\r\\n        transform: translate(0, -25px);\\r\\n    }\\r\\n    .card-holders {\\r\\n        display: flex;\\r\\n        height: 24px;\\r\\n        overflow: hidden;\\r\\n        padding-left: 5px;\\r\\n        flex-wrap: wrap;\\r\\n    }\\r\\n    .card-holders .num {\\r\\n        width: 12px;\\r\\n        height: 20px;\\r\\n        overflow: hidden;\\r\\n        margin-top: 2px;\\r\\n        margin-bottom: 5px;\\r\\n        text-align: center;\\r\\n        font-size: 11px;\\r\\n        line-height: 20px;\\r\\n        -webkit-transition: all 0.5s;\\r\\n        -moz-transition: all 0.5s;\\r\\n        -ms-transition: all 0.5s;\\r\\n        -o-transition: all 0.5s;\\r\\n        transition: all 0.5s;\\r\\n        -webkit-transform: translate(15px, -25px) rotate(90deg);\\r\\n        -moz-transform: translate(15px, -25px) rotate(90deg);\\r\\n        -ms-transform: translate(15px, -25px) rotate(90deg);\\r\\n        -o-transform: translate(15px, -25px) rotate(90deg);\\r\\n        transform: translate(15px, -25px) rotate(90deg);\\r\\n        text-transform: uppercase;\\r\\n        font-weight: normal;\\r\\n        font-family: 'Bebas Neue';\\r\\n        font-size: 20px;\\r\\n    }\\r\\n    .card-holders .num.active {\\r\\n        -webkit-transform: translate(0, -25px) rotate(0deg);\\r\\n        -moz-transform: translate(0, -25px) rotate(0deg);\\r\\n        -ms-transform: translate(0, -25px) rotate(0deg);\\r\\n        -o-transform: translate(0, -25px) rotate(0deg);\\r\\n        transform: translate(0, -25px) rotate(0deg);\\r\\n    }\\r\\n    .card-holders .num.not-active {\\r\\n        -webkit-transform: translate(0, -25px) rotate(0deg);\\r\\n        -moz-transform: translate(0, -25px) rotate(0deg);\\r\\n        -ms-transform: translate(0, -25px) rotate(0deg);\\r\\n        -o-transform: translate(0, -25px) rotate(0deg);\\r\\n        transform: translate(0, -25px) rotate(0deg);\\r\\n    }\\r\\n    .placeholder {\\r\\n        width: 100%;\\r\\n        max-width: 100%;\\r\\n        font-family: 'Bebas Neue';\\r\\n        font-size: 20px;\\r\\n        line-height: 25px;\\r\\n        letter-spacing: 4.4pt;\\r\\n        text-indent: 5px;\\r\\n        font-weight: normal;\\r\\n    }\\r\\n    .placeholder.active {\\r\\n        width: 100%;\\r\\n        max-width: 100%;\\r\\n        -webkit-transition: all 0.2s;-moz-transition: all 0.2s;-ms-transition: all 0.2s;-o-transition: all 0.2s;transition: all 0.2s;\\r\\n    }\\r\\n    .placeholder.not-active {\\r\\n        margin-top: -25px;\\r\\n    }\\r\\n    #cardcode {\\r\\n        height: 50px;\\r\\n        padding: 5px 15px;\\r\\n        border: 1px solid #ced6e0;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        margin-bottom: 20px;\\r\\n        box-sizing: border-box;\\r\\n    }\\r\\n    #cardcode2 {\\r\\n        height: 50px;\\r\\n        padding: 5px 15px;\\r\\n        border: 1px solid #ced6e0;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        margin-bottom: 20px;\\r\\n        box-sizing: border-box;\\r\\n    }\\r\\n    #cardcode3 {\\r\\n        height: 50px;\\r\\n        padding: 5px 15px;\\r\\n        border: 1px solid #ced6e0;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        margin-bottom: 20px;\\r\\n        box-sizing: border-box;\\r\\n    }\\r\\n    #cardcode4 {\\r\\n        height: 50px;\\r\\n        padding: 5px 15px;\\r\\n        border: 1px solid #ced6e0;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        margin-bottom: 20px;\\r\\n        box-sizing: border-box;\\r\\n    }\\r\\n    #cardcode5 {\\r\\n        height: 50px;\\r\\n        padding: 5px 15px;\\r\\n        border: 1px solid #ced6e0;\\r\\n        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;\\r\\n        margin-bottom: 20px;\\r\\n        box-sizing: border-box;\\r\\n    }\\r\\n    .card-item-band {\\r\\n        background: rgba(0, 0, 19, 0.8);\\r\\n        width: 100%;\\r\\n        height: 50px;\\r\\n        margin-top: 30px;\\r\\n        position: absolute;\\r\\n        z-index: 2;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n    }\\r\\n    .card-item-cvv {\\r\\n        width: 300px;\\r\\n        height: 45px;\\r\\n        background: #fff;\\r\\n        margin-bottom: 30px;\\r\\n        text-align: right;\\r\\n        display: flex;\\r\\n        align-items: center;\\r\\n        justify-content: flex-end;\\r\\n        padding-right: 10px;\\r\\n        color: #1a3b5d;\\r\\n        font-size: 18px;\\r\\n        border-radius: 4px;\\r\\n        box-shadow: 0px 10px 20px -7px rgba(32, 56, 117, 0.35);\\r\\n        -webkit-transform: scale(-1, 1);\\r\\n        -moz-transform: scale(-1, 1);\\r\\n        -ms-transform: scale(-1, 1);\\r\\n        -o-transform: scale(-1, 1);\\r\\n        transform: scale(-1, 1);\\r\\n        position: absolute;\\r\\n        right: 30px;\\r\\n        top: 100px;\\r\\n        left: auto;\\r\\n    }\\r\\n    .star {\\r\\n        -webkit-transform: translate(0, 3px);\\r\\n        -moz-transform: translate(0, 3px);\\r\\n        -ms-transform: translate(0, 3px);\\r\\n        -o-transform: translate(0, 3px);\\r\\n        transform: translate(0, 3px);\\r\\n    }\\r\\n    .three {\\r\\n        width: 100%;\\r\\n        max-width: calc(33.33% - 3px);\\r\\n    }\\r\\n    .cvv-label {\\r\\n        position: absolute;\\r\\n        top: 105px;\\r\\n        left: 45px;\\r\\n        color: #ffffff;\\r\\n        font-size: 23px;\\r\\n        -webkit-transform: scale(-1, 1);\\r\\n        -moz-transform: scale(-1, 1);\\r\\n        -ms-transform: scale(-1, 1);\\r\\n        -o-transform: scale(-1, 1);\\r\\n        transform: scale(-1, 1);\\r\\n        text-shadow: 0px 4px 4px #000000;\\r\\n        letter-spacing: 3pt;\\r\\n    }\\r\\n    button {\\r\\n        width: 100%;\\r\\n        height: 55px;\\r\\n        background: #2364d2;\\r\\n        border: none;\\r\\n        border-radius: 5px;\\r\\n        font-size: 22px;\\r\\n        font-weight: 500;\\r\\n        font-family: \\\"Source Sans Pro\\\", sans-serif;\\r\\n        box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.3);\\r\\n        color: #fff;\\r\\n        margin-top: 20px;\\r\\n        cursor: pointer;\\r\\n    }\\r\\n    .month,\\r\\n    .year {\\r\\n        -webkit-transition: all 0.3s;\\r\\n        -moz-transition: all 0.3s;\\r\\n        -ms-transition: all 0.3s;\\r\\n        -o-transition: all 0.3s;\\r\\n        transition: all 0.3s !important;\\r\\n    }\\r\\n\\r\\n    .focus {\\r\\n        position: absolute;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        width: 450px;\\r\\n        height: 270px;\\r\\n        z-index: 3;\\r\\n        border: 2px solid #ffffff;\\r\\n        -webkit-border-radius: 14px;-moz-border-radius: 14px;border-radius: 14px;\\r\\n        background-color: rgba(0,0,0,0.3);\\r\\n        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;\\r\\n        -webkit-transition: all 0.5s;\\r\\n        -moz-transition: all 0.5s;\\r\\n        -ms-transition: all 0.5s;\\r\\n        -o-transition: all 0.5s;\\r\\n        transition: all 0.5s;\\r\\n        opacity: 0;\\r\\n    }\\r\\n    .focus.numberFocus {\\r\\n        top: 161px;\\r\\n        left: 41px;\\r\\n        width: 367px;\\r\\n        height: 40px;\\r\\n        z-index: 3;\\r\\n        -webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;\\r\\n        opacity: 1;\\r\\n    }\\r\\n    .focus.nameFocus {\\r\\n        top: 206px;\\r\\n        left: 29px;\\r\\n        width: 257px;\\r\\n        height: 40px;\\r\\n        z-index: 3;\\r\\n        -webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;\\r\\n        opacity: 1;\\r\\n    }\\r\\n    .focus.dateFocus {\\r\\n        top: 206px;\\r\\n        left: 330px;\\r\\n        width: 95px;\\r\\n        height: 40px;\\r\\n        z-index: 3;\\r\\n        -webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;\\r\\n        opacity: 1;\\r\\n    }\\r\\n    .card-fake-number {\\r\\n        position: absolute;\\r\\n        top: 161px;\\r\\n        left: 41px;\\r\\n        width: 367px;\\r\\n        height: 40px;\\r\\n        z-index: 3;\\r\\n        cursor: pointer;\\r\\n        z-index: 4;\\r\\n    }\\r\\n    .card-fake-holder {\\r\\n        position: absolute;\\r\\n        top: 206px;\\r\\n        left: 29px;\\r\\n        width: 257px;\\r\\n        height: 40px;\\r\\n        cursor: pointer;\\r\\n        z-index: 4;\\r\\n    }\\r\\n    .card-fake-month {\\r\\n        position: absolute;\\r\\n        top: 206px;\\r\\n        left: 330px;\\r\\n        width: 40px;\\r\\n        height: 40px;\\r\\n        cursor: pointer;\\r\\n        z-index: 4;\\r\\n    }\\r\\n    .card-fake-year {\\r\\n        position: absolute;\\r\\n        top: 206px;\\r\\n        left: 375px;\\r\\n        width: 40px;\\r\\n        height: 40px;\\r\\n        cursor: pointer;\\r\\n        z-index: 4;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\\"wrap-card {on ? 'active' : ''}\\\">\\r\\n    <div class=\\\"card\\\">\\r\\n        <div class=\\\"focus\\\" class:numberFocus class:nameFocus class:dateFocus></div>\\r\\n        <div class=\\\"card-number\\\">\\r\\n            {#each fakeMassNumber as string, i}\\r\\n                {#if i == 4 || i == 9 || i == 14}\\r\\n                    <div class=\\\"digit-item\\\">\\r\\n                        <div class=\\\"num {res.length > i ? 'not-active' : ''}\\\"></div>\\r\\n                    </div>\\r\\n                {:else}\\r\\n                    <div class=\\\"digit-item\\\">\\r\\n                        <div class=\\\"num {res.length > i ? 'not-active' : ''}\\\">#</div>\\r\\n                        <div class=\\\"num {res.length > i ? 'active' : ''}\\\">{res[i] || \\\"\\\"}</div>\\r\\n                    </div>\\r\\n                {/if}\\r\\n            {/each}\\r\\n        </div>\\r\\n        <div class=\\\"card-holders\\\">\\r\\n            <div class=\\\"placeholder {nameString.length == 0 ? 'active' : 'not-active'}\\\">\\r\\n                IVAN IVANOV\\r\\n            </div>\\r\\n            {#each fakeMassName as string, i}\\r\\n                <div class=\\\"digit-item\\\">\\r\\n                    <div class=\\\"num {nameString.length < i ? 'not-active' : ''}\\\"> </div>\\r\\n                    <div class=\\\"num {nameString.length > i ? 'active' : ''}\\\">{nameString[i] || \\\"\\\"}</div>\\r\\n                </div>\\r\\n            {/each}\\r\\n        </div>\\r\\n        <div class=\\\"card-month-wrap\\\">\\r\\n            <div class=\\\"card-month\\\" style=\\\"transform: translateY({offsetMonth}px)\\\">\\r\\n                {#each monthMass as item}\\r\\n                    <div class=\\\"month\\\">\\r\\n                        {item}\\r\\n                    </div>\\r\\n                {/each}\\r\\n            </div>\\r\\n        </div>\\r\\n        <div class=\\\"slash\\\">/</div>\\r\\n        <div class=\\\"card-year-wrap\\\">\\r\\n            <div class=\\\"card-year\\\" style=\\\"transform: translateY({offsetYear}px)\\\">\\r\\n                {#each yearMass as item}\\r\\n                    <div class=\\\"year\\\">\\r\\n                        {item.substr(-2)}\\r\\n                    </div>\\r\\n                {/each}\\r\\n            </div>\\r\\n        </div>\\r\\n        <div class=\\\"card-fake-number\\\" on:mousedown=\\\"{(e) => {e.preventDefault();thisNumber.focus();}}\\\"></div>\\r\\n        <div class=\\\"card-fake-holder\\\" on:mousedown=\\\"{(e) => {e.preventDefault();thisHolder.focus();}}\\\"></div>\\r\\n        <div class=\\\"card-fake-month\\\" on:mousedown=\\\"{(e) => {e.preventDefault();thisMonth.focus();}}\\\"></div>\\r\\n        <div class=\\\"card-fake-year\\\" on:mousedown=\\\"{(e) => {e.preventDefault();thisYear.focus();}}\\\"></div>\\r\\n    </div>\\r\\n    <div class=\\\"wrap-card-back\\\">\\r\\n        <div class=\\\"card-back\\\">\\r\\n            <div class=\\\"card-item-band\\\"></div>\\r\\n            <div class=\\\"card-item-cvv\\\">\\r\\n                {#each cvvString as cvvDigit}\\r\\n                    <div class=\\\"star\\\">*</div>\\r\\n                {/each}\\r\\n            </div>\\r\\n            <div class=\\\"cvv-label\\\">CVV</div>\\r\\n        </div>\\r\\n    </div>\\r\\n</div>\\r\\n\\r\\n<form name=\\\"myform\\\" class=\\\"input-field\\\">\\r\\n    <input type=\\\"text\\\" class=\\\"input-number\\\" id=\\\"cardcode\\\" placeholder=\\\"Номер карты\\\" on:focus={focusNumber}\\r\\n    on:blur={deactive} bind:this={thisNumber} on:input={formatCardCode}>\\r\\n    <input type=\\\"text\\\" class=\\\"input-name\\\" id=\\\"cardcode2\\\" placeholder=\\\"Имя Фамилия\\\" on:focus={focusName}\\r\\n    on:blur={deactive} bind:this={thisHolder} on:input={inputName}>\\r\\n    <select id=\\\"cardcode3\\\" class=\\\"three\\\" on:focus={focusDate} on:blur={deactive} bind:this={thisMonth} on:change={changeMonth}>\\r\\n        <option selected disabled>Месяц</option>\\r\\n        {#each massMonth as month, i}\\r\\n            <option>{month}</option>\\r\\n        {/each}\\r\\n    </select>\\r\\n    <select id=\\\"cardcode4\\\" class=\\\"three\\\" on:focus={focusDate} on:blur={deactive} bind:this={thisYear}\\r\\n    on:change={changeYear}>\\r\\n        <option selected disabled>Год</option>\\r\\n        {#each massYear as year}\\r\\n            <option>{year}</option>\\r\\n        {/each}\\r\\n    </select>\\r\\n    <input type=\\\"text\\\" id=\\\"cardcode5\\\" placeholder=\\\"CVV\\\" on:focus={active} on:blur={deactive} maxlength=\\\"4\\\"\\r\\n    class=\\\"three\\\" on:input={cvv} bind:this={thisCvv}>\\r\\n    <input type=hidden name=number value=\\\"\\\" bind:this={numberr}>\\r\\n    <button type=\\\"submit\\\">Отправить</button>\\r\\n</form>\"],\"names\":[],\"mappings\":\"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\"}"
};

const Card = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let res = [],
        nameString = [],
        cvvString = [],
        on = false,
        numberFocus = false,
        nameFocus = false,
        dateFocus = false,
        monthMass = ["MM"],
        yearMass = ["ГГ"],
        thisNumber,
        thisHolder,
        thisCvv,
        thisMonth,
        thisYear,
        fakeMassNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        fakeMassName = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        massMonth = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
        massYear = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
        numberr;

	$$result.css.add(css);

	let offsetMonth; offsetMonth = monthMass && monthMass.length > 1 ? offsetMonth - 24 : 0;
	let offsetYear; offsetYear = yearMass && yearMass.length > 1 ? offsetYear - 24 : 0;

	return `<div class="wrap-card ${escape(on ? 'active' : '')} svelte-lvlf1o">
	    <div class="card svelte-lvlf1o">
	        <div class="${[`focus svelte-lvlf1o`, numberFocus ? "numberFocus" : "", nameFocus ? "nameFocus" : "", dateFocus ? "dateFocus" : ""].join(' ').trim() }"></div>
	        <div class="card-number svelte-lvlf1o">
	            ${each(fakeMassNumber, (string, i) => `${ i == 4 || i == 9 || i == 14 ? `<div class="digit-item svelte-lvlf1o">
	                        <div class="num ${escape(res.length > i ? 'not-active' : '')} svelte-lvlf1o"></div>
	                    </div>` : `<div class="digit-item svelte-lvlf1o">
	                        <div class="num ${escape(res.length > i ? 'not-active' : '')} svelte-lvlf1o">#</div>
	                        <div class="num ${escape(res.length > i ? 'active' : '')} svelte-lvlf1o">${escape(res[i] || "")}</div>
	                    </div>` }`)}
	        </div>
	        <div class="card-holders svelte-lvlf1o">
	            <div class="placeholder ${escape(nameString.length == 0 ? 'active' : 'not-active')} svelte-lvlf1o">
	                IVAN IVANOV
	            </div>
	            ${each(fakeMassName, (string, i) => `<div class="digit-item svelte-lvlf1o">
	                    <div class="num ${escape(nameString.length < i ? 'not-active' : '')} svelte-lvlf1o"> </div>
	                    <div class="num ${escape(nameString.length > i ? 'active' : '')} svelte-lvlf1o">${escape(nameString[i] || "")}</div>
	                </div>`)}
	        </div>
	        <div class="card-month-wrap svelte-lvlf1o">
	            <div class="card-month svelte-lvlf1o" style="transform: translateY(${escape(offsetMonth)}px)">
	                ${each(monthMass, (item) => `<div class="month svelte-lvlf1o">
	                        ${escape(item)}
	                    </div>`)}
	            </div>
	        </div>
	        <div class="slash svelte-lvlf1o">/</div>
	        <div class="card-year-wrap svelte-lvlf1o">
	            <div class="card-year svelte-lvlf1o" style="transform: translateY(${escape(offsetYear)}px)">
	                ${each(yearMass, (item) => `<div class="year svelte-lvlf1o">
	                        ${escape(item.substr(-2))}
	                    </div>`)}
	            </div>
	        </div>
	        <div class="card-fake-number svelte-lvlf1o"></div>
	        <div class="card-fake-holder svelte-lvlf1o"></div>
	        <div class="card-fake-month svelte-lvlf1o"></div>
	        <div class="card-fake-year svelte-lvlf1o"></div>
	    </div>
	    <div class="wrap-card-back svelte-lvlf1o">
	        <div class="card-back svelte-lvlf1o">
	            <div class="card-item-band svelte-lvlf1o"></div>
	            <div class="card-item-cvv svelte-lvlf1o">
	                ${each(cvvString, (cvvDigit) => `<div class="star svelte-lvlf1o">*</div>`)}
	            </div>
	            <div class="cvv-label svelte-lvlf1o">CVV</div>
	        </div>
	    </div>
	</div>

	<form name="myform" class="input-field svelte-lvlf1o">
	    <input type="text" class="input-number svelte-lvlf1o" id="cardcode" placeholder="Номер карты"${add_attribute("this", thisNumber, 1)}>
	    <input type="text" class="input-name svelte-lvlf1o" id="cardcode2" placeholder="Имя Фамилия"${add_attribute("this", thisHolder, 1)}>
	    <select id="cardcode3" class="three svelte-lvlf1o"${add_attribute("this", thisMonth, 1)}>
	        <option selected disabled value="Месяц">Месяц</option>
	        ${each(massMonth, (month, i) => `<option${add_attribute("value", month, 0)}>${escape(month)}</option>`)}
	    </select>
	    <select id="cardcode4" class="three svelte-lvlf1o"${add_attribute("this", thisYear, 1)}>
	        <option selected disabled value="Год">Год</option>
	        ${each(massYear, (year) => `<option${add_attribute("value", year, 0)}>${escape(year)}</option>`)}
	    </select>
	    <input type="text" id="cardcode5" placeholder="CVV" maxlength="4" class="three svelte-lvlf1o"${add_attribute("this", thisCvv, 1)}>
	    <input type="hidden" name="number" value="" class="svelte-lvlf1o"${add_attribute("this", numberr, 1)}>
	    <button type="submit" class="svelte-lvlf1o">Отправить</button>
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2Jsb2cvX3Bvc3RzLmpzIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9ibG9nL2luZGV4Lmpzb24uanMiLCIuLi8uLi8uLi9zcmMvcm91dGVzL2Jsb2cvW3NsdWddLmpzb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlL2ludGVybmFsL2luZGV4Lm1qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NhcmQuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9ibG9nL2luZGV4LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvYmxvZy9bc2x1Z10uc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9fbGF5b3V0LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvX2Vycm9yLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9pbnRlcm5hbC9tYW5pZmVzdC1zZXJ2ZXIubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zdG9yZS9pbmRleC5tanMiLCIuLi8uLi8uLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvaW50ZXJuYWwvc2hhcmVkLm1qcyIsIi4uLy4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9pbnRlcm5hbC9BcHAuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL3NlcnZlci5tanMiLCIuLi8uLi8uLi9zcmMvc2VydmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIE9yZGluYXJpbHksIHlvdSdkIGdlbmVyYXRlIHRoaXMgZGF0YSBmcm9tIG1hcmtkb3duIGZpbGVzIGluIHlvdXJcclxuLy8gcmVwbywgb3IgZmV0Y2ggdGhlbSBmcm9tIGEgZGF0YWJhc2Ugb2Ygc29tZSBraW5kLiBCdXQgaW4gb3JkZXIgdG9cclxuLy8gYXZvaWQgdW5uZWNlc3NhcnkgZGVwZW5kZW5jaWVzIGluIHRoZSBzdGFydGVyIHRlbXBsYXRlLCBhbmQgaW4gdGhlXHJcbi8vIHNlcnZpY2Ugb2Ygb2J2aW91c25lc3MsIHdlJ3JlIGp1c3QgZ29pbmcgdG8gbGVhdmUgaXQgaGVyZS5cclxuXHJcbi8vIFRoaXMgZmlsZSBpcyBjYWxsZWQgYF9wb3N0cy5qc2AgcmF0aGVyIHRoYW4gYHBvc3RzLmpzYCwgYmVjYXVzZVxyXG4vLyB3ZSBkb24ndCB3YW50IHRvIGNyZWF0ZSBhbiBgL2Jsb2cvcG9zdHNgIHJvdXRlIOKAlCB0aGUgbGVhZGluZ1xyXG4vLyB1bmRlcnNjb3JlIHRlbGxzIFNhcHBlciBub3QgdG8gZG8gdGhhdC5cclxuXHJcbmNvbnN0IHBvc3RzID0gW1xyXG5cdHtcclxuXHRcdHRpdGxlOiAnV2hhdCBpcyBTYXBwZXI/JyxcclxuXHRcdHNsdWc6ICd3aGF0LWlzLXNhcHBlcicsXHJcblx0XHRodG1sOiBgXHJcblx0XHRcdDxwPkZpcnN0LCB5b3UgaGF2ZSB0byBrbm93IHdoYXQgPGEgaHJlZj0naHR0cHM6Ly9zdmVsdGUuZGV2Jz5TdmVsdGU8L2E+IGlzLiBTdmVsdGUgaXMgYSBVSSBmcmFtZXdvcmsgd2l0aCBhIGJvbGQgbmV3IGlkZWE6IHJhdGhlciB0aGFuIHByb3ZpZGluZyBhIGxpYnJhcnkgdGhhdCB5b3Ugd3JpdGUgY29kZSB3aXRoIChsaWtlIFJlYWN0IG9yIFZ1ZSwgZm9yIGV4YW1wbGUpLCBpdCdzIGEgY29tcGlsZXIgdGhhdCB0dXJucyB5b3VyIGNvbXBvbmVudHMgaW50byBoaWdobHkgb3B0aW1pemVkIHZhbmlsbGEgSmF2YVNjcmlwdC4gSWYgeW91IGhhdmVuJ3QgYWxyZWFkeSByZWFkIHRoZSA8YSBocmVmPSdodHRwczovL3N2ZWx0ZS5kZXYvYmxvZy9mcmFtZXdvcmtzLXdpdGhvdXQtdGhlLWZyYW1ld29yayc+aW50cm9kdWN0b3J5IGJsb2cgcG9zdDwvYT4sIHlvdSBzaG91bGQhPC9wPlxyXG5cclxuXHRcdFx0PHA+U2FwcGVyIGlzIGEgTmV4dC5qcy1zdHlsZSBmcmFtZXdvcmsgKDxhIGhyZWY9J2Jsb2cvaG93LWlzLXNhcHBlci1kaWZmZXJlbnQtZnJvbS1uZXh0Jz5tb3JlIG9uIHRoYXQgaGVyZTwvYT4pIGJ1aWx0IGFyb3VuZCBTdmVsdGUuIEl0IG1ha2VzIGl0IGVtYmFycmFzc2luZ2x5IGVhc3kgdG8gY3JlYXRlIGV4dHJlbWVseSBoaWdoIHBlcmZvcm1hbmNlIHdlYiBhcHBzLiBPdXQgb2YgdGhlIGJveCwgeW91IGdldDo8L3A+XHJcblxyXG5cdFx0XHQ8dWw+XHJcblx0XHRcdFx0PGxpPkNvZGUtc3BsaXR0aW5nLCBkeW5hbWljIGltcG9ydHMgYW5kIGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQsIHBvd2VyZWQgYnkgd2VicGFjazwvbGk+XHJcblx0XHRcdFx0PGxpPlNlcnZlci1zaWRlIHJlbmRlcmluZyAoU1NSKSB3aXRoIGNsaWVudC1zaWRlIGh5ZHJhdGlvbjwvbGk+XHJcblx0XHRcdFx0PGxpPlNlcnZpY2Ugd29ya2VyIGZvciBvZmZsaW5lIHN1cHBvcnQsIGFuZCBhbGwgdGhlIFBXQSBiZWxscyBhbmQgd2hpc3RsZXM8L2xpPlxyXG5cdFx0XHRcdDxsaT5UaGUgbmljZXN0IGRldmVsb3BtZW50IGV4cGVyaWVuY2UgeW91J3ZlIGV2ZXIgaGFkLCBvciB5b3VyIG1vbmV5IGJhY2s8L2xpPlxyXG5cdFx0XHQ8L3VsPlxyXG5cclxuXHRcdFx0PHA+SXQncyBpbXBsZW1lbnRlZCBhcyBFeHByZXNzIG1pZGRsZXdhcmUuIEV2ZXJ5dGhpbmcgaXMgc2V0IHVwIGFuZCB3YWl0aW5nIGZvciB5b3UgdG8gZ2V0IHN0YXJ0ZWQsIGJ1dCB5b3Uga2VlcCBjb21wbGV0ZSBjb250cm9sIG92ZXIgdGhlIHNlcnZlciwgc2VydmljZSB3b3JrZXIsIHdlYnBhY2sgY29uZmlnIGFuZCBldmVyeXRoaW5nIGVsc2UsIHNvIGl0J3MgYXMgZmxleGlibGUgYXMgeW91IG5lZWQgaXQgdG8gYmUuPC9wPlxyXG5cdFx0YFxyXG5cdH0sXHJcblxyXG5cdHtcclxuXHRcdHRpdGxlOiAnSG93IHRvIHVzZSBTYXBwZXInLFxyXG5cdFx0c2x1ZzogJ2hvdy10by11c2Utc2FwcGVyJyxcclxuXHRcdGh0bWw6IGBcclxuXHRcdFx0PGgyPlN0ZXAgb25lPC9oMj5cclxuXHRcdFx0PHA+Q3JlYXRlIGEgbmV3IHByb2plY3QsIHVzaW5nIDxhIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9SaWNoLUhhcnJpcy9kZWdpdCc+ZGVnaXQ8L2E+OjwvcD5cclxuXHJcblx0XHRcdDxwcmU+PGNvZGU+bnB4IGRlZ2l0IFwic3ZlbHRlanMvc2FwcGVyLXRlbXBsYXRlI3JvbGx1cFwiIG15LWFwcFxyXG5cdFx0XHRjZCBteS1hcHBcclxuXHRcdFx0bnBtIGluc3RhbGwgIyBvciB5YXJuIVxyXG5cdFx0XHRucG0gcnVuIGRldlxyXG5cdFx0XHQ8L2NvZGU+PC9wcmU+XHJcblxyXG5cdFx0XHQ8aDI+U3RlcCB0d288L2gyPlxyXG5cdFx0XHQ8cD5HbyB0byA8YSBocmVmPSdodHRwOi8vbG9jYWxob3N0OjMwMDAnPmxvY2FsaG9zdDozMDAwPC9hPi4gT3BlbiA8Y29kZT5teS1hcHA8L2NvZGU+IGluIHlvdXIgZWRpdG9yLiBFZGl0IHRoZSBmaWxlcyBpbiB0aGUgPGNvZGU+c3JjL3JvdXRlczwvY29kZT4gZGlyZWN0b3J5IG9yIGFkZCBuZXcgb25lcy48L3A+XHJcblxyXG5cdFx0XHQ8aDI+U3RlcCB0aHJlZTwvaDI+XHJcblx0XHRcdDxwPi4uLjwvcD5cclxuXHJcblx0XHRcdDxoMj5TdGVwIGZvdXI8L2gyPlxyXG5cdFx0XHQ8cD5SZXNpc3Qgb3ZlcmRvbmUgam9rZSBmb3JtYXRzLjwvcD5cclxuXHRcdGBcclxuXHR9LFxyXG5cclxuXHR7XHJcblx0XHR0aXRsZTogJ1doeSB0aGUgbmFtZT8nLFxyXG5cdFx0c2x1ZzogJ3doeS10aGUtbmFtZScsXHJcblx0XHRodG1sOiBgXHJcblx0XHRcdDxwPkluIHdhciwgdGhlIHNvbGRpZXJzIHdobyBidWlsZCBicmlkZ2VzLCByZXBhaXIgcm9hZHMsIGNsZWFyIG1pbmVmaWVsZHMgYW5kIGNvbmR1Y3QgZGVtb2xpdGlvbnMg4oCUIGFsbCB1bmRlciBjb21iYXQgY29uZGl0aW9ucyDigJQgYXJlIGtub3duIGFzIDxlbT5zYXBwZXJzPC9lbT4uPC9wPlxyXG5cclxuXHRcdFx0PHA+Rm9yIHdlYiBkZXZlbG9wZXJzLCB0aGUgc3Rha2VzIGFyZSBnZW5lcmFsbHkgbG93ZXIgdGhhbiB0aG9zZSBmb3IgY29tYmF0IGVuZ2luZWVycy4gQnV0IHdlIGZhY2Ugb3VyIG93biBob3N0aWxlIGVudmlyb25tZW50OiB1bmRlcnBvd2VyZWQgZGV2aWNlcywgcG9vciBuZXR3b3JrIGNvbm5lY3Rpb25zLCBhbmQgdGhlIGNvbXBsZXhpdHkgaW5oZXJlbnQgaW4gZnJvbnQtZW5kIGVuZ2luZWVyaW5nLiBTYXBwZXIsIHdoaWNoIGlzIHNob3J0IGZvciA8c3Ryb25nPlM8L3N0cm9uZz52ZWx0ZSA8c3Ryb25nPmFwcDwvc3Ryb25nPiBtYWs8c3Ryb25nPmVyPC9zdHJvbmc+LCBpcyB5b3VyIGNvdXJhZ2VvdXMgYW5kIGR1dGlmdWwgYWxseS48L3A+XHJcblx0XHRgXHJcblx0fSxcclxuXHJcblx0e1xyXG5cdFx0dGl0bGU6ICdIb3cgaXMgU2FwcGVyIGRpZmZlcmVudCBmcm9tIE5leHQuanM/JyxcclxuXHRcdHNsdWc6ICdob3ctaXMtc2FwcGVyLWRpZmZlcmVudC1mcm9tLW5leHQnLFxyXG5cdFx0aHRtbDogYFxyXG5cdFx0XHQ8cD48YSBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vemVpdC9uZXh0LmpzJz5OZXh0LmpzPC9hPiBpcyBhIFJlYWN0IGZyYW1ld29yayBmcm9tIDxhIGhyZWY9J2h0dHBzOi8vemVpdC5jbyc+WmVpdDwvYT4sIGFuZCBpcyB0aGUgaW5zcGlyYXRpb24gZm9yIFNhcHBlci4gVGhlcmUgYXJlIGEgZmV3IG5vdGFibGUgZGlmZmVyZW5jZXMsIGhvd2V2ZXI6PC9wPlxyXG5cclxuXHRcdFx0PHVsPlxyXG5cdFx0XHRcdDxsaT5JdCdzIHBvd2VyZWQgYnkgPGEgaHJlZj0naHR0cHM6Ly9zdmVsdGUuZGV2Jz5TdmVsdGU8L2E+IGluc3RlYWQgb2YgUmVhY3QsIHNvIGl0J3MgZmFzdGVyIGFuZCB5b3VyIGFwcHMgYXJlIHNtYWxsZXI8L2xpPlxyXG5cdFx0XHRcdDxsaT5JbnN0ZWFkIG9mIHJvdXRlIG1hc2tpbmcsIHdlIGVuY29kZSByb3V0ZSBwYXJhbWV0ZXJzIGluIGZpbGVuYW1lcy4gRm9yIGV4YW1wbGUsIHRoZSBwYWdlIHlvdSdyZSBsb29raW5nIGF0IHJpZ2h0IG5vdyBpcyA8Y29kZT5zcmMvcm91dGVzL2Jsb2cvW3NsdWddLmh0bWw8L2NvZGU+PC9saT5cclxuXHRcdFx0XHQ8bGk+QXMgd2VsbCBhcyBwYWdlcyAoU3ZlbHRlIGNvbXBvbmVudHMsIHdoaWNoIHJlbmRlciBvbiBzZXJ2ZXIgb3IgY2xpZW50KSwgeW91IGNhbiBjcmVhdGUgPGVtPnNlcnZlciByb3V0ZXM8L2VtPiBpbiB5b3VyIDxjb2RlPnJvdXRlczwvY29kZT4gZGlyZWN0b3J5LiBUaGVzZSBhcmUganVzdCA8Y29kZT4uanM8L2NvZGU+IGZpbGVzIHRoYXQgZXhwb3J0IGZ1bmN0aW9ucyBjb3JyZXNwb25kaW5nIHRvIEhUVFAgbWV0aG9kcywgYW5kIHJlY2VpdmUgRXhwcmVzcyA8Y29kZT5yZXF1ZXN0PC9jb2RlPiBhbmQgPGNvZGU+cmVzcG9uc2U8L2NvZGU+IG9iamVjdHMgYXMgYXJndW1lbnRzLiBUaGlzIG1ha2VzIGl0IHZlcnkgZWFzeSB0bywgZm9yIGV4YW1wbGUsIGFkZCBhIEpTT04gQVBJIHN1Y2ggYXMgdGhlIG9uZSA8YSBocmVmPSdibG9nL2hvdy1pcy1zYXBwZXItZGlmZmVyZW50LWZyb20tbmV4dC5qc29uJz5wb3dlcmluZyB0aGlzIHZlcnkgcGFnZTwvYT48L2xpPlxyXG5cdFx0XHRcdDxsaT5MaW5rcyBhcmUganVzdCA8Y29kZT4mbHQ7YSZndDs8L2NvZGU+IGVsZW1lbnRzLCByYXRoZXIgdGhhbiBmcmFtZXdvcmstc3BlY2lmaWMgPGNvZGU+Jmx0O0xpbmsmZ3Q7PC9jb2RlPiBjb21wb25lbnRzLiBUaGF0IG1lYW5zLCBmb3IgZXhhbXBsZSwgdGhhdCA8YSBocmVmPSdibG9nL2hvdy1jYW4taS1nZXQtaW52b2x2ZWQnPnRoaXMgbGluayByaWdodCBoZXJlPC9hPiwgZGVzcGl0ZSBiZWluZyBpbnNpZGUgYSBibG9iIG9mIEhUTUwsIHdvcmtzIHdpdGggdGhlIHJvdXRlciBhcyB5b3UnZCBleHBlY3QuPC9saT5cclxuXHRcdFx0PC91bD5cclxuXHRcdGBcclxuXHR9LFxyXG5cclxuXHR7XHJcblx0XHR0aXRsZTogJ0hvdyBjYW4gSSBnZXQgaW52b2x2ZWQ/JyxcclxuXHRcdHNsdWc6ICdob3ctY2FuLWktZ2V0LWludm9sdmVkJyxcclxuXHRcdGh0bWw6IGBcclxuXHRcdFx0PHA+V2UncmUgc28gZ2xhZCB5b3UgYXNrZWQhIENvbWUgb24gb3ZlciB0byB0aGUgPGEgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL3N2ZWx0ZWpzL3N2ZWx0ZSc+U3ZlbHRlPC9hPiBhbmQgPGEgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL3N2ZWx0ZWpzL3NhcHBlcic+U2FwcGVyPC9hPiByZXBvcywgYW5kIGpvaW4gdXMgaW4gdGhlIDxhIGhyZWY9J2h0dHBzOi8vc3ZlbHRlLmRldi9jaGF0Jz5EaXNjb3JkIGNoYXRyb29tPC9hPi4gRXZlcnlvbmUgaXMgd2VsY29tZSwgZXNwZWNpYWxseSB5b3UhPC9wPlxyXG5cdFx0YFxyXG5cdH1cclxuXTtcclxuXHJcbnBvc3RzLmZvckVhY2gocG9zdCA9PiB7XHJcblx0cG9zdC5odG1sID0gcG9zdC5odG1sLnJlcGxhY2UoL15cXHR7M30vZ20sICcnKTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwb3N0cztcclxuIiwiaW1wb3J0IHBvc3RzIGZyb20gJy4vX3Bvc3RzLmpzJztcclxuXHJcbmNvbnN0IGNvbnRlbnRzID0gSlNPTi5zdHJpbmdpZnkocG9zdHMubWFwKHBvc3QgPT4ge1xyXG5cdHJldHVybiB7XHJcblx0XHR0aXRsZTogcG9zdC50aXRsZSxcclxuXHRcdHNsdWc6IHBvc3Quc2x1Z1xyXG5cdH07XHJcbn0pKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXQocmVxLCByZXMpIHtcclxuXHRyZXMud3JpdGVIZWFkKDIwMCwge1xyXG5cdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdH0pO1xyXG5cclxuXHRyZXMuZW5kKGNvbnRlbnRzKTtcclxufSIsImltcG9ydCBwb3N0cyBmcm9tICcuL19wb3N0cy5qcyc7XHJcblxyXG5jb25zdCBsb29rdXAgPSBuZXcgTWFwKCk7XHJcbnBvc3RzLmZvckVhY2gocG9zdCA9PiB7XHJcblx0bG9va3VwLnNldChwb3N0LnNsdWcsIEpTT04uc3RyaW5naWZ5KHBvc3QpKTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0KHJlcSwgcmVzLCBuZXh0KSB7XHJcblx0Ly8gdGhlIGBzbHVnYCBwYXJhbWV0ZXIgaXMgYXZhaWxhYmxlIGJlY2F1c2VcclxuXHQvLyB0aGlzIGZpbGUgaXMgY2FsbGVkIFtzbHVnXS5qc29uLmpzXHJcblx0Y29uc3QgeyBzbHVnIH0gPSByZXEucGFyYW1zO1xyXG5cclxuXHRpZiAobG9va3VwLmhhcyhzbHVnKSkge1xyXG5cdFx0cmVzLndyaXRlSGVhZCgyMDAsIHtcclxuXHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmVzLmVuZChsb29rdXAuZ2V0KHNsdWcpKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmVzLndyaXRlSGVhZCg0MDQsIHtcclxuXHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmVzLmVuZChKU09OLnN0cmluZ2lmeSh7XHJcblx0XHRcdG1lc3NhZ2U6IGBOb3QgZm91bmRgXHJcblx0XHR9KSk7XHJcblx0fVxyXG59XHJcbiIsImZ1bmN0aW9uIG5vb3AoKSB7IH1cclxuY29uc3QgaWRlbnRpdHkgPSB4ID0+IHg7XHJcbmZ1bmN0aW9uIGFzc2lnbih0YXIsIHNyYykge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgZm9yIChjb25zdCBrIGluIHNyYylcclxuICAgICAgICB0YXJba10gPSBzcmNba107XHJcbiAgICByZXR1cm4gdGFyO1xyXG59XHJcbmZ1bmN0aW9uIGlzX3Byb21pc2UodmFsdWUpIHtcclxuICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nO1xyXG59XHJcbmZ1bmN0aW9uIGFkZF9sb2NhdGlvbihlbGVtZW50LCBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIpIHtcclxuICAgIGVsZW1lbnQuX19zdmVsdGVfbWV0YSA9IHtcclxuICAgICAgICBsb2M6IHsgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyIH1cclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gcnVuKGZuKSB7XHJcbiAgICByZXR1cm4gZm4oKTtcclxufVxyXG5mdW5jdGlvbiBibGFua19vYmplY3QoKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxufVxyXG5mdW5jdGlvbiBydW5fYWxsKGZucykge1xyXG4gICAgZm5zLmZvckVhY2gocnVuKTtcclxufVxyXG5mdW5jdGlvbiBpc19mdW5jdGlvbih0aGluZykge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJztcclxufVxyXG5mdW5jdGlvbiBzYWZlX25vdF9lcXVhbChhLCBiKSB7XHJcbiAgICByZXR1cm4gYSAhPSBhID8gYiA9PSBiIDogYSAhPT0gYiB8fCAoKGEgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnKSB8fCB0eXBlb2YgYSA9PT0gJ2Z1bmN0aW9uJyk7XHJcbn1cclxuZnVuY3Rpb24gbm90X2VxdWFsKGEsIGIpIHtcclxuICAgIHJldHVybiBhICE9IGEgPyBiID09IGIgOiBhICE9PSBiO1xyXG59XHJcbmZ1bmN0aW9uIHZhbGlkYXRlX3N0b3JlKHN0b3JlLCBuYW1lKSB7XHJcbiAgICBpZiAoIXN0b3JlIHx8IHR5cGVvZiBzdG9yZS5zdWJzY3JpYmUgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCcke25hbWV9JyBpcyBub3QgYSBzdG9yZSB3aXRoIGEgJ3N1YnNjcmliZScgbWV0aG9kYCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc3Vic2NyaWJlKHN0b3JlLCBjYWxsYmFjaykge1xyXG4gICAgY29uc3QgdW5zdWIgPSBzdG9yZS5zdWJzY3JpYmUoY2FsbGJhY2spO1xyXG4gICAgcmV0dXJuIHVuc3ViLnVuc3Vic2NyaWJlID8gKCkgPT4gdW5zdWIudW5zdWJzY3JpYmUoKSA6IHVuc3ViO1xyXG59XHJcbmZ1bmN0aW9uIGdldF9zdG9yZV92YWx1ZShzdG9yZSkge1xyXG4gICAgbGV0IHZhbHVlO1xyXG4gICAgc3Vic2NyaWJlKHN0b3JlLCBfID0+IHZhbHVlID0gXykoKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5mdW5jdGlvbiBjb21wb25lbnRfc3Vic2NyaWJlKGNvbXBvbmVudCwgc3RvcmUsIGNhbGxiYWNrKSB7XHJcbiAgICBjb21wb25lbnQuJCQub25fZGVzdHJveS5wdXNoKHN1YnNjcmliZShzdG9yZSwgY2FsbGJhY2spKTtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVfc2xvdChkZWZpbml0aW9uLCBjdHgsIGZuKSB7XHJcbiAgICBpZiAoZGVmaW5pdGlvbikge1xyXG4gICAgICAgIGNvbnN0IHNsb3RfY3R4ID0gZ2V0X3Nsb3RfY29udGV4dChkZWZpbml0aW9uLCBjdHgsIGZuKTtcclxuICAgICAgICByZXR1cm4gZGVmaW5pdGlvblswXShzbG90X2N0eCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0X3Nsb3RfY29udGV4dChkZWZpbml0aW9uLCBjdHgsIGZuKSB7XHJcbiAgICByZXR1cm4gZGVmaW5pdGlvblsxXVxyXG4gICAgICAgID8gYXNzaWduKHt9LCBhc3NpZ24oY3R4LiQkc2NvcGUuY3R4LCBkZWZpbml0aW9uWzFdKGZuID8gZm4oY3R4KSA6IHt9KSkpXHJcbiAgICAgICAgOiBjdHguJCRzY29wZS5jdHg7XHJcbn1cclxuZnVuY3Rpb24gZ2V0X3Nsb3RfY2hhbmdlcyhkZWZpbml0aW9uLCBjdHgsIGNoYW5nZWQsIGZuKSB7XHJcbiAgICByZXR1cm4gZGVmaW5pdGlvblsxXVxyXG4gICAgICAgID8gYXNzaWduKHt9LCBhc3NpZ24oY3R4LiQkc2NvcGUuY2hhbmdlZCB8fCB7fSwgZGVmaW5pdGlvblsxXShmbiA/IGZuKGNoYW5nZWQpIDoge30pKSlcclxuICAgICAgICA6IGN0eC4kJHNjb3BlLmNoYW5nZWQgfHwge307XHJcbn1cclxuZnVuY3Rpb24gZXhjbHVkZV9pbnRlcm5hbF9wcm9wcyhwcm9wcykge1xyXG4gICAgY29uc3QgcmVzdWx0ID0ge307XHJcbiAgICBmb3IgKGNvbnN0IGsgaW4gcHJvcHMpXHJcbiAgICAgICAgaWYgKGtbMF0gIT09ICckJylcclxuICAgICAgICAgICAgcmVzdWx0W2tdID0gcHJvcHNba107XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcbmZ1bmN0aW9uIG9uY2UoZm4pIHtcclxuICAgIGxldCByYW4gPSBmYWxzZTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgIGlmIChyYW4pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICByYW4gPSB0cnVlO1xyXG4gICAgICAgIGZuLmNhbGwodGhpcywgLi4uYXJncyk7XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIG51bGxfdG9fZW1wdHkodmFsdWUpIHtcclxuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcclxufVxyXG5mdW5jdGlvbiBzZXRfc3RvcmVfdmFsdWUoc3RvcmUsIHJldCwgdmFsdWUgPSByZXQpIHtcclxuICAgIHN0b3JlLnNldCh2YWx1ZSk7XHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcblxyXG5jb25zdCBpc19jbGllbnQgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcclxubGV0IG5vdyA9IGlzX2NsaWVudFxyXG4gICAgPyAoKSA9PiB3aW5kb3cucGVyZm9ybWFuY2Uubm93KClcclxuICAgIDogKCkgPT4gRGF0ZS5ub3coKTtcclxubGV0IHJhZiA9IGlzX2NsaWVudCA/IGNiID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZShjYikgOiBub29wO1xyXG4vLyB1c2VkIGludGVybmFsbHkgZm9yIHRlc3RpbmdcclxuZnVuY3Rpb24gc2V0X25vdyhmbikge1xyXG4gICAgbm93ID0gZm47XHJcbn1cclxuZnVuY3Rpb24gc2V0X3JhZihmbikge1xyXG4gICAgcmFmID0gZm47XHJcbn1cclxuXHJcbmNvbnN0IHRhc2tzID0gbmV3IFNldCgpO1xyXG5sZXQgcnVubmluZyA9IGZhbHNlO1xyXG5mdW5jdGlvbiBydW5fdGFza3MoKSB7XHJcbiAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xyXG4gICAgICAgIGlmICghdGFza1swXShub3coKSkpIHtcclxuICAgICAgICAgICAgdGFza3MuZGVsZXRlKHRhc2spO1xyXG4gICAgICAgICAgICB0YXNrWzFdKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBydW5uaW5nID0gdGFza3Muc2l6ZSA+IDA7XHJcbiAgICBpZiAocnVubmluZylcclxuICAgICAgICByYWYocnVuX3Rhc2tzKTtcclxufVxyXG5mdW5jdGlvbiBjbGVhcl9sb29wcygpIHtcclxuICAgIC8vIGZvciB0ZXN0aW5nLi4uXHJcbiAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4gdGFza3MuZGVsZXRlKHRhc2spKTtcclxuICAgIHJ1bm5pbmcgPSBmYWxzZTtcclxufVxyXG5mdW5jdGlvbiBsb29wKGZuKSB7XHJcbiAgICBsZXQgdGFzaztcclxuICAgIGlmICghcnVubmluZykge1xyXG4gICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgIHJhZihydW5fdGFza3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwcm9taXNlOiBuZXcgUHJvbWlzZShmdWxmaWwgPT4ge1xyXG4gICAgICAgICAgICB0YXNrcy5hZGQodGFzayA9IFtmbiwgZnVsZmlsXSk7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgYWJvcnQoKSB7XHJcbiAgICAgICAgICAgIHRhc2tzLmRlbGV0ZSh0YXNrKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmQodGFyZ2V0LCBub2RlKSB7XHJcbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQobm9kZSk7XHJcbn1cclxuZnVuY3Rpb24gaW5zZXJ0KHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XHJcbiAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKG5vZGUsIGFuY2hvciB8fCBudWxsKTtcclxufVxyXG5mdW5jdGlvbiBkZXRhY2gobm9kZSkge1xyXG4gICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xyXG59XHJcbmZ1bmN0aW9uIGRlc3Ryb3lfZWFjaChpdGVyYXRpb25zLCBkZXRhY2hpbmcpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcmF0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChpdGVyYXRpb25zW2ldKVxyXG4gICAgICAgICAgICBpdGVyYXRpb25zW2ldLmQoZGV0YWNoaW5nKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBlbGVtZW50KG5hbWUpIHtcclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xyXG59XHJcbmZ1bmN0aW9uIGVsZW1lbnRfaXMobmFtZSwgaXMpIHtcclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUsIHsgaXMgfSk7XHJcbn1cclxuZnVuY3Rpb24gb2JqZWN0X3dpdGhvdXRfcHJvcGVydGllcyhvYmosIGV4Y2x1ZGUpIHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tb2JqZWN0LWxpdGVyYWwtdHlwZS1hc3NlcnRpb25cclxuICAgIGNvbnN0IHRhcmdldCA9IHt9O1xyXG4gICAgZm9yIChjb25zdCBrIGluIG9iaikge1xyXG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrKVxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICYmIGV4Y2x1ZGUuaW5kZXhPZihrKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB0YXJnZXRba10gPSBvYmpba107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufVxyXG5mdW5jdGlvbiBzdmdfZWxlbWVudChuYW1lKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIG5hbWUpO1xyXG59XHJcbmZ1bmN0aW9uIHRleHQoZGF0YSkge1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRhdGEpO1xyXG59XHJcbmZ1bmN0aW9uIHNwYWNlKCkge1xyXG4gICAgcmV0dXJuIHRleHQoJyAnKTtcclxufVxyXG5mdW5jdGlvbiBlbXB0eSgpIHtcclxuICAgIHJldHVybiB0ZXh0KCcnKTtcclxufVxyXG5mdW5jdGlvbiBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpIHtcclxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XHJcbiAgICByZXR1cm4gKCkgPT4gbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcclxufVxyXG5mdW5jdGlvbiBwcmV2ZW50X2RlZmF1bHQoZm4pIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIHN0b3BfcHJvcGFnYXRpb24oZm4pIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBzZWxmKGZuKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMpXHJcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcywgZXZlbnQpO1xyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBhdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSA9PSBudWxsKVxyXG4gICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSk7XHJcbn1cclxuZnVuY3Rpb24gc2V0X2F0dHJpYnV0ZXMobm9kZSwgYXR0cmlidXRlcykge1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cmlidXRlcykge1xyXG4gICAgICAgIGlmIChrZXkgPT09ICdzdHlsZScpIHtcclxuICAgICAgICAgICAgbm9kZS5zdHlsZS5jc3NUZXh0ID0gYXR0cmlidXRlc1trZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChrZXkgaW4gbm9kZSkge1xyXG4gICAgICAgICAgICBub2RlW2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhdHRyKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc2V0X3N2Z19hdHRyaWJ1dGVzKG5vZGUsIGF0dHJpYnV0ZXMpIHtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBhdHRyKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzZXRfY3VzdG9tX2VsZW1lbnRfZGF0YShub2RlLCBwcm9wLCB2YWx1ZSkge1xyXG4gICAgaWYgKHByb3AgaW4gbm9kZSkge1xyXG4gICAgICAgIG5vZGVbcHJvcF0gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGF0dHIobm9kZSwgcHJvcCwgdmFsdWUpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHhsaW5rX2F0dHIobm9kZSwgYXR0cmlidXRlLCB2YWx1ZSkge1xyXG4gICAgbm9kZS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIGF0dHJpYnV0ZSwgdmFsdWUpO1xyXG59XHJcbmZ1bmN0aW9uIGdldF9iaW5kaW5nX2dyb3VwX3ZhbHVlKGdyb3VwKSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm91cC5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChncm91cFtpXS5jaGVja2VkKVxyXG4gICAgICAgICAgICB2YWx1ZS5wdXNoKGdyb3VwW2ldLl9fdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbmZ1bmN0aW9uIHRvX251bWJlcih2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlID09PSAnJyA/IHVuZGVmaW5lZCA6ICt2YWx1ZTtcclxufVxyXG5mdW5jdGlvbiB0aW1lX3Jhbmdlc190b19hcnJheShyYW5nZXMpIHtcclxuICAgIGNvbnN0IGFycmF5ID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGFycmF5LnB1c2goeyBzdGFydDogcmFuZ2VzLnN0YXJ0KGkpLCBlbmQ6IHJhbmdlcy5lbmQoaSkgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyYXk7XHJcbn1cclxuZnVuY3Rpb24gY2hpbGRyZW4oZWxlbWVudCkge1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5jaGlsZE5vZGVzKTtcclxufVxyXG5mdW5jdGlvbiBjbGFpbV9lbGVtZW50KG5vZGVzLCBuYW1lLCBhdHRyaWJ1dGVzLCBzdmcpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XHJcbiAgICAgICAgaWYgKG5vZGUubm9kZU5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoOyBqICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG5vZGUuYXR0cmlidXRlc1tqXTtcclxuICAgICAgICAgICAgICAgIGlmICghYXR0cmlidXRlc1thdHRyaWJ1dGUubmFtZV0pXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlLm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub2Rlcy5zcGxpY2UoaSwgMSlbMF07IC8vIFRPRE8gc3RyaXAgdW53YW50ZWQgYXR0cmlidXRlc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzdmcgPyBzdmdfZWxlbWVudChuYW1lKSA6IGVsZW1lbnQobmFtZSk7XHJcbn1cclxuZnVuY3Rpb24gY2xhaW1fdGV4dChub2RlcywgZGF0YSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcclxuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xyXG4gICAgICAgICAgICBub2RlLmRhdGEgPSAnJyArIGRhdGE7XHJcbiAgICAgICAgICAgIHJldHVybiBub2Rlcy5zcGxpY2UoaSwgMSlbMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQoZGF0YSk7XHJcbn1cclxuZnVuY3Rpb24gY2xhaW1fc3BhY2Uobm9kZXMpIHtcclxuICAgIHJldHVybiBjbGFpbV90ZXh0KG5vZGVzLCAnICcpO1xyXG59XHJcbmZ1bmN0aW9uIHNldF9kYXRhKHRleHQsIGRhdGEpIHtcclxuICAgIGRhdGEgPSAnJyArIGRhdGE7XHJcbiAgICBpZiAodGV4dC5kYXRhICE9PSBkYXRhKVxyXG4gICAgICAgIHRleHQuZGF0YSA9IGRhdGE7XHJcbn1cclxuZnVuY3Rpb24gc2V0X2lucHV0X3ZhbHVlKGlucHV0LCB2YWx1ZSkge1xyXG4gICAgaWYgKHZhbHVlICE9IG51bGwgfHwgaW5wdXQudmFsdWUpIHtcclxuICAgICAgICBpbnB1dC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHNldF9pbnB1dF90eXBlKGlucHV0LCB0eXBlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlucHV0LnR5cGUgPSB0eXBlO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAvLyBkbyBub3RoaW5nXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc2V0X3N0eWxlKG5vZGUsIGtleSwgdmFsdWUsIGltcG9ydGFudCkge1xyXG4gICAgbm9kZS5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlLCBpbXBvcnRhbnQgPyAnaW1wb3J0YW50JyA6ICcnKTtcclxufVxyXG5mdW5jdGlvbiBzZWxlY3Rfb3B0aW9uKHNlbGVjdCwgdmFsdWUpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBjb25zdCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcclxuICAgICAgICBpZiAob3B0aW9uLl9fdmFsdWUgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc2VsZWN0X29wdGlvbnMoc2VsZWN0LCB2YWx1ZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdC5vcHRpb25zW2ldO1xyXG4gICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IH52YWx1ZS5pbmRleE9mKG9wdGlvbi5fX3ZhbHVlKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzZWxlY3RfdmFsdWUoc2VsZWN0KSB7XHJcbiAgICBjb25zdCBzZWxlY3RlZF9vcHRpb24gPSBzZWxlY3QucXVlcnlTZWxlY3RvcignOmNoZWNrZWQnKSB8fCBzZWxlY3Qub3B0aW9uc1swXTtcclxuICAgIHJldHVybiBzZWxlY3RlZF9vcHRpb24gJiYgc2VsZWN0ZWRfb3B0aW9uLl9fdmFsdWU7XHJcbn1cclxuZnVuY3Rpb24gc2VsZWN0X211bHRpcGxlX3ZhbHVlKHNlbGVjdCkge1xyXG4gICAgcmV0dXJuIFtdLm1hcC5jYWxsKHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCc6Y2hlY2tlZCcpLCBvcHRpb24gPT4gb3B0aW9uLl9fdmFsdWUpO1xyXG59XHJcbmZ1bmN0aW9uIGFkZF9yZXNpemVfbGlzdGVuZXIoZWxlbWVudCwgZm4pIHtcclxuICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgb2JqZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2JqZWN0Jyk7XHJcbiAgICBvYmplY3Quc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBibG9jazsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGxlZnQ6IDA7IGhlaWdodDogMTAwJTsgd2lkdGg6IDEwMCU7IG92ZXJmbG93OiBoaWRkZW47IHBvaW50ZXItZXZlbnRzOiBub25lOyB6LWluZGV4OiAtMTsnKTtcclxuICAgIG9iamVjdC50eXBlID0gJ3RleHQvaHRtbCc7XHJcbiAgICBvYmplY3QudGFiSW5kZXggPSAtMTtcclxuICAgIGxldCB3aW47XHJcbiAgICBvYmplY3Qub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIHdpbiA9IG9iamVjdC5jb250ZW50RG9jdW1lbnQuZGVmYXVsdFZpZXc7XHJcbiAgICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZuKTtcclxuICAgIH07XHJcbiAgICBpZiAoL1RyaWRlbnQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKG9iamVjdCk7XHJcbiAgICAgICAgb2JqZWN0LmRhdGEgPSAnYWJvdXQ6YmxhbmsnO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgb2JqZWN0LmRhdGEgPSAnYWJvdXQ6YmxhbmsnO1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQob2JqZWN0KTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2FuY2VsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHdpbiAmJiB3aW4ucmVtb3ZlRXZlbnRMaXN0ZW5lciAmJiB3aW4ucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZm4pO1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKG9iamVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiB0b2dnbGVfY2xhc3MoZWxlbWVudCwgbmFtZSwgdG9nZ2xlKSB7XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdFt0b2dnbGUgPyAnYWRkJyA6ICdyZW1vdmUnXShuYW1lKTtcclxufVxyXG5mdW5jdGlvbiBjdXN0b21fZXZlbnQodHlwZSwgZGV0YWlsKSB7XHJcbiAgICBjb25zdCBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XHJcbiAgICBlLmluaXRDdXN0b21FdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UsIGRldGFpbCk7XHJcbiAgICByZXR1cm4gZTtcclxufVxyXG5jbGFzcyBIdG1sVGFnIHtcclxuICAgIGNvbnN0cnVjdG9yKGh0bWwsIGFuY2hvciA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLmUgPSBlbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLmEgPSBhbmNob3I7XHJcbiAgICAgICAgdGhpcy51KGh0bWwpO1xyXG4gICAgfVxyXG4gICAgbSh0YXJnZXQsIGFuY2hvciA9IG51bGwpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubi5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBpbnNlcnQodGFyZ2V0LCB0aGlzLm5baV0sIGFuY2hvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudCA9IHRhcmdldDtcclxuICAgIH1cclxuICAgIHUoaHRtbCkge1xyXG4gICAgICAgIHRoaXMuZS5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgICAgIHRoaXMubiA9IEFycmF5LmZyb20odGhpcy5lLmNoaWxkTm9kZXMpO1xyXG4gICAgfVxyXG4gICAgcChodG1sKSB7XHJcbiAgICAgICAgdGhpcy5kKCk7XHJcbiAgICAgICAgdGhpcy51KGh0bWwpO1xyXG4gICAgICAgIHRoaXMubSh0aGlzLnQsIHRoaXMuYSk7XHJcbiAgICB9XHJcbiAgICBkKCkge1xyXG4gICAgICAgIHRoaXMubi5mb3JFYWNoKGRldGFjaCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBzdHlsZXNoZWV0O1xyXG5sZXQgYWN0aXZlID0gMDtcclxubGV0IGN1cnJlbnRfcnVsZXMgPSB7fTtcclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Rhcmtza3lhcHAvc3RyaW5nLWhhc2gvYmxvYi9tYXN0ZXIvaW5kZXguanNcclxuZnVuY3Rpb24gaGFzaChzdHIpIHtcclxuICAgIGxldCBoYXNoID0gNTM4MTtcclxuICAgIGxldCBpID0gc3RyLmxlbmd0aDtcclxuICAgIHdoaWxlIChpLS0pXHJcbiAgICAgICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpIF4gc3RyLmNoYXJDb2RlQXQoaSk7XHJcbiAgICByZXR1cm4gaGFzaCA+Pj4gMDtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVfcnVsZShub2RlLCBhLCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2UsIGZuLCB1aWQgPSAwKSB7XHJcbiAgICBjb25zdCBzdGVwID0gMTYuNjY2IC8gZHVyYXRpb247XHJcbiAgICBsZXQga2V5ZnJhbWVzID0gJ3tcXG4nO1xyXG4gICAgZm9yIChsZXQgcCA9IDA7IHAgPD0gMTsgcCArPSBzdGVwKSB7XHJcbiAgICAgICAgY29uc3QgdCA9IGEgKyAoYiAtIGEpICogZWFzZShwKTtcclxuICAgICAgICBrZXlmcmFtZXMgKz0gcCAqIDEwMCArIGAleyR7Zm4odCwgMSAtIHQpfX1cXG5gO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcnVsZSA9IGtleWZyYW1lcyArIGAxMDAlIHske2ZuKGIsIDEgLSBiKX19XFxufWA7XHJcbiAgICBjb25zdCBuYW1lID0gYF9fc3ZlbHRlXyR7aGFzaChydWxlKX1fJHt1aWR9YDtcclxuICAgIGlmICghY3VycmVudF9ydWxlc1tuYW1lXSkge1xyXG4gICAgICAgIGlmICghc3R5bGVzaGVldCkge1xyXG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG4gICAgICAgICAgICBzdHlsZXNoZWV0ID0gc3R5bGUuc2hlZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN1cnJlbnRfcnVsZXNbbmFtZV0gPSB0cnVlO1xyXG4gICAgICAgIHN0eWxlc2hlZXQuaW5zZXJ0UnVsZShgQGtleWZyYW1lcyAke25hbWV9ICR7cnVsZX1gLCBzdHlsZXNoZWV0LmNzc1J1bGVzLmxlbmd0aCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBhbmltYXRpb24gPSBub2RlLnN0eWxlLmFuaW1hdGlvbiB8fCAnJztcclxuICAgIG5vZGUuc3R5bGUuYW5pbWF0aW9uID0gYCR7YW5pbWF0aW9uID8gYCR7YW5pbWF0aW9ufSwgYCA6IGBgfSR7bmFtZX0gJHtkdXJhdGlvbn1tcyBsaW5lYXIgJHtkZWxheX1tcyAxIGJvdGhgO1xyXG4gICAgYWN0aXZlICs9IDE7XHJcbiAgICByZXR1cm4gbmFtZTtcclxufVxyXG5mdW5jdGlvbiBkZWxldGVfcnVsZShub2RlLCBuYW1lKSB7XHJcbiAgICBub2RlLnN0eWxlLmFuaW1hdGlvbiA9IChub2RlLnN0eWxlLmFuaW1hdGlvbiB8fCAnJylcclxuICAgICAgICAuc3BsaXQoJywgJylcclxuICAgICAgICAuZmlsdGVyKG5hbWVcclxuICAgICAgICA/IGFuaW0gPT4gYW5pbS5pbmRleE9mKG5hbWUpIDwgMCAvLyByZW1vdmUgc3BlY2lmaWMgYW5pbWF0aW9uXHJcbiAgICAgICAgOiBhbmltID0+IGFuaW0uaW5kZXhPZignX19zdmVsdGUnKSA9PT0gLTEgLy8gcmVtb3ZlIGFsbCBTdmVsdGUgYW5pbWF0aW9uc1xyXG4gICAgKVxyXG4gICAgICAgIC5qb2luKCcsICcpO1xyXG4gICAgaWYgKG5hbWUgJiYgIS0tYWN0aXZlKVxyXG4gICAgICAgIGNsZWFyX3J1bGVzKCk7XHJcbn1cclxuZnVuY3Rpb24gY2xlYXJfcnVsZXMoKSB7XHJcbiAgICByYWYoKCkgPT4ge1xyXG4gICAgICAgIGlmIChhY3RpdmUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgaSA9IHN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlIChpLS0pXHJcbiAgICAgICAgICAgIHN0eWxlc2hlZXQuZGVsZXRlUnVsZShpKTtcclxuICAgICAgICBjdXJyZW50X3J1bGVzID0ge307XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlX2FuaW1hdGlvbihub2RlLCBmcm9tLCBmbiwgcGFyYW1zKSB7XHJcbiAgICBpZiAoIWZyb20pXHJcbiAgICAgICAgcmV0dXJuIG5vb3A7XHJcbiAgICBjb25zdCB0byA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBpZiAoZnJvbS5sZWZ0ID09PSB0by5sZWZ0ICYmIGZyb20ucmlnaHQgPT09IHRvLnJpZ2h0ICYmIGZyb20udG9wID09PSB0by50b3AgJiYgZnJvbS5ib3R0b20gPT09IHRvLmJvdHRvbSlcclxuICAgICAgICByZXR1cm4gbm9vcDtcclxuICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIFxyXG4gICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBzaG91bGQgdGhpcyBiZSBzZXBhcmF0ZWQgZnJvbSBkZXN0cnVjdHVyaW5nPyBPciBzdGFydC9lbmQgYWRkZWQgdG8gcHVibGljIGFwaSBhbmQgZG9jdW1lbnRhdGlvbj9cclxuICAgIHN0YXJ0OiBzdGFydF90aW1lID0gbm93KCkgKyBkZWxheSwgXHJcbiAgICAvLyBAdHMtaWdub3JlIHRvZG86XHJcbiAgICBlbmQgPSBzdGFydF90aW1lICsgZHVyYXRpb24sIHRpY2sgPSBub29wLCBjc3MgfSA9IGZuKG5vZGUsIHsgZnJvbSwgdG8gfSwgcGFyYW1zKTtcclxuICAgIGxldCBydW5uaW5nID0gdHJ1ZTtcclxuICAgIGxldCBzdGFydGVkID0gZmFsc2U7XHJcbiAgICBsZXQgbmFtZTtcclxuICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xyXG4gICAgICAgIGlmIChjc3MpIHtcclxuICAgICAgICAgICAgbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDAsIDEsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRlbGF5KSB7XHJcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHN0b3AoKSB7XHJcbiAgICAgICAgaWYgKGNzcylcclxuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgbmFtZSk7XHJcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgbG9vcChub3cgPT4ge1xyXG4gICAgICAgIGlmICghc3RhcnRlZCAmJiBub3cgPj0gc3RhcnRfdGltZSkge1xyXG4gICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXJ0ZWQgJiYgbm93ID49IGVuZCkge1xyXG4gICAgICAgICAgICB0aWNrKDEsIDApO1xyXG4gICAgICAgICAgICBzdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcnVubmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGFydGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBub3cgLSBzdGFydF90aW1lO1xyXG4gICAgICAgICAgICBjb25zdCB0ID0gMCArIDEgKiBlYXNpbmcocCAvIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICBzdGFydCgpO1xyXG4gICAgdGljaygwLCAxKTtcclxuICAgIHJldHVybiBzdG9wO1xyXG59XHJcbmZ1bmN0aW9uIGZpeF9wb3NpdGlvbihub2RlKSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XHJcbiAgICBpZiAoc3R5bGUucG9zaXRpb24gIT09ICdhYnNvbHV0ZScgJiYgc3R5bGUucG9zaXRpb24gIT09ICdmaXhlZCcpIHtcclxuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHN0eWxlO1xyXG4gICAgICAgIGNvbnN0IGEgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIG5vZGUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIG5vZGUuc3R5bGUud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBub2RlLnN0eWxlLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBhZGRfdHJhbnNmb3JtKG5vZGUsIGEpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGFkZF90cmFuc2Zvcm0obm9kZSwgYSkge1xyXG4gICAgY29uc3QgYiA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBpZiAoYS5sZWZ0ICE9PSBiLmxlZnQgfHwgYS50b3AgIT09IGIudG9wKSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybSA9PT0gJ25vbmUnID8gJycgOiBzdHlsZS50cmFuc2Zvcm07XHJcbiAgICAgICAgbm9kZS5zdHlsZS50cmFuc2Zvcm0gPSBgJHt0cmFuc2Zvcm19IHRyYW5zbGF0ZSgke2EubGVmdCAtIGIubGVmdH1weCwgJHthLnRvcCAtIGIudG9wfXB4KWA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBjdXJyZW50X2NvbXBvbmVudDtcclxuZnVuY3Rpb24gc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCkge1xyXG4gICAgY3VycmVudF9jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbn1cclxuZnVuY3Rpb24gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkge1xyXG4gICAgaWYgKCFjdXJyZW50X2NvbXBvbmVudClcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZ1bmN0aW9uIGNhbGxlZCBvdXRzaWRlIGNvbXBvbmVudCBpbml0aWFsaXphdGlvbmApO1xyXG4gICAgcmV0dXJuIGN1cnJlbnRfY29tcG9uZW50O1xyXG59XHJcbmZ1bmN0aW9uIGJlZm9yZVVwZGF0ZShmbikge1xyXG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuYmVmb3JlX3VwZGF0ZS5wdXNoKGZuKTtcclxufVxyXG5mdW5jdGlvbiBvbk1vdW50KGZuKSB7XHJcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5vbl9tb3VudC5wdXNoKGZuKTtcclxufVxyXG5mdW5jdGlvbiBhZnRlclVwZGF0ZShmbikge1xyXG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuYWZ0ZXJfdXBkYXRlLnB1c2goZm4pO1xyXG59XHJcbmZ1bmN0aW9uIG9uRGVzdHJveShmbikge1xyXG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQub25fZGVzdHJveS5wdXNoKGZuKTtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVFdmVudERpc3BhdGNoZXIoKSB7XHJcbiAgICBjb25zdCBjb21wb25lbnQgPSBjdXJyZW50X2NvbXBvbmVudDtcclxuICAgIHJldHVybiAodHlwZSwgZGV0YWlsKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gY29tcG9uZW50LiQkLmNhbGxiYWNrc1t0eXBlXTtcclxuICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gYXJlIHRoZXJlIHNpdHVhdGlvbnMgd2hlcmUgZXZlbnRzIGNvdWxkIGJlIGRpc3BhdGNoZWRcclxuICAgICAgICAgICAgLy8gaW4gYSBzZXJ2ZXIgKG5vbi1ET00pIGVudmlyb25tZW50P1xyXG4gICAgICAgICAgICBjb25zdCBldmVudCA9IGN1c3RvbV9ldmVudCh0eXBlLCBkZXRhaWwpO1xyXG4gICAgICAgICAgICBjYWxsYmFja3Muc2xpY2UoKS5mb3JFYWNoKGZuID0+IHtcclxuICAgICAgICAgICAgICAgIGZuLmNhbGwoY29tcG9uZW50LCBldmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gc2V0Q29udGV4dChrZXksIGNvbnRleHQpIHtcclxuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuc2V0KGtleSwgY29udGV4dCk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0Q29udGV4dChrZXkpIHtcclxuICAgIHJldHVybiBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LmdldChrZXkpO1xyXG59XHJcbi8vIFRPRE8gZmlndXJlIG91dCBpZiB3ZSBzdGlsbCB3YW50IHRvIHN1cHBvcnRcclxuLy8gc2hvcnRoYW5kIGV2ZW50cywgb3IgaWYgd2Ugd2FudCB0byBpbXBsZW1lbnRcclxuLy8gYSByZWFsIGJ1YmJsaW5nIG1lY2hhbmlzbVxyXG5mdW5jdGlvbiBidWJibGUoY29tcG9uZW50LCBldmVudCkge1xyXG4gICAgY29uc3QgY2FsbGJhY2tzID0gY29tcG9uZW50LiQkLmNhbGxiYWNrc1tldmVudC50eXBlXTtcclxuICAgIGlmIChjYWxsYmFja3MpIHtcclxuICAgICAgICBjYWxsYmFja3Muc2xpY2UoKS5mb3JFYWNoKGZuID0+IGZuKGV2ZW50KSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGRpcnR5X2NvbXBvbmVudHMgPSBbXTtcclxuY29uc3QgaW50cm9zID0geyBlbmFibGVkOiBmYWxzZSB9O1xyXG5jb25zdCBiaW5kaW5nX2NhbGxiYWNrcyA9IFtdO1xyXG5jb25zdCByZW5kZXJfY2FsbGJhY2tzID0gW107XHJcbmNvbnN0IGZsdXNoX2NhbGxiYWNrcyA9IFtdO1xyXG5jb25zdCByZXNvbHZlZF9wcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbmxldCB1cGRhdGVfc2NoZWR1bGVkID0gZmFsc2U7XHJcbmZ1bmN0aW9uIHNjaGVkdWxlX3VwZGF0ZSgpIHtcclxuICAgIGlmICghdXBkYXRlX3NjaGVkdWxlZCkge1xyXG4gICAgICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSB0cnVlO1xyXG4gICAgICAgIHJlc29sdmVkX3Byb21pc2UudGhlbihmbHVzaCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdGljaygpIHtcclxuICAgIHNjaGVkdWxlX3VwZGF0ZSgpO1xyXG4gICAgcmV0dXJuIHJlc29sdmVkX3Byb21pc2U7XHJcbn1cclxuZnVuY3Rpb24gYWRkX3JlbmRlcl9jYWxsYmFjayhmbikge1xyXG4gICAgcmVuZGVyX2NhbGxiYWNrcy5wdXNoKGZuKTtcclxufVxyXG5mdW5jdGlvbiBhZGRfZmx1c2hfY2FsbGJhY2soZm4pIHtcclxuICAgIGZsdXNoX2NhbGxiYWNrcy5wdXNoKGZuKTtcclxufVxyXG5mdW5jdGlvbiBmbHVzaCgpIHtcclxuICAgIGNvbnN0IHNlZW5fY2FsbGJhY2tzID0gbmV3IFNldCgpO1xyXG4gICAgZG8ge1xyXG4gICAgICAgIC8vIGZpcnN0LCBjYWxsIGJlZm9yZVVwZGF0ZSBmdW5jdGlvbnNcclxuICAgICAgICAvLyBhbmQgdXBkYXRlIGNvbXBvbmVudHNcclxuICAgICAgICB3aGlsZSAoZGlydHlfY29tcG9uZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gZGlydHlfY29tcG9uZW50cy5zaGlmdCgpO1xyXG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KTtcclxuICAgICAgICAgICAgdXBkYXRlKGNvbXBvbmVudC4kJCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlIChiaW5kaW5nX2NhbGxiYWNrcy5sZW5ndGgpXHJcbiAgICAgICAgICAgIGJpbmRpbmdfY2FsbGJhY2tzLnBvcCgpKCk7XHJcbiAgICAgICAgLy8gdGhlbiwgb25jZSBjb21wb25lbnRzIGFyZSB1cGRhdGVkLCBjYWxsXHJcbiAgICAgICAgLy8gYWZ0ZXJVcGRhdGUgZnVuY3Rpb25zLiBUaGlzIG1heSBjYXVzZVxyXG4gICAgICAgIC8vIHN1YnNlcXVlbnQgdXBkYXRlcy4uLlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyX2NhbGxiYWNrcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IHJlbmRlcl9jYWxsYmFja3NbaV07XHJcbiAgICAgICAgICAgIGlmICghc2Vlbl9jYWxsYmFja3MuaGFzKGNhbGxiYWNrKSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIC8vIC4uLnNvIGd1YXJkIGFnYWluc3QgaW5maW5pdGUgbG9vcHNcclxuICAgICAgICAgICAgICAgIHNlZW5fY2FsbGJhY2tzLmFkZChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVuZGVyX2NhbGxiYWNrcy5sZW5ndGggPSAwO1xyXG4gICAgfSB3aGlsZSAoZGlydHlfY29tcG9uZW50cy5sZW5ndGgpO1xyXG4gICAgd2hpbGUgKGZsdXNoX2NhbGxiYWNrcy5sZW5ndGgpIHtcclxuICAgICAgICBmbHVzaF9jYWxsYmFja3MucG9wKCkoKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSBmYWxzZTtcclxufVxyXG5mdW5jdGlvbiB1cGRhdGUoJCQpIHtcclxuICAgIGlmICgkJC5mcmFnbWVudCkge1xyXG4gICAgICAgICQkLnVwZGF0ZSgkJC5kaXJ0eSk7XHJcbiAgICAgICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcclxuICAgICAgICAkJC5mcmFnbWVudC5wKCQkLmRpcnR5LCAkJC5jdHgpO1xyXG4gICAgICAgICQkLmRpcnR5ID0gbnVsbDtcclxuICAgICAgICAkJC5hZnRlcl91cGRhdGUuZm9yRWFjaChhZGRfcmVuZGVyX2NhbGxiYWNrKTtcclxuICAgIH1cclxufVxyXG5cclxubGV0IHByb21pc2U7XHJcbmZ1bmN0aW9uIHdhaXQoKSB7XHJcbiAgICBpZiAoIXByb21pc2UpIHtcclxuICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxufVxyXG5mdW5jdGlvbiBkaXNwYXRjaChub2RlLCBkaXJlY3Rpb24sIGtpbmQpIHtcclxuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChjdXN0b21fZXZlbnQoYCR7ZGlyZWN0aW9uID8gJ2ludHJvJyA6ICdvdXRybyd9JHtraW5kfWApKTtcclxufVxyXG5jb25zdCBvdXRyb2luZyA9IG5ldyBTZXQoKTtcclxubGV0IG91dHJvcztcclxuZnVuY3Rpb24gZ3JvdXBfb3V0cm9zKCkge1xyXG4gICAgb3V0cm9zID0ge1xyXG4gICAgICAgIHI6IDAsXHJcbiAgICAgICAgYzogW10sXHJcbiAgICAgICAgcDogb3V0cm9zIC8vIHBhcmVudCBncm91cFxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBjaGVja19vdXRyb3MoKSB7XHJcbiAgICBpZiAoIW91dHJvcy5yKSB7XHJcbiAgICAgICAgcnVuX2FsbChvdXRyb3MuYyk7XHJcbiAgICB9XHJcbiAgICBvdXRyb3MgPSBvdXRyb3MucDtcclxufVxyXG5mdW5jdGlvbiB0cmFuc2l0aW9uX2luKGJsb2NrLCBsb2NhbCkge1xyXG4gICAgaWYgKGJsb2NrICYmIGJsb2NrLmkpIHtcclxuICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xyXG4gICAgICAgIGJsb2NrLmkobG9jYWwpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHRyYW5zaXRpb25fb3V0KGJsb2NrLCBsb2NhbCwgZGV0YWNoLCBjYWxsYmFjaykge1xyXG4gICAgaWYgKGJsb2NrICYmIGJsb2NrLm8pIHtcclxuICAgICAgICBpZiAob3V0cm9pbmcuaGFzKGJsb2NrKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIG91dHJvaW5nLmFkZChibG9jayk7XHJcbiAgICAgICAgb3V0cm9zLmMucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIG91dHJvaW5nLmRlbGV0ZShibG9jayk7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRldGFjaClcclxuICAgICAgICAgICAgICAgICAgICBibG9jay5kKDEpO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJsb2NrLm8obG9jYWwpO1xyXG4gICAgfVxyXG59XHJcbmNvbnN0IG51bGxfdHJhbnNpdGlvbiA9IHsgZHVyYXRpb246IDAgfTtcclxuZnVuY3Rpb24gY3JlYXRlX2luX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xyXG4gICAgbGV0IGNvbmZpZyA9IGZuKG5vZGUsIHBhcmFtcyk7XHJcbiAgICBsZXQgcnVubmluZyA9IGZhbHNlO1xyXG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xyXG4gICAgbGV0IHRhc2s7XHJcbiAgICBsZXQgdWlkID0gMDtcclxuICAgIGZ1bmN0aW9uIGNsZWFudXAoKSB7XHJcbiAgICAgICAgaWYgKGFuaW1hdGlvbl9uYW1lKVxyXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnbygpIHtcclxuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xyXG4gICAgICAgIGlmIChjc3MpXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMCwgMSwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcywgdWlkKyspO1xyXG4gICAgICAgIHRpY2soMCwgMSk7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXk7XHJcbiAgICAgICAgY29uc3QgZW5kX3RpbWUgPSBzdGFydF90aW1lICsgZHVyYXRpb247XHJcbiAgICAgICAgaWYgKHRhc2spXHJcbiAgICAgICAgICAgIHRhc2suYWJvcnQoKTtcclxuICAgICAgICBydW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIHRydWUsICdzdGFydCcpKTtcclxuICAgICAgICB0YXNrID0gbG9vcChub3cgPT4ge1xyXG4gICAgICAgICAgICBpZiAocnVubmluZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBlbmRfdGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpY2soMSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgdHJ1ZSwgJ2VuZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBzdGFydF90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGVhc2luZygobm93IC0gc3RhcnRfdGltZSkgLyBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsZXQgc3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzdGFydCgpIHtcclxuICAgICAgICAgICAgaWYgKHN0YXJ0ZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUpO1xyXG4gICAgICAgICAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XHJcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbihnbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnbygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbnZhbGlkYXRlKCkge1xyXG4gICAgICAgICAgICBzdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbmQoKSB7XHJcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhbnVwKCk7XHJcbiAgICAgICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZV9vdXRfdHJhbnNpdGlvbihub2RlLCBmbiwgcGFyYW1zKSB7XHJcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcclxuICAgIGxldCBydW5uaW5nID0gdHJ1ZTtcclxuICAgIGxldCBhbmltYXRpb25fbmFtZTtcclxuICAgIGNvbnN0IGdyb3VwID0gb3V0cm9zO1xyXG4gICAgZ3JvdXAuciArPSAxO1xyXG4gICAgZnVuY3Rpb24gZ28oKSB7XHJcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcclxuICAgICAgICBpZiAoY3NzKVxyXG4gICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDEsIDAsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MpO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5O1xyXG4gICAgICAgIGNvbnN0IGVuZF90aW1lID0gc3RhcnRfdGltZSArIGR1cmF0aW9uO1xyXG4gICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gobm9kZSwgZmFsc2UsICdzdGFydCcpKTtcclxuICAgICAgICBsb29wKG5vdyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm93ID49IGVuZF90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGljaygwLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBmYWxzZSwgJ2VuZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghLS1ncm91cC5yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgd2lsbCByZXN1bHQgaW4gYGVuZCgpYCBiZWluZyBjYWxsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvIHdlIGRvbid0IG5lZWQgdG8gY2xlYW4gdXAgaGVyZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW5fYWxsKGdyb3VwLmMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobm93ID49IHN0YXJ0X3RpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gZWFzaW5nKChub3cgLSBzdGFydF90aW1lKSAvIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWNrKDEgLSB0LCB0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcnVubmluZztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChpc19mdW5jdGlvbihjb25maWcpKSB7XHJcbiAgICAgICAgd2FpdCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZygpO1xyXG4gICAgICAgICAgICBnbygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZ28oKTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZW5kKHJlc2V0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNldCAmJiBjb25maWcudGljaykge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLnRpY2soMSwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XHJcbiAgICAgICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZV9iaWRpcmVjdGlvbmFsX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcywgaW50cm8pIHtcclxuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xyXG4gICAgbGV0IHQgPSBpbnRybyA/IDAgOiAxO1xyXG4gICAgbGV0IHJ1bm5pbmdfcHJvZ3JhbSA9IG51bGw7XHJcbiAgICBsZXQgcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcclxuICAgIGxldCBhbmltYXRpb25fbmFtZSA9IG51bGw7XHJcbiAgICBmdW5jdGlvbiBjbGVhcl9hbmltYXRpb24oKSB7XHJcbiAgICAgICAgaWYgKGFuaW1hdGlvbl9uYW1lKVxyXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpbml0KHByb2dyYW0sIGR1cmF0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgZCA9IHByb2dyYW0uYiAtIHQ7XHJcbiAgICAgICAgZHVyYXRpb24gKj0gTWF0aC5hYnMoZCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYTogdCxcclxuICAgICAgICAgICAgYjogcHJvZ3JhbS5iLFxyXG4gICAgICAgICAgICBkLFxyXG4gICAgICAgICAgICBkdXJhdGlvbixcclxuICAgICAgICAgICAgc3RhcnQ6IHByb2dyYW0uc3RhcnQsXHJcbiAgICAgICAgICAgIGVuZDogcHJvZ3JhbS5zdGFydCArIGR1cmF0aW9uLFxyXG4gICAgICAgICAgICBncm91cDogcHJvZ3JhbS5ncm91cFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnbyhiKSB7XHJcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcclxuICAgICAgICBjb25zdCBwcm9ncmFtID0ge1xyXG4gICAgICAgICAgICBzdGFydDogbm93KCkgKyBkZWxheSxcclxuICAgICAgICAgICAgYlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKCFiKSB7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXHJcbiAgICAgICAgICAgIHByb2dyYW0uZ3JvdXAgPSBvdXRyb3M7XHJcbiAgICAgICAgICAgIG91dHJvcy5yICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0pIHtcclxuICAgICAgICAgICAgcGVuZGluZ19wcm9ncmFtID0gcHJvZ3JhbTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYW4gaW50cm8sIGFuZCB0aGVyZSdzIGEgZGVsYXksIHdlIG5lZWQgdG8gZG9cclxuICAgICAgICAgICAgLy8gYW4gaW5pdGlhbCB0aWNrIGFuZC9vciBhcHBseSBDU1MgYW5pbWF0aW9uIGltbWVkaWF0ZWx5XHJcbiAgICAgICAgICAgIGlmIChjc3MpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCB0LCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYilcclxuICAgICAgICAgICAgICAgIHRpY2soMCwgMSk7XHJcbiAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IGluaXQocHJvZ3JhbSwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIGIsICdzdGFydCcpKTtcclxuICAgICAgICAgICAgbG9vcChub3cgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBlbmRpbmdfcHJvZ3JhbSAmJiBub3cgPiBwZW5kaW5nX3Byb2dyYW0uc3RhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBpbml0KHBlbmRpbmdfcHJvZ3JhbSwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdfcHJvZ3JhbSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgcnVubmluZ19wcm9ncmFtLmIsICdzdGFydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgdCwgcnVubmluZ19wcm9ncmFtLmIsIHJ1bm5pbmdfcHJvZ3JhbS5kdXJhdGlvbiwgMCwgZWFzaW5nLCBjb25maWcuY3NzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocnVubmluZ19wcm9ncmFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBydW5uaW5nX3Byb2dyYW0uZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2sodCA9IHJ1bm5pbmdfcHJvZ3JhbS5iLCAxIC0gdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHJ1bm5pbmdfcHJvZ3JhbS5iLCAnZW5kJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGVuZGluZ19wcm9ncmFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSdyZSBkb25lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVubmluZ19wcm9ncmFtLmIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnRybyDigJQgd2UgY2FuIHRpZHkgdXAgaW1tZWRpYXRlbHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG91dHJvIOKAlCBuZWVkcyB0byBiZSBjb29yZGluYXRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghLS1ydW5uaW5nX3Byb2dyYW0uZ3JvdXAucilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuX2FsbChydW5uaW5nX3Byb2dyYW0uZ3JvdXAuYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobm93ID49IHJ1bm5pbmdfcHJvZ3JhbS5zdGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gbm93IC0gcnVubmluZ19wcm9ncmFtLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ID0gcnVubmluZ19wcm9ncmFtLmEgKyBydW5uaW5nX3Byb2dyYW0uZCAqIGVhc2luZyhwIC8gcnVubmluZ19wcm9ncmFtLmR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhKHJ1bm5pbmdfcHJvZ3JhbSB8fCBwZW5kaW5nX3Byb2dyYW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJ1bihiKSB7XHJcbiAgICAgICAgICAgIGlmIChpc19mdW5jdGlvbihjb25maWcpKSB7XHJcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdvKGIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnbyhiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW5kKCkge1xyXG4gICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcclxuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVfcHJvbWlzZShwcm9taXNlLCBpbmZvKSB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGluZm8udG9rZW4gPSB7fTtcclxuICAgIGZ1bmN0aW9uIHVwZGF0ZSh0eXBlLCBpbmRleCwga2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIGlmIChpbmZvLnRva2VuICE9PSB0b2tlbilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGluZm8ucmVzb2x2ZWQgPSBrZXkgJiYgeyBba2V5XTogdmFsdWUgfTtcclxuICAgICAgICBjb25zdCBjaGlsZF9jdHggPSBhc3NpZ24oYXNzaWduKHt9LCBpbmZvLmN0eCksIGluZm8ucmVzb2x2ZWQpO1xyXG4gICAgICAgIGNvbnN0IGJsb2NrID0gdHlwZSAmJiAoaW5mby5jdXJyZW50ID0gdHlwZSkoY2hpbGRfY3R4KTtcclxuICAgICAgICBpZiAoaW5mby5ibG9jaykge1xyXG4gICAgICAgICAgICBpZiAoaW5mby5ibG9ja3MpIHtcclxuICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzLmZvckVhY2goKGJsb2NrLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IGluZGV4ICYmIGJsb2NrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwX291dHJvcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5ibG9ja3NbaV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tfb3V0cm9zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmZvLmJsb2NrLmQoMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmxvY2suYygpO1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uX2luKGJsb2NrLCAxKTtcclxuICAgICAgICAgICAgYmxvY2subShpbmZvLm1vdW50KCksIGluZm8uYW5jaG9yKTtcclxuICAgICAgICAgICAgZmx1c2goKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5mby5ibG9jayA9IGJsb2NrO1xyXG4gICAgICAgIGlmIChpbmZvLmJsb2NrcylcclxuICAgICAgICAgICAgaW5mby5ibG9ja3NbaW5kZXhdID0gYmxvY2s7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNfcHJvbWlzZShwcm9taXNlKSkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRfY29tcG9uZW50ID0gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGN1cnJlbnRfY29tcG9uZW50KTtcclxuICAgICAgICAgICAgdXBkYXRlKGluZm8udGhlbiwgMSwgaW5mby52YWx1ZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XHJcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY3VycmVudF9jb21wb25lbnQpO1xyXG4gICAgICAgICAgICB1cGRhdGUoaW5mby5jYXRjaCwgMiwgaW5mby5lcnJvciwgZXJyb3IpO1xyXG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gaWYgd2UgcHJldmlvdXNseSBoYWQgYSB0aGVuL2NhdGNoIGJsb2NrLCBkZXN0cm95IGl0XHJcbiAgICAgICAgaWYgKGluZm8uY3VycmVudCAhPT0gaW5mby5wZW5kaW5nKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnBlbmRpbmcsIDApO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAoaW5mby5jdXJyZW50ICE9PSBpbmZvLnRoZW4pIHtcclxuICAgICAgICAgICAgdXBkYXRlKGluZm8udGhlbiwgMSwgaW5mby52YWx1ZSwgcHJvbWlzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmZvLnJlc29sdmVkID0geyBbaW5mby52YWx1ZV06IHByb21pc2UgfTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgZ2xvYmFscyA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbCk7XHJcblxyXG5mdW5jdGlvbiBkZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcclxuICAgIGJsb2NrLmQoMSk7XHJcbiAgICBsb29rdXAuZGVsZXRlKGJsb2NrLmtleSk7XHJcbn1cclxuZnVuY3Rpb24gb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xyXG4gICAgdHJhbnNpdGlvbl9vdXQoYmxvY2ssIDEsIDEsICgpID0+IHtcclxuICAgICAgICBsb29rdXAuZGVsZXRlKGJsb2NrLmtleSk7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBmaXhfYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xyXG4gICAgYmxvY2suZigpO1xyXG4gICAgZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKTtcclxufVxyXG5mdW5jdGlvbiBmaXhfYW5kX291dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcclxuICAgIGJsb2NrLmYoKTtcclxuICAgIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApO1xyXG59XHJcbmZ1bmN0aW9uIHVwZGF0ZV9rZXllZF9lYWNoKG9sZF9ibG9ja3MsIGNoYW5nZWQsIGdldF9rZXksIGR5bmFtaWMsIGN0eCwgbGlzdCwgbG9va3VwLCBub2RlLCBkZXN0cm95LCBjcmVhdGVfZWFjaF9ibG9jaywgbmV4dCwgZ2V0X2NvbnRleHQpIHtcclxuICAgIGxldCBvID0gb2xkX2Jsb2Nrcy5sZW5ndGg7XHJcbiAgICBsZXQgbiA9IGxpc3QubGVuZ3RoO1xyXG4gICAgbGV0IGkgPSBvO1xyXG4gICAgY29uc3Qgb2xkX2luZGV4ZXMgPSB7fTtcclxuICAgIHdoaWxlIChpLS0pXHJcbiAgICAgICAgb2xkX2luZGV4ZXNbb2xkX2Jsb2Nrc1tpXS5rZXldID0gaTtcclxuICAgIGNvbnN0IG5ld19ibG9ja3MgPSBbXTtcclxuICAgIGNvbnN0IG5ld19sb29rdXAgPSBuZXcgTWFwKCk7XHJcbiAgICBjb25zdCBkZWx0YXMgPSBuZXcgTWFwKCk7XHJcbiAgICBpID0gbjtcclxuICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICBjb25zdCBjaGlsZF9jdHggPSBnZXRfY29udGV4dChjdHgsIGxpc3QsIGkpO1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGdldF9rZXkoY2hpbGRfY3R4KTtcclxuICAgICAgICBsZXQgYmxvY2sgPSBsb29rdXAuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKCFibG9jaykge1xyXG4gICAgICAgICAgICBibG9jayA9IGNyZWF0ZV9lYWNoX2Jsb2NrKGtleSwgY2hpbGRfY3R4KTtcclxuICAgICAgICAgICAgYmxvY2suYygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkeW5hbWljKSB7XHJcbiAgICAgICAgICAgIGJsb2NrLnAoY2hhbmdlZCwgY2hpbGRfY3R4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3X2xvb2t1cC5zZXQoa2V5LCBuZXdfYmxvY2tzW2ldID0gYmxvY2spO1xyXG4gICAgICAgIGlmIChrZXkgaW4gb2xkX2luZGV4ZXMpXHJcbiAgICAgICAgICAgIGRlbHRhcy5zZXQoa2V5LCBNYXRoLmFicyhpIC0gb2xkX2luZGV4ZXNba2V5XSkpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgd2lsbF9tb3ZlID0gbmV3IFNldCgpO1xyXG4gICAgY29uc3QgZGlkX21vdmUgPSBuZXcgU2V0KCk7XHJcbiAgICBmdW5jdGlvbiBpbnNlcnQoYmxvY2spIHtcclxuICAgICAgICB0cmFuc2l0aW9uX2luKGJsb2NrLCAxKTtcclxuICAgICAgICBibG9jay5tKG5vZGUsIG5leHQpO1xyXG4gICAgICAgIGxvb2t1cC5zZXQoYmxvY2sua2V5LCBibG9jayk7XHJcbiAgICAgICAgbmV4dCA9IGJsb2NrLmZpcnN0O1xyXG4gICAgICAgIG4tLTtcclxuICAgIH1cclxuICAgIHdoaWxlIChvICYmIG4pIHtcclxuICAgICAgICBjb25zdCBuZXdfYmxvY2sgPSBuZXdfYmxvY2tzW24gLSAxXTtcclxuICAgICAgICBjb25zdCBvbGRfYmxvY2sgPSBvbGRfYmxvY2tzW28gLSAxXTtcclxuICAgICAgICBjb25zdCBuZXdfa2V5ID0gbmV3X2Jsb2NrLmtleTtcclxuICAgICAgICBjb25zdCBvbGRfa2V5ID0gb2xkX2Jsb2NrLmtleTtcclxuICAgICAgICBpZiAobmV3X2Jsb2NrID09PSBvbGRfYmxvY2spIHtcclxuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xyXG4gICAgICAgICAgICBuZXh0ID0gbmV3X2Jsb2NrLmZpcnN0O1xyXG4gICAgICAgICAgICBvLS07XHJcbiAgICAgICAgICAgIG4tLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoIW5ld19sb29rdXAuaGFzKG9sZF9rZXkpKSB7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSBvbGQgYmxvY2tcclxuICAgICAgICAgICAgZGVzdHJveShvbGRfYmxvY2ssIGxvb2t1cCk7XHJcbiAgICAgICAgICAgIG8tLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoIWxvb2t1cC5oYXMobmV3X2tleSkgfHwgd2lsbF9tb3ZlLmhhcyhuZXdfa2V5KSkge1xyXG4gICAgICAgICAgICBpbnNlcnQobmV3X2Jsb2NrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGlkX21vdmUuaGFzKG9sZF9rZXkpKSB7XHJcbiAgICAgICAgICAgIG8tLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZGVsdGFzLmdldChuZXdfa2V5KSA+IGRlbHRhcy5nZXQob2xkX2tleSkpIHtcclxuICAgICAgICAgICAgZGlkX21vdmUuYWRkKG5ld19rZXkpO1xyXG4gICAgICAgICAgICBpbnNlcnQobmV3X2Jsb2NrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbGxfbW92ZS5hZGQob2xkX2tleSk7XHJcbiAgICAgICAgICAgIG8tLTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB3aGlsZSAoby0tKSB7XHJcbiAgICAgICAgY29uc3Qgb2xkX2Jsb2NrID0gb2xkX2Jsb2Nrc1tvXTtcclxuICAgICAgICBpZiAoIW5ld19sb29rdXAuaGFzKG9sZF9ibG9jay5rZXkpKVxyXG4gICAgICAgICAgICBkZXN0cm95KG9sZF9ibG9jaywgbG9va3VwKTtcclxuICAgIH1cclxuICAgIHdoaWxlIChuKVxyXG4gICAgICAgIGluc2VydChuZXdfYmxvY2tzW24gLSAxXSk7XHJcbiAgICByZXR1cm4gbmV3X2Jsb2NrcztcclxufVxyXG5mdW5jdGlvbiBtZWFzdXJlKGJsb2Nrcykge1xyXG4gICAgY29uc3QgcmVjdHMgPSB7fTtcclxuICAgIGxldCBpID0gYmxvY2tzLmxlbmd0aDtcclxuICAgIHdoaWxlIChpLS0pXHJcbiAgICAgICAgcmVjdHNbYmxvY2tzW2ldLmtleV0gPSBibG9ja3NbaV0ubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIHJldHVybiByZWN0cztcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0X3NwcmVhZF91cGRhdGUobGV2ZWxzLCB1cGRhdGVzKSB7XHJcbiAgICBjb25zdCB1cGRhdGUgPSB7fTtcclxuICAgIGNvbnN0IHRvX251bGxfb3V0ID0ge307XHJcbiAgICBjb25zdCBhY2NvdW50ZWRfZm9yID0geyAkJHNjb3BlOiAxIH07XHJcbiAgICBsZXQgaSA9IGxldmVscy5sZW5ndGg7XHJcbiAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgY29uc3QgbyA9IGxldmVsc1tpXTtcclxuICAgICAgICBjb25zdCBuID0gdXBkYXRlc1tpXTtcclxuICAgICAgICBpZiAobikge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIShrZXkgaW4gbikpXHJcbiAgICAgICAgICAgICAgICAgICAgdG9fbnVsbF9vdXRba2V5XSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhY2NvdW50ZWRfZm9yW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVba2V5XSA9IG5ba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBhY2NvdW50ZWRfZm9yW2tleV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldmVsc1tpXSA9IG47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvKSB7XHJcbiAgICAgICAgICAgICAgICBhY2NvdW50ZWRfZm9yW2tleV0gPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9fbnVsbF9vdXQpIHtcclxuICAgICAgICBpZiAoIShrZXkgaW4gdXBkYXRlKSlcclxuICAgICAgICAgICAgdXBkYXRlW2tleV0gPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXBkYXRlO1xyXG59XHJcbmZ1bmN0aW9uIGdldF9zcHJlYWRfb2JqZWN0KHNwcmVhZF9wcm9wcykge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzcHJlYWRfcHJvcHMgPT09ICdvYmplY3QnICYmIHNwcmVhZF9wcm9wcyAhPT0gbnVsbCA/IHNwcmVhZF9wcm9wcyA6IHt9O1xyXG59XHJcblxyXG5jb25zdCBpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3RlciA9IC9bXFxzJ1wiPi89XFx1e0ZERDB9LVxcdXtGREVGfVxcdXtGRkZFfVxcdXtGRkZGfVxcdXsxRkZGRX1cXHV7MUZGRkZ9XFx1ezJGRkZFfVxcdXsyRkZGRn1cXHV7M0ZGRkV9XFx1ezNGRkZGfVxcdXs0RkZGRX1cXHV7NEZGRkZ9XFx1ezVGRkZFfVxcdXs1RkZGRn1cXHV7NkZGRkV9XFx1ezZGRkZGfVxcdXs3RkZGRX1cXHV7N0ZGRkZ9XFx1ezhGRkZFfVxcdXs4RkZGRn1cXHV7OUZGRkV9XFx1ezlGRkZGfVxcdXtBRkZGRX1cXHV7QUZGRkZ9XFx1e0JGRkZFfVxcdXtCRkZGRn1cXHV7Q0ZGRkV9XFx1e0NGRkZGfVxcdXtERkZGRX1cXHV7REZGRkZ9XFx1e0VGRkZFfVxcdXtFRkZGRn1cXHV7RkZGRkV9XFx1e0ZGRkZGfVxcdXsxMEZGRkV9XFx1ezEwRkZGRn1dL3U7XHJcbi8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2F0dHJpYnV0ZXMtMlxyXG4vLyBodHRwczovL2luZnJhLnNwZWMud2hhdHdnLm9yZy8jbm9uY2hhcmFjdGVyXHJcbmZ1bmN0aW9uIHNwcmVhZChhcmdzKSB7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSwgLi4uYXJncyk7XHJcbiAgICBsZXQgc3RyID0gJyc7XHJcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICAgIGlmIChpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3Rlci50ZXN0KG5hbWUpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBhdHRyaWJ1dGVzW25hbWVdO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKVxyXG4gICAgICAgICAgICBzdHIgKz0gXCIgXCIgKyBuYW1lO1xyXG4gICAgICAgIGNvbnN0IGVzY2FwZWQgPSBTdHJpbmcodmFsdWUpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJiMzNDsnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKTtcclxuICAgICAgICBzdHIgKz0gXCIgXCIgKyBuYW1lICsgXCI9XCIgKyBKU09OLnN0cmluZ2lmeShlc2NhcGVkKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHN0cjtcclxufVxyXG5jb25zdCBlc2NhcGVkID0ge1xyXG4gICAgJ1wiJzogJyZxdW90OycsXHJcbiAgICBcIidcIjogJyYjMzk7JyxcclxuICAgICcmJzogJyZhbXA7JyxcclxuICAgICc8JzogJyZsdDsnLFxyXG4gICAgJz4nOiAnJmd0OydcclxufTtcclxuZnVuY3Rpb24gZXNjYXBlKGh0bWwpIHtcclxuICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvW1wiJyY8Pl0vZywgbWF0Y2ggPT4gZXNjYXBlZFttYXRjaF0pO1xyXG59XHJcbmZ1bmN0aW9uIGVhY2goaXRlbXMsIGZuKSB7XHJcbiAgICBsZXQgc3RyID0gJyc7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgc3RyICs9IGZuKGl0ZW1zW2ldLCBpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHI7XHJcbn1cclxuY29uc3QgbWlzc2luZ19jb21wb25lbnQgPSB7XHJcbiAgICAkJHJlbmRlcjogKCkgPT4gJydcclxufTtcclxuZnVuY3Rpb24gdmFsaWRhdGVfY29tcG9uZW50KGNvbXBvbmVudCwgbmFtZSkge1xyXG4gICAgaWYgKCFjb21wb25lbnQgfHwgIWNvbXBvbmVudC4kJHJlbmRlcikge1xyXG4gICAgICAgIGlmIChuYW1lID09PSAnc3ZlbHRlOmNvbXBvbmVudCcpXHJcbiAgICAgICAgICAgIG5hbWUgKz0gJyB0aGlzPXsuLi59JztcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYDwke25hbWV9PiBpcyBub3QgYSB2YWxpZCBTU1IgY29tcG9uZW50LiBZb3UgbWF5IG5lZWQgdG8gcmV2aWV3IHlvdXIgYnVpbGQgY29uZmlnIHRvIGVuc3VyZSB0aGF0IGRlcGVuZGVuY2llcyBhcmUgY29tcGlsZWQsIHJhdGhlciB0aGFuIGltcG9ydGVkIGFzIHByZS1jb21waWxlZCBtb2R1bGVzYCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29tcG9uZW50O1xyXG59XHJcbmZ1bmN0aW9uIGRlYnVnKGZpbGUsIGxpbmUsIGNvbHVtbiwgdmFsdWVzKSB7XHJcbiAgICBjb25zb2xlLmxvZyhge0BkZWJ1Z30gJHtmaWxlID8gZmlsZSArICcgJyA6ICcnfSgke2xpbmV9OiR7Y29sdW1ufSlgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXHJcbiAgICBjb25zb2xlLmxvZyh2YWx1ZXMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcclxuICAgIHJldHVybiAnJztcclxufVxyXG5sZXQgb25fZGVzdHJveTtcclxuZnVuY3Rpb24gY3JlYXRlX3Nzcl9jb21wb25lbnQoZm4pIHtcclxuICAgIGZ1bmN0aW9uICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIGJpbmRpbmdzLCBzbG90cykge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudF9jb21wb25lbnQgPSBjdXJyZW50X2NvbXBvbmVudDtcclxuICAgICAgICBjb25zdCAkJCA9IHtcclxuICAgICAgICAgICAgb25fZGVzdHJveSxcclxuICAgICAgICAgICAgY29udGV4dDogbmV3IE1hcChwYXJlbnRfY29tcG9uZW50ID8gcGFyZW50X2NvbXBvbmVudC4kJC5jb250ZXh0IDogW10pLFxyXG4gICAgICAgICAgICAvLyB0aGVzZSB3aWxsIGJlIGltbWVkaWF0ZWx5IGRpc2NhcmRlZFxyXG4gICAgICAgICAgICBvbl9tb3VudDogW10sXHJcbiAgICAgICAgICAgIGJlZm9yZV91cGRhdGU6IFtdLFxyXG4gICAgICAgICAgICBhZnRlcl91cGRhdGU6IFtdLFxyXG4gICAgICAgICAgICBjYWxsYmFja3M6IGJsYW5rX29iamVjdCgpXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoeyAkJCB9KTtcclxuICAgICAgICBjb25zdCBodG1sID0gZm4ocmVzdWx0LCBwcm9wcywgYmluZGluZ3MsIHNsb3RzKTtcclxuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQocGFyZW50X2NvbXBvbmVudCk7XHJcbiAgICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcjogKHByb3BzID0ge30sIG9wdGlvbnMgPSB7fSkgPT4ge1xyXG4gICAgICAgICAgICBvbl9kZXN0cm95ID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgaGVhZDogJycsIGNzczogbmV3IFNldCgpIH07XHJcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSAkJHJlbmRlcihyZXN1bHQsIHByb3BzLCB7fSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHJ1bl9hbGwob25fZGVzdHJveSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBodG1sLFxyXG4gICAgICAgICAgICAgICAgY3NzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29kZTogQXJyYXkuZnJvbShyZXN1bHQuY3NzKS5tYXAoY3NzID0+IGNzcy5jb2RlKS5qb2luKCdcXG4nKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IG51bGwgLy8gVE9ET1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGhlYWQ6IHJlc3VsdC5oZWFkXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICAkJHJlbmRlclxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBhZGRfYXR0cmlidXRlKG5hbWUsIHZhbHVlLCBib29sZWFuKSB7XHJcbiAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCAoYm9vbGVhbiAmJiAhdmFsdWUpKVxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIHJldHVybiBgICR7bmFtZX0ke3ZhbHVlID09PSB0cnVlID8gJycgOiBgPSR7dHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IEpTT04uc3RyaW5naWZ5KGVzY2FwZSh2YWx1ZSkpIDogYFwiJHt2YWx1ZX1cImB9YH1gO1xyXG59XHJcbmZ1bmN0aW9uIGFkZF9jbGFzc2VzKGNsYXNzZXMpIHtcclxuICAgIHJldHVybiBjbGFzc2VzID8gYCBjbGFzcz1cIiR7Y2xhc3Nlc31cImAgOiBgYDtcclxufVxyXG5cclxuZnVuY3Rpb24gYmluZChjb21wb25lbnQsIG5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAoY29tcG9uZW50LiQkLnByb3BzLmluZGV4T2YobmFtZSkgPT09IC0xKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGNvbXBvbmVudC4kJC5ib3VuZFtuYW1lXSA9IGNhbGxiYWNrO1xyXG4gICAgY2FsbGJhY2soY29tcG9uZW50LiQkLmN0eFtuYW1lXSk7XHJcbn1cclxuZnVuY3Rpb24gbW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgdGFyZ2V0LCBhbmNob3IpIHtcclxuICAgIGNvbnN0IHsgZnJhZ21lbnQsIG9uX21vdW50LCBvbl9kZXN0cm95LCBhZnRlcl91cGRhdGUgfSA9IGNvbXBvbmVudC4kJDtcclxuICAgIGZyYWdtZW50Lm0odGFyZ2V0LCBhbmNob3IpO1xyXG4gICAgLy8gb25Nb3VudCBoYXBwZW5zIGJlZm9yZSB0aGUgaW5pdGlhbCBhZnRlclVwZGF0ZVxyXG4gICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV3X29uX2Rlc3Ryb3kgPSBvbl9tb3VudC5tYXAocnVuKS5maWx0ZXIoaXNfZnVuY3Rpb24pO1xyXG4gICAgICAgIGlmIChvbl9kZXN0cm95KSB7XHJcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3kucHVzaCguLi5uZXdfb25fZGVzdHJveSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBFZGdlIGNhc2UgLSBjb21wb25lbnQgd2FzIGRlc3Ryb3llZCBpbW1lZGlhdGVseSxcclxuICAgICAgICAgICAgLy8gbW9zdCBsaWtlbHkgYXMgYSByZXN1bHQgb2YgYSBiaW5kaW5nIGluaXRpYWxpc2luZ1xyXG4gICAgICAgICAgICBydW5fYWxsKG5ld19vbl9kZXN0cm95KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29tcG9uZW50LiQkLm9uX21vdW50ID0gW107XHJcbiAgICB9KTtcclxuICAgIGFmdGVyX3VwZGF0ZS5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xyXG59XHJcbmZ1bmN0aW9uIGRlc3Ryb3lfY29tcG9uZW50KGNvbXBvbmVudCwgZGV0YWNoaW5nKSB7XHJcbiAgICBpZiAoY29tcG9uZW50LiQkLmZyYWdtZW50KSB7XHJcbiAgICAgICAgcnVuX2FsbChjb21wb25lbnQuJCQub25fZGVzdHJveSk7XHJcbiAgICAgICAgY29tcG9uZW50LiQkLmZyYWdtZW50LmQoZGV0YWNoaW5nKTtcclxuICAgICAgICAvLyBUT0RPIG51bGwgb3V0IG90aGVyIHJlZnMsIGluY2x1ZGluZyBjb21wb25lbnQuJCQgKGJ1dCBuZWVkIHRvXHJcbiAgICAgICAgLy8gcHJlc2VydmUgZmluYWwgc3RhdGU/KVxyXG4gICAgICAgIGNvbXBvbmVudC4kJC5vbl9kZXN0cm95ID0gY29tcG9uZW50LiQkLmZyYWdtZW50ID0gbnVsbDtcclxuICAgICAgICBjb21wb25lbnQuJCQuY3R4ID0ge307XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gbWFrZV9kaXJ0eShjb21wb25lbnQsIGtleSkge1xyXG4gICAgaWYgKCFjb21wb25lbnQuJCQuZGlydHkpIHtcclxuICAgICAgICBkaXJ0eV9jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcclxuICAgICAgICBzY2hlZHVsZV91cGRhdGUoKTtcclxuICAgICAgICBjb21wb25lbnQuJCQuZGlydHkgPSBibGFua19vYmplY3QoKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudC4kJC5kaXJ0eVtrZXldID0gdHJ1ZTtcclxufVxyXG5mdW5jdGlvbiBpbml0KGNvbXBvbmVudCwgb3B0aW9ucywgaW5zdGFuY2UsIGNyZWF0ZV9mcmFnbWVudCwgbm90X2VxdWFsLCBwcm9wX25hbWVzKSB7XHJcbiAgICBjb25zdCBwYXJlbnRfY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XHJcbiAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KTtcclxuICAgIGNvbnN0IHByb3BzID0gb3B0aW9ucy5wcm9wcyB8fCB7fTtcclxuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkID0ge1xyXG4gICAgICAgIGZyYWdtZW50OiBudWxsLFxyXG4gICAgICAgIGN0eDogbnVsbCxcclxuICAgICAgICAvLyBzdGF0ZVxyXG4gICAgICAgIHByb3BzOiBwcm9wX25hbWVzLFxyXG4gICAgICAgIHVwZGF0ZTogbm9vcCxcclxuICAgICAgICBub3RfZXF1YWwsXHJcbiAgICAgICAgYm91bmQ6IGJsYW5rX29iamVjdCgpLFxyXG4gICAgICAgIC8vIGxpZmVjeWNsZVxyXG4gICAgICAgIG9uX21vdW50OiBbXSxcclxuICAgICAgICBvbl9kZXN0cm95OiBbXSxcclxuICAgICAgICBiZWZvcmVfdXBkYXRlOiBbXSxcclxuICAgICAgICBhZnRlcl91cGRhdGU6IFtdLFxyXG4gICAgICAgIGNvbnRleHQ6IG5ldyBNYXAocGFyZW50X2NvbXBvbmVudCA/IHBhcmVudF9jb21wb25lbnQuJCQuY29udGV4dCA6IFtdKSxcclxuICAgICAgICAvLyBldmVyeXRoaW5nIGVsc2VcclxuICAgICAgICBjYWxsYmFja3M6IGJsYW5rX29iamVjdCgpLFxyXG4gICAgICAgIGRpcnR5OiBudWxsXHJcbiAgICB9O1xyXG4gICAgbGV0IHJlYWR5ID0gZmFsc2U7XHJcbiAgICAkJC5jdHggPSBpbnN0YW5jZVxyXG4gICAgICAgID8gaW5zdGFuY2UoY29tcG9uZW50LCBwcm9wcywgKGtleSwgcmV0LCB2YWx1ZSA9IHJldCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoJCQuY3R4ICYmIG5vdF9lcXVhbCgkJC5jdHhba2V5XSwgJCQuY3R4W2tleV0gPSB2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkJC5ib3VuZFtrZXldKVxyXG4gICAgICAgICAgICAgICAgICAgICQkLmJvdW5kW2tleV0odmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlYWR5KVxyXG4gICAgICAgICAgICAgICAgICAgIG1ha2VfZGlydHkoY29tcG9uZW50LCBrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICA6IHByb3BzO1xyXG4gICAgJCQudXBkYXRlKCk7XHJcbiAgICByZWFkeSA9IHRydWU7XHJcbiAgICBydW5fYWxsKCQkLmJlZm9yZV91cGRhdGUpO1xyXG4gICAgJCQuZnJhZ21lbnQgPSBjcmVhdGVfZnJhZ21lbnQoJCQuY3R4KTtcclxuICAgIGlmIChvcHRpb25zLnRhcmdldCkge1xyXG4gICAgICAgIGlmIChvcHRpb25zLmh5ZHJhdGUpIHtcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cclxuICAgICAgICAgICAgJCQuZnJhZ21lbnQubChjaGlsZHJlbihvcHRpb25zLnRhcmdldCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cclxuICAgICAgICAgICAgJCQuZnJhZ21lbnQuYygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy5pbnRybylcclxuICAgICAgICAgICAgdHJhbnNpdGlvbl9pbihjb21wb25lbnQuJCQuZnJhZ21lbnQpO1xyXG4gICAgICAgIG1vdW50X2NvbXBvbmVudChjb21wb25lbnQsIG9wdGlvbnMudGFyZ2V0LCBvcHRpb25zLmFuY2hvcik7XHJcbiAgICAgICAgZmx1c2goKTtcclxuICAgIH1cclxuICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChwYXJlbnRfY29tcG9uZW50KTtcclxufVxyXG5sZXQgU3ZlbHRlRWxlbWVudDtcclxuaWYgKHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIFN2ZWx0ZUVsZW1lbnQgPSBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLiQkLnNsb3R0ZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMuJCQuc2xvdHRlZFtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0ciwgX29sZFZhbHVlLCBuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzW2F0dHJdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRkZXN0cm95KCkge1xyXG4gICAgICAgICAgICBkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcclxuICAgICAgICAgICAgdGhpcy4kZGVzdHJveSA9IG5vb3A7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRvbih0eXBlLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLyBUT0RPIHNob3VsZCB0aGlzIGRlbGVnYXRlIHRvIGFkZEV2ZW50TGlzdGVuZXI/XHJcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSB8fCAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gPSBbXSkpO1xyXG4gICAgICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzZXQoKSB7XHJcbiAgICAgICAgICAgIC8vIG92ZXJyaWRkZW4gYnkgaW5zdGFuY2UsIGlmIGl0IGhhcyBwcm9wc1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuY2xhc3MgU3ZlbHRlQ29tcG9uZW50IHtcclxuICAgICRkZXN0cm95KCkge1xyXG4gICAgICAgIGRlc3Ryb3lfY29tcG9uZW50KHRoaXMsIDEpO1xyXG4gICAgICAgIHRoaXMuJGRlc3Ryb3kgPSBub29wO1xyXG4gICAgfVxyXG4gICAgJG9uKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdIHx8ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSA9IFtdKSk7XHJcbiAgICAgICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKVxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgICRzZXQoKSB7XHJcbiAgICAgICAgLy8gb3ZlcnJpZGRlbiBieSBpbnN0YW5jZSwgaWYgaXQgaGFzIHByb3BzXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BhdGNoX2Rldih0eXBlLCBkZXRhaWwpIHtcclxuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY3VzdG9tX2V2ZW50KHR5cGUsIGRldGFpbCkpO1xyXG59XHJcbmZ1bmN0aW9uIGFwcGVuZF9kZXYodGFyZ2V0LCBub2RlKSB7XHJcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01JbnNlcnRcIiwgeyB0YXJnZXQsIG5vZGUgfSk7XHJcbiAgICBhcHBlbmQodGFyZ2V0LCBub2RlKTtcclxufVxyXG5mdW5jdGlvbiBpbnNlcnRfZGV2KHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XHJcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01JbnNlcnRcIiwgeyB0YXJnZXQsIG5vZGUsIGFuY2hvciB9KTtcclxuICAgIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcik7XHJcbn1cclxuZnVuY3Rpb24gZGV0YWNoX2Rldihub2RlKSB7XHJcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01SZW1vdmVcIiwgeyBub2RlIH0pO1xyXG4gICAgZGV0YWNoKG5vZGUpO1xyXG59XHJcbmZ1bmN0aW9uIGRldGFjaF9iZXR3ZWVuX2RldihiZWZvcmUsIGFmdGVyKSB7XHJcbiAgICB3aGlsZSAoYmVmb3JlLm5leHRTaWJsaW5nICYmIGJlZm9yZS5uZXh0U2libGluZyAhPT0gYWZ0ZXIpIHtcclxuICAgICAgICBkZXRhY2hfZGV2KGJlZm9yZS5uZXh0U2libGluZyk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZGV0YWNoX2JlZm9yZV9kZXYoYWZ0ZXIpIHtcclxuICAgIHdoaWxlIChhZnRlci5wcmV2aW91c1NpYmxpbmcpIHtcclxuICAgICAgICBkZXRhY2hfZGV2KGFmdGVyLnByZXZpb3VzU2libGluZyk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZGV0YWNoX2FmdGVyX2RldihiZWZvcmUpIHtcclxuICAgIHdoaWxlIChiZWZvcmUubmV4dFNpYmxpbmcpIHtcclxuICAgICAgICBkZXRhY2hfZGV2KGJlZm9yZS5uZXh0U2libGluZyk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gbGlzdGVuX2Rldihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucywgaGFzX3ByZXZlbnRfZGVmYXVsdCwgaGFzX3N0b3BfcHJvcGFnYXRpb24pIHtcclxuICAgIGNvbnN0IG1vZGlmaWVycyA9IG9wdGlvbnMgPT09IHRydWUgPyBbXCJjYXB0dXJlXCJdIDogb3B0aW9ucyA/IEFycmF5LmZyb20oT2JqZWN0LmtleXMob3B0aW9ucykpIDogW107XHJcbiAgICBpZiAoaGFzX3ByZXZlbnRfZGVmYXVsdClcclxuICAgICAgICBtb2RpZmllcnMucHVzaCgncHJldmVudERlZmF1bHQnKTtcclxuICAgIGlmIChoYXNfc3RvcF9wcm9wYWdhdGlvbilcclxuICAgICAgICBtb2RpZmllcnMucHVzaCgnc3RvcFByb3BhZ2F0aW9uJyk7XHJcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01BZGRFdmVudExpc3RlbmVyXCIsIHsgbm9kZSwgZXZlbnQsIGhhbmRsZXIsIG1vZGlmaWVycyB9KTtcclxuICAgIGNvbnN0IGRpc3Bvc2UgPSBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01SZW1vdmVFdmVudExpc3RlbmVyXCIsIHsgbm9kZSwgZXZlbnQsIGhhbmRsZXIsIG1vZGlmaWVycyB9KTtcclxuICAgICAgICBkaXNwb3NlKCk7XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGF0dHJfZGV2KG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcclxuICAgIGF0dHIobm9kZSwgYXR0cmlidXRlLCB2YWx1ZSk7XHJcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcclxuICAgICAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01SZW1vdmVBdHRyaWJ1dGVcIiwgeyBub2RlLCBhdHRyaWJ1dGUgfSk7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NU2V0QXR0cmlidXRlXCIsIHsgbm9kZSwgYXR0cmlidXRlLCB2YWx1ZSB9KTtcclxufVxyXG5mdW5jdGlvbiBwcm9wX2Rldihub2RlLCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgIG5vZGVbcHJvcGVydHldID0gdmFsdWU7XHJcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01TZXRQcm9wZXJ0eVwiLCB7IG5vZGUsIHByb3BlcnR5LCB2YWx1ZSB9KTtcclxufVxyXG5mdW5jdGlvbiBkYXRhc2V0X2Rldihub2RlLCBwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgIG5vZGUuZGF0YXNldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgIGRpc3BhdGNoX2RldihcIlN2ZWx0ZURPTVNldERhdGFzZXRcIiwgeyBub2RlLCBwcm9wZXJ0eSwgdmFsdWUgfSk7XHJcbn1cclxuZnVuY3Rpb24gc2V0X2RhdGFfZGV2KHRleHQsIGRhdGEpIHtcclxuICAgIGRhdGEgPSAnJyArIGRhdGE7XHJcbiAgICBpZiAodGV4dC5kYXRhID09PSBkYXRhKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGRpc3BhdGNoX2RldihcIlN2ZWx0ZURPTVNldERhdGFcIiwgeyBub2RlOiB0ZXh0LCBkYXRhIH0pO1xyXG4gICAgdGV4dC5kYXRhID0gZGF0YTtcclxufVxyXG5jbGFzcyBTdmVsdGVDb21wb25lbnREZXYgZXh0ZW5kcyBTdmVsdGVDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgICAgIGlmICghb3B0aW9ucyB8fCAoIW9wdGlvbnMudGFyZ2V0ICYmICFvcHRpb25zLiQkaW5saW5lKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCd0YXJnZXQnIGlzIGEgcmVxdWlyZWQgb3B0aW9uYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICAkZGVzdHJveSgpIHtcclxuICAgICAgICBzdXBlci4kZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuJGRlc3Ryb3kgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ29tcG9uZW50IHdhcyBhbHJlYWR5IGRlc3Ryb3llZGApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBIdG1sVGFnLCBTdmVsdGVDb21wb25lbnQsIFN2ZWx0ZUNvbXBvbmVudERldiwgU3ZlbHRlRWxlbWVudCwgYWRkX2F0dHJpYnV0ZSwgYWRkX2NsYXNzZXMsIGFkZF9mbHVzaF9jYWxsYmFjaywgYWRkX2xvY2F0aW9uLCBhZGRfcmVuZGVyX2NhbGxiYWNrLCBhZGRfcmVzaXplX2xpc3RlbmVyLCBhZGRfdHJhbnNmb3JtLCBhZnRlclVwZGF0ZSwgYXBwZW5kLCBhcHBlbmRfZGV2LCBhc3NpZ24sIGF0dHIsIGF0dHJfZGV2LCBiZWZvcmVVcGRhdGUsIGJpbmQsIGJpbmRpbmdfY2FsbGJhY2tzLCBibGFua19vYmplY3QsIGJ1YmJsZSwgY2hlY2tfb3V0cm9zLCBjaGlsZHJlbiwgY2xhaW1fZWxlbWVudCwgY2xhaW1fc3BhY2UsIGNsYWltX3RleHQsIGNsZWFyX2xvb3BzLCBjb21wb25lbnRfc3Vic2NyaWJlLCBjcmVhdGVFdmVudERpc3BhdGNoZXIsIGNyZWF0ZV9hbmltYXRpb24sIGNyZWF0ZV9iaWRpcmVjdGlvbmFsX3RyYW5zaXRpb24sIGNyZWF0ZV9pbl90cmFuc2l0aW9uLCBjcmVhdGVfb3V0X3RyYW5zaXRpb24sIGNyZWF0ZV9zbG90LCBjcmVhdGVfc3NyX2NvbXBvbmVudCwgY3VycmVudF9jb21wb25lbnQsIGN1c3RvbV9ldmVudCwgZGF0YXNldF9kZXYsIGRlYnVnLCBkZXN0cm95X2Jsb2NrLCBkZXN0cm95X2NvbXBvbmVudCwgZGVzdHJveV9lYWNoLCBkZXRhY2gsIGRldGFjaF9hZnRlcl9kZXYsIGRldGFjaF9iZWZvcmVfZGV2LCBkZXRhY2hfYmV0d2Vlbl9kZXYsIGRldGFjaF9kZXYsIGRpcnR5X2NvbXBvbmVudHMsIGRpc3BhdGNoX2RldiwgZWFjaCwgZWxlbWVudCwgZWxlbWVudF9pcywgZW1wdHksIGVzY2FwZSwgZXNjYXBlZCwgZXhjbHVkZV9pbnRlcm5hbF9wcm9wcywgZml4X2FuZF9kZXN0cm95X2Jsb2NrLCBmaXhfYW5kX291dHJvX2FuZF9kZXN0cm95X2Jsb2NrLCBmaXhfcG9zaXRpb24sIGZsdXNoLCBnZXRDb250ZXh0LCBnZXRfYmluZGluZ19ncm91cF92YWx1ZSwgZ2V0X2N1cnJlbnRfY29tcG9uZW50LCBnZXRfc2xvdF9jaGFuZ2VzLCBnZXRfc2xvdF9jb250ZXh0LCBnZXRfc3ByZWFkX29iamVjdCwgZ2V0X3NwcmVhZF91cGRhdGUsIGdldF9zdG9yZV92YWx1ZSwgZ2xvYmFscywgZ3JvdXBfb3V0cm9zLCBoYW5kbGVfcHJvbWlzZSwgaWRlbnRpdHksIGluaXQsIGluc2VydCwgaW5zZXJ0X2RldiwgaW50cm9zLCBpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3RlciwgaXNfY2xpZW50LCBpc19mdW5jdGlvbiwgaXNfcHJvbWlzZSwgbGlzdGVuLCBsaXN0ZW5fZGV2LCBsb29wLCBtZWFzdXJlLCBtaXNzaW5nX2NvbXBvbmVudCwgbW91bnRfY29tcG9uZW50LCBub29wLCBub3RfZXF1YWwsIG5vdywgbnVsbF90b19lbXB0eSwgb2JqZWN0X3dpdGhvdXRfcHJvcGVydGllcywgb25EZXN0cm95LCBvbk1vdW50LCBvbmNlLCBvdXRyb19hbmRfZGVzdHJveV9ibG9jaywgcHJldmVudF9kZWZhdWx0LCBwcm9wX2RldiwgcmFmLCBydW4sIHJ1bl9hbGwsIHNhZmVfbm90X2VxdWFsLCBzY2hlZHVsZV91cGRhdGUsIHNlbGVjdF9tdWx0aXBsZV92YWx1ZSwgc2VsZWN0X29wdGlvbiwgc2VsZWN0X29wdGlvbnMsIHNlbGVjdF92YWx1ZSwgc2VsZiwgc2V0Q29udGV4dCwgc2V0X2F0dHJpYnV0ZXMsIHNldF9jdXJyZW50X2NvbXBvbmVudCwgc2V0X2N1c3RvbV9lbGVtZW50X2RhdGEsIHNldF9kYXRhLCBzZXRfZGF0YV9kZXYsIHNldF9pbnB1dF90eXBlLCBzZXRfaW5wdXRfdmFsdWUsIHNldF9ub3csIHNldF9yYWYsIHNldF9zdG9yZV92YWx1ZSwgc2V0X3N0eWxlLCBzZXRfc3ZnX2F0dHJpYnV0ZXMsIHNwYWNlLCBzcHJlYWQsIHN0b3BfcHJvcGFnYXRpb24sIHN1YnNjcmliZSwgc3ZnX2VsZW1lbnQsIHRleHQsIHRpY2ssIHRpbWVfcmFuZ2VzX3RvX2FycmF5LCB0b19udW1iZXIsIHRvZ2dsZV9jbGFzcywgdHJhbnNpdGlvbl9pbiwgdHJhbnNpdGlvbl9vdXQsIHVwZGF0ZV9rZXllZF9lYWNoLCB2YWxpZGF0ZV9jb21wb25lbnQsIHZhbGlkYXRlX3N0b3JlLCB4bGlua19hdHRyIH07XHJcbiIsIjxzY3JpcHQgPlxyXG4gICAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSc7XHJcbiAgICBsZXQgcmVzID0gW10sXHJcbiAgICAgICAgbmFtZVN0cmluZyA9IFtdLFxyXG4gICAgICAgIGN2dlN0cmluZyA9IFtdLFxyXG4gICAgICAgIG9uID0gZmFsc2UsXHJcbiAgICAgICAgbnVtYmVyRm9jdXMgPSBmYWxzZSxcclxuICAgICAgICBuYW1lRm9jdXMgPSBmYWxzZSxcclxuICAgICAgICBkYXRlRm9jdXMgPSBmYWxzZSxcclxuICAgICAgICBtb250aE1hc3MgPSBbXCJNTVwiXSxcclxuICAgICAgICB5ZWFyTWFzcyA9IFtcItCT0JNcIl0sXHJcbiAgICAgICAgdGhpc051bWJlcixcclxuICAgICAgICB0aGlzSG9sZGVyLFxyXG4gICAgICAgIHRoaXNDdnYsXHJcbiAgICAgICAgdGhpc01vbnRoLFxyXG4gICAgICAgIHRoaXNZZWFyLFxyXG4gICAgICAgIGZha2VNYXNzTnVtYmVyID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XSxcclxuICAgICAgICBmYWtlTWFzc05hbWUgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTksIDIwXSxcclxuICAgICAgICBtYXNzTW9udGggPSBbXCIwMVwiLCBcIjAyXCIsIFwiMDNcIiwgXCIwNFwiLCBcIjA1XCIsIFwiMDZcIiwgXCIwN1wiLCBcIjA4XCIsIFwiMDlcIiwgXCIxMFwiLCBcIjExXCIsIFwiMTJcIl0sXHJcbiAgICAgICAgbWFzc1llYXIgPSBbMjAxOSwgMjAyMCwgMjAyMSwgMjAyMiwgMjAyMywgMjAyNCwgMjAyNSwgMjAyNiwgMjAyNywgMjAyOCwgMjAyOSwgMjAzMF0sXHJcbiAgICAgICAgbnVtYmVycjtcclxuXHJcbiAgICBjb25zdCBmb3JtYXRDYXJkQ29kZSA9ICgpID0+IHtcclxuICAgICAgIGxldCBjYXJkQ29kZSA9IHRoaXNOdW1iZXIudmFsdWUucmVwbGFjZSgvW15cXGRdL2csICcnKS5zdWJzdHJpbmcoMCwxNik7XHJcbiAgICAgICBjYXJkQ29kZSA9IGNhcmRDb2RlICE9ICcnID8gY2FyZENvZGUubWF0Y2goLy57MSw0fS9nKS5qb2luKCcgJykgOiAnJztcclxuICAgICAgIHRoaXNOdW1iZXIudmFsdWUgPSBjYXJkQ29kZTtcclxuICAgICAgIG51bWJlcnIudmFsdWUgPSB0aGlzTnVtYmVyLnZhbHVlLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpO1xyXG4gICAgICAgbGV0IG1hc3MgPSBjYXJkY29kZS52YWx1ZS5zcGxpdCgnJyk7XHJcbiAgICAgICByZXMgPSBtYXNzLm1hcCgoaXRlbSwgaW5kZXgsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgICAgaWYoaW5kZXggPiAzICYmIGluZGV4IDwgMTQpe1xyXG4gICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gNCB8fCBpbmRleCA9PSA5IHx8IGluZGV4ID09IDE0KXtcclxuICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIHJldHVybiBpdGVtID0gXCIqXCI7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgfSk7XHJcbiAgIH1cclxuXHJcbiAgIGNvbnN0IGlucHV0TmFtZSA9ICgpID0+IG5hbWVTdHJpbmcgPSB0aGlzSG9sZGVyLnZhbHVlLnNwbGl0KFwiXCIpO1xyXG5cclxuICAgY29uc3QgY3Z2ID0gKCkgPT4gY3Z2U3RyaW5nID0gdGhpc0N2di52YWx1ZS5zcGxpdChcIlwiKTtcclxuXHJcbiAgIGNvbnN0IGNoYW5nZU1vbnRoID0gKHsgdGFyZ2V0OiB7IHZhbHVlIH19KSA9PiBtb250aE1hc3MgPSBbIC4uLm1vbnRoTWFzcywgdmFsdWUgXTtcclxuXHJcbiAgICQ6IG9mZnNldE1vbnRoID0gbW9udGhNYXNzICYmIG1vbnRoTWFzcy5sZW5ndGggPiAxID8gb2Zmc2V0TW9udGggLSAyNCA6IDA7XHJcblxyXG4gICBjb25zdCBjaGFuZ2VZZWFyID0gKHsgdGFyZ2V0OiB7IHZhbHVlIH19KSA9PiB5ZWFyTWFzcyA9IFsgLi4ueWVhck1hc3MsIHZhbHVlIF07XHJcblxyXG4gICAkOiBvZmZzZXRZZWFyID0geWVhck1hc3MgJiYgeWVhck1hc3MubGVuZ3RoID4gMSA/IG9mZnNldFllYXIgLSAyNCA6IDA7XHJcblxyXG4gICBjb25zdCBhY3RpdmUgPSAoKSA9PiBvbiA9IHRydWU7XHJcbiAgIGNvbnN0IGRlYWN0aXZlID0gKCkgPT4ge29uID0gZmFsc2U7IG51bWJlckZvY3VzID0gZmFsc2U7IG5hbWVGb2N1cyA9IGZhbHNlOyBkYXRlRm9jdXMgPSBmYWxzZX07XHJcbiAgIGNvbnN0IGZvY3VzTnVtYmVyID0gKCkgPT4gbnVtYmVyRm9jdXMgPSB0cnVlO1xyXG4gICBjb25zdCBmb2N1c05hbWUgPSAoKSA9PiBuYW1lRm9jdXMgPSB0cnVlO1xyXG4gICBjb25zdCBmb2N1c0RhdGUgPSAoKSA9PiBkYXRlRm9jdXMgPSB0cnVlO1xyXG5cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGU+XHJcbiAgICAud3JhcC1jYXJkIHtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB9XHJcbiAgICAuY2FyZCB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICB3aWR0aDogNDUwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiAyNzBweDtcclxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAgdXJsKC9taXItZGV0YWlscy0wMS5wbmcpLCB1cmwoL2NvbG9yLmpwZyk7XHJcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogbGVmdCAzMHB4IHRvcCAzMHB4LCBjZW50ZXIgY2VudGVyO1xyXG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQsIG5vLXJlcGVhdDtcclxuICAgICAgICAtd2Via2l0LWJhY2tncm91bmQtc2l6ZTogMTUlLCAxMDAlO1xyXG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogMTUlLCAxMDAlO1xyXG4gICAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMjBweDstbW96LWJvcmRlci1yYWRpdXM6IDIwcHg7Ym9yZGVyLXJhZGl1czogMjBweDtcclxuICAgICAgICBwYWRkaW5nOiAxNzBweCAzMHB4IDMwcHg7XHJcbiAgICAgICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94Oy1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMDtcclxuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC44cyBjdWJpYy1iZXppZXIoMC43MSwgMC4wMywgMC41NiwgMC44NSk7XHJcbiAgICAgICAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC44cyBjdWJpYy1iZXppZXIoMC43MSwgMC4wMywgMC41NiwgMC44NSk7XHJcbiAgICAgICAgLW1zLXRyYW5zaXRpb246IGFsbCAwLjhzIGN1YmljLWJlemllcigwLjcxLCAwLjAzLCAwLjU2LCAwLjg1KTtcclxuICAgICAgICAtby10cmFuc2l0aW9uOiBhbGwgMC44cyBjdWJpYy1iZXppZXIoMC43MSwgMC4wMywgMC41NiwgMC44NSk7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuOHMgY3ViaWMtYmV6aWVyKDAuNzEsIDAuMDMsIDAuNTYsIDAuODUpO1xyXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMjBweCA2MHB4IDAgcmdiYSgxNCwgNDIsIDkwLCAwLjU1KTtcclxuICAgICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDIwMDBweCkgcm90YXRlWSgwZGVnKSByb3RhdGVYKDBkZWcpIHJvdGF0ZSgwZGVnKTtcclxuICAgICAgICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xyXG4gICAgICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcclxuICAgICAgICBtYXJnaW46IDAgYXV0byAzMHB4O1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICB6LWluZGV4OiA1O1xyXG4gICAgfVxyXG4gICAgLndyYXAtY2FyZC1iYWNrIHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgIGxlZnQ6IDA7XHJcbiAgICB9XHJcbiAgICAuY2FyZC1iYWNrIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIHdpZHRoOiA0NTBweDtcclxuICAgICAgICBoZWlnaHQ6IDI3MHB4O1xyXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6ICB1cmwoL2NvbG9yLmpwZyk7XHJcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcclxuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0LCBuby1yZXBlYXQ7XHJcbiAgICAgICAgLXdlYmtpdC1iYWNrZ3JvdW5kLXNpemU6IDEwMCU7XHJcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xyXG4gICAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMjBweDstbW96LWJvcmRlci1yYWRpdXM6IDIwcHg7Ym9yZGVyLXJhZGl1czogMjBweDtcclxuICAgICAgICBwYWRkaW5nOiAxNzBweCAzMHB4IDMwcHg7XHJcbiAgICAgICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94Oy1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDAgMCAjMDAwOy1tb3otYm94LXNoYWRvdzogMCAwIDAgMCAjMDAwO2JveC1zaGFkb3c6IDAgMCAwIDAgIzAwMDtcclxuICAgICAgICBmb250LXNpemU6IDA7XHJcbiAgICAgICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgICAgIG1hcmdpbjogMCBhdXRvIDMwcHg7XHJcbiAgICAgICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcclxuICAgICAgICBib3gtc2hhZG93OiAwIDIwcHggNjBweCAwIHJnYmEoMTQsIDQyLCA5MCwgMC41NSk7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC44cyBjdWJpYy1iZXppZXIoMC43MSwgMC4wMywgMC41NiwgMC44NSk7XHJcbiAgICAgICAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC44cyBjdWJpYy1iZXppZXIoMC43MSwgMC4wMywgMC41NiwgMC44NSk7XHJcbiAgICAgICAgLW1zLXRyYW5zaXRpb246IGFsbCAwLjhzIGN1YmljLWJlemllcigwLjcxLCAwLjAzLCAwLjU2LCAwLjg1KTtcclxuICAgICAgICAtby10cmFuc2l0aW9uOiBhbGwgMC44cyBjdWJpYy1iZXppZXIoMC43MSwgMC4wMywgMC41NiwgMC44NSk7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuOHMgY3ViaWMtYmV6aWVyKDAuNzEsIDAuMDMsIDAuNTYsIDAuODUpO1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgyMDAwcHgpIHJvdGF0ZVkoLTE4MGRlZykgcm90YXRlWCgwZGVnKSByb3RhdGUoMGRlZykgc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIC1tb3otdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgyMDAwcHgpIHJvdGF0ZVkoLTE4MGRlZykgcm90YXRlWCgwZGVnKSByb3RhdGUoMGRlZykgc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIC1tcy10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDIwMDBweCkgcm90YXRlWSgtMTgwZGVnKSByb3RhdGVYKDBkZWcpIHJvdGF0ZSgwZGVnKSBzY2FsZSgtMSwgMSk7XHJcbiAgICAgICAgLW8tdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgyMDAwcHgpIHJvdGF0ZVkoLTE4MGRlZykgcm90YXRlWCgwZGVnKSByb3RhdGUoMGRlZykgc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMjAwMHB4KSByb3RhdGVZKC0xODBkZWcpIHJvdGF0ZVgoMGRlZykgcm90YXRlKDBkZWcpIHNjYWxlKC0xLCAxKTtcclxuICAgICAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XHJcbiAgICB9XHJcbiAgICAud3JhcC1jYXJkLmFjdGl2ZSAuY2FyZCB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMDBweCkgcm90YXRlWSgxODBkZWcpIHJvdGF0ZVgoMGRlZykgcm90YXRlKDBkZWcpO1xyXG4gICAgICAgIC1tb3otdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDAwcHgpIHJvdGF0ZVkoMTgwZGVnKSByb3RhdGVYKDBkZWcpIHJvdGF0ZSgwZGVnKTtcclxuICAgICAgICAtbXMtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDAwcHgpIHJvdGF0ZVkoMTgwZGVnKSByb3RhdGVYKDBkZWcpIHJvdGF0ZSgwZGVnKTtcclxuICAgICAgICAtby10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMDBweCkgcm90YXRlWSgxODBkZWcpIHJvdGF0ZVgoMGRlZykgcm90YXRlKDBkZWcpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwMHB4KSByb3RhdGVZKDE4MGRlZykgcm90YXRlWCgwZGVnKSByb3RhdGUoMGRlZyk7XHJcbiAgICB9XHJcbiAgICAud3JhcC1jYXJkLmFjdGl2ZSAuY2FyZC1iYWNrIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwMHB4KSByb3RhdGVZKDBkZWcpIHJvdGF0ZVgoMGRlZykgcm90YXRlKDBkZWcpIHNjYWxlKC0xLCAxKTtcclxuICAgICAgICAtbW96LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwMHB4KSByb3RhdGVZKDBkZWcpIHJvdGF0ZVgoMGRlZykgcm90YXRlKDBkZWcpIHNjYWxlKC0xLCAxKTtcclxuICAgICAgICAtbXMtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDAwcHgpIHJvdGF0ZVkoMGRlZykgcm90YXRlWCgwZGVnKSByb3RhdGUoMGRlZykgc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIC1vLXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwMHB4KSByb3RhdGVZKDBkZWcpIHJvdGF0ZVgoMGRlZykgcm90YXRlKDBkZWcpIHNjYWxlKC0xLCAxKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMDBweCkgcm90YXRlWSgwZGVnKSByb3RhdGVYKDBkZWcpIHJvdGF0ZSgwZGVnKSBzY2FsZSgtMSwgMSk7XHJcbiAgICB9XHJcbiAgICAuY2FyZC1udW1iZXIge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGhlaWdodDogMjRweDtcclxuICAgICAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgICAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDstbW96LWJvcmRlci1yYWRpdXM6IDVweDtib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICAgICAgcGFkZGluZzogMCAyMHB4O1xyXG4gICAgICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDstbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7Ym94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgfVxyXG4gICAgLmNhcmQtaG9sZGVycyB7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgIHdpZHRoOiAyNTVweDtcclxuICAgICAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDstbW96LWJvcmRlci1yYWRpdXM6IDVweDtib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICAgICAgcGFkZGluZzogMDtcclxuICAgICAgICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7LW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O2JveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogNTBweDtcclxuICAgIH1cclxuICAgIC5jYXJkLW1vbnRoLXdyYXAge1xyXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICB3aWR0aDogMzhweDtcclxuICAgICAgICBoZWlnaHQ6IDI1cHg7XHJcbiAgICAgICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7LW1vei1ib3JkZXItcmFkaXVzOiA1cHg7Ym9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDAgNXB4O1xyXG4gICAgICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDstbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7Ym94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgfVxyXG5cclxuICAgIC5jYXJkLW1vbnRoIHtcclxuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcztcclxuICAgICAgICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICBsZWZ0OiAwO1xyXG4gICAgICAgIGJvdHRvbTogMDtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB9XHJcbiAgICAuc2xhc2gge1xyXG4gICAgICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIH1cclxuICAgIC5jYXJkLXllYXItd3JhcCB7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgIHdpZHRoOiAzOHB4O1xyXG4gICAgICAgIGhlaWdodDogMjVweDtcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4Oy1tb3otYm9yZGVyLXJhZGl1czogNXB4O2JvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICAgICBwYWRkaW5nOiAwIDVweDtcclxuICAgICAgICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7LW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O2JveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB9XHJcbiAgICAuY2FyZC15ZWFyIHtcclxuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcztcclxuICAgICAgICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICBsZWZ0OiAwO1xyXG4gICAgICAgIGJvdHRvbTogMDtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB9XHJcbiAgICAuZGlnaXQtaXRlbSB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMXM7LW1vei10cmFuc2l0aW9uOiBhbGwgMXM7LW1zLXRyYW5zaXRpb246IGFsbCAxczstby10cmFuc2l0aW9uOiBhbGwgMXM7dHJhbnNpdGlvbjogYWxsIDFzO1xyXG4gICAgfVxyXG4gICAgLmRpZ2l0LWl0ZW0uYWN0aXZlIHt9XHJcbiAgICAuaW5wdXQtZmllbGQge1xyXG4gICAgICAgIHdpZHRoOiA0NTBweDtcclxuICAgICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgIH1cclxuICAgIC5pbnB1dC1maWVsZCBpbnB1dDpmaXJzdC1jaGlsZCxcclxuICAgIC5pbnB1dC1maWVsZCBpbnB1dDpudGgtY2hpbGQoMikge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG4gICAgLmNhcmQtbnVtYmVyIC5udW0ge1xyXG4gICAgICAgIHdpZHRoOiAxOHB4O1xyXG4gICAgICAgIGhlaWdodDogMjBweDtcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDJweDtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuMnM7LW1vei10cmFuc2l0aW9uOiBhbGwgMC4yczstbXMtdHJhbnNpdGlvbjogYWxsIDAuMnM7LW8tdHJhbnNpdGlvbjogYWxsIDAuMnM7dHJhbnNpdGlvbjogYWxsIDAuMnM7XHJcbiAgICAgICAgZm9udC1mYW1pbHk6ICdCZWJhcyBOZXVlJztcclxuICAgICAgICBmb250LXNpemU6IDI2cHg7XHJcbiAgICB9XHJcbiAgICAuY2FyZC1udW1iZXIgLm51bS5hY3RpdmUge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTI1cHgpOy1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTI1cHgpOy1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMjVweCk7LW8tdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTI1cHgpO3RyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yNXB4KTtcclxuICAgIH1cclxuICAgIC5jYXJkLW51bWJlciAuZGlnaXQtaXRlbTpudGgtY2hpbGQoNikgLm51bS5hY3RpdmUsXHJcbiAgICAuY2FyZC1udW1iZXIgLmRpZ2l0LWl0ZW06bnRoLWNoaWxkKDcpIC5udW0uYWN0aXZlLFxyXG4gICAgLmNhcmQtbnVtYmVyIC5kaWdpdC1pdGVtOm50aC1jaGlsZCg4KSAubnVtLmFjdGl2ZSxcclxuICAgIC5jYXJkLW51bWJlciAuZGlnaXQtaXRlbTpudGgtY2hpbGQoOSkgLm51bS5hY3RpdmUsXHJcbiAgICAuY2FyZC1udW1iZXIgLmRpZ2l0LWl0ZW06bnRoLWNoaWxkKDExKSAubnVtLmFjdGl2ZSxcclxuICAgIC5jYXJkLW51bWJlciAuZGlnaXQtaXRlbTpudGgtY2hpbGQoMTIpIC5udW0uYWN0aXZlLFxyXG4gICAgLmNhcmQtbnVtYmVyIC5kaWdpdC1pdGVtOm50aC1jaGlsZCgxMykgLm51bS5hY3RpdmUsXHJcbiAgICAuY2FyZC1udW1iZXIgLmRpZ2l0LWl0ZW06bnRoLWNoaWxkKDE0KSAubnVtLmFjdGl2ZSB7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDI1cHg7XHJcbiAgICB9XHJcbiAgICAuY2FyZC1udW1iZXIgLm51bS5ub3QtYWN0aXZlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yNXB4KTtcclxuICAgICAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yNXB4KTtcclxuICAgICAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTI1cHgpO1xyXG4gICAgICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yNXB4KTtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMjVweCk7XHJcbiAgICB9XHJcbiAgICAuY2FyZC1ob2xkZXJzIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGhlaWdodDogMjRweDtcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIHBhZGRpbmctbGVmdDogNXB4O1xyXG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgIH1cclxuICAgIC5jYXJkLWhvbGRlcnMgLm51bSB7XHJcbiAgICAgICAgd2lkdGg6IDEycHg7XHJcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVweDtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMXB4O1xyXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuNXM7XHJcbiAgICAgICAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC41cztcclxuICAgICAgICAtbXMtdHJhbnNpdGlvbjogYWxsIDAuNXM7XHJcbiAgICAgICAgLW8tdHJhbnNpdGlvbjogYWxsIDAuNXM7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNXM7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNXB4LCAtMjVweCkgcm90YXRlKDkwZGVnKTtcclxuICAgICAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlKDE1cHgsIC0yNXB4KSByb3RhdGUoOTBkZWcpO1xyXG4gICAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNXB4LCAtMjVweCkgcm90YXRlKDkwZGVnKTtcclxuICAgICAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNXB4LCAtMjVweCkgcm90YXRlKDkwZGVnKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNXB4LCAtMjVweCkgcm90YXRlKDkwZGVnKTtcclxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgICAgICAgZm9udC1mYW1pbHk6ICdCZWJhcyBOZXVlJztcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcbiAgICAuY2FyZC1ob2xkZXJzIC5udW0uYWN0aXZlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yNXB4KSByb3RhdGUoMGRlZyk7XHJcbiAgICAgICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMjVweCkgcm90YXRlKDBkZWcpO1xyXG4gICAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMjVweCkgcm90YXRlKDBkZWcpO1xyXG4gICAgICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yNXB4KSByb3RhdGUoMGRlZyk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTI1cHgpIHJvdGF0ZSgwZGVnKTtcclxuICAgIH1cclxuICAgIC5jYXJkLWhvbGRlcnMgLm51bS5ub3QtYWN0aXZlIHtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yNXB4KSByb3RhdGUoMGRlZyk7XHJcbiAgICAgICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMjVweCkgcm90YXRlKDBkZWcpO1xyXG4gICAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMjVweCkgcm90YXRlKDBkZWcpO1xyXG4gICAgICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0yNXB4KSByb3RhdGUoMGRlZyk7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTI1cHgpIHJvdGF0ZSgwZGVnKTtcclxuICAgIH1cclxuICAgIC5wbGFjZWhvbGRlciB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGZvbnQtZmFtaWx5OiAnQmViYXMgTmV1ZSc7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xyXG4gICAgICAgIGxldHRlci1zcGFjaW5nOiA0LjRwdDtcclxuICAgICAgICB0ZXh0LWluZGVudDogNXB4O1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgICB9XHJcbiAgICAucGxhY2Vob2xkZXIuYWN0aXZlIHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4yczstbW96LXRyYW5zaXRpb246IGFsbCAwLjJzOy1tcy10cmFuc2l0aW9uOiBhbGwgMC4yczstby10cmFuc2l0aW9uOiBhbGwgMC4yczt0cmFuc2l0aW9uOiBhbGwgMC4ycztcclxuICAgIH1cclxuICAgIC5wbGFjZWhvbGRlci5ub3QtYWN0aXZlIHtcclxuICAgICAgICBtYXJnaW4tdG9wOiAtMjVweDtcclxuICAgIH1cclxuICAgICNjYXJkY29kZSB7XHJcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDVweCAxNXB4O1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjZWQ2ZTA7XHJcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7LW1vei1ib3JkZXItcmFkaXVzOiA1cHg7Ym9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIH1cclxuICAgICNjYXJkY29kZTIge1xyXG4gICAgICAgIGhlaWdodDogNTBweDtcclxuICAgICAgICBwYWRkaW5nOiA1cHggMTVweDtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2VkNmUwO1xyXG4gICAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4Oy1tb3otYm9yZGVyLXJhZGl1czogNXB4O2JvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICB9XHJcbiAgICAjY2FyZGNvZGUzIHtcclxuICAgICAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICAgICAgcGFkZGluZzogNXB4IDE1cHg7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NlZDZlMDtcclxuICAgICAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDstbW96LWJvcmRlci1yYWRpdXM6IDVweDtib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgfVxyXG4gICAgI2NhcmRjb2RlNCB7XHJcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDVweCAxNXB4O1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjZWQ2ZTA7XHJcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7LW1vei1ib3JkZXItcmFkaXVzOiA1cHg7Ym9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIH1cclxuICAgICNjYXJkY29kZTUge1xyXG4gICAgICAgIGhlaWdodDogNTBweDtcclxuICAgICAgICBwYWRkaW5nOiA1cHggMTVweDtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2VkNmUwO1xyXG4gICAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4Oy1tb3otYm9yZGVyLXJhZGl1czogNXB4O2JvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICB9XHJcbiAgICAuY2FyZC1pdGVtLWJhbmQge1xyXG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMTksIDAuOCk7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDMwcHg7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHotaW5kZXg6IDI7XHJcbiAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgIGxlZnQ6IDA7XHJcbiAgICB9XHJcbiAgICAuY2FyZC1pdGVtLWN2diB7XHJcbiAgICAgICAgd2lkdGg6IDMwMHB4O1xyXG4gICAgICAgIGhlaWdodDogNDVweDtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbiAgICAgICAgcGFkZGluZy1yaWdodDogMTBweDtcclxuICAgICAgICBjb2xvcjogIzFhM2I1ZDtcclxuICAgICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgICAgIGJveC1zaGFkb3c6IDBweCAxMHB4IDIwcHggLTdweCByZ2JhKDMyLCA1NiwgMTE3LCAwLjM1KTtcclxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgtMSwgMSk7XHJcbiAgICAgICAgLW1zLXRyYW5zZm9ybTogc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIC1vLXRyYW5zZm9ybTogc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICByaWdodDogMzBweDtcclxuICAgICAgICB0b3A6IDEwMHB4O1xyXG4gICAgICAgIGxlZnQ6IGF1dG87XHJcbiAgICB9XHJcbiAgICAuc3RhciB7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAzcHgpO1xyXG4gICAgICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgM3B4KTtcclxuICAgICAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgM3B4KTtcclxuICAgICAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAzcHgpO1xyXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDNweCk7XHJcbiAgICB9XHJcbiAgICAudGhyZWUge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIG1heC13aWR0aDogY2FsYygzMy4zMyUgLSAzcHgpO1xyXG4gICAgfVxyXG4gICAgLmN2di1sYWJlbCB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHRvcDogMTA1cHg7XHJcbiAgICAgICAgbGVmdDogNDVweDtcclxuICAgICAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgICAgICBmb250LXNpemU6IDIzcHg7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKC0xLCAxKTtcclxuICAgICAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgIC1tcy10cmFuc2Zvcm06IHNjYWxlKC0xLCAxKTtcclxuICAgICAgICAtby10cmFuc2Zvcm06IHNjYWxlKC0xLCAxKTtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKC0xLCAxKTtcclxuICAgICAgICB0ZXh0LXNoYWRvdzogMHB4IDRweCA0cHggIzAwMDAwMDtcclxuICAgICAgICBsZXR0ZXItc3BhY2luZzogM3B0O1xyXG4gICAgfVxyXG4gICAgYnV0dG9uIHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBoZWlnaHQ6IDU1cHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDogIzIzNjRkMjtcclxuICAgICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgICAgIGZvbnQtZmFtaWx5OiBcIlNvdXJjZSBTYW5zIFByb1wiLCBzYW5zLXNlcmlmO1xyXG4gICAgICAgIGJveC1zaGFkb3c6IDNweCAxMHB4IDIwcHggMHB4IHJnYmEoMzUsIDEwMCwgMjEwLCAwLjMpO1xyXG4gICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgfVxyXG4gICAgLm1vbnRoLFxyXG4gICAgLnllYXIge1xyXG4gICAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuM3M7XHJcbiAgICAgICAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC4zcztcclxuICAgICAgICAtbXMtdHJhbnNpdGlvbjogYWxsIDAuM3M7XHJcbiAgICAgICAgLW8tdHJhbnNpdGlvbjogYWxsIDAuM3M7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgIWltcG9ydGFudDtcclxuICAgIH1cclxuXHJcbiAgICAuZm9jdXMge1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgbGVmdDogMDtcclxuICAgICAgICB3aWR0aDogNDUwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiAyNzBweDtcclxuICAgICAgICB6LWluZGV4OiAzO1xyXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICNmZmZmZmY7XHJcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAxNHB4Oy1tb3otYm9yZGVyLXJhZGl1czogMTRweDtib3JkZXItcmFkaXVzOiAxNHB4O1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC4zKTtcclxuICAgICAgICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7LW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O2JveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC41cztcclxuICAgICAgICAtbW96LXRyYW5zaXRpb246IGFsbCAwLjVzO1xyXG4gICAgICAgIC1tcy10cmFuc2l0aW9uOiBhbGwgMC41cztcclxuICAgICAgICAtby10cmFuc2l0aW9uOiBhbGwgMC41cztcclxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC41cztcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgfVxyXG4gICAgLmZvY3VzLm51bWJlckZvY3VzIHtcclxuICAgICAgICB0b3A6IDE2MXB4O1xyXG4gICAgICAgIGxlZnQ6IDQxcHg7XHJcbiAgICAgICAgd2lkdGg6IDM2N3B4O1xyXG4gICAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgICB6LWluZGV4OiAzO1xyXG4gICAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNHB4Oy1tb3otYm9yZGVyLXJhZGl1czogNHB4O2JvcmRlci1yYWRpdXM6IDRweDtcclxuICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgfVxyXG4gICAgLmZvY3VzLm5hbWVGb2N1cyB7XHJcbiAgICAgICAgdG9wOiAyMDZweDtcclxuICAgICAgICBsZWZ0OiAyOXB4O1xyXG4gICAgICAgIHdpZHRoOiAyNTdweDtcclxuICAgICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgICAgei1pbmRleDogMztcclxuICAgICAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDRweDstbW96LWJvcmRlci1yYWRpdXM6IDRweDtib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICAgICAgb3BhY2l0eTogMTtcclxuICAgIH1cclxuICAgIC5mb2N1cy5kYXRlRm9jdXMge1xyXG4gICAgICAgIHRvcDogMjA2cHg7XHJcbiAgICAgICAgbGVmdDogMzMwcHg7XHJcbiAgICAgICAgd2lkdGg6IDk1cHg7XHJcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICAgIHotaW5kZXg6IDM7XHJcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA0cHg7LW1vei1ib3JkZXItcmFkaXVzOiA0cHg7Ym9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICB9XHJcbiAgICAuY2FyZC1mYWtlLW51bWJlciB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHRvcDogMTYxcHg7XHJcbiAgICAgICAgbGVmdDogNDFweDtcclxuICAgICAgICB3aWR0aDogMzY3cHg7XHJcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICAgIHotaW5kZXg6IDM7XHJcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgIHotaW5kZXg6IDQ7XHJcbiAgICB9XHJcbiAgICAuY2FyZC1mYWtlLWhvbGRlciB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHRvcDogMjA2cHg7XHJcbiAgICAgICAgbGVmdDogMjlweDtcclxuICAgICAgICB3aWR0aDogMjU3cHg7XHJcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICB6LWluZGV4OiA0O1xyXG4gICAgfVxyXG4gICAgLmNhcmQtZmFrZS1tb250aCB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHRvcDogMjA2cHg7XHJcbiAgICAgICAgbGVmdDogMzMwcHg7XHJcbiAgICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICB6LWluZGV4OiA0O1xyXG4gICAgfVxyXG4gICAgLmNhcmQtZmFrZS15ZWFyIHtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgdG9wOiAyMDZweDtcclxuICAgICAgICBsZWZ0OiAzNzVweDtcclxuICAgICAgICB3aWR0aDogNDBweDtcclxuICAgICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgIHotaW5kZXg6IDQ7XHJcbiAgICB9XHJcbjwvc3R5bGU+XHJcblxyXG48ZGl2IGNsYXNzPVwid3JhcC1jYXJkIHtvbiA/ICdhY3RpdmUnIDogJyd9XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb2N1c1wiIGNsYXNzOm51bWJlckZvY3VzIGNsYXNzOm5hbWVGb2N1cyBjbGFzczpkYXRlRm9jdXM+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtbnVtYmVyXCI+XHJcbiAgICAgICAgICAgIHsjZWFjaCBmYWtlTWFzc051bWJlciBhcyBzdHJpbmcsIGl9XHJcbiAgICAgICAgICAgICAgICB7I2lmIGkgPT0gNCB8fCBpID09IDkgfHwgaSA9PSAxNH1cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlnaXQtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibnVtIHtyZXMubGVuZ3RoID4gaSA/ICdub3QtYWN0aXZlJyA6ICcnfVwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgezplbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaWdpdC1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJudW0ge3Jlcy5sZW5ndGggPiBpID8gJ25vdC1hY3RpdmUnIDogJyd9XCI+IzwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibnVtIHtyZXMubGVuZ3RoID4gaSA/ICdhY3RpdmUnIDogJyd9XCI+e3Jlc1tpXSB8fCBcIlwifTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgey9pZn1cclxuICAgICAgICAgICAgey9lYWNofVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhvbGRlcnNcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsYWNlaG9sZGVyIHtuYW1lU3RyaW5nLmxlbmd0aCA9PSAwID8gJ2FjdGl2ZScgOiAnbm90LWFjdGl2ZSd9XCI+XHJcbiAgICAgICAgICAgICAgICBJVkFOIElWQU5PVlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgeyNlYWNoIGZha2VNYXNzTmFtZSBhcyBzdHJpbmcsIGl9XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlnaXQtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJudW0ge25hbWVTdHJpbmcubGVuZ3RoIDwgaSA/ICdub3QtYWN0aXZlJyA6ICcnfVwiPiA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibnVtIHtuYW1lU3RyaW5nLmxlbmd0aCA+IGkgPyAnYWN0aXZlJyA6ICcnfVwiPntuYW1lU3RyaW5nW2ldIHx8IFwiXCJ9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgey9lYWNofVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLW1vbnRoLXdyYXBcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtbW9udGhcIiBzdHlsZT1cInRyYW5zZm9ybTogdHJhbnNsYXRlWSh7b2Zmc2V0TW9udGh9cHgpXCI+XHJcbiAgICAgICAgICAgICAgICB7I2VhY2ggbW9udGhNYXNzIGFzIGl0ZW19XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vbnRoXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgey9lYWNofVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic2xhc2hcIj4vPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQteWVhci13cmFwXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLXllYXJcIiBzdHlsZT1cInRyYW5zZm9ybTogdHJhbnNsYXRlWSh7b2Zmc2V0WWVhcn1weClcIj5cclxuICAgICAgICAgICAgICAgIHsjZWFjaCB5ZWFyTWFzcyBhcyBpdGVtfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ5ZWFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnN1YnN0cigtMil9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7L2VhY2h9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWZha2UtbnVtYmVyXCIgb246bW91c2Vkb3duPVwieyhlKSA9PiB7ZS5wcmV2ZW50RGVmYXVsdCgpO3RoaXNOdW1iZXIuZm9jdXMoKTt9fVwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWZha2UtaG9sZGVyXCIgb246bW91c2Vkb3duPVwieyhlKSA9PiB7ZS5wcmV2ZW50RGVmYXVsdCgpO3RoaXNIb2xkZXIuZm9jdXMoKTt9fVwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWZha2UtbW9udGhcIiBvbjptb3VzZWRvd249XCJ7KGUpID0+IHtlLnByZXZlbnREZWZhdWx0KCk7dGhpc01vbnRoLmZvY3VzKCk7fX1cIj48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1mYWtlLXllYXJcIiBvbjptb3VzZWRvd249XCJ7KGUpID0+IHtlLnByZXZlbnREZWZhdWx0KCk7dGhpc1llYXIuZm9jdXMoKTt9fVwiPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwid3JhcC1jYXJkLWJhY2tcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1iYWNrXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWl0ZW0tYmFuZFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1pdGVtLWN2dlwiPlxyXG4gICAgICAgICAgICAgICAgeyNlYWNoIGN2dlN0cmluZyBhcyBjdnZEaWdpdH1cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhclwiPio8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHsvZWFjaH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjdnYtbGFiZWxcIj5DVlY8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuXHJcbjxmb3JtIG5hbWU9XCJteWZvcm1cIiBjbGFzcz1cImlucHV0LWZpZWxkXCI+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImlucHV0LW51bWJlclwiIGlkPVwiY2FyZGNvZGVcIiBwbGFjZWhvbGRlcj1cItCd0L7QvNC10YAg0LrQsNGA0YLRi1wiIG9uOmZvY3VzPXtmb2N1c051bWJlcn1cclxuICAgIG9uOmJsdXI9e2RlYWN0aXZlfSBiaW5kOnRoaXM9e3RoaXNOdW1iZXJ9IG9uOmlucHV0PXtmb3JtYXRDYXJkQ29kZX0+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImlucHV0LW5hbWVcIiBpZD1cImNhcmRjb2RlMlwiIHBsYWNlaG9sZGVyPVwi0JjQvNGPINCk0LDQvNC40LvQuNGPXCIgb246Zm9jdXM9e2ZvY3VzTmFtZX1cclxuICAgIG9uOmJsdXI9e2RlYWN0aXZlfSBiaW5kOnRoaXM9e3RoaXNIb2xkZXJ9IG9uOmlucHV0PXtpbnB1dE5hbWV9PlxyXG4gICAgPHNlbGVjdCBpZD1cImNhcmRjb2RlM1wiIGNsYXNzPVwidGhyZWVcIiBvbjpmb2N1cz17Zm9jdXNEYXRlfSBvbjpibHVyPXtkZWFjdGl2ZX0gYmluZDp0aGlzPXt0aGlzTW9udGh9IG9uOmNoYW5nZT17Y2hhbmdlTW9udGh9PlxyXG4gICAgICAgIDxvcHRpb24gc2VsZWN0ZWQgZGlzYWJsZWQ+0JzQtdGB0Y/Rhjwvb3B0aW9uPlxyXG4gICAgICAgIHsjZWFjaCBtYXNzTW9udGggYXMgbW9udGgsIGl9XHJcbiAgICAgICAgICAgIDxvcHRpb24+e21vbnRofTwvb3B0aW9uPlxyXG4gICAgICAgIHsvZWFjaH1cclxuICAgIDwvc2VsZWN0PlxyXG4gICAgPHNlbGVjdCBpZD1cImNhcmRjb2RlNFwiIGNsYXNzPVwidGhyZWVcIiBvbjpmb2N1cz17Zm9jdXNEYXRlfSBvbjpibHVyPXtkZWFjdGl2ZX0gYmluZDp0aGlzPXt0aGlzWWVhcn1cclxuICAgIG9uOmNoYW5nZT17Y2hhbmdlWWVhcn0+XHJcbiAgICAgICAgPG9wdGlvbiBzZWxlY3RlZCBkaXNhYmxlZD7Qk9C+0LQ8L29wdGlvbj5cclxuICAgICAgICB7I2VhY2ggbWFzc1llYXIgYXMgeWVhcn1cclxuICAgICAgICAgICAgPG9wdGlvbj57eWVhcn08L29wdGlvbj5cclxuICAgICAgICB7L2VhY2h9XHJcbiAgICA8L3NlbGVjdD5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiY2FyZGNvZGU1XCIgcGxhY2Vob2xkZXI9XCJDVlZcIiBvbjpmb2N1cz17YWN0aXZlfSBvbjpibHVyPXtkZWFjdGl2ZX0gbWF4bGVuZ3RoPVwiNFwiXHJcbiAgICBjbGFzcz1cInRocmVlXCIgb246aW5wdXQ9e2N2dn0gYmluZDp0aGlzPXt0aGlzQ3Z2fT5cclxuICAgIDxpbnB1dCB0eXBlPWhpZGRlbiBuYW1lPW51bWJlciB2YWx1ZT1cIlwiIGJpbmQ6dGhpcz17bnVtYmVycn0+XHJcbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj7QntGC0L/RgNCw0LLQuNGC0Yw8L2J1dHRvbj5cclxuPC9mb3JtPiIsIjxzY3JpcHQgY29udGV4dD1cIm1vZHVsZVwiPlxyXG5cdGV4cG9ydCBmdW5jdGlvbiBwcmVsb2FkKHsgcGFyYW1zLCBxdWVyeSB9KSB7XHJcblx0XHRyZXR1cm4gdGhpcy5mZXRjaChgYmxvZy5qc29uYCkudGhlbihyID0+IHIuanNvbigpKS50aGVuKHBvc3RzID0+IHtcclxuXHRcdFx0cmV0dXJuIHsgcG9zdHMgfTtcclxuXHRcdH0pO1xyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c2NyaXB0PlxyXG5cdGV4cG9ydCBsZXQgcG9zdHM7XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlPlxyXG5cdHVsIHtcclxuXHRcdG1hcmdpbjogMCAwIDFlbSAwO1xyXG5cdFx0bGluZS1oZWlnaHQ6IDEuNTtcclxuXHR9XHJcbjwvc3R5bGU+XHJcblxyXG48c3ZlbHRlOmhlYWQ+XHJcblx0PHRpdGxlPkJsb2c8L3RpdGxlPlxyXG48L3N2ZWx0ZTpoZWFkPlxyXG5cclxuPGgxPlJlY2VudCBwb3N0czwvaDE+XHJcblxyXG48dWw+XHJcblx0eyNlYWNoIHBvc3RzIGFzIHBvc3R9XHJcblx0XHQ8IS0tIHdlJ3JlIHVzaW5nIHRoZSBub24tc3RhbmRhcmQgYHJlbD1wcmVmZXRjaGAgYXR0cmlidXRlIHRvXHJcblx0XHRcdFx0dGVsbCBTYXBwZXIgdG8gbG9hZCB0aGUgZGF0YSBmb3IgdGhlIHBhZ2UgYXMgc29vbiBhc1xyXG5cdFx0XHRcdHRoZSB1c2VyIGhvdmVycyBvdmVyIHRoZSBsaW5rIG9yIHRhcHMgaXQsIGluc3RlYWQgb2ZcclxuXHRcdFx0XHR3YWl0aW5nIGZvciB0aGUgJ2NsaWNrJyBldmVudCAtLT5cclxuXHRcdDxsaT48YSByZWw9J3ByZWZldGNoJyBocmVmPSdibG9nL3twb3N0LnNsdWd9Jz57cG9zdC50aXRsZX08L2E+PC9saT5cclxuXHR7L2VhY2h9XHJcbjwvdWw+IiwiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XHJcblx0ZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByZWxvYWQoeyBwYXJhbXMsIHF1ZXJ5IH0pIHtcclxuXHRcdC8vIHRoZSBgc2x1Z2AgcGFyYW1ldGVyIGlzIGF2YWlsYWJsZSBiZWNhdXNlXHJcblx0XHQvLyB0aGlzIGZpbGUgaXMgY2FsbGVkIFtzbHVnXS5zdmVsdGVcclxuXHRcdGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZmV0Y2goYGJsb2cvJHtwYXJhbXMuc2x1Z30uanNvbmApO1xyXG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XHJcblxyXG5cdFx0aWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xyXG5cdFx0XHRyZXR1cm4geyBwb3N0OiBkYXRhIH07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmVycm9yKHJlcy5zdGF0dXMsIGRhdGEubWVzc2FnZSk7XHJcblx0XHR9XHJcblx0fVxyXG48L3NjcmlwdD5cclxuXHJcbjxzY3JpcHQ+XHJcblx0ZXhwb3J0IGxldCBwb3N0O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZT5cclxuXHQvKlxyXG5cdFx0QnkgZGVmYXVsdCwgQ1NTIGlzIGxvY2FsbHkgc2NvcGVkIHRvIHRoZSBjb21wb25lbnQsXHJcblx0XHRhbmQgYW55IHVudXNlZCBzdHlsZXMgYXJlIGRlYWQtY29kZS1lbGltaW5hdGVkLlxyXG5cdFx0SW4gdGhpcyBwYWdlLCBTdmVsdGUgY2FuJ3Qga25vdyB3aGljaCBlbGVtZW50cyBhcmVcclxuXHRcdGdvaW5nIHRvIGFwcGVhciBpbnNpZGUgdGhlIHt7e3Bvc3QuaHRtbH19fSBibG9jayxcclxuXHRcdHNvIHdlIGhhdmUgdG8gdXNlIHRoZSA6Z2xvYmFsKC4uLikgbW9kaWZpZXIgdG8gdGFyZ2V0XHJcblx0XHRhbGwgZWxlbWVudHMgaW5zaWRlIC5jb250ZW50XHJcblx0Ki9cclxuXHQuY29udGVudCA6Z2xvYmFsKGgyKSB7XHJcblx0XHRmb250LXNpemU6IDEuNGVtO1xyXG5cdFx0Zm9udC13ZWlnaHQ6IDUwMDtcclxuXHR9XHJcblxyXG5cdC5jb250ZW50IDpnbG9iYWwocHJlKSB7XHJcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xyXG5cdFx0Ym94LXNoYWRvdzogaW5zZXQgMXB4IDFweCA1cHggcmdiYSgwLDAsMCwwLjA1KTtcclxuXHRcdHBhZGRpbmc6IDAuNWVtO1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMnB4O1xyXG5cdFx0b3ZlcmZsb3cteDogYXV0bztcclxuXHR9XHJcblxyXG5cdC5jb250ZW50IDpnbG9iYWwocHJlKSA6Z2xvYmFsKGNvZGUpIHtcclxuXHRcdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG5cdFx0cGFkZGluZzogMDtcclxuXHR9XHJcblxyXG5cdC5jb250ZW50IDpnbG9iYWwodWwpIHtcclxuXHRcdGxpbmUtaGVpZ2h0OiAxLjU7XHJcblx0fVxyXG5cclxuXHQuY29udGVudCA6Z2xvYmFsKGxpKSB7XHJcblx0XHRtYXJnaW46IDAgMCAwLjVlbSAwO1xyXG5cdH1cclxuPC9zdHlsZT5cclxuXHJcbjxzdmVsdGU6aGVhZD5cclxuXHQ8dGl0bGU+e3Bvc3QudGl0bGV9PC90aXRsZT5cclxuPC9zdmVsdGU6aGVhZD5cclxuXHJcbjxoMT57cG9zdC50aXRsZX08L2gxPlxyXG5cclxuPGRpdiBjbGFzcz0nY29udGVudCc+XHJcblx0e0BodG1sIHBvc3QuaHRtbH1cclxuPC9kaXY+XHJcbiIsIjxzY3JpcHQ+XHJcblx0aW1wb3J0IE5hdiBmcm9tICcuLi9jb21wb25lbnRzL05hdi5zdmVsdGUnO1xyXG5cclxuXHRleHBvcnQgbGV0IHNlZ21lbnQ7XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlPlxyXG5cdG1haW4ge1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0bWF4LXdpZHRoOiA1NmVtO1xyXG5cdFx0YmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcblx0XHRwYWRkaW5nOiAyZW07XHJcblx0XHRtYXJnaW46IDAgYXV0bztcclxuXHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblx0fVxyXG48L3N0eWxlPlxyXG5cclxuPCEtLTxOYXYge3NlZ21lbnR9Lz4tLT5cclxuXHJcbjxtYWluPlxyXG5cdDxzbG90Pjwvc2xvdD5cclxuPC9tYWluPiIsIjxzY3JpcHQ+XHJcblx0ZXhwb3J0IGxldCBzdGF0dXM7XHJcblx0ZXhwb3J0IGxldCBlcnJvcjtcclxuXHJcblx0Y29uc3QgZGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCc7XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlPlxyXG5cdGgxLCBwIHtcclxuXHRcdG1hcmdpbjogMCBhdXRvO1xyXG5cdH1cclxuXHJcblx0aDEge1xyXG5cdFx0Zm9udC1zaXplOiAyLjhlbTtcclxuXHRcdGZvbnQtd2VpZ2h0OiA3MDA7XHJcblx0XHRtYXJnaW46IDAgMCAwLjVlbSAwO1xyXG5cdH1cclxuXHJcblx0cCB7XHJcblx0XHRtYXJnaW46IDFlbSBhdXRvO1xyXG5cdH1cclxuXHJcblx0QG1lZGlhIChtaW4td2lkdGg6IDQ4MHB4KSB7XHJcblx0XHRoMSB7XHJcblx0XHRcdGZvbnQtc2l6ZTogNGVtO1xyXG5cdFx0fVxyXG5cdH1cclxuPC9zdHlsZT5cclxuXHJcbjxzdmVsdGU6aGVhZD5cclxuXHQ8dGl0bGU+e3N0YXR1c308L3RpdGxlPlxyXG48L3N2ZWx0ZTpoZWFkPlxyXG5cclxuPGgxPntzdGF0dXN9PC9oMT5cclxuXHJcbjxwPntlcnJvci5tZXNzYWdlfTwvcD5cclxuXHJcbnsjaWYgZGV2ICYmIGVycm9yLnN0YWNrfVxyXG5cdDxwcmU+e2Vycm9yLnN0YWNrfTwvcHJlPlxyXG57L2lmfVxyXG4iLCIvLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IFNhcHBlciDigJQgZG8gbm90IGVkaXQgaXQhXG5pbXBvcnQgKiBhcyByb3V0ZV8wIGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvYmxvZy9pbmRleC5qc29uLmpzXCI7XG5pbXBvcnQgKiBhcyByb3V0ZV8xIGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvYmxvZy9bc2x1Z10uanNvbi5qc1wiO1xuaW1wb3J0IGNvbXBvbmVudF8wIGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvaW5kZXguc3ZlbHRlXCI7XG5pbXBvcnQgY29tcG9uZW50XzEgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9hYm91dC5zdmVsdGVcIjtcbmltcG9ydCBjb21wb25lbnRfMiwgeyBwcmVsb2FkIGFzIHByZWxvYWRfMiB9IGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvYmxvZy9pbmRleC5zdmVsdGVcIjtcbmltcG9ydCBjb21wb25lbnRfMywgeyBwcmVsb2FkIGFzIHByZWxvYWRfMyB9IGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvYmxvZy9bc2x1Z10uc3ZlbHRlXCI7XG5pbXBvcnQgcm9vdCBmcm9tIFwiLi4vLi4vLi4vcm91dGVzL19sYXlvdXQuc3ZlbHRlXCI7XG5pbXBvcnQgZXJyb3IgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9fZXJyb3Iuc3ZlbHRlXCI7XG5cbmNvbnN0IGQgPSBkZWNvZGVVUklDb21wb25lbnQ7XG5cbmV4cG9ydCBjb25zdCBtYW5pZmVzdCA9IHtcblx0c2VydmVyX3JvdXRlczogW1xuXHRcdHtcblx0XHRcdC8vIGJsb2cvaW5kZXguanNvbi5qc1xuXHRcdFx0cGF0dGVybjogL15cXC9ibG9nLmpzb24kLyxcblx0XHRcdGhhbmRsZXJzOiByb3V0ZV8wLFxuXHRcdFx0cGFyYW1zOiAoKSA9PiAoe30pXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdC8vIGJsb2cvW3NsdWddLmpzb24uanNcblx0XHRcdHBhdHRlcm46IC9eXFwvYmxvZ1xcLyhbXlxcL10rPykuanNvbiQvLFxuXHRcdFx0aGFuZGxlcnM6IHJvdXRlXzEsXG5cdFx0XHRwYXJhbXM6IG1hdGNoID0+ICh7IHNsdWc6IGQobWF0Y2hbMV0pIH0pXG5cdFx0fVxuXHRdLFxuXG5cdHBhZ2VzOiBbXG5cdFx0e1xuXHRcdFx0Ly8gaW5kZXguc3ZlbHRlXG5cdFx0XHRwYXR0ZXJuOiAvXlxcLyQvLFxuXHRcdFx0cGFydHM6IFtcblx0XHRcdFx0eyBuYW1lOiBcImluZGV4XCIsIGZpbGU6IFwiaW5kZXguc3ZlbHRlXCIsIGNvbXBvbmVudDogY29tcG9uZW50XzAgfVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHQvLyBhYm91dC5zdmVsdGVcblx0XHRcdHBhdHRlcm46IC9eXFwvYWJvdXRcXC8/JC8sXG5cdFx0XHRwYXJ0czogW1xuXHRcdFx0XHR7IG5hbWU6IFwiYWJvdXRcIiwgZmlsZTogXCJhYm91dC5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfMSB9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdC8vIGJsb2cvaW5kZXguc3ZlbHRlXG5cdFx0XHRwYXR0ZXJuOiAvXlxcL2Jsb2dcXC8/JC8sXG5cdFx0XHRwYXJ0czogW1xuXHRcdFx0XHR7IG5hbWU6IFwiYmxvZ1wiLCBmaWxlOiBcImJsb2cvaW5kZXguc3ZlbHRlXCIsIGNvbXBvbmVudDogY29tcG9uZW50XzIsIHByZWxvYWQ6IHByZWxvYWRfMiB9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdC8vIGJsb2cvW3NsdWddLnN2ZWx0ZVxuXHRcdFx0cGF0dGVybjogL15cXC9ibG9nXFwvKFteXFwvXSs/KVxcLz8kLyxcblx0XHRcdHBhcnRzOiBbXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdHsgbmFtZTogXCJibG9nXyRzbHVnXCIsIGZpbGU6IFwiYmxvZy9bc2x1Z10uc3ZlbHRlXCIsIGNvbXBvbmVudDogY29tcG9uZW50XzMsIHByZWxvYWQ6IHByZWxvYWRfMywgcGFyYW1zOiBtYXRjaCA9PiAoeyBzbHVnOiBkKG1hdGNoWzFdKSB9KSB9XG5cdFx0XHRdXG5cdFx0fVxuXHRdLFxuXG5cdHJvb3QsXG5cdHJvb3RfcHJlbG9hZDogKCkgPT4ge30sXG5cdGVycm9yXG59O1xuXG5leHBvcnQgY29uc3QgYnVpbGRfZGlyID0gXCJfX3NhcHBlcl9fL2RldlwiO1xuXG5leHBvcnQgY29uc3Qgc3JjX2RpciA9IFwic3JjXCI7XG5cbmV4cG9ydCBjb25zdCBkZXYgPSB0cnVlOyIsImltcG9ydCB7IHNhZmVfbm90X2VxdWFsLCBub29wLCBydW5fYWxsLCBpc19mdW5jdGlvbiB9IGZyb20gJy4uL2ludGVybmFsJztcclxuZXhwb3J0IHsgZ2V0X3N0b3JlX3ZhbHVlIGFzIGdldCB9IGZyb20gJy4uL2ludGVybmFsJztcclxuXHJcbmNvbnN0IHN1YnNjcmliZXJfcXVldWUgPSBbXTtcclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBgUmVhZGFibGVgIHN0b3JlIHRoYXQgYWxsb3dzIHJlYWRpbmcgYnkgc3Vic2NyaXB0aW9uLlxyXG4gKiBAcGFyYW0gdmFsdWUgaW5pdGlhbCB2YWx1ZVxyXG4gKiBAcGFyYW0ge1N0YXJ0U3RvcE5vdGlmaWVyfXN0YXJ0IHN0YXJ0IGFuZCBzdG9wIG5vdGlmaWNhdGlvbnMgZm9yIHN1YnNjcmlwdGlvbnNcclxuICovXHJcbmZ1bmN0aW9uIHJlYWRhYmxlKHZhbHVlLCBzdGFydCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzdWJzY3JpYmU6IHdyaXRhYmxlKHZhbHVlLCBzdGFydCkuc3Vic2NyaWJlLFxyXG4gICAgfTtcclxufVxyXG4vKipcclxuICogQ3JlYXRlIGEgYFdyaXRhYmxlYCBzdG9yZSB0aGF0IGFsbG93cyBib3RoIHVwZGF0aW5nIGFuZCByZWFkaW5nIGJ5IHN1YnNjcmlwdGlvbi5cclxuICogQHBhcmFtIHsqPX12YWx1ZSBpbml0aWFsIHZhbHVlXHJcbiAqIEBwYXJhbSB7U3RhcnRTdG9wTm90aWZpZXI9fXN0YXJ0IHN0YXJ0IGFuZCBzdG9wIG5vdGlmaWNhdGlvbnMgZm9yIHN1YnNjcmlwdGlvbnNcclxuICovXHJcbmZ1bmN0aW9uIHdyaXRhYmxlKHZhbHVlLCBzdGFydCA9IG5vb3ApIHtcclxuICAgIGxldCBzdG9wO1xyXG4gICAgY29uc3Qgc3Vic2NyaWJlcnMgPSBbXTtcclxuICAgIGZ1bmN0aW9uIHNldChuZXdfdmFsdWUpIHtcclxuICAgICAgICBpZiAoc2FmZV9ub3RfZXF1YWwodmFsdWUsIG5ld192YWx1ZSkpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBuZXdfdmFsdWU7XHJcbiAgICAgICAgICAgIGlmIChzdG9wKSB7IC8vIHN0b3JlIGlzIHJlYWR5XHJcbiAgICAgICAgICAgICAgICBjb25zdCBydW5fcXVldWUgPSAhc3Vic2NyaWJlcl9xdWV1ZS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcyA9IHN1YnNjcmliZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHNbMV0oKTtcclxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlLnB1c2gocywgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJ1bl9xdWV1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vic2NyaWJlcl9xdWV1ZS5sZW5ndGg7IGkgKz0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlW2ldWzBdKHN1YnNjcmliZXJfcXVldWVbaSArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlcl9xdWV1ZS5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdXBkYXRlKGZuKSB7XHJcbiAgICAgICAgc2V0KGZuKHZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUocnVuLCBpbnZhbGlkYXRlID0gbm9vcCkge1xyXG4gICAgICAgIGNvbnN0IHN1YnNjcmliZXIgPSBbcnVuLCBpbnZhbGlkYXRlXTtcclxuICAgICAgICBzdWJzY3JpYmVycy5wdXNoKHN1YnNjcmliZXIpO1xyXG4gICAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgc3RvcCA9IHN0YXJ0KHNldCkgfHwgbm9vcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcnVuKHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHN1YnNjcmliZXJzLmluZGV4T2Yoc3Vic2NyaWJlcik7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgc3RvcCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgc2V0LCB1cGRhdGUsIHN1YnNjcmliZSB9O1xyXG59XHJcbi8qKlxyXG4gKiBEZXJpdmVkIHZhbHVlIHN0b3JlIGJ5IHN5bmNocm9uaXppbmcgb25lIG9yIG1vcmUgcmVhZGFibGUgc3RvcmVzIGFuZFxyXG4gKiBhcHBseWluZyBhbiBhZ2dyZWdhdGlvbiBmdW5jdGlvbiBvdmVyIGl0cyBpbnB1dCB2YWx1ZXMuXHJcbiAqIEBwYXJhbSB7U3RvcmVzfSBzdG9yZXMgaW5wdXQgc3RvcmVzXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oU3RvcmVzPSwgZnVuY3Rpb24oKik9KToqfWZuIGZ1bmN0aW9uIGNhbGxiYWNrIHRoYXQgYWdncmVnYXRlcyB0aGUgdmFsdWVzXHJcbiAqIEBwYXJhbSB7Kj19aW5pdGlhbF92YWx1ZSB3aGVuIHVzZWQgYXN5bmNocm9ub3VzbHlcclxuICovXHJcbmZ1bmN0aW9uIGRlcml2ZWQoc3RvcmVzLCBmbiwgaW5pdGlhbF92YWx1ZSkge1xyXG4gICAgY29uc3Qgc2luZ2xlID0gIUFycmF5LmlzQXJyYXkoc3RvcmVzKTtcclxuICAgIGNvbnN0IHN0b3Jlc19hcnJheSA9IHNpbmdsZVxyXG4gICAgICAgID8gW3N0b3Jlc11cclxuICAgICAgICA6IHN0b3JlcztcclxuICAgIGNvbnN0IGF1dG8gPSBmbi5sZW5ndGggPCAyO1xyXG4gICAgcmV0dXJuIHJlYWRhYmxlKGluaXRpYWxfdmFsdWUsIChzZXQpID0+IHtcclxuICAgICAgICBsZXQgaW5pdGVkID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XHJcbiAgICAgICAgbGV0IHBlbmRpbmcgPSAwO1xyXG4gICAgICAgIGxldCBjbGVhbnVwID0gbm9vcDtcclxuICAgICAgICBjb25zdCBzeW5jID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocGVuZGluZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNsZWFudXAoKTtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm4oc2luZ2xlID8gdmFsdWVzWzBdIDogdmFsdWVzLCBzZXQpO1xyXG4gICAgICAgICAgICBpZiAoYXV0bykge1xyXG4gICAgICAgICAgICAgICAgc2V0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhbnVwID0gaXNfZnVuY3Rpb24ocmVzdWx0KSA/IHJlc3VsdCA6IG5vb3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHVuc3Vic2NyaWJlcnMgPSBzdG9yZXNfYXJyYXkubWFwKChzdG9yZSwgaSkgPT4gc3RvcmUuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB2YWx1ZXNbaV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgcGVuZGluZyAmPSB+KDEgPDwgaSk7XHJcbiAgICAgICAgICAgIGlmIChpbml0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHN5bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgcGVuZGluZyB8PSAoMSA8PCBpKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgaW5pdGVkID0gdHJ1ZTtcclxuICAgICAgICBzeW5jKCk7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHN0b3AoKSB7XHJcbiAgICAgICAgICAgIHJ1bl9hbGwodW5zdWJzY3JpYmVycyk7XHJcbiAgICAgICAgICAgIGNsZWFudXAoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGRlcml2ZWQsIHJlYWRhYmxlLCB3cml0YWJsZSB9O1xyXG4iLCJpbXBvcnQgeyB3cml0YWJsZSB9IGZyb20gJ3N2ZWx0ZS9zdG9yZSc7XHJcblxyXG5leHBvcnQgY29uc3QgQ09OVEVYVF9LRVkgPSB7fTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmVsb2FkID0gKCkgPT4gKHt9KTsiLCI8IS0tIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgU2FwcGVyIOKAlCBkbyBub3QgZWRpdCBpdCEgLS0+XG48c2NyaXB0PlxuXHRpbXBvcnQgeyBzZXRDb250ZXh0IH0gZnJvbSAnc3ZlbHRlJztcblx0aW1wb3J0IHsgQ09OVEVYVF9LRVkgfSBmcm9tICcuL3NoYXJlZCc7XG5cdGltcG9ydCBMYXlvdXQgZnJvbSAnLi4vLi4vLi4vcm91dGVzL19sYXlvdXQuc3ZlbHRlJztcblx0aW1wb3J0IEVycm9yIGZyb20gJy4uLy4uLy4uL3JvdXRlcy9fZXJyb3Iuc3ZlbHRlJztcblxuXHRleHBvcnQgbGV0IHN0b3Jlcztcblx0ZXhwb3J0IGxldCBlcnJvcjtcblx0ZXhwb3J0IGxldCBzdGF0dXM7XG5cdGV4cG9ydCBsZXQgc2VnbWVudHM7XG5cdGV4cG9ydCBsZXQgbGV2ZWwwO1xuXHRleHBvcnQgbGV0IGxldmVsMSA9IG51bGw7XG5cblx0c2V0Q29udGV4dChDT05URVhUX0tFWSwgc3RvcmVzKTtcbjwvc2NyaXB0PlxuXG48TGF5b3V0IHNlZ21lbnQ9XCJ7c2VnbWVudHNbMF19XCIgey4uLmxldmVsMC5wcm9wc30+XG5cdHsjaWYgZXJyb3J9XG5cdFx0PEVycm9yIHtlcnJvcn0ge3N0YXR1c30vPlxuXHR7OmVsc2V9XG5cdFx0PHN2ZWx0ZTpjb21wb25lbnQgdGhpcz1cIntsZXZlbDEuY29tcG9uZW50fVwiIHsuLi5sZXZlbDEucHJvcHN9Lz5cblx0ey9pZn1cbjwvTGF5b3V0PiIsImltcG9ydCBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBkZXYsIGJ1aWxkX2Rpciwgc3JjX2RpciwgbWFuaWZlc3QgfSBmcm9tICcuL2ludGVybmFsL21hbmlmZXN0LXNlcnZlcic7XHJcbmltcG9ydCB7IHdyaXRhYmxlIH0gZnJvbSAnc3ZlbHRlL3N0b3JlJztcclxuaW1wb3J0IFN0cmVhbSBmcm9tICdzdHJlYW0nO1xyXG5pbXBvcnQgaHR0cCBmcm9tICdodHRwJztcclxuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xyXG5pbXBvcnQgaHR0cHMgZnJvbSAnaHR0cHMnO1xyXG5pbXBvcnQgemxpYiBmcm9tICd6bGliJztcclxuaW1wb3J0IEFwcCBmcm9tICcuL2ludGVybmFsL0FwcC5zdmVsdGUnO1xyXG5cclxuZnVuY3Rpb24gZ2V0X3NlcnZlcl9yb3V0ZV9oYW5kbGVyKHJvdXRlcykge1xyXG5cdGFzeW5jIGZ1bmN0aW9uIGhhbmRsZV9yb3V0ZShyb3V0ZSwgcmVxLCByZXMsIG5leHQpIHtcclxuXHRcdHJlcS5wYXJhbXMgPSByb3V0ZS5wYXJhbXMocm91dGUucGF0dGVybi5leGVjKHJlcS5wYXRoKSk7XHJcblxyXG5cdFx0Y29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0Ly8gJ2RlbGV0ZScgY2Fubm90IGJlIGV4cG9ydGVkIGZyb20gYSBtb2R1bGUgYmVjYXVzZSBpdCBpcyBhIGtleXdvcmQsXHJcblx0XHQvLyBzbyBjaGVjayBmb3IgJ2RlbCcgaW5zdGVhZFxyXG5cdFx0Y29uc3QgbWV0aG9kX2V4cG9ydCA9IG1ldGhvZCA9PT0gJ2RlbGV0ZScgPyAnZGVsJyA6IG1ldGhvZDtcclxuXHRcdGNvbnN0IGhhbmRsZV9tZXRob2QgPSByb3V0ZS5oYW5kbGVyc1ttZXRob2RfZXhwb3J0XTtcclxuXHRcdGlmIChoYW5kbGVfbWV0aG9kKSB7XHJcblx0XHRcdGlmIChwcm9jZXNzLmVudi5TQVBQRVJfRVhQT1JUKSB7XHJcblx0XHRcdFx0Y29uc3QgeyB3cml0ZSwgZW5kLCBzZXRIZWFkZXIgfSA9IHJlcztcclxuXHRcdFx0XHRjb25zdCBjaHVua3MgPSBbXTtcclxuXHRcdFx0XHRjb25zdCBoZWFkZXJzID0ge307XHJcblxyXG5cdFx0XHRcdC8vIGludGVyY2VwdCBkYXRhIHNvIHRoYXQgaXQgY2FuIGJlIGV4cG9ydGVkXHJcblx0XHRcdFx0cmVzLndyaXRlID0gZnVuY3Rpb24oY2h1bmspIHtcclxuXHRcdFx0XHRcdGNodW5rcy5wdXNoKEJ1ZmZlci5mcm9tKGNodW5rKSk7XHJcblx0XHRcdFx0XHR3cml0ZS5hcHBseShyZXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0cmVzLnNldEhlYWRlciA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XHJcblx0XHRcdFx0XHRoZWFkZXJzW25hbWUudG9Mb3dlckNhc2UoKV0gPSB2YWx1ZTtcclxuXHRcdFx0XHRcdHNldEhlYWRlci5hcHBseShyZXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0cmVzLmVuZCA9IGZ1bmN0aW9uKGNodW5rKSB7XHJcblx0XHRcdFx0XHRpZiAoY2h1bmspIGNodW5rcy5wdXNoKEJ1ZmZlci5mcm9tKGNodW5rKSk7XHJcblx0XHRcdFx0XHRlbmQuYXBwbHkocmVzLCBhcmd1bWVudHMpO1xyXG5cclxuXHRcdFx0XHRcdHByb2Nlc3Muc2VuZCh7XHJcblx0XHRcdFx0XHRcdF9fc2FwcGVyX186IHRydWUsXHJcblx0XHRcdFx0XHRcdGV2ZW50OiAnZmlsZScsXHJcblx0XHRcdFx0XHRcdHVybDogcmVxLnVybCxcclxuXHRcdFx0XHRcdFx0bWV0aG9kOiByZXEubWV0aG9kLFxyXG5cdFx0XHRcdFx0XHRzdGF0dXM6IHJlcy5zdGF0dXNDb2RlLFxyXG5cdFx0XHRcdFx0XHR0eXBlOiBoZWFkZXJzWydjb250ZW50LXR5cGUnXSxcclxuXHRcdFx0XHRcdFx0Ym9keTogQnVmZmVyLmNvbmNhdChjaHVua3MpLnRvU3RyaW5nKClcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbnN0IGhhbmRsZV9uZXh0ID0gKGVycikgPT4ge1xyXG5cdFx0XHRcdGlmIChlcnIpIHtcclxuXHRcdFx0XHRcdHJlcy5zdGF0dXNDb2RlID0gNTAwO1xyXG5cdFx0XHRcdFx0cmVzLmVuZChlcnIubWVzc2FnZSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHByb2Nlc3MubmV4dFRpY2sobmV4dCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRhd2FpdCBoYW5kbGVfbWV0aG9kKHJlcSwgcmVzLCBoYW5kbGVfbmV4dCk7XHJcblx0XHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHRcdFx0XHRoYW5kbGVfbmV4dChlcnIpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBubyBtYXRjaGluZyBoYW5kbGVyIGZvciBtZXRob2RcclxuXHRcdFx0cHJvY2Vzcy5uZXh0VGljayhuZXh0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiBmaW5kX3JvdXRlKHJlcSwgcmVzLCBuZXh0KSB7XHJcblx0XHRmb3IgKGNvbnN0IHJvdXRlIG9mIHJvdXRlcykge1xyXG5cdFx0XHRpZiAocm91dGUucGF0dGVybi50ZXN0KHJlcS5wYXRoKSkge1xyXG5cdFx0XHRcdGhhbmRsZV9yb3V0ZShyb3V0ZSwgcmVxLCByZXMsIG5leHQpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG5leHQoKTtcclxuXHR9O1xyXG59XHJcblxyXG4vKiFcclxuICogY29va2llXHJcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgUm9tYW4gU2h0eWxtYW5cclxuICogQ29weXJpZ2h0KGMpIDIwMTUgRG91Z2xhcyBDaHJpc3RvcGhlciBXaWxzb25cclxuICogTUlUIExpY2Vuc2VkXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIE1vZHVsZSBleHBvcnRzLlxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5cclxudmFyIHBhcnNlXzEgPSBwYXJzZTtcclxudmFyIHNlcmlhbGl6ZV8xID0gc2VyaWFsaXplO1xyXG5cclxuLyoqXHJcbiAqIE1vZHVsZSB2YXJpYWJsZXMuXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5cclxudmFyIGRlY29kZSA9IGRlY29kZVVSSUNvbXBvbmVudDtcclxudmFyIGVuY29kZSA9IGVuY29kZVVSSUNvbXBvbmVudDtcclxudmFyIHBhaXJTcGxpdFJlZ0V4cCA9IC87ICovO1xyXG5cclxuLyoqXHJcbiAqIFJlZ0V4cCB0byBtYXRjaCBmaWVsZC1jb250ZW50IGluIFJGQyA3MjMwIHNlYyAzLjJcclxuICpcclxuICogZmllbGQtY29udGVudCA9IGZpZWxkLXZjaGFyIFsgMSooIFNQIC8gSFRBQiApIGZpZWxkLXZjaGFyIF1cclxuICogZmllbGQtdmNoYXIgICA9IFZDSEFSIC8gb2JzLXRleHRcclxuICogb2JzLXRleHQgICAgICA9ICV4ODAtRkZcclxuICovXHJcblxyXG52YXIgZmllbGRDb250ZW50UmVnRXhwID0gL15bXFx1MDAwOVxcdTAwMjAtXFx1MDA3ZVxcdTAwODAtXFx1MDBmZl0rJC87XHJcblxyXG4vKipcclxuICogUGFyc2UgYSBjb29raWUgaGVhZGVyLlxyXG4gKlxyXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gY29va2llIGhlYWRlciBzdHJpbmcgaW50byBhbiBvYmplY3RcclxuICogVGhlIG9iamVjdCBoYXMgdGhlIHZhcmlvdXMgY29va2llcyBhcyBrZXlzKG5hbWVzKSA9PiB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXHJcbiAqIEByZXR1cm4ge29iamVjdH1cclxuICogQHB1YmxpY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHBhcnNlKHN0ciwgb3B0aW9ucykge1xyXG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgc3RyIG11c3QgYmUgYSBzdHJpbmcnKTtcclxuICB9XHJcblxyXG4gIHZhciBvYmogPSB7fTtcclxuICB2YXIgb3B0ID0gb3B0aW9ucyB8fCB7fTtcclxuICB2YXIgcGFpcnMgPSBzdHIuc3BsaXQocGFpclNwbGl0UmVnRXhwKTtcclxuICB2YXIgZGVjID0gb3B0LmRlY29kZSB8fCBkZWNvZGU7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBwYWlyID0gcGFpcnNbaV07XHJcbiAgICB2YXIgZXFfaWR4ID0gcGFpci5pbmRleE9mKCc9Jyk7XHJcblxyXG4gICAgLy8gc2tpcCB0aGluZ3MgdGhhdCBkb24ndCBsb29rIGxpa2Uga2V5PXZhbHVlXHJcbiAgICBpZiAoZXFfaWR4IDwgMCkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIga2V5ID0gcGFpci5zdWJzdHIoMCwgZXFfaWR4KS50cmltKCk7XHJcbiAgICB2YXIgdmFsID0gcGFpci5zdWJzdHIoKytlcV9pZHgsIHBhaXIubGVuZ3RoKS50cmltKCk7XHJcblxyXG4gICAgLy8gcXVvdGVkIHZhbHVlc1xyXG4gICAgaWYgKCdcIicgPT0gdmFsWzBdKSB7XHJcbiAgICAgIHZhbCA9IHZhbC5zbGljZSgxLCAtMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gb25seSBhc3NpZ24gb25jZVxyXG4gICAgaWYgKHVuZGVmaW5lZCA9PSBvYmpba2V5XSkge1xyXG4gICAgICBvYmpba2V5XSA9IHRyeURlY29kZSh2YWwsIGRlYyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICogU2VyaWFsaXplIGRhdGEgaW50byBhIGNvb2tpZSBoZWFkZXIuXHJcbiAqXHJcbiAqIFNlcmlhbGl6ZSB0aGUgYSBuYW1lIHZhbHVlIHBhaXIgaW50byBhIGNvb2tpZSBzdHJpbmcgc3VpdGFibGUgZm9yXHJcbiAqIGh0dHAgaGVhZGVycy4gQW4gb3B0aW9uYWwgb3B0aW9ucyBvYmplY3Qgc3BlY2lmaWVkIGNvb2tpZSBwYXJhbWV0ZXJzLlxyXG4gKlxyXG4gKiBzZXJpYWxpemUoJ2ZvbycsICdiYXInLCB7IGh0dHBPbmx5OiB0cnVlIH0pXHJcbiAqICAgPT4gXCJmb289YmFyOyBodHRwT25seVwiXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWxcclxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqIEBwdWJsaWNcclxuICovXHJcblxyXG5mdW5jdGlvbiBzZXJpYWxpemUobmFtZSwgdmFsLCBvcHRpb25zKSB7XHJcbiAgdmFyIG9wdCA9IG9wdGlvbnMgfHwge307XHJcbiAgdmFyIGVuYyA9IG9wdC5lbmNvZGUgfHwgZW5jb2RlO1xyXG5cclxuICBpZiAodHlwZW9mIGVuYyAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIGVuY29kZSBpcyBpbnZhbGlkJyk7XHJcbiAgfVxyXG5cclxuICBpZiAoIWZpZWxkQ29udGVudFJlZ0V4cC50ZXN0KG5hbWUpKSB7XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBuYW1lIGlzIGludmFsaWQnKTtcclxuICB9XHJcblxyXG4gIHZhciB2YWx1ZSA9IGVuYyh2YWwpO1xyXG5cclxuICBpZiAodmFsdWUgJiYgIWZpZWxkQ29udGVudFJlZ0V4cC50ZXN0KHZhbHVlKSkge1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgdmFsIGlzIGludmFsaWQnKTtcclxuICB9XHJcblxyXG4gIHZhciBzdHIgPSBuYW1lICsgJz0nICsgdmFsdWU7XHJcblxyXG4gIGlmIChudWxsICE9IG9wdC5tYXhBZ2UpIHtcclxuICAgIHZhciBtYXhBZ2UgPSBvcHQubWF4QWdlIC0gMDtcclxuICAgIGlmIChpc05hTihtYXhBZ2UpKSB0aHJvdyBuZXcgRXJyb3IoJ21heEFnZSBzaG91bGQgYmUgYSBOdW1iZXInKTtcclxuICAgIHN0ciArPSAnOyBNYXgtQWdlPScgKyBNYXRoLmZsb29yKG1heEFnZSk7XHJcbiAgfVxyXG5cclxuICBpZiAob3B0LmRvbWFpbikge1xyXG4gICAgaWYgKCFmaWVsZENvbnRlbnRSZWdFeHAudGVzdChvcHQuZG9tYWluKSkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gZG9tYWluIGlzIGludmFsaWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBzdHIgKz0gJzsgRG9tYWluPScgKyBvcHQuZG9tYWluO1xyXG4gIH1cclxuXHJcbiAgaWYgKG9wdC5wYXRoKSB7XHJcbiAgICBpZiAoIWZpZWxkQ29udGVudFJlZ0V4cC50ZXN0KG9wdC5wYXRoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gcGF0aCBpcyBpbnZhbGlkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RyICs9ICc7IFBhdGg9JyArIG9wdC5wYXRoO1xyXG4gIH1cclxuXHJcbiAgaWYgKG9wdC5leHBpcmVzKSB7XHJcbiAgICBpZiAodHlwZW9mIG9wdC5leHBpcmVzLnRvVVRDU3RyaW5nICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBleHBpcmVzIGlzIGludmFsaWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBzdHIgKz0gJzsgRXhwaXJlcz0nICsgb3B0LmV4cGlyZXMudG9VVENTdHJpbmcoKTtcclxuICB9XHJcblxyXG4gIGlmIChvcHQuaHR0cE9ubHkpIHtcclxuICAgIHN0ciArPSAnOyBIdHRwT25seSc7XHJcbiAgfVxyXG5cclxuICBpZiAob3B0LnNlY3VyZSkge1xyXG4gICAgc3RyICs9ICc7IFNlY3VyZSc7XHJcbiAgfVxyXG5cclxuICBpZiAob3B0LnNhbWVTaXRlKSB7XHJcbiAgICB2YXIgc2FtZVNpdGUgPSB0eXBlb2Ygb3B0LnNhbWVTaXRlID09PSAnc3RyaW5nJ1xyXG4gICAgICA/IG9wdC5zYW1lU2l0ZS50b0xvd2VyQ2FzZSgpIDogb3B0LnNhbWVTaXRlO1xyXG5cclxuICAgIHN3aXRjaCAoc2FtZVNpdGUpIHtcclxuICAgICAgY2FzZSB0cnVlOlxyXG4gICAgICAgIHN0ciArPSAnOyBTYW1lU2l0ZT1TdHJpY3QnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsYXgnOlxyXG4gICAgICAgIHN0ciArPSAnOyBTYW1lU2l0ZT1MYXgnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzdHJpY3QnOlxyXG4gICAgICAgIHN0ciArPSAnOyBTYW1lU2l0ZT1TdHJpY3QnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdub25lJzpcclxuICAgICAgICBzdHIgKz0gJzsgU2FtZVNpdGU9Tm9uZSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIHNhbWVTaXRlIGlzIGludmFsaWQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBzdHI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcnkgZGVjb2RpbmcgYSBzdHJpbmcgdXNpbmcgYSBkZWNvZGluZyBmdW5jdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBkZWNvZGVcclxuICogQHByaXZhdGVcclxuICovXHJcblxyXG5mdW5jdGlvbiB0cnlEZWNvZGUoc3RyLCBkZWNvZGUpIHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGRlY29kZShzdHIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBzdHI7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgY29va2llID0ge1xyXG5cdHBhcnNlOiBwYXJzZV8xLFxyXG5cdHNlcmlhbGl6ZTogc2VyaWFsaXplXzFcclxufTtcclxuXHJcbnZhciBjaGFycyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXyQnO1xyXG52YXIgdW5zYWZlQ2hhcnMgPSAvWzw+XFxiXFxmXFxuXFxyXFx0XFwwXFx1MjAyOFxcdTIwMjldL2c7XHJcbnZhciByZXNlcnZlZCA9IC9eKD86ZG98aWZ8aW58Zm9yfGludHxsZXR8bmV3fHRyeXx2YXJ8Ynl0ZXxjYXNlfGNoYXJ8ZWxzZXxlbnVtfGdvdG98bG9uZ3x0aGlzfHZvaWR8d2l0aHxhd2FpdHxicmVha3xjYXRjaHxjbGFzc3xjb25zdHxmaW5hbHxmbG9hdHxzaG9ydHxzdXBlcnx0aHJvd3x3aGlsZXx5aWVsZHxkZWxldGV8ZG91YmxlfGV4cG9ydHxpbXBvcnR8bmF0aXZlfHJldHVybnxzd2l0Y2h8dGhyb3dzfHR5cGVvZnxib29sZWFufGRlZmF1bHR8ZXh0ZW5kc3xmaW5hbGx5fHBhY2thZ2V8cHJpdmF0ZXxhYnN0cmFjdHxjb250aW51ZXxkZWJ1Z2dlcnxmdW5jdGlvbnx2b2xhdGlsZXxpbnRlcmZhY2V8cHJvdGVjdGVkfHRyYW5zaWVudHxpbXBsZW1lbnRzfGluc3RhbmNlb2Z8c3luY2hyb25pemVkKSQvO1xyXG52YXIgZXNjYXBlZCA9IHtcclxuICAgICc8JzogJ1xcXFx1MDAzQycsXHJcbiAgICAnPic6ICdcXFxcdTAwM0UnLFxyXG4gICAgJy8nOiAnXFxcXHUwMDJGJyxcclxuICAgICdcXFxcJzogJ1xcXFxcXFxcJyxcclxuICAgICdcXGInOiAnXFxcXGInLFxyXG4gICAgJ1xcZic6ICdcXFxcZicsXHJcbiAgICAnXFxuJzogJ1xcXFxuJyxcclxuICAgICdcXHInOiAnXFxcXHInLFxyXG4gICAgJ1xcdCc6ICdcXFxcdCcsXHJcbiAgICAnXFwwJzogJ1xcXFwwJyxcclxuICAgICdcXHUyMDI4JzogJ1xcXFx1MjAyOCcsXHJcbiAgICAnXFx1MjAyOSc6ICdcXFxcdTIwMjknXHJcbn07XHJcbnZhciBvYmplY3RQcm90b093blByb3BlcnR5TmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPYmplY3QucHJvdG90eXBlKS5zb3J0KCkuam9pbignXFwwJyk7XHJcbmZ1bmN0aW9uIGRldmFsdWUodmFsdWUpIHtcclxuICAgIHZhciBjb3VudHMgPSBuZXcgTWFwKCk7XHJcbiAgICBmdW5jdGlvbiB3YWxrKHRoaW5nKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgc3RyaW5naWZ5IGEgZnVuY3Rpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3VudHMuaGFzKHRoaW5nKSkge1xyXG4gICAgICAgICAgICBjb3VudHMuc2V0KHRoaW5nLCBjb3VudHMuZ2V0KHRoaW5nKSArIDEpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvdW50cy5zZXQodGhpbmcsIDEpO1xyXG4gICAgICAgIGlmICghaXNQcmltaXRpdmUodGhpbmcpKSB7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gZ2V0VHlwZSh0aGluZyk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnTnVtYmVyJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdCb29sZWFuJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ0RhdGUnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnUmVnRXhwJzpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJheSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpbmcuZm9yRWFjaCh3YWxrKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1NldCc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdNYXAnOlxyXG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmZyb20odGhpbmcpLmZvckVhY2god2Fsayk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3RvICE9PSBPYmplY3QucHJvdG90eXBlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3RvICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3RvKS5zb3J0KCkuam9pbignXFwwJykgIT09IG9iamVjdFByb3RvT3duUHJvcGVydHlOYW1lcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgc3RyaW5naWZ5IGFyYml0cmFyeSBub24tUE9KT3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRoaW5nKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzdHJpbmdpZnkgUE9KT3Mgd2l0aCBzeW1ib2xpYyBrZXlzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0aGluZykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB3YWxrKHRoaW5nW2tleV0pOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHdhbGsodmFsdWUpO1xyXG4gICAgdmFyIG5hbWVzID0gbmV3IE1hcCgpO1xyXG4gICAgQXJyYXkuZnJvbShjb3VudHMpXHJcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoZW50cnkpIHsgcmV0dXJuIGVudHJ5WzFdID4gMTsgfSlcclxuICAgICAgICAuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYlsxXSAtIGFbMV07IH0pXHJcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGVudHJ5LCBpKSB7XHJcbiAgICAgICAgbmFtZXMuc2V0KGVudHJ5WzBdLCBnZXROYW1lKGkpKTtcclxuICAgIH0pO1xyXG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5KHRoaW5nKSB7XHJcbiAgICAgICAgaWYgKG5hbWVzLmhhcyh0aGluZykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5hbWVzLmdldCh0aGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc1ByaW1pdGl2ZSh0aGluZykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ2lmeVByaW1pdGl2ZSh0aGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB0eXBlID0gZ2V0VHlwZSh0aGluZyk7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ051bWJlcic6XHJcbiAgICAgICAgICAgIGNhc2UgJ1N0cmluZyc6XHJcbiAgICAgICAgICAgIGNhc2UgJ0Jvb2xlYW4nOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiT2JqZWN0KFwiICsgc3RyaW5naWZ5KHRoaW5nLnZhbHVlT2YoKSkgKyBcIilcIjtcclxuICAgICAgICAgICAgY2FzZSAnUmVnRXhwJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGluZy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBjYXNlICdEYXRlJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIm5ldyBEYXRlKFwiICsgdGhpbmcuZ2V0VGltZSgpICsgXCIpXCI7XHJcbiAgICAgICAgICAgIGNhc2UgJ0FycmF5JzpcclxuICAgICAgICAgICAgICAgIHZhciBtZW1iZXJzID0gdGhpbmcubWFwKGZ1bmN0aW9uICh2LCBpKSB7IHJldHVybiBpIGluIHRoaW5nID8gc3RyaW5naWZ5KHYpIDogJyc7IH0pO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhaWwgPSB0aGluZy5sZW5ndGggPT09IDAgfHwgKHRoaW5nLmxlbmd0aCAtIDEgaW4gdGhpbmcpID8gJycgOiAnLCc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbXCIgKyBtZW1iZXJzLmpvaW4oJywnKSArIHRhaWwgKyBcIl1cIjtcclxuICAgICAgICAgICAgY2FzZSAnU2V0JzpcclxuICAgICAgICAgICAgY2FzZSAnTWFwJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIm5ldyBcIiArIHR5cGUgKyBcIihbXCIgKyBBcnJheS5mcm9tKHRoaW5nKS5tYXAoc3RyaW5naWZ5KS5qb2luKCcsJykgKyBcIl0pXCI7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0gXCJ7XCIgKyBPYmplY3Qua2V5cyh0aGluZykubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHNhZmVLZXkoa2V5KSArIFwiOlwiICsgc3RyaW5naWZ5KHRoaW5nW2tleV0pOyB9KS5qb2luKCcsJykgKyBcIn1cIjtcclxuICAgICAgICAgICAgICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGluZyk7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvdG8gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpbmcpLmxlbmd0aCA+IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIk9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShudWxsKSxcIiArIG9iaiArIFwiKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCJPYmplY3QuY3JlYXRlKG51bGwpXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciBzdHIgPSBzdHJpbmdpZnkodmFsdWUpO1xyXG4gICAgaWYgKG5hbWVzLnNpemUpIHtcclxuICAgICAgICB2YXIgcGFyYW1zXzEgPSBbXTtcclxuICAgICAgICB2YXIgc3RhdGVtZW50c18xID0gW107XHJcbiAgICAgICAgdmFyIHZhbHVlc18xID0gW107XHJcbiAgICAgICAgbmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSwgdGhpbmcpIHtcclxuICAgICAgICAgICAgcGFyYW1zXzEucHVzaChuYW1lKTtcclxuICAgICAgICAgICAgaWYgKGlzUHJpbWl0aXZlKHRoaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChzdHJpbmdpZnlQcmltaXRpdmUodGhpbmcpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IGdldFR5cGUodGhpbmcpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ051bWJlcic6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdTdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnQm9vbGVhbic6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChcIk9iamVjdChcIiArIHN0cmluZ2lmeSh0aGluZy52YWx1ZU9mKCkpICsgXCIpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnUmVnRXhwJzpcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKHRoaW5nLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChcIm5ldyBEYXRlKFwiICsgdGhpbmcuZ2V0VGltZSgpICsgXCIpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyYXknOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goXCJBcnJheShcIiArIHRoaW5nLmxlbmd0aCArIFwiKVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGluZy5mb3JFYWNoKGZ1bmN0aW9uICh2LCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKG5hbWUgKyBcIltcIiArIGkgKyBcIl09XCIgKyBzdHJpbmdpZnkodikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnU2V0JzpcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKFwibmV3IFNldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzXzEucHVzaChuYW1lICsgXCIuXCIgKyBBcnJheS5mcm9tKHRoaW5nKS5tYXAoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFwiYWRkKFwiICsgc3RyaW5naWZ5KHYpICsgXCIpXCI7IH0pLmpvaW4oJy4nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdNYXAnOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goXCJuZXcgTWFwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKG5hbWUgKyBcIi5cIiArIEFycmF5LmZyb20odGhpbmcpLm1hcChmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGsgPSBfYVswXSwgdiA9IF9hWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzZXQoXCIgKyBzdHJpbmdpZnkoaykgKyBcIiwgXCIgKyBzdHJpbmdpZnkodikgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcuJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGluZykgPT09IG51bGwgPyAnT2JqZWN0LmNyZWF0ZShudWxsKScgOiAne30nKTtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0aGluZykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKFwiXCIgKyBuYW1lICsgc2FmZVByb3Aoa2V5KSArIFwiPVwiICsgc3RyaW5naWZ5KHRoaW5nW2tleV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKFwicmV0dXJuIFwiICsgc3RyKTtcclxuICAgICAgICByZXR1cm4gXCIoZnVuY3Rpb24oXCIgKyBwYXJhbXNfMS5qb2luKCcsJykgKyBcIil7XCIgKyBzdGF0ZW1lbnRzXzEuam9pbignOycpICsgXCJ9KFwiICsgdmFsdWVzXzEuam9pbignLCcpICsgXCIpKVwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZXROYW1lKG51bSkge1xyXG4gICAgdmFyIG5hbWUgPSAnJztcclxuICAgIGRvIHtcclxuICAgICAgICBuYW1lID0gY2hhcnNbbnVtICUgY2hhcnMubGVuZ3RoXSArIG5hbWU7XHJcbiAgICAgICAgbnVtID0gfn4obnVtIC8gY2hhcnMubGVuZ3RoKSAtIDE7XHJcbiAgICB9IHdoaWxlIChudW0gPj0gMCk7XHJcbiAgICByZXR1cm4gcmVzZXJ2ZWQudGVzdChuYW1lKSA/IG5hbWUgKyBcIl9cIiA6IG5hbWU7XHJcbn1cclxuZnVuY3Rpb24gaXNQcmltaXRpdmUodGhpbmcpIHtcclxuICAgIHJldHVybiBPYmplY3QodGhpbmcpICE9PSB0aGluZztcclxufVxyXG5mdW5jdGlvbiBzdHJpbmdpZnlQcmltaXRpdmUodGhpbmcpIHtcclxuICAgIGlmICh0eXBlb2YgdGhpbmcgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgIHJldHVybiBzdHJpbmdpZnlTdHJpbmcodGhpbmcpO1xyXG4gICAgaWYgKHRoaW5nID09PSB2b2lkIDApXHJcbiAgICAgICAgcmV0dXJuICd2b2lkIDAnO1xyXG4gICAgaWYgKHRoaW5nID09PSAwICYmIDEgLyB0aGluZyA8IDApXHJcbiAgICAgICAgcmV0dXJuICctMCc7XHJcbiAgICB2YXIgc3RyID0gU3RyaW5nKHRoaW5nKTtcclxuICAgIGlmICh0eXBlb2YgdGhpbmcgPT09ICdudW1iZXInKVxyXG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXigtKT8wXFwuLywgJyQxLicpO1xyXG4gICAgcmV0dXJuIHN0cjtcclxufVxyXG5mdW5jdGlvbiBnZXRUeXBlKHRoaW5nKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaW5nKS5zbGljZSg4LCAtMSk7XHJcbn1cclxuZnVuY3Rpb24gZXNjYXBlVW5zYWZlQ2hhcihjKSB7XHJcbiAgICByZXR1cm4gZXNjYXBlZFtjXSB8fCBjO1xyXG59XHJcbmZ1bmN0aW9uIGVzY2FwZVVuc2FmZUNoYXJzKHN0cikge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKHVuc2FmZUNoYXJzLCBlc2NhcGVVbnNhZmVDaGFyKTtcclxufVxyXG5mdW5jdGlvbiBzYWZlS2V5KGtleSkge1xyXG4gICAgcmV0dXJuIC9eW18kYS16QS1aXVtfJGEtekEtWjAtOV0qJC8udGVzdChrZXkpID8ga2V5IDogZXNjYXBlVW5zYWZlQ2hhcnMoSlNPTi5zdHJpbmdpZnkoa2V5KSk7XHJcbn1cclxuZnVuY3Rpb24gc2FmZVByb3Aoa2V5KSB7XHJcbiAgICByZXR1cm4gL15bXyRhLXpBLVpdW18kYS16QS1aMC05XSokLy50ZXN0KGtleSkgPyBcIi5cIiArIGtleSA6IFwiW1wiICsgZXNjYXBlVW5zYWZlQ2hhcnMoSlNPTi5zdHJpbmdpZnkoa2V5KSkgKyBcIl1cIjtcclxufVxyXG5mdW5jdGlvbiBzdHJpbmdpZnlTdHJpbmcoc3RyKSB7XHJcbiAgICB2YXIgcmVzdWx0ID0gJ1wiJztcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgdmFyIGNoYXIgPSBzdHIuY2hhckF0KGkpO1xyXG4gICAgICAgIHZhciBjb2RlID0gY2hhci5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIGlmIChjaGFyID09PSAnXCInKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSAnXFxcXFwiJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2hhciBpbiBlc2NhcGVkKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBlc2NhcGVkW2NoYXJdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb2RlID49IDB4ZDgwMCAmJiBjb2RlIDw9IDB4ZGZmZikge1xyXG4gICAgICAgICAgICB2YXIgbmV4dCA9IHN0ci5jaGFyQ29kZUF0KGkgKyAxKTtcclxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgYmVnaW5uaW5nIG9mIGEgW2hpZ2gsIGxvd10gc3Vycm9nYXRlIHBhaXIsXHJcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgbmV4dCB0d28gY2hhcmFjdGVycywgb3RoZXJ3aXNlIGVzY2FwZVxyXG4gICAgICAgICAgICBpZiAoY29kZSA8PSAweGRiZmYgJiYgKG5leHQgPj0gMHhkYzAwICYmIG5leHQgPD0gMHhkZmZmKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGNoYXIgKyBzdHJbKytpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIlxcXFx1XCIgKyBjb2RlLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gY2hhcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXN1bHQgKz0gJ1wiJztcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8vIEJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS90bXB2YXIvanNkb20vYmxvYi9hYTg1YjJhYmYwNzc2NmZmN2JmNWMxZjZkYWFmYjM3MjZmMmYyZGI1L2xpYi9qc2RvbS9saXZpbmcvYmxvYi5qc1xyXG5cclxuLy8gZml4IGZvciBcIlJlYWRhYmxlXCIgaXNuJ3QgYSBuYW1lZCBleHBvcnQgaXNzdWVcclxuY29uc3QgUmVhZGFibGUgPSBTdHJlYW0uUmVhZGFibGU7XHJcblxyXG5jb25zdCBCVUZGRVIgPSBTeW1ib2woJ2J1ZmZlcicpO1xyXG5jb25zdCBUWVBFID0gU3ltYm9sKCd0eXBlJyk7XHJcblxyXG5jbGFzcyBCbG9iIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXNbVFlQRV0gPSAnJztcclxuXHJcblx0XHRjb25zdCBibG9iUGFydHMgPSBhcmd1bWVudHNbMF07XHJcblx0XHRjb25zdCBvcHRpb25zID0gYXJndW1lbnRzWzFdO1xyXG5cclxuXHRcdGNvbnN0IGJ1ZmZlcnMgPSBbXTtcclxuXHRcdGxldCBzaXplID0gMDtcclxuXHJcblx0XHRpZiAoYmxvYlBhcnRzKSB7XHJcblx0XHRcdGNvbnN0IGEgPSBibG9iUGFydHM7XHJcblx0XHRcdGNvbnN0IGxlbmd0aCA9IE51bWJlcihhLmxlbmd0aCk7XHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRjb25zdCBlbGVtZW50ID0gYVtpXTtcclxuXHRcdFx0XHRsZXQgYnVmZmVyO1xyXG5cdFx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQnVmZmVyKSB7XHJcblx0XHRcdFx0XHRidWZmZXIgPSBlbGVtZW50O1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGVsZW1lbnQpKSB7XHJcblx0XHRcdFx0XHRidWZmZXIgPSBCdWZmZXIuZnJvbShlbGVtZW50LmJ1ZmZlciwgZWxlbWVudC5ieXRlT2Zmc2V0LCBlbGVtZW50LmJ5dGVMZW5ndGgpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XHJcblx0XHRcdFx0XHRidWZmZXIgPSBCdWZmZXIuZnJvbShlbGVtZW50KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCbG9iKSB7XHJcblx0XHRcdFx0XHRidWZmZXIgPSBlbGVtZW50W0JVRkZFUl07XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyA/IGVsZW1lbnQgOiBTdHJpbmcoZWxlbWVudCkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzaXplICs9IGJ1ZmZlci5sZW5ndGg7XHJcblx0XHRcdFx0YnVmZmVycy5wdXNoKGJ1ZmZlcik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzW0JVRkZFUl0gPSBCdWZmZXIuY29uY2F0KGJ1ZmZlcnMpO1xyXG5cclxuXHRcdGxldCB0eXBlID0gb3B0aW9ucyAmJiBvcHRpb25zLnR5cGUgIT09IHVuZGVmaW5lZCAmJiBTdHJpbmcob3B0aW9ucy50eXBlKS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0aWYgKHR5cGUgJiYgIS9bXlxcdTAwMjAtXFx1MDA3RV0vLnRlc3QodHlwZSkpIHtcclxuXHRcdFx0dGhpc1tUWVBFXSA9IHR5cGU7XHJcblx0XHR9XHJcblx0fVxyXG5cdGdldCBzaXplKCkge1xyXG5cdFx0cmV0dXJuIHRoaXNbQlVGRkVSXS5sZW5ndGg7XHJcblx0fVxyXG5cdGdldCB0eXBlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXNbVFlQRV07XHJcblx0fVxyXG5cdHRleHQoKSB7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXNbQlVGRkVSXS50b1N0cmluZygpKTtcclxuXHR9XHJcblx0YXJyYXlCdWZmZXIoKSB7XHJcblx0XHRjb25zdCBidWYgPSB0aGlzW0JVRkZFUl07XHJcblx0XHRjb25zdCBhYiA9IGJ1Zi5idWZmZXIuc2xpY2UoYnVmLmJ5dGVPZmZzZXQsIGJ1Zi5ieXRlT2Zmc2V0ICsgYnVmLmJ5dGVMZW5ndGgpO1xyXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhYik7XHJcblx0fVxyXG5cdHN0cmVhbSgpIHtcclxuXHRcdGNvbnN0IHJlYWRhYmxlID0gbmV3IFJlYWRhYmxlKCk7XHJcblx0XHRyZWFkYWJsZS5fcmVhZCA9IGZ1bmN0aW9uICgpIHt9O1xyXG5cdFx0cmVhZGFibGUucHVzaCh0aGlzW0JVRkZFUl0pO1xyXG5cdFx0cmVhZGFibGUucHVzaChudWxsKTtcclxuXHRcdHJldHVybiByZWFkYWJsZTtcclxuXHR9XHJcblx0dG9TdHJpbmcoKSB7XHJcblx0XHRyZXR1cm4gJ1tvYmplY3QgQmxvYl0nO1xyXG5cdH1cclxuXHRzbGljZSgpIHtcclxuXHRcdGNvbnN0IHNpemUgPSB0aGlzLnNpemU7XHJcblxyXG5cdFx0Y29uc3Qgc3RhcnQgPSBhcmd1bWVudHNbMF07XHJcblx0XHRjb25zdCBlbmQgPSBhcmd1bWVudHNbMV07XHJcblx0XHRsZXQgcmVsYXRpdmVTdGFydCwgcmVsYXRpdmVFbmQ7XHJcblx0XHRpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZWxhdGl2ZVN0YXJ0ID0gMDtcclxuXHRcdH0gZWxzZSBpZiAoc3RhcnQgPCAwKSB7XHJcblx0XHRcdHJlbGF0aXZlU3RhcnQgPSBNYXRoLm1heChzaXplICsgc3RhcnQsIDApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVsYXRpdmVTdGFydCA9IE1hdGgubWluKHN0YXJ0LCBzaXplKTtcclxuXHRcdH1cclxuXHRcdGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZWxhdGl2ZUVuZCA9IHNpemU7XHJcblx0XHR9IGVsc2UgaWYgKGVuZCA8IDApIHtcclxuXHRcdFx0cmVsYXRpdmVFbmQgPSBNYXRoLm1heChzaXplICsgZW5kLCAwKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbGF0aXZlRW5kID0gTWF0aC5taW4oZW5kLCBzaXplKTtcclxuXHRcdH1cclxuXHRcdGNvbnN0IHNwYW4gPSBNYXRoLm1heChyZWxhdGl2ZUVuZCAtIHJlbGF0aXZlU3RhcnQsIDApO1xyXG5cclxuXHRcdGNvbnN0IGJ1ZmZlciA9IHRoaXNbQlVGRkVSXTtcclxuXHRcdGNvbnN0IHNsaWNlZEJ1ZmZlciA9IGJ1ZmZlci5zbGljZShyZWxhdGl2ZVN0YXJ0LCByZWxhdGl2ZVN0YXJ0ICsgc3Bhbik7XHJcblx0XHRjb25zdCBibG9iID0gbmV3IEJsb2IoW10sIHsgdHlwZTogYXJndW1lbnRzWzJdIH0pO1xyXG5cdFx0YmxvYltCVUZGRVJdID0gc2xpY2VkQnVmZmVyO1xyXG5cdFx0cmV0dXJuIGJsb2I7XHJcblx0fVxyXG59XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhCbG9iLnByb3RvdHlwZSwge1xyXG5cdHNpemU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxyXG5cdHR5cGU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxyXG5cdHNsaWNlOiB7IGVudW1lcmFibGU6IHRydWUgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCbG9iLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XHJcblx0dmFsdWU6ICdCbG9iJyxcclxuXHR3cml0YWJsZTogZmFsc2UsXHJcblx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0Y29uZmlndXJhYmxlOiB0cnVlXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIGZldGNoLWVycm9yLmpzXHJcbiAqXHJcbiAqIEZldGNoRXJyb3IgaW50ZXJmYWNlIGZvciBvcGVyYXRpb25hbCBlcnJvcnNcclxuICovXHJcblxyXG4vKipcclxuICogQ3JlYXRlIEZldGNoRXJyb3IgaW5zdGFuY2VcclxuICpcclxuICogQHBhcmFtICAgU3RyaW5nICAgICAgbWVzc2FnZSAgICAgIEVycm9yIG1lc3NhZ2UgZm9yIGh1bWFuXHJcbiAqIEBwYXJhbSAgIFN0cmluZyAgICAgIHR5cGUgICAgICAgICBFcnJvciB0eXBlIGZvciBtYWNoaW5lXHJcbiAqIEBwYXJhbSAgIFN0cmluZyAgICAgIHN5c3RlbUVycm9yICBGb3IgTm9kZS5qcyBzeXN0ZW0gZXJyb3JcclxuICogQHJldHVybiAgRmV0Y2hFcnJvclxyXG4gKi9cclxuZnVuY3Rpb24gRmV0Y2hFcnJvcihtZXNzYWdlLCB0eXBlLCBzeXN0ZW1FcnJvcikge1xyXG4gIEVycm9yLmNhbGwodGhpcywgbWVzc2FnZSk7XHJcblxyXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgdGhpcy50eXBlID0gdHlwZTtcclxuXHJcbiAgLy8gd2hlbiBlcnIudHlwZSBpcyBgc3lzdGVtYCwgZXJyLmNvZGUgY29udGFpbnMgc3lzdGVtIGVycm9yIGNvZGVcclxuICBpZiAoc3lzdGVtRXJyb3IpIHtcclxuICAgIHRoaXMuY29kZSA9IHRoaXMuZXJybm8gPSBzeXN0ZW1FcnJvci5jb2RlO1xyXG4gIH1cclxuXHJcbiAgLy8gaGlkZSBjdXN0b20gZXJyb3IgaW1wbGVtZW50YXRpb24gZGV0YWlscyBmcm9tIGVuZC11c2Vyc1xyXG4gIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xyXG59XHJcblxyXG5GZXRjaEVycm9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcclxuRmV0Y2hFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGZXRjaEVycm9yO1xyXG5GZXRjaEVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0ZldGNoRXJyb3InO1xyXG5cclxubGV0IGNvbnZlcnQ7XHJcbnRyeSB7XHJcblx0Y29udmVydCA9IHJlcXVpcmUoJ2VuY29kaW5nJykuY29udmVydDtcclxufSBjYXRjaCAoZSkge31cclxuXHJcbmNvbnN0IElOVEVSTkFMUyA9IFN5bWJvbCgnQm9keSBpbnRlcm5hbHMnKTtcclxuXHJcbi8vIGZpeCBhbiBpc3N1ZSB3aGVyZSBcIlBhc3NUaHJvdWdoXCIgaXNuJ3QgYSBuYW1lZCBleHBvcnQgZm9yIG5vZGUgPDEwXHJcbmNvbnN0IFBhc3NUaHJvdWdoID0gU3RyZWFtLlBhc3NUaHJvdWdoO1xyXG5cclxuLyoqXHJcbiAqIEJvZHkgbWl4aW5cclxuICpcclxuICogUmVmOiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jYm9keVxyXG4gKlxyXG4gKiBAcGFyYW0gICBTdHJlYW0gIGJvZHkgIFJlYWRhYmxlIHN0cmVhbVxyXG4gKiBAcGFyYW0gICBPYmplY3QgIG9wdHMgIFJlc3BvbnNlIG9wdGlvbnNcclxuICogQHJldHVybiAgVm9pZFxyXG4gKi9cclxuZnVuY3Rpb24gQm9keShib2R5KSB7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0dmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9LFxyXG5cdCAgICBfcmVmJHNpemUgPSBfcmVmLnNpemU7XHJcblxyXG5cdGxldCBzaXplID0gX3JlZiRzaXplID09PSB1bmRlZmluZWQgPyAwIDogX3JlZiRzaXplO1xyXG5cdHZhciBfcmVmJHRpbWVvdXQgPSBfcmVmLnRpbWVvdXQ7XHJcblx0bGV0IHRpbWVvdXQgPSBfcmVmJHRpbWVvdXQgPT09IHVuZGVmaW5lZCA/IDAgOiBfcmVmJHRpbWVvdXQ7XHJcblxyXG5cdGlmIChib2R5ID09IG51bGwpIHtcclxuXHRcdC8vIGJvZHkgaXMgdW5kZWZpbmVkIG9yIG51bGxcclxuXHRcdGJvZHkgPSBudWxsO1xyXG5cdH0gZWxzZSBpZiAoaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcclxuXHRcdC8vIGJvZHkgaXMgYSBVUkxTZWFyY2hQYXJhbXNcclxuXHRcdGJvZHkgPSBCdWZmZXIuZnJvbShib2R5LnRvU3RyaW5nKCkpO1xyXG5cdH0gZWxzZSBpZiAoaXNCbG9iKGJvZHkpKSA7IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkgOyBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYm9keSkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXScpIHtcclxuXHRcdC8vIGJvZHkgaXMgQXJyYXlCdWZmZXJcclxuXHRcdGJvZHkgPSBCdWZmZXIuZnJvbShib2R5KTtcclxuXHR9IGVsc2UgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhib2R5KSkge1xyXG5cdFx0Ly8gYm9keSBpcyBBcnJheUJ1ZmZlclZpZXdcclxuXHRcdGJvZHkgPSBCdWZmZXIuZnJvbShib2R5LmJ1ZmZlciwgYm9keS5ieXRlT2Zmc2V0LCBib2R5LmJ5dGVMZW5ndGgpO1xyXG5cdH0gZWxzZSBpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkgOyBlbHNlIHtcclxuXHRcdC8vIG5vbmUgb2YgdGhlIGFib3ZlXHJcblx0XHQvLyBjb2VyY2UgdG8gc3RyaW5nIHRoZW4gYnVmZmVyXHJcblx0XHRib2R5ID0gQnVmZmVyLmZyb20oU3RyaW5nKGJvZHkpKTtcclxuXHR9XHJcblx0dGhpc1tJTlRFUk5BTFNdID0ge1xyXG5cdFx0Ym9keSxcclxuXHRcdGRpc3R1cmJlZDogZmFsc2UsXHJcblx0XHRlcnJvcjogbnVsbFxyXG5cdH07XHJcblx0dGhpcy5zaXplID0gc2l6ZTtcclxuXHR0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xyXG5cclxuXHRpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkge1xyXG5cdFx0Ym9keS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XHJcblx0XHRcdGNvbnN0IGVycm9yID0gZXJyLm5hbWUgPT09ICdBYm9ydEVycm9yJyA/IGVyciA6IG5ldyBGZXRjaEVycm9yKGBJbnZhbGlkIHJlc3BvbnNlIGJvZHkgd2hpbGUgdHJ5aW5nIHRvIGZldGNoICR7X3RoaXMudXJsfTogJHtlcnIubWVzc2FnZX1gLCAnc3lzdGVtJywgZXJyKTtcclxuXHRcdFx0X3RoaXNbSU5URVJOQUxTXS5lcnJvciA9IGVycm9yO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5Cb2R5LnByb3RvdHlwZSA9IHtcclxuXHRnZXQgYm9keSgpIHtcclxuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uYm9keTtcclxuXHR9LFxyXG5cclxuXHRnZXQgYm9keVVzZWQoKSB7XHJcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFNdLmRpc3R1cmJlZDtcclxuXHR9LFxyXG5cclxuXHQvKipcclxuICAqIERlY29kZSByZXNwb25zZSBhcyBBcnJheUJ1ZmZlclxyXG4gICpcclxuICAqIEByZXR1cm4gIFByb21pc2VcclxuICAqL1xyXG5cdGFycmF5QnVmZmVyKCkge1xyXG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcykudGhlbihmdW5jdGlvbiAoYnVmKSB7XHJcblx0XHRcdHJldHVybiBidWYuYnVmZmVyLnNsaWNlKGJ1Zi5ieXRlT2Zmc2V0LCBidWYuYnl0ZU9mZnNldCArIGJ1Zi5ieXRlTGVuZ3RoKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG4gICogUmV0dXJuIHJhdyByZXNwb25zZSBhcyBCbG9iXHJcbiAgKlxyXG4gICogQHJldHVybiBQcm9taXNlXHJcbiAgKi9cclxuXHRibG9iKCkge1xyXG5cdFx0bGV0IGN0ID0gdGhpcy5oZWFkZXJzICYmIHRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpIHx8ICcnO1xyXG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcykudGhlbihmdW5jdGlvbiAoYnVmKSB7XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKFxyXG5cdFx0XHQvLyBQcmV2ZW50IGNvcHlpbmdcclxuXHRcdFx0bmV3IEJsb2IoW10sIHtcclxuXHRcdFx0XHR0eXBlOiBjdC50b0xvd2VyQ2FzZSgpXHJcblx0XHRcdH0pLCB7XHJcblx0XHRcdFx0W0JVRkZFUl06IGJ1ZlxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG4gICogRGVjb2RlIHJlc3BvbnNlIGFzIGpzb25cclxuICAqXHJcbiAgKiBAcmV0dXJuICBQcm9taXNlXHJcbiAgKi9cclxuXHRqc29uKCkge1xyXG5cdFx0dmFyIF90aGlzMiA9IHRoaXM7XHJcblxyXG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcykudGhlbihmdW5jdGlvbiAoYnVmZmVyKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0cmV0dXJuIEpTT04ucGFyc2UoYnVmZmVyLnRvU3RyaW5nKCkpO1xyXG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0XHRyZXR1cm4gQm9keS5Qcm9taXNlLnJlamVjdChuZXcgRmV0Y2hFcnJvcihgaW52YWxpZCBqc29uIHJlc3BvbnNlIGJvZHkgYXQgJHtfdGhpczIudXJsfSByZWFzb246ICR7ZXJyLm1lc3NhZ2V9YCwgJ2ludmFsaWQtanNvbicpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcbiAgKiBEZWNvZGUgcmVzcG9uc2UgYXMgdGV4dFxyXG4gICpcclxuICAqIEByZXR1cm4gIFByb21pc2VcclxuICAqL1xyXG5cdHRleHQoKSB7XHJcblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKS50aGVuKGZ1bmN0aW9uIChidWZmZXIpIHtcclxuXHRcdFx0cmV0dXJuIGJ1ZmZlci50b1N0cmluZygpO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcbiAgKiBEZWNvZGUgcmVzcG9uc2UgYXMgYnVmZmVyIChub24tc3BlYyBhcGkpXHJcbiAgKlxyXG4gICogQHJldHVybiAgUHJvbWlzZVxyXG4gICovXHJcblx0YnVmZmVyKCkge1xyXG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcyk7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcbiAgKiBEZWNvZGUgcmVzcG9uc2UgYXMgdGV4dCwgd2hpbGUgYXV0b21hdGljYWxseSBkZXRlY3RpbmcgdGhlIGVuY29kaW5nIGFuZFxyXG4gICogdHJ5aW5nIHRvIGRlY29kZSB0byBVVEYtOCAobm9uLXNwZWMgYXBpKVxyXG4gICpcclxuICAqIEByZXR1cm4gIFByb21pc2VcclxuICAqL1xyXG5cdHRleHRDb252ZXJ0ZWQoKSB7XHJcblx0XHR2YXIgX3RoaXMzID0gdGhpcztcclxuXHJcblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKS50aGVuKGZ1bmN0aW9uIChidWZmZXIpIHtcclxuXHRcdFx0cmV0dXJuIGNvbnZlcnRCb2R5KGJ1ZmZlciwgX3RoaXMzLmhlYWRlcnMpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59O1xyXG5cclxuLy8gSW4gYnJvd3NlcnMsIGFsbCBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhYmxlLlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhCb2R5LnByb3RvdHlwZSwge1xyXG5cdGJvZHk6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxyXG5cdGJvZHlVc2VkOiB7IGVudW1lcmFibGU6IHRydWUgfSxcclxuXHRhcnJheUJ1ZmZlcjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXHJcblx0YmxvYjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXHJcblx0anNvbjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXHJcblx0dGV4dDogeyBlbnVtZXJhYmxlOiB0cnVlIH1cclxufSk7XHJcblxyXG5Cb2R5Lm1peEluID0gZnVuY3Rpb24gKHByb3RvKSB7XHJcblx0Zm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKEJvZHkucHJvdG90eXBlKSkge1xyXG5cdFx0Ly8gaXN0YW5idWwgaWdub3JlIGVsc2U6IGZ1dHVyZSBwcm9vZlxyXG5cdFx0aWYgKCEobmFtZSBpbiBwcm90bykpIHtcclxuXHRcdFx0Y29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoQm9keS5wcm90b3R5cGUsIG5hbWUpO1xyXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sIG5hbWUsIGRlc2MpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb25zdW1lIGFuZCBjb252ZXJ0IGFuIGVudGlyZSBCb2R5IHRvIGEgQnVmZmVyLlxyXG4gKlxyXG4gKiBSZWY6IGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LWJvZHktY29uc3VtZS1ib2R5XHJcbiAqXHJcbiAqIEByZXR1cm4gIFByb21pc2VcclxuICovXHJcbmZ1bmN0aW9uIGNvbnN1bWVCb2R5KCkge1xyXG5cdHZhciBfdGhpczQgPSB0aGlzO1xyXG5cclxuXHRpZiAodGhpc1tJTlRFUk5BTFNdLmRpc3R1cmJlZCkge1xyXG5cdFx0cmV0dXJuIEJvZHkuUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcihgYm9keSB1c2VkIGFscmVhZHkgZm9yOiAke3RoaXMudXJsfWApKTtcclxuXHR9XHJcblxyXG5cdHRoaXNbSU5URVJOQUxTXS5kaXN0dXJiZWQgPSB0cnVlO1xyXG5cclxuXHRpZiAodGhpc1tJTlRFUk5BTFNdLmVycm9yKSB7XHJcblx0XHRyZXR1cm4gQm9keS5Qcm9taXNlLnJlamVjdCh0aGlzW0lOVEVSTkFMU10uZXJyb3IpO1xyXG5cdH1cclxuXHJcblx0bGV0IGJvZHkgPSB0aGlzLmJvZHk7XHJcblxyXG5cdC8vIGJvZHkgaXMgbnVsbFxyXG5cdGlmIChib2R5ID09PSBudWxsKSB7XHJcblx0XHRyZXR1cm4gQm9keS5Qcm9taXNlLnJlc29sdmUoQnVmZmVyLmFsbG9jKDApKTtcclxuXHR9XHJcblxyXG5cdC8vIGJvZHkgaXMgYmxvYlxyXG5cdGlmIChpc0Jsb2IoYm9keSkpIHtcclxuXHRcdGJvZHkgPSBib2R5LnN0cmVhbSgpO1xyXG5cdH1cclxuXHJcblx0Ly8gYm9keSBpcyBidWZmZXJcclxuXHRpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XHJcblx0XHRyZXR1cm4gQm9keS5Qcm9taXNlLnJlc29sdmUoYm9keSk7XHJcblx0fVxyXG5cclxuXHQvLyBpc3RhbmJ1bCBpZ25vcmUgaWY6IHNob3VsZCBuZXZlciBoYXBwZW5cclxuXHRpZiAoIShib2R5IGluc3RhbmNlb2YgU3RyZWFtKSkge1xyXG5cdFx0cmV0dXJuIEJvZHkuUHJvbWlzZS5yZXNvbHZlKEJ1ZmZlci5hbGxvYygwKSk7XHJcblx0fVxyXG5cclxuXHQvLyBib2R5IGlzIHN0cmVhbVxyXG5cdC8vIGdldCByZWFkeSB0byBhY3R1YWxseSBjb25zdW1lIHRoZSBib2R5XHJcblx0bGV0IGFjY3VtID0gW107XHJcblx0bGV0IGFjY3VtQnl0ZXMgPSAwO1xyXG5cdGxldCBhYm9ydCA9IGZhbHNlO1xyXG5cclxuXHRyZXR1cm4gbmV3IEJvZHkuUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRsZXQgcmVzVGltZW91dDtcclxuXHJcblx0XHQvLyBhbGxvdyB0aW1lb3V0IG9uIHNsb3cgcmVzcG9uc2UgYm9keVxyXG5cdFx0aWYgKF90aGlzNC50aW1lb3V0KSB7XHJcblx0XHRcdHJlc1RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRhYm9ydCA9IHRydWU7XHJcblx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBSZXNwb25zZSB0aW1lb3V0IHdoaWxlIHRyeWluZyB0byBmZXRjaCAke190aGlzNC51cmx9IChvdmVyICR7X3RoaXM0LnRpbWVvdXR9bXMpYCwgJ2JvZHktdGltZW91dCcpKTtcclxuXHRcdFx0fSwgX3RoaXM0LnRpbWVvdXQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGhhbmRsZSBzdHJlYW0gZXJyb3JzXHJcblx0XHRib2R5Lm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcclxuXHRcdFx0aWYgKGVyci5uYW1lID09PSAnQWJvcnRFcnJvcicpIHtcclxuXHRcdFx0XHQvLyBpZiB0aGUgcmVxdWVzdCB3YXMgYWJvcnRlZCwgcmVqZWN0IHdpdGggdGhpcyBFcnJvclxyXG5cdFx0XHRcdGFib3J0ID0gdHJ1ZTtcclxuXHRcdFx0XHRyZWplY3QoZXJyKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBvdGhlciBlcnJvcnMsIHN1Y2ggYXMgaW5jb3JyZWN0IGNvbnRlbnQtZW5jb2RpbmdcclxuXHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYEludmFsaWQgcmVzcG9uc2UgYm9keSB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggJHtfdGhpczQudXJsfTogJHtlcnIubWVzc2FnZX1gLCAnc3lzdGVtJywgZXJyKSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGJvZHkub24oJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcclxuXHRcdFx0aWYgKGFib3J0IHx8IGNodW5rID09PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoX3RoaXM0LnNpemUgJiYgYWNjdW1CeXRlcyArIGNodW5rLmxlbmd0aCA+IF90aGlzNC5zaXplKSB7XHJcblx0XHRcdFx0YWJvcnQgPSB0cnVlO1xyXG5cdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgY29udGVudCBzaXplIGF0ICR7X3RoaXM0LnVybH0gb3ZlciBsaW1pdDogJHtfdGhpczQuc2l6ZX1gLCAnbWF4LXNpemUnKSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRhY2N1bUJ5dGVzICs9IGNodW5rLmxlbmd0aDtcclxuXHRcdFx0YWNjdW0ucHVzaChjaHVuayk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRib2R5Lm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmIChhYm9ydCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHJlc1RpbWVvdXQpO1xyXG5cclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRyZXNvbHZlKEJ1ZmZlci5jb25jYXQoYWNjdW0sIGFjY3VtQnl0ZXMpKTtcclxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdFx0Ly8gaGFuZGxlIHN0cmVhbXMgdGhhdCBoYXZlIGFjY3VtdWxhdGVkIHRvbyBtdWNoIGRhdGEgKGlzc3VlICM0MTQpXHJcblx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBDb3VsZCBub3QgY3JlYXRlIEJ1ZmZlciBmcm9tIHJlc3BvbnNlIGJvZHkgZm9yICR7X3RoaXM0LnVybH06ICR7ZXJyLm1lc3NhZ2V9YCwgJ3N5c3RlbScsIGVycikpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVjdCBidWZmZXIgZW5jb2RpbmcgYW5kIGNvbnZlcnQgdG8gdGFyZ2V0IGVuY29kaW5nXHJcbiAqIHJlZjogaHR0cDovL3d3dy53My5vcmcvVFIvMjAxMS9XRC1odG1sNS0yMDExMDExMy9wYXJzaW5nLmh0bWwjZGV0ZXJtaW5pbmctdGhlLWNoYXJhY3Rlci1lbmNvZGluZ1xyXG4gKlxyXG4gKiBAcGFyYW0gICBCdWZmZXIgIGJ1ZmZlciAgICBJbmNvbWluZyBidWZmZXJcclxuICogQHBhcmFtICAgU3RyaW5nICBlbmNvZGluZyAgVGFyZ2V0IGVuY29kaW5nXHJcbiAqIEByZXR1cm4gIFN0cmluZ1xyXG4gKi9cclxuZnVuY3Rpb24gY29udmVydEJvZHkoYnVmZmVyLCBoZWFkZXJzKSB7XHJcblx0aWYgKHR5cGVvZiBjb252ZXJ0ICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBwYWNrYWdlIGBlbmNvZGluZ2AgbXVzdCBiZSBpbnN0YWxsZWQgdG8gdXNlIHRoZSB0ZXh0Q29udmVydGVkKCkgZnVuY3Rpb24nKTtcclxuXHR9XHJcblxyXG5cdGNvbnN0IGN0ID0gaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpO1xyXG5cdGxldCBjaGFyc2V0ID0gJ3V0Zi04JztcclxuXHRsZXQgcmVzLCBzdHI7XHJcblxyXG5cdC8vIGhlYWRlclxyXG5cdGlmIChjdCkge1xyXG5cdFx0cmVzID0gL2NoYXJzZXQ9KFteO10qKS9pLmV4ZWMoY3QpO1xyXG5cdH1cclxuXHJcblx0Ly8gbm8gY2hhcnNldCBpbiBjb250ZW50IHR5cGUsIHBlZWsgYXQgcmVzcG9uc2UgYm9keSBmb3IgYXQgbW9zdCAxMDI0IGJ5dGVzXHJcblx0c3RyID0gYnVmZmVyLnNsaWNlKDAsIDEwMjQpLnRvU3RyaW5nKCk7XHJcblxyXG5cdC8vIGh0bWw1XHJcblx0aWYgKCFyZXMgJiYgc3RyKSB7XHJcblx0XHRyZXMgPSAvPG1ldGEuKz9jaGFyc2V0PShbJ1wiXSkoLis/KVxcMS9pLmV4ZWMoc3RyKTtcclxuXHR9XHJcblxyXG5cdC8vIGh0bWw0XHJcblx0aWYgKCFyZXMgJiYgc3RyKSB7XHJcblx0XHRyZXMgPSAvPG1ldGFbXFxzXSs/aHR0cC1lcXVpdj0oWydcIl0pY29udGVudC10eXBlXFwxW1xcc10rP2NvbnRlbnQ9KFsnXCJdKSguKz8pXFwyL2kuZXhlYyhzdHIpO1xyXG5cclxuXHRcdGlmIChyZXMpIHtcclxuXHRcdFx0cmVzID0gL2NoYXJzZXQ9KC4qKS9pLmV4ZWMocmVzLnBvcCgpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIHhtbFxyXG5cdGlmICghcmVzICYmIHN0cikge1xyXG5cdFx0cmVzID0gLzxcXD94bWwuKz9lbmNvZGluZz0oWydcIl0pKC4rPylcXDEvaS5leGVjKHN0cik7XHJcblx0fVxyXG5cclxuXHQvLyBmb3VuZCBjaGFyc2V0XHJcblx0aWYgKHJlcykge1xyXG5cdFx0Y2hhcnNldCA9IHJlcy5wb3AoKTtcclxuXHJcblx0XHQvLyBwcmV2ZW50IGRlY29kZSBpc3N1ZXMgd2hlbiBzaXRlcyB1c2UgaW5jb3JyZWN0IGVuY29kaW5nXHJcblx0XHQvLyByZWY6IGh0dHBzOi8vaHNpdm9uZW4uZmkvZW5jb2RpbmctbWVudS9cclxuXHRcdGlmIChjaGFyc2V0ID09PSAnZ2IyMzEyJyB8fCBjaGFyc2V0ID09PSAnZ2JrJykge1xyXG5cdFx0XHRjaGFyc2V0ID0gJ2diMTgwMzAnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gdHVybiByYXcgYnVmZmVycyBpbnRvIGEgc2luZ2xlIHV0Zi04IGJ1ZmZlclxyXG5cdHJldHVybiBjb252ZXJ0KGJ1ZmZlciwgJ1VURi04JywgY2hhcnNldCkudG9TdHJpbmcoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVjdCBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcclxuICogcmVmOiBodHRwczovL2dpdGh1Yi5jb20vYml0aW5uL25vZGUtZmV0Y2gvaXNzdWVzLzI5NiNpc3N1ZWNvbW1lbnQtMzA3NTk4MTQzXHJcbiAqXHJcbiAqIEBwYXJhbSAgIE9iamVjdCAgb2JqICAgICBPYmplY3QgdG8gZGV0ZWN0IGJ5IHR5cGUgb3IgYnJhbmRcclxuICogQHJldHVybiAgU3RyaW5nXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyhvYmopIHtcclxuXHQvLyBEdWNrLXR5cGluZyBhcyBhIG5lY2Vzc2FyeSBjb25kaXRpb24uXHJcblx0aWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IHR5cGVvZiBvYmouYXBwZW5kICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvYmouZGVsZXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvYmouZ2V0ICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvYmouZ2V0QWxsICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvYmouaGFzICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvYmouc2V0ICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvLyBCcmFuZC1jaGVja2luZyBhbmQgbW9yZSBkdWNrLXR5cGluZyBhcyBvcHRpb25hbCBjb25kaXRpb24uXHJcblx0cmV0dXJuIG9iai5jb25zdHJ1Y3Rvci5uYW1lID09PSAnVVJMU2VhcmNoUGFyYW1zJyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgVVJMU2VhcmNoUGFyYW1zXScgfHwgdHlwZW9mIG9iai5zb3J0ID09PSAnZnVuY3Rpb24nO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYG9iamAgaXMgYSBXM0MgYEJsb2JgIG9iamVjdCAod2hpY2ggYEZpbGVgIGluaGVyaXRzIGZyb20pXHJcbiAqIEBwYXJhbSAgeyp9IG9ialxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gaXNCbG9iKG9iaikge1xyXG5cdHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLmFycmF5QnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmoudHlwZSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIG9iai5zdHJlYW0gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdzdHJpbmcnICYmIC9eKEJsb2J8RmlsZSkkLy50ZXN0KG9iai5jb25zdHJ1Y3Rvci5uYW1lKSAmJiAvXihCbG9ifEZpbGUpJC8udGVzdChvYmpbU3ltYm9sLnRvU3RyaW5nVGFnXSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDbG9uZSBib2R5IGdpdmVuIFJlcy9SZXEgaW5zdGFuY2VcclxuICpcclxuICogQHBhcmFtICAgTWl4ZWQgIGluc3RhbmNlICBSZXNwb25zZSBvciBSZXF1ZXN0IGluc3RhbmNlXHJcbiAqIEByZXR1cm4gIE1peGVkXHJcbiAqL1xyXG5mdW5jdGlvbiBjbG9uZShpbnN0YW5jZSkge1xyXG5cdGxldCBwMSwgcDI7XHJcblx0bGV0IGJvZHkgPSBpbnN0YW5jZS5ib2R5O1xyXG5cclxuXHQvLyBkb24ndCBhbGxvdyBjbG9uaW5nIGEgdXNlZCBib2R5XHJcblx0aWYgKGluc3RhbmNlLmJvZHlVc2VkKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBjbG9uZSBib2R5IGFmdGVyIGl0IGlzIHVzZWQnKTtcclxuXHR9XHJcblxyXG5cdC8vIGNoZWNrIHRoYXQgYm9keSBpcyBhIHN0cmVhbSBhbmQgbm90IGZvcm0tZGF0YSBvYmplY3RcclxuXHQvLyBub3RlOiB3ZSBjYW4ndCBjbG9uZSB0aGUgZm9ybS1kYXRhIG9iamVjdCB3aXRob3V0IGhhdmluZyBpdCBhcyBhIGRlcGVuZGVuY3lcclxuXHRpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSAmJiB0eXBlb2YgYm9keS5nZXRCb3VuZGFyeSAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0Ly8gdGVlIGluc3RhbmNlIGJvZHlcclxuXHRcdHAxID0gbmV3IFBhc3NUaHJvdWdoKCk7XHJcblx0XHRwMiA9IG5ldyBQYXNzVGhyb3VnaCgpO1xyXG5cdFx0Ym9keS5waXBlKHAxKTtcclxuXHRcdGJvZHkucGlwZShwMik7XHJcblx0XHQvLyBzZXQgaW5zdGFuY2UgYm9keSB0byB0ZWVkIGJvZHkgYW5kIHJldHVybiB0aGUgb3RoZXIgdGVlZCBib2R5XHJcblx0XHRpbnN0YW5jZVtJTlRFUk5BTFNdLmJvZHkgPSBwMTtcclxuXHRcdGJvZHkgPSBwMjtcclxuXHR9XHJcblxyXG5cdHJldHVybiBib2R5O1xyXG59XHJcblxyXG4vKipcclxuICogUGVyZm9ybXMgdGhlIG9wZXJhdGlvbiBcImV4dHJhY3QgYSBgQ29udGVudC1UeXBlYCB2YWx1ZSBmcm9tIHxvYmplY3R8XCIgYXNcclxuICogc3BlY2lmaWVkIGluIHRoZSBzcGVjaWZpY2F0aW9uOlxyXG4gKiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1ib2R5aW5pdC1leHRyYWN0XHJcbiAqXHJcbiAqIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGluc3RhbmNlLmJvZHkgaXMgcHJlc2VudC5cclxuICpcclxuICogQHBhcmFtICAgTWl4ZWQgIGluc3RhbmNlICBBbnkgb3B0aW9ucy5ib2R5IGlucHV0XHJcbiAqL1xyXG5mdW5jdGlvbiBleHRyYWN0Q29udGVudFR5cGUoYm9keSkge1xyXG5cdGlmIChib2R5ID09PSBudWxsKSB7XHJcblx0XHQvLyBib2R5IGlzIG51bGxcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XHJcblx0XHQvLyBib2R5IGlzIHN0cmluZ1xyXG5cdFx0cmV0dXJuICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnO1xyXG5cdH0gZWxzZSBpZiAoaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcclxuXHRcdC8vIGJvZHkgaXMgYSBVUkxTZWFyY2hQYXJhbXNcclxuXHRcdHJldHVybiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnO1xyXG5cdH0gZWxzZSBpZiAoaXNCbG9iKGJvZHkpKSB7XHJcblx0XHQvLyBib2R5IGlzIGJsb2JcclxuXHRcdHJldHVybiBib2R5LnR5cGUgfHwgbnVsbDtcclxuXHR9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xyXG5cdFx0Ly8gYm9keSBpcyBidWZmZXJcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGJvZHkpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nKSB7XHJcblx0XHQvLyBib2R5IGlzIEFycmF5QnVmZmVyXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9IGVsc2UgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhib2R5KSkge1xyXG5cdFx0Ly8gYm9keSBpcyBBcnJheUJ1ZmZlclZpZXdcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH0gZWxzZSBpZiAodHlwZW9mIGJvZHkuZ2V0Qm91bmRhcnkgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdC8vIGRldGVjdCBmb3JtIGRhdGEgaW5wdXQgZnJvbSBmb3JtLWRhdGEgbW9kdWxlXHJcblx0XHRyZXR1cm4gYG11bHRpcGFydC9mb3JtLWRhdGE7Ym91bmRhcnk9JHtib2R5LmdldEJvdW5kYXJ5KCl9YDtcclxuXHR9IGVsc2UgaWYgKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pIHtcclxuXHRcdC8vIGJvZHkgaXMgc3RyZWFtXHJcblx0XHQvLyBjYW4ndCByZWFsbHkgZG8gbXVjaCBhYm91dCB0aGlzXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly8gQm9keSBjb25zdHJ1Y3RvciBkZWZhdWx0cyBvdGhlciB0aGluZ3MgdG8gc3RyaW5nXHJcblx0XHRyZXR1cm4gJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCc7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogVGhlIEZldGNoIFN0YW5kYXJkIHRyZWF0cyB0aGlzIGFzIGlmIFwidG90YWwgYnl0ZXNcIiBpcyBhIHByb3BlcnR5IG9uIHRoZSBib2R5LlxyXG4gKiBGb3IgdXMsIHdlIGhhdmUgdG8gZXhwbGljaXRseSBnZXQgaXQgd2l0aCBhIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiByZWY6IGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LWJvZHktdG90YWwtYnl0ZXNcclxuICpcclxuICogQHBhcmFtICAgQm9keSAgICBpbnN0YW5jZSAgIEluc3RhbmNlIG9mIEJvZHlcclxuICogQHJldHVybiAgTnVtYmVyPyAgICAgICAgICAgIE51bWJlciBvZiBieXRlcywgb3IgbnVsbCBpZiBub3QgcG9zc2libGVcclxuICovXHJcbmZ1bmN0aW9uIGdldFRvdGFsQnl0ZXMoaW5zdGFuY2UpIHtcclxuXHRjb25zdCBib2R5ID0gaW5zdGFuY2UuYm9keTtcclxuXHJcblxyXG5cdGlmIChib2R5ID09PSBudWxsKSB7XHJcblx0XHQvLyBib2R5IGlzIG51bGxcclxuXHRcdHJldHVybiAwO1xyXG5cdH0gZWxzZSBpZiAoaXNCbG9iKGJvZHkpKSB7XHJcblx0XHRyZXR1cm4gYm9keS5zaXplO1xyXG5cdH0gZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSB7XHJcblx0XHQvLyBib2R5IGlzIGJ1ZmZlclxyXG5cdFx0cmV0dXJuIGJvZHkubGVuZ3RoO1xyXG5cdH0gZWxzZSBpZiAoYm9keSAmJiB0eXBlb2YgYm9keS5nZXRMZW5ndGhTeW5jID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHQvLyBkZXRlY3QgZm9ybSBkYXRhIGlucHV0IGZyb20gZm9ybS1kYXRhIG1vZHVsZVxyXG5cdFx0aWYgKGJvZHkuX2xlbmd0aFJldHJpZXZlcnMgJiYgYm9keS5fbGVuZ3RoUmV0cmlldmVycy5sZW5ndGggPT0gMCB8fCAvLyAxLnhcclxuXHRcdGJvZHkuaGFzS25vd25MZW5ndGggJiYgYm9keS5oYXNLbm93bkxlbmd0aCgpKSB7XHJcblx0XHRcdC8vIDIueFxyXG5cdFx0XHRyZXR1cm4gYm9keS5nZXRMZW5ndGhTeW5jKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly8gYm9keSBpcyBzdHJlYW1cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFdyaXRlIGEgQm9keSB0byBhIE5vZGUuanMgV3JpdGFibGVTdHJlYW0gKGUuZy4gaHR0cC5SZXF1ZXN0KSBvYmplY3QuXHJcbiAqXHJcbiAqIEBwYXJhbSAgIEJvZHkgICAgaW5zdGFuY2UgICBJbnN0YW5jZSBvZiBCb2R5XHJcbiAqIEByZXR1cm4gIFZvaWRcclxuICovXHJcbmZ1bmN0aW9uIHdyaXRlVG9TdHJlYW0oZGVzdCwgaW5zdGFuY2UpIHtcclxuXHRjb25zdCBib2R5ID0gaW5zdGFuY2UuYm9keTtcclxuXHJcblxyXG5cdGlmIChib2R5ID09PSBudWxsKSB7XHJcblx0XHQvLyBib2R5IGlzIG51bGxcclxuXHRcdGRlc3QuZW5kKCk7XHJcblx0fSBlbHNlIGlmIChpc0Jsb2IoYm9keSkpIHtcclxuXHRcdGJvZHkuc3RyZWFtKCkucGlwZShkZXN0KTtcclxuXHR9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xyXG5cdFx0Ly8gYm9keSBpcyBidWZmZXJcclxuXHRcdGRlc3Qud3JpdGUoYm9keSk7XHJcblx0XHRkZXN0LmVuZCgpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQvLyBib2R5IGlzIHN0cmVhbVxyXG5cdFx0Ym9keS5waXBlKGRlc3QpO1xyXG5cdH1cclxufVxyXG5cclxuLy8gZXhwb3NlIFByb21pc2VcclxuQm9keS5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XHJcblxyXG4vKipcclxuICogaGVhZGVycy5qc1xyXG4gKlxyXG4gKiBIZWFkZXJzIGNsYXNzIG9mZmVycyBjb252ZW5pZW50IGhlbHBlcnNcclxuICovXHJcblxyXG5jb25zdCBpbnZhbGlkVG9rZW5SZWdleCA9IC9bXlxcXl9gYS16QS1aXFwtMC05ISMkJSYnKisufH5dLztcclxuY29uc3QgaW52YWxpZEhlYWRlckNoYXJSZWdleCA9IC9bXlxcdFxceDIwLVxceDdlXFx4ODAtXFx4ZmZdLztcclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlTmFtZShuYW1lKSB7XHJcblx0bmFtZSA9IGAke25hbWV9YDtcclxuXHRpZiAoaW52YWxpZFRva2VuUmVnZXgudGVzdChuYW1lKSB8fCBuYW1lID09PSAnJykge1xyXG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgJHtuYW1lfSBpcyBub3QgYSBsZWdhbCBIVFRQIGhlYWRlciBuYW1lYCk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVZhbHVlKHZhbHVlKSB7XHJcblx0dmFsdWUgPSBgJHt2YWx1ZX1gO1xyXG5cdGlmIChpbnZhbGlkSGVhZGVyQ2hhclJlZ2V4LnRlc3QodmFsdWUpKSB7XHJcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGAke3ZhbHVlfSBpcyBub3QgYSBsZWdhbCBIVFRQIGhlYWRlciB2YWx1ZWApO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgdGhlIGtleSBpbiB0aGUgbWFwIG9iamVjdCBnaXZlbiBhIGhlYWRlciBuYW1lLlxyXG4gKlxyXG4gKiBSZXR1cm5zIHVuZGVmaW5lZCBpZiBub3QgZm91bmQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgIFN0cmluZyAgbmFtZSAgSGVhZGVyIG5hbWVcclxuICogQHJldHVybiAgU3RyaW5nfFVuZGVmaW5lZFxyXG4gKi9cclxuZnVuY3Rpb24gZmluZChtYXAsIG5hbWUpIHtcclxuXHRuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdGZvciAoY29uc3Qga2V5IGluIG1hcCkge1xyXG5cdFx0aWYgKGtleS50b0xvd2VyQ2FzZSgpID09PSBuYW1lKSB7XHJcblx0XHRcdHJldHVybiBrZXk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmNvbnN0IE1BUCA9IFN5bWJvbCgnbWFwJyk7XHJcbmNsYXNzIEhlYWRlcnMge1xyXG5cdC8qKlxyXG4gICogSGVhZGVycyBjbGFzc1xyXG4gICpcclxuICAqIEBwYXJhbSAgIE9iamVjdCAgaGVhZGVycyAgUmVzcG9uc2UgaGVhZGVyc1xyXG4gICogQHJldHVybiAgVm9pZFxyXG4gICovXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRsZXQgaW5pdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkO1xyXG5cclxuXHRcdHRoaXNbTUFQXSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcblxyXG5cdFx0aWYgKGluaXQgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XHJcblx0XHRcdGNvbnN0IHJhd0hlYWRlcnMgPSBpbml0LnJhdygpO1xyXG5cdFx0XHRjb25zdCBoZWFkZXJOYW1lcyA9IE9iamVjdC5rZXlzKHJhd0hlYWRlcnMpO1xyXG5cclxuXHRcdFx0Zm9yIChjb25zdCBoZWFkZXJOYW1lIG9mIGhlYWRlck5hbWVzKSB7XHJcblx0XHRcdFx0Zm9yIChjb25zdCB2YWx1ZSBvZiByYXdIZWFkZXJzW2hlYWRlck5hbWVdKSB7XHJcblx0XHRcdFx0XHR0aGlzLmFwcGVuZChoZWFkZXJOYW1lLCB2YWx1ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gV2UgZG9uJ3Qgd29ycnkgYWJvdXQgY29udmVydGluZyBwcm9wIHRvIEJ5dGVTdHJpbmcgaGVyZSBhcyBhcHBlbmQoKVxyXG5cdFx0Ly8gd2lsbCBoYW5kbGUgaXQuXHJcblx0XHRpZiAoaW5pdCA9PSBudWxsKSA7IGVsc2UgaWYgKHR5cGVvZiBpbml0ID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRjb25zdCBtZXRob2QgPSBpbml0W1N5bWJvbC5pdGVyYXRvcl07XHJcblx0XHRcdGlmIChtZXRob2QgIT0gbnVsbCkge1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgbWV0aG9kICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdIZWFkZXIgcGFpcnMgbXVzdCBiZSBpdGVyYWJsZScpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gc2VxdWVuY2U8c2VxdWVuY2U8Qnl0ZVN0cmluZz4+XHJcblx0XHRcdFx0Ly8gTm90ZTogcGVyIHNwZWMgd2UgaGF2ZSB0byBmaXJzdCBleGhhdXN0IHRoZSBsaXN0cyB0aGVuIHByb2Nlc3MgdGhlbVxyXG5cdFx0XHRcdGNvbnN0IHBhaXJzID0gW107XHJcblx0XHRcdFx0Zm9yIChjb25zdCBwYWlyIG9mIGluaXQpIHtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgcGFpciAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHBhaXJbU3ltYm9sLml0ZXJhdG9yXSAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFYWNoIGhlYWRlciBwYWlyIG11c3QgYmUgaXRlcmFibGUnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHBhaXJzLnB1c2goQXJyYXkuZnJvbShwYWlyKSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRmb3IgKGNvbnN0IHBhaXIgb2YgcGFpcnMpIHtcclxuXHRcdFx0XHRcdGlmIChwYWlyLmxlbmd0aCAhPT0gMikge1xyXG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFYWNoIGhlYWRlciBwYWlyIG11c3QgYmUgYSBuYW1lL3ZhbHVlIHR1cGxlJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0aGlzLmFwcGVuZChwYWlyWzBdLCBwYWlyWzFdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gcmVjb3JkPEJ5dGVTdHJpbmcsIEJ5dGVTdHJpbmc+XHJcblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoaW5pdCkpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gaW5pdFtrZXldO1xyXG5cdFx0XHRcdFx0dGhpcy5hcHBlbmQoa2V5LCB2YWx1ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm92aWRlZCBpbml0aWFsaXplciBtdXN0IGJlIGFuIG9iamVjdCcpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgKiBSZXR1cm4gY29tYmluZWQgaGVhZGVyIHZhbHVlIGdpdmVuIG5hbWVcclxuICAqXHJcbiAgKiBAcGFyYW0gICBTdHJpbmcgIG5hbWUgIEhlYWRlciBuYW1lXHJcbiAgKiBAcmV0dXJuICBNaXhlZFxyXG4gICovXHJcblx0Z2V0KG5hbWUpIHtcclxuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XHJcblx0XHR2YWxpZGF0ZU5hbWUobmFtZSk7XHJcblx0XHRjb25zdCBrZXkgPSBmaW5kKHRoaXNbTUFQXSwgbmFtZSk7XHJcblx0XHRpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXNbTUFQXVtrZXldLmpvaW4oJywgJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAqIEl0ZXJhdGUgb3ZlciBhbGwgaGVhZGVyc1xyXG4gICpcclxuICAqIEBwYXJhbSAgIEZ1bmN0aW9uICBjYWxsYmFjayAgRXhlY3V0ZWQgZm9yIGVhY2ggaXRlbSB3aXRoIHBhcmFtZXRlcnMgKHZhbHVlLCBuYW1lLCB0aGlzQXJnKVxyXG4gICogQHBhcmFtICAgQm9vbGVhbiAgIHRoaXNBcmcgICBgdGhpc2AgY29udGV4dCBmb3IgY2FsbGJhY2sgZnVuY3Rpb25cclxuICAqIEByZXR1cm4gIFZvaWRcclxuICAqL1xyXG5cdGZvckVhY2goY2FsbGJhY2spIHtcclxuXHRcdGxldCB0aGlzQXJnID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XHJcblxyXG5cdFx0bGV0IHBhaXJzID0gZ2V0SGVhZGVycyh0aGlzKTtcclxuXHRcdGxldCBpID0gMDtcclxuXHRcdHdoaWxlIChpIDwgcGFpcnMubGVuZ3RoKSB7XHJcblx0XHRcdHZhciBfcGFpcnMkaSA9IHBhaXJzW2ldO1xyXG5cdFx0XHRjb25zdCBuYW1lID0gX3BhaXJzJGlbMF0sXHJcblx0XHRcdCAgICAgIHZhbHVlID0gX3BhaXJzJGlbMV07XHJcblxyXG5cdFx0XHRjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHZhbHVlLCBuYW1lLCB0aGlzKTtcclxuXHRcdFx0cGFpcnMgPSBnZXRIZWFkZXJzKHRoaXMpO1xyXG5cdFx0XHRpKys7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAqIE92ZXJ3cml0ZSBoZWFkZXIgdmFsdWVzIGdpdmVuIG5hbWVcclxuICAqXHJcbiAgKiBAcGFyYW0gICBTdHJpbmcgIG5hbWUgICBIZWFkZXIgbmFtZVxyXG4gICogQHBhcmFtICAgU3RyaW5nICB2YWx1ZSAgSGVhZGVyIHZhbHVlXHJcbiAgKiBAcmV0dXJuICBWb2lkXHJcbiAgKi9cclxuXHRzZXQobmFtZSwgdmFsdWUpIHtcclxuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XHJcblx0XHR2YWx1ZSA9IGAke3ZhbHVlfWA7XHJcblx0XHR2YWxpZGF0ZU5hbWUobmFtZSk7XHJcblx0XHR2YWxpZGF0ZVZhbHVlKHZhbHVlKTtcclxuXHRcdGNvbnN0IGtleSA9IGZpbmQodGhpc1tNQVBdLCBuYW1lKTtcclxuXHRcdHRoaXNbTUFQXVtrZXkgIT09IHVuZGVmaW5lZCA/IGtleSA6IG5hbWVdID0gW3ZhbHVlXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gICogQXBwZW5kIGEgdmFsdWUgb250byBleGlzdGluZyBoZWFkZXJcclxuICAqXHJcbiAgKiBAcGFyYW0gICBTdHJpbmcgIG5hbWUgICBIZWFkZXIgbmFtZVxyXG4gICogQHBhcmFtICAgU3RyaW5nICB2YWx1ZSAgSGVhZGVyIHZhbHVlXHJcbiAgKiBAcmV0dXJuICBWb2lkXHJcbiAgKi9cclxuXHRhcHBlbmQobmFtZSwgdmFsdWUpIHtcclxuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XHJcblx0XHR2YWx1ZSA9IGAke3ZhbHVlfWA7XHJcblx0XHR2YWxpZGF0ZU5hbWUobmFtZSk7XHJcblx0XHR2YWxpZGF0ZVZhbHVlKHZhbHVlKTtcclxuXHRcdGNvbnN0IGtleSA9IGZpbmQodGhpc1tNQVBdLCBuYW1lKTtcclxuXHRcdGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzW01BUF1ba2V5XS5wdXNoKHZhbHVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXNbTUFQXVtuYW1lXSA9IFt2YWx1ZV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAqIENoZWNrIGZvciBoZWFkZXIgbmFtZSBleGlzdGVuY2VcclxuICAqXHJcbiAgKiBAcGFyYW0gICBTdHJpbmcgICBuYW1lICBIZWFkZXIgbmFtZVxyXG4gICogQHJldHVybiAgQm9vbGVhblxyXG4gICovXHJcblx0aGFzKG5hbWUpIHtcclxuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XHJcblx0XHR2YWxpZGF0ZU5hbWUobmFtZSk7XHJcblx0XHRyZXR1cm4gZmluZCh0aGlzW01BUF0sIG5hbWUpICE9PSB1bmRlZmluZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAqIERlbGV0ZSBhbGwgaGVhZGVyIHZhbHVlcyBnaXZlbiBuYW1lXHJcbiAgKlxyXG4gICogQHBhcmFtICAgU3RyaW5nICBuYW1lICBIZWFkZXIgbmFtZVxyXG4gICogQHJldHVybiAgVm9pZFxyXG4gICovXHJcblx0ZGVsZXRlKG5hbWUpIHtcclxuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XHJcblx0XHR2YWxpZGF0ZU5hbWUobmFtZSk7XHJcblx0XHRjb25zdCBrZXkgPSBmaW5kKHRoaXNbTUFQXSwgbmFtZSk7XHJcblx0XHRpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0ZGVsZXRlIHRoaXNbTUFQXVtrZXldO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgKiBSZXR1cm4gcmF3IGhlYWRlcnMgKG5vbi1zcGVjIGFwaSlcclxuICAqXHJcbiAgKiBAcmV0dXJuICBPYmplY3RcclxuICAqL1xyXG5cdHJhdygpIHtcclxuXHRcdHJldHVybiB0aGlzW01BUF07XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAqIEdldCBhbiBpdGVyYXRvciBvbiBrZXlzLlxyXG4gICpcclxuICAqIEByZXR1cm4gIEl0ZXJhdG9yXHJcbiAgKi9cclxuXHRrZXlzKCkge1xyXG5cdFx0cmV0dXJuIGNyZWF0ZUhlYWRlcnNJdGVyYXRvcih0aGlzLCAna2V5Jyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAqIEdldCBhbiBpdGVyYXRvciBvbiB2YWx1ZXMuXHJcbiAgKlxyXG4gICogQHJldHVybiAgSXRlcmF0b3JcclxuICAqL1xyXG5cdHZhbHVlcygpIHtcclxuXHRcdHJldHVybiBjcmVhdGVIZWFkZXJzSXRlcmF0b3IodGhpcywgJ3ZhbHVlJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAqIEdldCBhbiBpdGVyYXRvciBvbiBlbnRyaWVzLlxyXG4gICpcclxuICAqIFRoaXMgaXMgdGhlIGRlZmF1bHQgaXRlcmF0b3Igb2YgdGhlIEhlYWRlcnMgb2JqZWN0LlxyXG4gICpcclxuICAqIEByZXR1cm4gIEl0ZXJhdG9yXHJcbiAgKi9cclxuXHRbU3ltYm9sLml0ZXJhdG9yXSgpIHtcclxuXHRcdHJldHVybiBjcmVhdGVIZWFkZXJzSXRlcmF0b3IodGhpcywgJ2tleSt2YWx1ZScpO1xyXG5cdH1cclxufVxyXG5IZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShIZWFkZXJzLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XHJcblx0dmFsdWU6ICdIZWFkZXJzJyxcclxuXHR3cml0YWJsZTogZmFsc2UsXHJcblx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0Y29uZmlndXJhYmxlOiB0cnVlXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoSGVhZGVycy5wcm90b3R5cGUsIHtcclxuXHRnZXQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxyXG5cdGZvckVhY2g6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxyXG5cdHNldDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXHJcblx0YXBwZW5kOiB7IGVudW1lcmFibGU6IHRydWUgfSxcclxuXHRoYXM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxyXG5cdGRlbGV0ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXHJcblx0a2V5czogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXHJcblx0dmFsdWVzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcclxuXHRlbnRyaWVzOiB7IGVudW1lcmFibGU6IHRydWUgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGdldEhlYWRlcnMoaGVhZGVycykge1xyXG5cdGxldCBraW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAna2V5K3ZhbHVlJztcclxuXHJcblx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGhlYWRlcnNbTUFQXSkuc29ydCgpO1xyXG5cdHJldHVybiBrZXlzLm1hcChraW5kID09PSAna2V5JyA/IGZ1bmN0aW9uIChrKSB7XHJcblx0XHRyZXR1cm4gay50b0xvd2VyQ2FzZSgpO1xyXG5cdH0gOiBraW5kID09PSAndmFsdWUnID8gZnVuY3Rpb24gKGspIHtcclxuXHRcdHJldHVybiBoZWFkZXJzW01BUF1ba10uam9pbignLCAnKTtcclxuXHR9IDogZnVuY3Rpb24gKGspIHtcclxuXHRcdHJldHVybiBbay50b0xvd2VyQ2FzZSgpLCBoZWFkZXJzW01BUF1ba10uam9pbignLCAnKV07XHJcblx0fSk7XHJcbn1cclxuXHJcbmNvbnN0IElOVEVSTkFMID0gU3ltYm9sKCdpbnRlcm5hbCcpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlSGVhZGVyc0l0ZXJhdG9yKHRhcmdldCwga2luZCkge1xyXG5cdGNvbnN0IGl0ZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShIZWFkZXJzSXRlcmF0b3JQcm90b3R5cGUpO1xyXG5cdGl0ZXJhdG9yW0lOVEVSTkFMXSA9IHtcclxuXHRcdHRhcmdldCxcclxuXHRcdGtpbmQsXHJcblx0XHRpbmRleDogMFxyXG5cdH07XHJcblx0cmV0dXJuIGl0ZXJhdG9yO1xyXG59XHJcblxyXG5jb25zdCBIZWFkZXJzSXRlcmF0b3JQcm90b3R5cGUgPSBPYmplY3Quc2V0UHJvdG90eXBlT2Yoe1xyXG5cdG5leHQoKSB7XHJcblx0XHQvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcclxuXHRcdGlmICghdGhpcyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykgIT09IEhlYWRlcnNJdGVyYXRvclByb3RvdHlwZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBvZiBgdGhpc2AgaXMgbm90IGEgSGVhZGVyc0l0ZXJhdG9yJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIF9JTlRFUk5BTCA9IHRoaXNbSU5URVJOQUxdO1xyXG5cdFx0Y29uc3QgdGFyZ2V0ID0gX0lOVEVSTkFMLnRhcmdldCxcclxuXHRcdCAgICAgIGtpbmQgPSBfSU5URVJOQUwua2luZCxcclxuXHRcdCAgICAgIGluZGV4ID0gX0lOVEVSTkFMLmluZGV4O1xyXG5cclxuXHRcdGNvbnN0IHZhbHVlcyA9IGdldEhlYWRlcnModGFyZ2V0LCBraW5kKTtcclxuXHRcdGNvbnN0IGxlbiA9IHZhbHVlcy5sZW5ndGg7XHJcblx0XHRpZiAoaW5kZXggPj0gbGVuKSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0dmFsdWU6IHVuZGVmaW5lZCxcclxuXHRcdFx0XHRkb25lOiB0cnVlXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc1tJTlRFUk5BTF0uaW5kZXggPSBpbmRleCArIDE7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dmFsdWU6IHZhbHVlc1tpbmRleF0sXHJcblx0XHRcdGRvbmU6IGZhbHNlXHJcblx0XHR9O1xyXG5cdH1cclxufSwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdC5nZXRQcm90b3R5cGVPZihbXVtTeW1ib2wuaXRlcmF0b3JdKCkpKSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoSGVhZGVyc0l0ZXJhdG9yUHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcclxuXHR2YWx1ZTogJ0hlYWRlcnNJdGVyYXRvcicsXHJcblx0d3JpdGFibGU6IGZhbHNlLFxyXG5cdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBFeHBvcnQgdGhlIEhlYWRlcnMgb2JqZWN0IGluIGEgZm9ybSB0aGF0IE5vZGUuanMgY2FuIGNvbnN1bWUuXHJcbiAqXHJcbiAqIEBwYXJhbSAgIEhlYWRlcnMgIGhlYWRlcnNcclxuICogQHJldHVybiAgT2JqZWN0XHJcbiAqL1xyXG5mdW5jdGlvbiBleHBvcnROb2RlQ29tcGF0aWJsZUhlYWRlcnMoaGVhZGVycykge1xyXG5cdGNvbnN0IG9iaiA9IE9iamVjdC5hc3NpZ24oeyBfX3Byb3RvX186IG51bGwgfSwgaGVhZGVyc1tNQVBdKTtcclxuXHJcblx0Ly8gaHR0cC5yZXF1ZXN0KCkgb25seSBzdXBwb3J0cyBzdHJpbmcgYXMgSG9zdCBoZWFkZXIuIFRoaXMgaGFjayBtYWtlc1xyXG5cdC8vIHNwZWNpZnlpbmcgY3VzdG9tIEhvc3QgaGVhZGVyIHBvc3NpYmxlLlxyXG5cdGNvbnN0IGhvc3RIZWFkZXJLZXkgPSBmaW5kKGhlYWRlcnNbTUFQXSwgJ0hvc3QnKTtcclxuXHRpZiAoaG9zdEhlYWRlcktleSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRvYmpbaG9zdEhlYWRlcktleV0gPSBvYmpbaG9zdEhlYWRlcktleV1bMF07XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgSGVhZGVycyBvYmplY3QgZnJvbSBhbiBvYmplY3Qgb2YgaGVhZGVycywgaWdub3JpbmcgdGhvc2UgdGhhdCBkb1xyXG4gKiBub3QgY29uZm9ybSB0byBIVFRQIGdyYW1tYXIgcHJvZHVjdGlvbnMuXHJcbiAqXHJcbiAqIEBwYXJhbSAgIE9iamVjdCAgb2JqICBPYmplY3Qgb2YgaGVhZGVyc1xyXG4gKiBAcmV0dXJuICBIZWFkZXJzXHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXJzTGVuaWVudChvYmopIHtcclxuXHRjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuXHRmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXMob2JqKSkge1xyXG5cdFx0aWYgKGludmFsaWRUb2tlblJlZ2V4LnRlc3QobmFtZSkpIHtcclxuXHRcdFx0Y29udGludWU7XHJcblx0XHR9XHJcblx0XHRpZiAoQXJyYXkuaXNBcnJheShvYmpbbmFtZV0pKSB7XHJcblx0XHRcdGZvciAoY29uc3QgdmFsIG9mIG9ialtuYW1lXSkge1xyXG5cdFx0XHRcdGlmIChpbnZhbGlkSGVhZGVyQ2hhclJlZ2V4LnRlc3QodmFsKSkge1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChoZWFkZXJzW01BUF1bbmFtZV0gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0aGVhZGVyc1tNQVBdW25hbWVdID0gW3ZhbF07XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGhlYWRlcnNbTUFQXVtuYW1lXS5wdXNoKHZhbCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKCFpbnZhbGlkSGVhZGVyQ2hhclJlZ2V4LnRlc3Qob2JqW25hbWVdKSkge1xyXG5cdFx0XHRoZWFkZXJzW01BUF1bbmFtZV0gPSBbb2JqW25hbWVdXTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIGhlYWRlcnM7XHJcbn1cclxuXHJcbmNvbnN0IElOVEVSTkFMUyQxID0gU3ltYm9sKCdSZXNwb25zZSBpbnRlcm5hbHMnKTtcclxuXHJcbi8vIGZpeCBhbiBpc3N1ZSB3aGVyZSBcIlNUQVRVU19DT0RFU1wiIGFyZW4ndCBhIG5hbWVkIGV4cG9ydCBmb3Igbm9kZSA8MTBcclxuY29uc3QgU1RBVFVTX0NPREVTID0gaHR0cC5TVEFUVVNfQ09ERVM7XHJcblxyXG4vKipcclxuICogUmVzcG9uc2UgY2xhc3NcclxuICpcclxuICogQHBhcmFtICAgU3RyZWFtICBib2R5ICBSZWFkYWJsZSBzdHJlYW1cclxuICogQHBhcmFtICAgT2JqZWN0ICBvcHRzICBSZXNwb25zZSBvcHRpb25zXHJcbiAqIEByZXR1cm4gIFZvaWRcclxuICovXHJcbmNsYXNzIFJlc3BvbnNlIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdGxldCBib2R5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBudWxsO1xyXG5cdFx0bGV0IG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xyXG5cclxuXHRcdEJvZHkuY2FsbCh0aGlzLCBib2R5LCBvcHRzKTtcclxuXHJcblx0XHRjb25zdCBzdGF0dXMgPSBvcHRzLnN0YXR1cyB8fCAyMDA7XHJcblx0XHRjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0cy5oZWFkZXJzKTtcclxuXHJcblx0XHRpZiAoYm9keSAhPSBudWxsICYmICFoZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJykpIHtcclxuXHRcdFx0Y29uc3QgY29udGVudFR5cGUgPSBleHRyYWN0Q29udGVudFR5cGUoYm9keSk7XHJcblx0XHRcdGlmIChjb250ZW50VHlwZSkge1xyXG5cdFx0XHRcdGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzW0lOVEVSTkFMUyQxXSA9IHtcclxuXHRcdFx0dXJsOiBvcHRzLnVybCxcclxuXHRcdFx0c3RhdHVzLFxyXG5cdFx0XHRzdGF0dXNUZXh0OiBvcHRzLnN0YXR1c1RleHQgfHwgU1RBVFVTX0NPREVTW3N0YXR1c10sXHJcblx0XHRcdGhlYWRlcnMsXHJcblx0XHRcdGNvdW50ZXI6IG9wdHMuY291bnRlclxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGdldCB1cmwoKSB7XHJcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0udXJsIHx8ICcnO1xyXG5cdH1cclxuXHJcblx0Z2V0IHN0YXR1cygpIHtcclxuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5zdGF0dXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuICAqIENvbnZlbmllbmNlIHByb3BlcnR5IHJlcHJlc2VudGluZyBpZiB0aGUgcmVxdWVzdCBlbmRlZCBub3JtYWxseVxyXG4gICovXHJcblx0Z2V0IG9rKCkge1xyXG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLnN0YXR1cyA+PSAyMDAgJiYgdGhpc1tJTlRFUk5BTFMkMV0uc3RhdHVzIDwgMzAwO1xyXG5cdH1cclxuXHJcblx0Z2V0IHJlZGlyZWN0ZWQoKSB7XHJcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uY291bnRlciA+IDA7XHJcblx0fVxyXG5cclxuXHRnZXQgc3RhdHVzVGV4dCgpIHtcclxuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5zdGF0dXNUZXh0O1xyXG5cdH1cclxuXHJcblx0Z2V0IGhlYWRlcnMoKSB7XHJcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uaGVhZGVycztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gICogQ2xvbmUgdGhpcyByZXNwb25zZVxyXG4gICpcclxuICAqIEByZXR1cm4gIFJlc3BvbnNlXHJcbiAgKi9cclxuXHRjbG9uZSgpIHtcclxuXHRcdHJldHVybiBuZXcgUmVzcG9uc2UoY2xvbmUodGhpcyksIHtcclxuXHRcdFx0dXJsOiB0aGlzLnVybCxcclxuXHRcdFx0c3RhdHVzOiB0aGlzLnN0YXR1cyxcclxuXHRcdFx0c3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxyXG5cdFx0XHRoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcblx0XHRcdG9rOiB0aGlzLm9rLFxyXG5cdFx0XHRyZWRpcmVjdGVkOiB0aGlzLnJlZGlyZWN0ZWRcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuQm9keS5taXhJbihSZXNwb25zZS5wcm90b3R5cGUpO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVzcG9uc2UucHJvdG90eXBlLCB7XHJcblx0dXJsOiB7IGVudW1lcmFibGU6IHRydWUgfSxcclxuXHRzdGF0dXM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxyXG5cdG9rOiB7IGVudW1lcmFibGU6IHRydWUgfSxcclxuXHRyZWRpcmVjdGVkOiB7IGVudW1lcmFibGU6IHRydWUgfSxcclxuXHRzdGF0dXNUZXh0OiB7IGVudW1lcmFibGU6IHRydWUgfSxcclxuXHRoZWFkZXJzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcclxuXHRjbG9uZTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUmVzcG9uc2UucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcclxuXHR2YWx1ZTogJ1Jlc3BvbnNlJyxcclxuXHR3cml0YWJsZTogZmFsc2UsXHJcblx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0Y29uZmlndXJhYmxlOiB0cnVlXHJcbn0pO1xyXG5cclxuY29uc3QgSU5URVJOQUxTJDIgPSBTeW1ib2woJ1JlcXVlc3QgaW50ZXJuYWxzJyk7XHJcblxyXG4vLyBmaXggYW4gaXNzdWUgd2hlcmUgXCJmb3JtYXRcIiwgXCJwYXJzZVwiIGFyZW4ndCBhIG5hbWVkIGV4cG9ydCBmb3Igbm9kZSA8MTBcclxuY29uc3QgcGFyc2VfdXJsID0gVXJsLnBhcnNlO1xyXG5jb25zdCBmb3JtYXRfdXJsID0gVXJsLmZvcm1hdDtcclxuXHJcbmNvbnN0IHN0cmVhbURlc3RydWN0aW9uU3VwcG9ydGVkID0gJ2Rlc3Ryb3knIGluIFN0cmVhbS5SZWFkYWJsZS5wcm90b3R5cGU7XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBSZXF1ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0gICBNaXhlZCAgIGlucHV0XHJcbiAqIEByZXR1cm4gIEJvb2xlYW5cclxuICovXHJcbmZ1bmN0aW9uIGlzUmVxdWVzdChpbnB1dCkge1xyXG5cdHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnICYmIHR5cGVvZiBpbnB1dFtJTlRFUk5BTFMkMl0gPT09ICdvYmplY3QnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0Fib3J0U2lnbmFsKHNpZ25hbCkge1xyXG5cdGNvbnN0IHByb3RvID0gc2lnbmFsICYmIHR5cGVvZiBzaWduYWwgPT09ICdvYmplY3QnICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihzaWduYWwpO1xyXG5cdHJldHVybiAhIShwcm90byAmJiBwcm90by5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQWJvcnRTaWduYWwnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcXVlc3QgY2xhc3NcclxuICpcclxuICogQHBhcmFtICAgTWl4ZWQgICBpbnB1dCAgVXJsIG9yIFJlcXVlc3QgaW5zdGFuY2VcclxuICogQHBhcmFtICAgT2JqZWN0ICBpbml0ICAgQ3VzdG9tIG9wdGlvbnNcclxuICogQHJldHVybiAgVm9pZFxyXG4gKi9cclxuY2xhc3MgUmVxdWVzdCB7XHJcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcclxuXHRcdGxldCBpbml0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcclxuXHJcblx0XHRsZXQgcGFyc2VkVVJMO1xyXG5cclxuXHRcdC8vIG5vcm1hbGl6ZSBpbnB1dFxyXG5cdFx0aWYgKCFpc1JlcXVlc3QoaW5wdXQpKSB7XHJcblx0XHRcdGlmIChpbnB1dCAmJiBpbnB1dC5ocmVmKSB7XHJcblx0XHRcdFx0Ly8gaW4gb3JkZXIgdG8gc3VwcG9ydCBOb2RlLmpzJyBVcmwgb2JqZWN0czsgdGhvdWdoIFdIQVRXRydzIFVSTCBvYmplY3RzXHJcblx0XHRcdFx0Ly8gd2lsbCBmYWxsIGludG8gdGhpcyBicmFuY2ggYWxzbyAoc2luY2UgdGhlaXIgYHRvU3RyaW5nKClgIHdpbGwgcmV0dXJuXHJcblx0XHRcdFx0Ly8gYGhyZWZgIHByb3BlcnR5IGFueXdheSlcclxuXHRcdFx0XHRwYXJzZWRVUkwgPSBwYXJzZV91cmwoaW5wdXQuaHJlZik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gY29lcmNlIGlucHV0IHRvIGEgc3RyaW5nIGJlZm9yZSBhdHRlbXB0aW5nIHRvIHBhcnNlXHJcblx0XHRcdFx0cGFyc2VkVVJMID0gcGFyc2VfdXJsKGAke2lucHV0fWApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlucHV0ID0ge307XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwYXJzZWRVUkwgPSBwYXJzZV91cmwoaW5wdXQudXJsKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgbWV0aG9kID0gaW5pdC5tZXRob2QgfHwgaW5wdXQubWV0aG9kIHx8ICdHRVQnO1xyXG5cdFx0bWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XHJcblxyXG5cdFx0aWYgKChpbml0LmJvZHkgIT0gbnVsbCB8fCBpc1JlcXVlc3QoaW5wdXQpICYmIGlucHV0LmJvZHkgIT09IG51bGwpICYmIChtZXRob2QgPT09ICdHRVQnIHx8IG1ldGhvZCA9PT0gJ0hFQUQnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdSZXF1ZXN0IHdpdGggR0VUL0hFQUQgbWV0aG9kIGNhbm5vdCBoYXZlIGJvZHknKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgaW5wdXRCb2R5ID0gaW5pdC5ib2R5ICE9IG51bGwgPyBpbml0LmJvZHkgOiBpc1JlcXVlc3QoaW5wdXQpICYmIGlucHV0LmJvZHkgIT09IG51bGwgPyBjbG9uZShpbnB1dCkgOiBudWxsO1xyXG5cclxuXHRcdEJvZHkuY2FsbCh0aGlzLCBpbnB1dEJvZHksIHtcclxuXHRcdFx0dGltZW91dDogaW5pdC50aW1lb3V0IHx8IGlucHV0LnRpbWVvdXQgfHwgMCxcclxuXHRcdFx0c2l6ZTogaW5pdC5zaXplIHx8IGlucHV0LnNpemUgfHwgMFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKGluaXQuaGVhZGVycyB8fCBpbnB1dC5oZWFkZXJzIHx8IHt9KTtcclxuXHJcblx0XHRpZiAoaW5wdXRCb2R5ICE9IG51bGwgJiYgIWhlYWRlcnMuaGFzKCdDb250ZW50LVR5cGUnKSkge1xyXG5cdFx0XHRjb25zdCBjb250ZW50VHlwZSA9IGV4dHJhY3RDb250ZW50VHlwZShpbnB1dEJvZHkpO1xyXG5cdFx0XHRpZiAoY29udGVudFR5cGUpIHtcclxuXHRcdFx0XHRoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgY29udGVudFR5cGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHNpZ25hbCA9IGlzUmVxdWVzdChpbnB1dCkgPyBpbnB1dC5zaWduYWwgOiBudWxsO1xyXG5cdFx0aWYgKCdzaWduYWwnIGluIGluaXQpIHNpZ25hbCA9IGluaXQuc2lnbmFsO1xyXG5cclxuXHRcdGlmIChzaWduYWwgIT0gbnVsbCAmJiAhaXNBYm9ydFNpZ25hbChzaWduYWwpKSB7XHJcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHNpZ25hbCB0byBiZSBhbiBpbnN0YW5jZW9mIEFib3J0U2lnbmFsJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc1tJTlRFUk5BTFMkMl0gPSB7XHJcblx0XHRcdG1ldGhvZCxcclxuXHRcdFx0cmVkaXJlY3Q6IGluaXQucmVkaXJlY3QgfHwgaW5wdXQucmVkaXJlY3QgfHwgJ2ZvbGxvdycsXHJcblx0XHRcdGhlYWRlcnMsXHJcblx0XHRcdHBhcnNlZFVSTCxcclxuXHRcdFx0c2lnbmFsXHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIG5vZGUtZmV0Y2gtb25seSBvcHRpb25zXHJcblx0XHR0aGlzLmZvbGxvdyA9IGluaXQuZm9sbG93ICE9PSB1bmRlZmluZWQgPyBpbml0LmZvbGxvdyA6IGlucHV0LmZvbGxvdyAhPT0gdW5kZWZpbmVkID8gaW5wdXQuZm9sbG93IDogMjA7XHJcblx0XHR0aGlzLmNvbXByZXNzID0gaW5pdC5jb21wcmVzcyAhPT0gdW5kZWZpbmVkID8gaW5pdC5jb21wcmVzcyA6IGlucHV0LmNvbXByZXNzICE9PSB1bmRlZmluZWQgPyBpbnB1dC5jb21wcmVzcyA6IHRydWU7XHJcblx0XHR0aGlzLmNvdW50ZXIgPSBpbml0LmNvdW50ZXIgfHwgaW5wdXQuY291bnRlciB8fCAwO1xyXG5cdFx0dGhpcy5hZ2VudCA9IGluaXQuYWdlbnQgfHwgaW5wdXQuYWdlbnQ7XHJcblx0fVxyXG5cclxuXHRnZXQgbWV0aG9kKCkge1xyXG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDJdLm1ldGhvZDtcclxuXHR9XHJcblxyXG5cdGdldCB1cmwoKSB7XHJcblx0XHRyZXR1cm4gZm9ybWF0X3VybCh0aGlzW0lOVEVSTkFMUyQyXS5wYXJzZWRVUkwpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGhlYWRlcnMoKSB7XHJcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMl0uaGVhZGVycztcclxuXHR9XHJcblxyXG5cdGdldCByZWRpcmVjdCgpIHtcclxuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQyXS5yZWRpcmVjdDtcclxuXHR9XHJcblxyXG5cdGdldCBzaWduYWwoKSB7XHJcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMl0uc2lnbmFsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgKiBDbG9uZSB0aGlzIHJlcXVlc3RcclxuICAqXHJcbiAgKiBAcmV0dXJuICBSZXF1ZXN0XHJcbiAgKi9cclxuXHRjbG9uZSgpIHtcclxuXHRcdHJldHVybiBuZXcgUmVxdWVzdCh0aGlzKTtcclxuXHR9XHJcbn1cclxuXHJcbkJvZHkubWl4SW4oUmVxdWVzdC5wcm90b3R5cGUpO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlcXVlc3QucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcclxuXHR2YWx1ZTogJ1JlcXVlc3QnLFxyXG5cdHdyaXRhYmxlOiBmYWxzZSxcclxuXHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHRjb25maWd1cmFibGU6IHRydWVcclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZXF1ZXN0LnByb3RvdHlwZSwge1xyXG5cdG1ldGhvZDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXHJcblx0dXJsOiB7IGVudW1lcmFibGU6IHRydWUgfSxcclxuXHRoZWFkZXJzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcclxuXHRyZWRpcmVjdDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXHJcblx0Y2xvbmU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxyXG5cdHNpZ25hbDogeyBlbnVtZXJhYmxlOiB0cnVlIH1cclxufSk7XHJcblxyXG4vKipcclxuICogQ29udmVydCBhIFJlcXVlc3QgdG8gTm9kZS5qcyBodHRwIHJlcXVlc3Qgb3B0aW9ucy5cclxuICpcclxuICogQHBhcmFtICAgUmVxdWVzdCAgQSBSZXF1ZXN0IGluc3RhbmNlXHJcbiAqIEByZXR1cm4gIE9iamVjdCAgIFRoZSBvcHRpb25zIG9iamVjdCB0byBiZSBwYXNzZWQgdG8gaHR0cC5yZXF1ZXN0XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXROb2RlUmVxdWVzdE9wdGlvbnMocmVxdWVzdCkge1xyXG5cdGNvbnN0IHBhcnNlZFVSTCA9IHJlcXVlc3RbSU5URVJOQUxTJDJdLnBhcnNlZFVSTDtcclxuXHRjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMocmVxdWVzdFtJTlRFUk5BTFMkMl0uaGVhZGVycyk7XHJcblxyXG5cdC8vIGZldGNoIHN0ZXAgMS4zXHJcblx0aWYgKCFoZWFkZXJzLmhhcygnQWNjZXB0JykpIHtcclxuXHRcdGhlYWRlcnMuc2V0KCdBY2NlcHQnLCAnKi8qJyk7XHJcblx0fVxyXG5cclxuXHQvLyBCYXNpYyBmZXRjaFxyXG5cdGlmICghcGFyc2VkVVJMLnByb3RvY29sIHx8ICFwYXJzZWRVUkwuaG9zdG5hbWUpIHtcclxuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09ubHkgYWJzb2x1dGUgVVJMcyBhcmUgc3VwcG9ydGVkJyk7XHJcblx0fVxyXG5cclxuXHRpZiAoIS9eaHR0cHM/OiQvLnRlc3QocGFyc2VkVVJMLnByb3RvY29sKSkge1xyXG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT25seSBIVFRQKFMpIHByb3RvY29scyBhcmUgc3VwcG9ydGVkJyk7XHJcblx0fVxyXG5cclxuXHRpZiAocmVxdWVzdC5zaWduYWwgJiYgcmVxdWVzdC5ib2R5IGluc3RhbmNlb2YgU3RyZWFtLlJlYWRhYmxlICYmICFzdHJlYW1EZXN0cnVjdGlvblN1cHBvcnRlZCkge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdDYW5jZWxsYXRpb24gb2Ygc3RyZWFtZWQgcmVxdWVzdHMgd2l0aCBBYm9ydFNpZ25hbCBpcyBub3Qgc3VwcG9ydGVkIGluIG5vZGUgPCA4Jyk7XHJcblx0fVxyXG5cclxuXHQvLyBIVFRQLW5ldHdvcmstb3ItY2FjaGUgZmV0Y2ggc3RlcHMgMi40LTIuN1xyXG5cdGxldCBjb250ZW50TGVuZ3RoVmFsdWUgPSBudWxsO1xyXG5cdGlmIChyZXF1ZXN0LmJvZHkgPT0gbnVsbCAmJiAvXihQT1NUfFBVVCkkL2kudGVzdChyZXF1ZXN0Lm1ldGhvZCkpIHtcclxuXHRcdGNvbnRlbnRMZW5ndGhWYWx1ZSA9ICcwJztcclxuXHR9XHJcblx0aWYgKHJlcXVlc3QuYm9keSAhPSBudWxsKSB7XHJcblx0XHRjb25zdCB0b3RhbEJ5dGVzID0gZ2V0VG90YWxCeXRlcyhyZXF1ZXN0KTtcclxuXHRcdGlmICh0eXBlb2YgdG90YWxCeXRlcyA9PT0gJ251bWJlcicpIHtcclxuXHRcdFx0Y29udGVudExlbmd0aFZhbHVlID0gU3RyaW5nKHRvdGFsQnl0ZXMpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRpZiAoY29udGVudExlbmd0aFZhbHVlKSB7XHJcblx0XHRoZWFkZXJzLnNldCgnQ29udGVudC1MZW5ndGgnLCBjb250ZW50TGVuZ3RoVmFsdWUpO1xyXG5cdH1cclxuXHJcblx0Ly8gSFRUUC1uZXR3b3JrLW9yLWNhY2hlIGZldGNoIHN0ZXAgMi4xMVxyXG5cdGlmICghaGVhZGVycy5oYXMoJ1VzZXItQWdlbnQnKSkge1xyXG5cdFx0aGVhZGVycy5zZXQoJ1VzZXItQWdlbnQnLCAnbm9kZS1mZXRjaC8xLjAgKCtodHRwczovL2dpdGh1Yi5jb20vYml0aW5uL25vZGUtZmV0Y2gpJyk7XHJcblx0fVxyXG5cclxuXHQvLyBIVFRQLW5ldHdvcmstb3ItY2FjaGUgZmV0Y2ggc3RlcCAyLjE1XHJcblx0aWYgKHJlcXVlc3QuY29tcHJlc3MgJiYgIWhlYWRlcnMuaGFzKCdBY2NlcHQtRW5jb2RpbmcnKSkge1xyXG5cdFx0aGVhZGVycy5zZXQoJ0FjY2VwdC1FbmNvZGluZycsICdnemlwLGRlZmxhdGUnKTtcclxuXHR9XHJcblxyXG5cdGxldCBhZ2VudCA9IHJlcXVlc3QuYWdlbnQ7XHJcblx0aWYgKHR5cGVvZiBhZ2VudCA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0YWdlbnQgPSBhZ2VudChwYXJzZWRVUkwpO1xyXG5cdH1cclxuXHJcblx0aWYgKCFoZWFkZXJzLmhhcygnQ29ubmVjdGlvbicpICYmICFhZ2VudCkge1xyXG5cdFx0aGVhZGVycy5zZXQoJ0Nvbm5lY3Rpb24nLCAnY2xvc2UnKTtcclxuXHR9XHJcblxyXG5cdC8vIEhUVFAtbmV0d29yayBmZXRjaCBzdGVwIDQuMlxyXG5cdC8vIGNodW5rZWQgZW5jb2RpbmcgaXMgaGFuZGxlZCBieSBOb2RlLmpzXHJcblxyXG5cdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwYXJzZWRVUkwsIHtcclxuXHRcdG1ldGhvZDogcmVxdWVzdC5tZXRob2QsXHJcblx0XHRoZWFkZXJzOiBleHBvcnROb2RlQ29tcGF0aWJsZUhlYWRlcnMoaGVhZGVycyksXHJcblx0XHRhZ2VudFxyXG5cdH0pO1xyXG59XHJcblxyXG4vKipcclxuICogYWJvcnQtZXJyb3IuanNcclxuICpcclxuICogQWJvcnRFcnJvciBpbnRlcmZhY2UgZm9yIGNhbmNlbGxlZCByZXF1ZXN0c1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgQWJvcnRFcnJvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAcGFyYW0gICBTdHJpbmcgICAgICBtZXNzYWdlICAgICAgRXJyb3IgbWVzc2FnZSBmb3IgaHVtYW5cclxuICogQHJldHVybiAgQWJvcnRFcnJvclxyXG4gKi9cclxuZnVuY3Rpb24gQWJvcnRFcnJvcihtZXNzYWdlKSB7XHJcbiAgRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcclxuXHJcbiAgdGhpcy50eXBlID0gJ2Fib3J0ZWQnO1xyXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcblxyXG4gIC8vIGhpZGUgY3VzdG9tIGVycm9yIGltcGxlbWVudGF0aW9uIGRldGFpbHMgZnJvbSBlbmQtdXNlcnNcclxuICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcclxufVxyXG5cclxuQWJvcnRFcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XHJcbkFib3J0RXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWJvcnRFcnJvcjtcclxuQWJvcnRFcnJvci5wcm90b3R5cGUubmFtZSA9ICdBYm9ydEVycm9yJztcclxuXHJcbi8vIGZpeCBhbiBpc3N1ZSB3aGVyZSBcIlBhc3NUaHJvdWdoXCIsIFwicmVzb2x2ZVwiIGFyZW4ndCBhIG5hbWVkIGV4cG9ydCBmb3Igbm9kZSA8MTBcclxuY29uc3QgUGFzc1Rocm91Z2gkMSA9IFN0cmVhbS5QYXNzVGhyb3VnaDtcclxuY29uc3QgcmVzb2x2ZV91cmwgPSBVcmwucmVzb2x2ZTtcclxuXHJcbi8qKlxyXG4gKiBGZXRjaCBmdW5jdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0gICBNaXhlZCAgICB1cmwgICBBYnNvbHV0ZSB1cmwgb3IgUmVxdWVzdCBpbnN0YW5jZVxyXG4gKiBAcGFyYW0gICBPYmplY3QgICBvcHRzICBGZXRjaCBvcHRpb25zXHJcbiAqIEByZXR1cm4gIFByb21pc2VcclxuICovXHJcbmZ1bmN0aW9uIGZldGNoKHVybCwgb3B0cykge1xyXG5cclxuXHQvLyBhbGxvdyBjdXN0b20gcHJvbWlzZVxyXG5cdGlmICghZmV0Y2guUHJvbWlzZSkge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCduYXRpdmUgcHJvbWlzZSBtaXNzaW5nLCBzZXQgZmV0Y2guUHJvbWlzZSB0byB5b3VyIGZhdm9yaXRlIGFsdGVybmF0aXZlJyk7XHJcblx0fVxyXG5cclxuXHRCb2R5LlByb21pc2UgPSBmZXRjaC5Qcm9taXNlO1xyXG5cclxuXHQvLyB3cmFwIGh0dHAucmVxdWVzdCBpbnRvIGZldGNoXHJcblx0cmV0dXJuIG5ldyBmZXRjaC5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdC8vIGJ1aWxkIHJlcXVlc3Qgb2JqZWN0XHJcblx0XHRjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCBvcHRzKTtcclxuXHRcdGNvbnN0IG9wdGlvbnMgPSBnZXROb2RlUmVxdWVzdE9wdGlvbnMocmVxdWVzdCk7XHJcblxyXG5cdFx0Y29uc3Qgc2VuZCA9IChvcHRpb25zLnByb3RvY29sID09PSAnaHR0cHM6JyA/IGh0dHBzIDogaHR0cCkucmVxdWVzdDtcclxuXHRcdGNvbnN0IHNpZ25hbCA9IHJlcXVlc3Quc2lnbmFsO1xyXG5cclxuXHRcdGxldCByZXNwb25zZSA9IG51bGw7XHJcblxyXG5cdFx0Y29uc3QgYWJvcnQgPSBmdW5jdGlvbiBhYm9ydCgpIHtcclxuXHRcdFx0bGV0IGVycm9yID0gbmV3IEFib3J0RXJyb3IoJ1RoZSB1c2VyIGFib3J0ZWQgYSByZXF1ZXN0LicpO1xyXG5cdFx0XHRyZWplY3QoZXJyb3IpO1xyXG5cdFx0XHRpZiAocmVxdWVzdC5ib2R5ICYmIHJlcXVlc3QuYm9keSBpbnN0YW5jZW9mIFN0cmVhbS5SZWFkYWJsZSkge1xyXG5cdFx0XHRcdHJlcXVlc3QuYm9keS5kZXN0cm95KGVycm9yKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIXJlc3BvbnNlIHx8ICFyZXNwb25zZS5ib2R5KSByZXR1cm47XHJcblx0XHRcdHJlc3BvbnNlLmJvZHkuZW1pdCgnZXJyb3InLCBlcnJvcik7XHJcblx0XHR9O1xyXG5cclxuXHRcdGlmIChzaWduYWwgJiYgc2lnbmFsLmFib3J0ZWQpIHtcclxuXHRcdFx0YWJvcnQoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IGFib3J0QW5kRmluYWxpemUgPSBmdW5jdGlvbiBhYm9ydEFuZEZpbmFsaXplKCkge1xyXG5cdFx0XHRhYm9ydCgpO1xyXG5cdFx0XHRmaW5hbGl6ZSgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBzZW5kIHJlcXVlc3RcclxuXHRcdGNvbnN0IHJlcSA9IHNlbmQob3B0aW9ucyk7XHJcblx0XHRsZXQgcmVxVGltZW91dDtcclxuXHJcblx0XHRpZiAoc2lnbmFsKSB7XHJcblx0XHRcdHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0QW5kRmluYWxpemUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGZpbmFsaXplKCkge1xyXG5cdFx0XHRyZXEuYWJvcnQoKTtcclxuXHRcdFx0aWYgKHNpZ25hbCkgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XHJcblx0XHRcdGNsZWFyVGltZW91dChyZXFUaW1lb3V0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAocmVxdWVzdC50aW1lb3V0KSB7XHJcblx0XHRcdHJlcS5vbmNlKCdzb2NrZXQnLCBmdW5jdGlvbiAoc29ja2V0KSB7XHJcblx0XHRcdFx0cmVxVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBuZXR3b3JrIHRpbWVvdXQgYXQ6ICR7cmVxdWVzdC51cmx9YCwgJ3JlcXVlc3QtdGltZW91dCcpKTtcclxuXHRcdFx0XHRcdGZpbmFsaXplKCk7XHJcblx0XHRcdFx0fSwgcmVxdWVzdC50aW1lb3V0KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcclxuXHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGByZXF1ZXN0IHRvICR7cmVxdWVzdC51cmx9IGZhaWxlZCwgcmVhc29uOiAke2Vyci5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnIpKTtcclxuXHRcdFx0ZmluYWxpemUoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJlcS5vbigncmVzcG9uc2UnLCBmdW5jdGlvbiAocmVzKSB7XHJcblx0XHRcdGNsZWFyVGltZW91dChyZXFUaW1lb3V0KTtcclxuXHJcblx0XHRcdGNvbnN0IGhlYWRlcnMgPSBjcmVhdGVIZWFkZXJzTGVuaWVudChyZXMuaGVhZGVycyk7XHJcblxyXG5cdFx0XHQvLyBIVFRQIGZldGNoIHN0ZXAgNVxyXG5cdFx0XHRpZiAoZmV0Y2guaXNSZWRpcmVjdChyZXMuc3RhdHVzQ29kZSkpIHtcclxuXHRcdFx0XHQvLyBIVFRQIGZldGNoIHN0ZXAgNS4yXHJcblx0XHRcdFx0Y29uc3QgbG9jYXRpb24gPSBoZWFkZXJzLmdldCgnTG9jYXRpb24nKTtcclxuXHJcblx0XHRcdFx0Ly8gSFRUUCBmZXRjaCBzdGVwIDUuM1xyXG5cdFx0XHRcdGNvbnN0IGxvY2F0aW9uVVJMID0gbG9jYXRpb24gPT09IG51bGwgPyBudWxsIDogcmVzb2x2ZV91cmwocmVxdWVzdC51cmwsIGxvY2F0aW9uKTtcclxuXHJcblx0XHRcdFx0Ly8gSFRUUCBmZXRjaCBzdGVwIDUuNVxyXG5cdFx0XHRcdHN3aXRjaCAocmVxdWVzdC5yZWRpcmVjdCkge1xyXG5cdFx0XHRcdFx0Y2FzZSAnZXJyb3InOlxyXG5cdFx0XHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYHJlZGlyZWN0IG1vZGUgaXMgc2V0IHRvIGVycm9yOiAke3JlcXVlc3QudXJsfWAsICduby1yZWRpcmVjdCcpKTtcclxuXHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0Y2FzZSAnbWFudWFsJzpcclxuXHRcdFx0XHRcdFx0Ly8gbm9kZS1mZXRjaC1zcGVjaWZpYyBzdGVwOiBtYWtlIG1hbnVhbCByZWRpcmVjdCBhIGJpdCBlYXNpZXIgdG8gdXNlIGJ5IHNldHRpbmcgdGhlIExvY2F0aW9uIGhlYWRlciB2YWx1ZSB0byB0aGUgcmVzb2x2ZWQgVVJMLlxyXG5cdFx0XHRcdFx0XHRpZiAobG9jYXRpb25VUkwgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBoYW5kbGUgY29ycnVwdGVkIGhlYWRlclxyXG5cdFx0XHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdFx0XHRoZWFkZXJzLnNldCgnTG9jYXRpb24nLCBsb2NhdGlvblVSTCk7XHJcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogbm9kZWpzIHNlcnZlciBwcmV2ZW50IGludmFsaWQgcmVzcG9uc2UgaGVhZGVycywgd2UgY2FuJ3QgdGVzdCB0aGlzIHRocm91Z2ggbm9ybWFsIHJlcXVlc3RcclxuXHRcdFx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ2ZvbGxvdyc6XHJcblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCAyXHJcblx0XHRcdFx0XHRcdGlmIChsb2NhdGlvblVSTCA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgNVxyXG5cdFx0XHRcdFx0XHRpZiAocmVxdWVzdC5jb3VudGVyID49IHJlcXVlc3QuZm9sbG93KSB7XHJcblx0XHRcdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBtYXhpbXVtIHJlZGlyZWN0IHJlYWNoZWQgYXQ6ICR7cmVxdWVzdC51cmx9YCwgJ21heC1yZWRpcmVjdCcpKTtcclxuXHRcdFx0XHRcdFx0XHRmaW5hbGl6ZSgpO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDYgKGNvdW50ZXIgaW5jcmVtZW50KVxyXG5cdFx0XHRcdFx0XHQvLyBDcmVhdGUgYSBuZXcgUmVxdWVzdCBvYmplY3QuXHJcblx0XHRcdFx0XHRcdGNvbnN0IHJlcXVlc3RPcHRzID0ge1xyXG5cdFx0XHRcdFx0XHRcdGhlYWRlcnM6IG5ldyBIZWFkZXJzKHJlcXVlc3QuaGVhZGVycyksXHJcblx0XHRcdFx0XHRcdFx0Zm9sbG93OiByZXF1ZXN0LmZvbGxvdyxcclxuXHRcdFx0XHRcdFx0XHRjb3VudGVyOiByZXF1ZXN0LmNvdW50ZXIgKyAxLFxyXG5cdFx0XHRcdFx0XHRcdGFnZW50OiByZXF1ZXN0LmFnZW50LFxyXG5cdFx0XHRcdFx0XHRcdGNvbXByZXNzOiByZXF1ZXN0LmNvbXByZXNzLFxyXG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogcmVxdWVzdC5tZXRob2QsXHJcblx0XHRcdFx0XHRcdFx0Ym9keTogcmVxdWVzdC5ib2R5LFxyXG5cdFx0XHRcdFx0XHRcdHNpZ25hbDogcmVxdWVzdC5zaWduYWwsXHJcblx0XHRcdFx0XHRcdFx0dGltZW91dDogcmVxdWVzdC50aW1lb3V0XHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgOVxyXG5cdFx0XHRcdFx0XHRpZiAocmVzLnN0YXR1c0NvZGUgIT09IDMwMyAmJiByZXF1ZXN0LmJvZHkgJiYgZ2V0VG90YWxCeXRlcyhyZXF1ZXN0KSA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcignQ2Fubm90IGZvbGxvdyByZWRpcmVjdCB3aXRoIGJvZHkgYmVpbmcgYSByZWFkYWJsZSBzdHJlYW0nLCAndW5zdXBwb3J0ZWQtcmVkaXJlY3QnKSk7XHJcblx0XHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCAxMVxyXG5cdFx0XHRcdFx0XHRpZiAocmVzLnN0YXR1c0NvZGUgPT09IDMwMyB8fCAocmVzLnN0YXR1c0NvZGUgPT09IDMwMSB8fCByZXMuc3RhdHVzQ29kZSA9PT0gMzAyKSAmJiByZXF1ZXN0Lm1ldGhvZCA9PT0gJ1BPU1QnKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVxdWVzdE9wdHMubWV0aG9kID0gJ0dFVCc7XHJcblx0XHRcdFx0XHRcdFx0cmVxdWVzdE9wdHMuYm9keSA9IHVuZGVmaW5lZDtcclxuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0T3B0cy5oZWFkZXJzLmRlbGV0ZSgnY29udGVudC1sZW5ndGgnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDE1XHJcblx0XHRcdFx0XHRcdHJlc29sdmUoZmV0Y2gobmV3IFJlcXVlc3QobG9jYXRpb25VUkwsIHJlcXVlc3RPcHRzKSkpO1xyXG5cdFx0XHRcdFx0XHRmaW5hbGl6ZSgpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBwcmVwYXJlIHJlc3BvbnNlXHJcblx0XHRcdHJlcy5vbmNlKCdlbmQnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0aWYgKHNpZ25hbCkgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRsZXQgYm9keSA9IHJlcy5waXBlKG5ldyBQYXNzVGhyb3VnaCQxKCkpO1xyXG5cclxuXHRcdFx0Y29uc3QgcmVzcG9uc2Vfb3B0aW9ucyA9IHtcclxuXHRcdFx0XHR1cmw6IHJlcXVlc3QudXJsLFxyXG5cdFx0XHRcdHN0YXR1czogcmVzLnN0YXR1c0NvZGUsXHJcblx0XHRcdFx0c3RhdHVzVGV4dDogcmVzLnN0YXR1c01lc3NhZ2UsXHJcblx0XHRcdFx0aGVhZGVyczogaGVhZGVycyxcclxuXHRcdFx0XHRzaXplOiByZXF1ZXN0LnNpemUsXHJcblx0XHRcdFx0dGltZW91dDogcmVxdWVzdC50aW1lb3V0LFxyXG5cdFx0XHRcdGNvdW50ZXI6IHJlcXVlc3QuY291bnRlclxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly8gSFRUUC1uZXR3b3JrIGZldGNoIHN0ZXAgMTIuMS4xLjNcclxuXHRcdFx0Y29uc3QgY29kaW5ncyA9IGhlYWRlcnMuZ2V0KCdDb250ZW50LUVuY29kaW5nJyk7XHJcblxyXG5cdFx0XHQvLyBIVFRQLW5ldHdvcmsgZmV0Y2ggc3RlcCAxMi4xLjEuNDogaGFuZGxlIGNvbnRlbnQgY29kaW5nc1xyXG5cclxuXHRcdFx0Ly8gaW4gZm9sbG93aW5nIHNjZW5hcmlvcyB3ZSBpZ25vcmUgY29tcHJlc3Npb24gc3VwcG9ydFxyXG5cdFx0XHQvLyAxLiBjb21wcmVzc2lvbiBzdXBwb3J0IGlzIGRpc2FibGVkXHJcblx0XHRcdC8vIDIuIEhFQUQgcmVxdWVzdFxyXG5cdFx0XHQvLyAzLiBubyBDb250ZW50LUVuY29kaW5nIGhlYWRlclxyXG5cdFx0XHQvLyA0LiBubyBjb250ZW50IHJlc3BvbnNlICgyMDQpXHJcblx0XHRcdC8vIDUuIGNvbnRlbnQgbm90IG1vZGlmaWVkIHJlc3BvbnNlICgzMDQpXHJcblx0XHRcdGlmICghcmVxdWVzdC5jb21wcmVzcyB8fCByZXF1ZXN0Lm1ldGhvZCA9PT0gJ0hFQUQnIHx8IGNvZGluZ3MgPT09IG51bGwgfHwgcmVzLnN0YXR1c0NvZGUgPT09IDIwNCB8fCByZXMuc3RhdHVzQ29kZSA9PT0gMzA0KSB7XHJcblx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2Vfb3B0aW9ucyk7XHJcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBGb3IgTm9kZSB2NitcclxuXHRcdFx0Ly8gQmUgbGVzcyBzdHJpY3Qgd2hlbiBkZWNvZGluZyBjb21wcmVzc2VkIHJlc3BvbnNlcywgc2luY2Ugc29tZXRpbWVzXHJcblx0XHRcdC8vIHNlcnZlcnMgc2VuZCBzbGlnaHRseSBpbnZhbGlkIHJlc3BvbnNlcyB0aGF0IGFyZSBzdGlsbCBhY2NlcHRlZFxyXG5cdFx0XHQvLyBieSBjb21tb24gYnJvd3NlcnMuXHJcblx0XHRcdC8vIEFsd2F5cyB1c2luZyBaX1NZTkNfRkxVU0ggaXMgd2hhdCBjVVJMIGRvZXMuXHJcblx0XHRcdGNvbnN0IHpsaWJPcHRpb25zID0ge1xyXG5cdFx0XHRcdGZsdXNoOiB6bGliLlpfU1lOQ19GTFVTSCxcclxuXHRcdFx0XHRmaW5pc2hGbHVzaDogemxpYi5aX1NZTkNfRkxVU0hcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIGZvciBnemlwXHJcblx0XHRcdGlmIChjb2RpbmdzID09ICdnemlwJyB8fCBjb2RpbmdzID09ICd4LWd6aXAnKSB7XHJcblx0XHRcdFx0Ym9keSA9IGJvZHkucGlwZSh6bGliLmNyZWF0ZUd1bnppcCh6bGliT3B0aW9ucykpO1xyXG5cdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlX29wdGlvbnMpO1xyXG5cdFx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gZm9yIGRlZmxhdGVcclxuXHRcdFx0aWYgKGNvZGluZ3MgPT0gJ2RlZmxhdGUnIHx8IGNvZGluZ3MgPT0gJ3gtZGVmbGF0ZScpIHtcclxuXHRcdFx0XHQvLyBoYW5kbGUgdGhlIGluZmFtb3VzIHJhdyBkZWZsYXRlIHJlc3BvbnNlIGZyb20gb2xkIHNlcnZlcnNcclxuXHRcdFx0XHQvLyBhIGhhY2sgZm9yIG9sZCBJSVMgYW5kIEFwYWNoZSBzZXJ2ZXJzXHJcblx0XHRcdFx0Y29uc3QgcmF3ID0gcmVzLnBpcGUobmV3IFBhc3NUaHJvdWdoJDEoKSk7XHJcblx0XHRcdFx0cmF3Lm9uY2UoJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcclxuXHRcdFx0XHRcdC8vIHNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM3NTE5ODI4XHJcblx0XHRcdFx0XHRpZiAoKGNodW5rWzBdICYgMHgwRikgPT09IDB4MDgpIHtcclxuXHRcdFx0XHRcdFx0Ym9keSA9IGJvZHkucGlwZSh6bGliLmNyZWF0ZUluZmxhdGUoKSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRib2R5ID0gYm9keS5waXBlKHpsaWIuY3JlYXRlSW5mbGF0ZVJhdygpKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlX29wdGlvbnMpO1xyXG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBmb3IgYnJcclxuXHRcdFx0aWYgKGNvZGluZ3MgPT0gJ2JyJyAmJiB0eXBlb2YgemxpYi5jcmVhdGVCcm90bGlEZWNvbXByZXNzID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0Ym9keSA9IGJvZHkucGlwZSh6bGliLmNyZWF0ZUJyb3RsaURlY29tcHJlc3MoKSk7XHJcblx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2Vfb3B0aW9ucyk7XHJcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBvdGhlcndpc2UsIHVzZSByZXNwb25zZSBhcy1pc1xyXG5cdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZV9vcHRpb25zKTtcclxuXHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR3cml0ZVRvU3RyZWFtKHJlcSwgcmVxdWVzdCk7XHJcblx0fSk7XHJcbn1cclxuLyoqXHJcbiAqIFJlZGlyZWN0IGNvZGUgbWF0Y2hpbmdcclxuICpcclxuICogQHBhcmFtICAgTnVtYmVyICAgY29kZSAgU3RhdHVzIGNvZGVcclxuICogQHJldHVybiAgQm9vbGVhblxyXG4gKi9cclxuZmV0Y2guaXNSZWRpcmVjdCA9IGZ1bmN0aW9uIChjb2RlKSB7XHJcblx0cmV0dXJuIGNvZGUgPT09IDMwMSB8fCBjb2RlID09PSAzMDIgfHwgY29kZSA9PT0gMzAzIHx8IGNvZGUgPT09IDMwNyB8fCBjb2RlID09PSAzMDg7XHJcbn07XHJcblxyXG4vLyBleHBvc2UgUHJvbWlzZVxyXG5mZXRjaC5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XHJcblxyXG5mdW5jdGlvbiBnZXRfcGFnZV9oYW5kbGVyKFxyXG5cdG1hbmlmZXN0LFxyXG5cdHNlc3Npb25fZ2V0dGVyXHJcbikge1xyXG5cdGNvbnN0IGdldF9idWlsZF9pbmZvID0gZGV2XHJcblx0XHQ/ICgpID0+IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihidWlsZF9kaXIsICdidWlsZC5qc29uJyksICd1dGYtOCcpKVxyXG5cdFx0OiAoYXNzZXRzID0+ICgpID0+IGFzc2V0cykoSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ2J1aWxkLmpzb24nKSwgJ3V0Zi04JykpKTtcclxuXHJcblx0Y29uc3QgdGVtcGxhdGUgPSBkZXZcclxuXHRcdD8gKCkgPT4gcmVhZF90ZW1wbGF0ZShzcmNfZGlyKVxyXG5cdFx0OiAoc3RyID0+ICgpID0+IHN0cikocmVhZF90ZW1wbGF0ZShidWlsZF9kaXIpKTtcclxuXHJcblx0Y29uc3QgaGFzX3NlcnZpY2Vfd29ya2VyID0gZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCAnc2VydmljZS13b3JrZXIuanMnKSk7XHJcblxyXG5cdGNvbnN0IHsgc2VydmVyX3JvdXRlcywgcGFnZXMgfSA9IG1hbmlmZXN0O1xyXG5cdGNvbnN0IGVycm9yX3JvdXRlID0gbWFuaWZlc3QuZXJyb3I7XHJcblxyXG5cdGZ1bmN0aW9uIGJhaWwocmVxLCByZXMsIGVycikge1xyXG5cdFx0Y29uc29sZS5lcnJvcihlcnIpO1xyXG5cclxuXHRcdGNvbnN0IG1lc3NhZ2UgPSBkZXYgPyBlc2NhcGVfaHRtbChlcnIubWVzc2FnZSkgOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJztcclxuXHJcblx0XHRyZXMuc3RhdHVzQ29kZSA9IDUwMDtcclxuXHRcdHJlcy5lbmQoYDxwcmU+JHttZXNzYWdlfTwvcHJlPmApO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaGFuZGxlX2Vycm9yKHJlcSwgcmVzLCBzdGF0dXNDb2RlLCBlcnJvcikge1xyXG5cdFx0aGFuZGxlX3BhZ2Uoe1xyXG5cdFx0XHRwYXR0ZXJuOiBudWxsLFxyXG5cdFx0XHRwYXJ0czogW1xyXG5cdFx0XHRcdHsgbmFtZTogbnVsbCwgY29tcG9uZW50OiBlcnJvcl9yb3V0ZSB9XHJcblx0XHRcdF1cclxuXHRcdH0sIHJlcSwgcmVzLCBzdGF0dXNDb2RlLCBlcnJvciB8fCBuZXcgRXJyb3IoJ1Vua25vd24gZXJyb3IgaW4gcHJlbG9hZCBmdW5jdGlvbicpKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGZ1bmN0aW9uIGhhbmRsZV9wYWdlKHBhZ2UsIHJlcSwgcmVzLCBzdGF0dXMgPSAyMDAsIGVycm9yID0gbnVsbCkge1xyXG5cdFx0Y29uc3QgaXNfc2VydmljZV93b3JrZXJfaW5kZXggPSByZXEucGF0aCA9PT0gJy9zZXJ2aWNlLXdvcmtlci1pbmRleC5odG1sJztcclxuXHRcdGNvbnN0IGJ1aWxkX2luZm9cclxuXHJcblxyXG5cclxuXHJcbiA9IGdldF9idWlsZF9pbmZvKCk7XHJcblxyXG5cdFx0cmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbCcpO1xyXG5cdFx0cmVzLnNldEhlYWRlcignQ2FjaGUtQ29udHJvbCcsIGRldiA/ICduby1jYWNoZScgOiAnbWF4LWFnZT02MDAnKTtcclxuXHJcblx0XHQvLyBwcmVsb2FkIG1haW4uanMgYW5kIGN1cnJlbnQgcm91dGVcclxuXHRcdC8vIFRPRE8gZGV0ZWN0IG90aGVyIHN0dWZmIHdlIGNhbiBwcmVsb2FkPyBpbWFnZXMsIENTUywgZm9udHM/XHJcblx0XHRsZXQgcHJlbG9hZGVkX2NodW5rcyA9IEFycmF5LmlzQXJyYXkoYnVpbGRfaW5mby5hc3NldHMubWFpbikgPyBidWlsZF9pbmZvLmFzc2V0cy5tYWluIDogW2J1aWxkX2luZm8uYXNzZXRzLm1haW5dO1xyXG5cdFx0aWYgKCFlcnJvciAmJiAhaXNfc2VydmljZV93b3JrZXJfaW5kZXgpIHtcclxuXHRcdFx0cGFnZS5wYXJ0cy5mb3JFYWNoKHBhcnQgPT4ge1xyXG5cdFx0XHRcdGlmICghcGFydCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHQvLyB1c2luZyBjb25jYXQgYmVjYXVzZSBpdCBjb3VsZCBiZSBhIHN0cmluZyBvciBhbiBhcnJheS4gdGhhbmtzIHdlYnBhY2shXHJcblx0XHRcdFx0cHJlbG9hZGVkX2NodW5rcyA9IHByZWxvYWRlZF9jaHVua3MuY29uY2F0KGJ1aWxkX2luZm8uYXNzZXRzW3BhcnQubmFtZV0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoYnVpbGRfaW5mby5idW5kbGVyID09PSAncm9sbHVwJykge1xyXG5cdFx0XHQvLyBUT0RPIGFkZCBkZXBlbmRlbmNpZXMgYW5kIENTU1xyXG5cdFx0XHRjb25zdCBsaW5rID0gcHJlbG9hZGVkX2NodW5rc1xyXG5cdFx0XHRcdC5maWx0ZXIoZmlsZSA9PiBmaWxlICYmICFmaWxlLm1hdGNoKC9cXC5tYXAkLykpXHJcblx0XHRcdFx0Lm1hcChmaWxlID0+IGA8JHtyZXEuYmFzZVVybH0vY2xpZW50LyR7ZmlsZX0+O3JlbD1cIm1vZHVsZXByZWxvYWRcImApXHJcblx0XHRcdFx0LmpvaW4oJywgJyk7XHJcblxyXG5cdFx0XHRyZXMuc2V0SGVhZGVyKCdMaW5rJywgbGluayk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCBsaW5rID0gcHJlbG9hZGVkX2NodW5rc1xyXG5cdFx0XHRcdC5maWx0ZXIoZmlsZSA9PiBmaWxlICYmICFmaWxlLm1hdGNoKC9cXC5tYXAkLykpXHJcblx0XHRcdFx0Lm1hcCgoZmlsZSkgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc3QgYXMgPSAvXFwuY3NzJC8udGVzdChmaWxlKSA/ICdzdHlsZScgOiAnc2NyaXB0JztcclxuXHRcdFx0XHRcdHJldHVybiBgPCR7cmVxLmJhc2VVcmx9L2NsaWVudC8ke2ZpbGV9PjtyZWw9XCJwcmVsb2FkXCI7YXM9XCIke2FzfVwiYDtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5qb2luKCcsICcpO1xyXG5cclxuXHRcdFx0cmVzLnNldEhlYWRlcignTGluaycsIGxpbmspO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IHNlc3Npb24gPSBzZXNzaW9uX2dldHRlcihyZXEsIHJlcyk7XHJcblxyXG5cdFx0bGV0IHJlZGlyZWN0O1xyXG5cdFx0bGV0IHByZWxvYWRfZXJyb3I7XHJcblxyXG5cdFx0Y29uc3QgcHJlbG9hZF9jb250ZXh0ID0ge1xyXG5cdFx0XHRyZWRpcmVjdDogKHN0YXR1c0NvZGUsIGxvY2F0aW9uKSA9PiB7XHJcblx0XHRcdFx0aWYgKHJlZGlyZWN0ICYmIChyZWRpcmVjdC5zdGF0dXNDb2RlICE9PSBzdGF0dXNDb2RlIHx8IHJlZGlyZWN0LmxvY2F0aW9uICE9PSBsb2NhdGlvbikpIHtcclxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihgQ29uZmxpY3RpbmcgcmVkaXJlY3RzYCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxvY2F0aW9uID0gbG9jYXRpb24ucmVwbGFjZSgvXlxcLy9nLCAnJyk7IC8vIGxlYWRpbmcgc2xhc2ggKG9ubHkpXHJcblx0XHRcdFx0cmVkaXJlY3QgPSB7IHN0YXR1c0NvZGUsIGxvY2F0aW9uIH07XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiAoc3RhdHVzQ29kZSwgbWVzc2FnZSkgPT4ge1xyXG5cdFx0XHRcdHByZWxvYWRfZXJyb3IgPSB7IHN0YXR1c0NvZGUsIG1lc3NhZ2UgfTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZmV0Y2g6ICh1cmwsIG9wdHMpID0+IHtcclxuXHRcdFx0XHRjb25zdCBwYXJzZWQgPSBuZXcgVXJsLlVSTCh1cmwsIGBodHRwOi8vMTI3LjAuMC4xOiR7cHJvY2Vzcy5lbnYuUE9SVH0ke3JlcS5iYXNlVXJsID8gcmVxLmJhc2VVcmwgKyAnLycgOicnfWApO1xyXG5cclxuXHRcdFx0XHRpZiAob3B0cykge1xyXG5cdFx0XHRcdFx0b3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpO1xyXG5cclxuXHRcdFx0XHRcdGNvbnN0IGluY2x1ZGVfY29va2llcyA9IChcclxuXHRcdFx0XHRcdFx0b3B0cy5jcmVkZW50aWFscyA9PT0gJ2luY2x1ZGUnIHx8XHJcblx0XHRcdFx0XHRcdG9wdHMuY3JlZGVudGlhbHMgPT09ICdzYW1lLW9yaWdpbicgJiYgcGFyc2VkLm9yaWdpbiA9PT0gYGh0dHA6Ly8xMjcuMC4wLjE6JHtwcm9jZXNzLmVudi5QT1JUfWBcclxuXHRcdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGluY2x1ZGVfY29va2llcykge1xyXG5cdFx0XHRcdFx0XHRvcHRzLmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRzLmhlYWRlcnMpO1xyXG5cclxuXHRcdFx0XHRcdFx0Y29uc3QgY29va2llcyA9IE9iamVjdC5hc3NpZ24oXHJcblx0XHRcdFx0XHRcdFx0e30sXHJcblx0XHRcdFx0XHRcdFx0Y29va2llLnBhcnNlKHJlcS5oZWFkZXJzLmNvb2tpZSB8fCAnJyksXHJcblx0XHRcdFx0XHRcdFx0Y29va2llLnBhcnNlKG9wdHMuaGVhZGVycy5jb29raWUgfHwgJycpXHJcblx0XHRcdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdFx0XHRjb25zdCBzZXRfY29va2llID0gcmVzLmdldEhlYWRlcignU2V0LUNvb2tpZScpO1xyXG5cdFx0XHRcdFx0XHQoQXJyYXkuaXNBcnJheShzZXRfY29va2llKSA/IHNldF9jb29raWUgOiBbc2V0X2Nvb2tpZV0pLmZvckVhY2goc3RyID0+IHtcclxuXHRcdFx0XHRcdFx0XHRjb25zdCBtYXRjaCA9IC8oW149XSspPShbXjtdKykvLmV4ZWMoc3RyKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAobWF0Y2gpIGNvb2tpZXNbbWF0Y2hbMV1dID0gbWF0Y2hbMl07XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0Y29uc3Qgc3RyID0gT2JqZWN0LmtleXMoY29va2llcylcclxuXHRcdFx0XHRcdFx0XHQubWFwKGtleSA9PiBgJHtrZXl9PSR7Y29va2llc1trZXldfWApXHJcblx0XHRcdFx0XHRcdFx0LmpvaW4oJzsgJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRvcHRzLmhlYWRlcnMuY29va2llID0gc3RyO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIGZldGNoKHBhcnNlZC5ocmVmLCBvcHRzKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHRsZXQgcHJlbG9hZGVkO1xyXG5cdFx0bGV0IG1hdGNoO1xyXG5cdFx0bGV0IHBhcmFtcztcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCByb290X3ByZWxvYWRlZCA9IG1hbmlmZXN0LnJvb3RfcHJlbG9hZFxyXG5cdFx0XHRcdD8gbWFuaWZlc3Qucm9vdF9wcmVsb2FkLmNhbGwocHJlbG9hZF9jb250ZXh0LCB7XHJcblx0XHRcdFx0XHRob3N0OiByZXEuaGVhZGVycy5ob3N0LFxyXG5cdFx0XHRcdFx0cGF0aDogcmVxLnBhdGgsXHJcblx0XHRcdFx0XHRxdWVyeTogcmVxLnF1ZXJ5LFxyXG5cdFx0XHRcdFx0cGFyYW1zOiB7fVxyXG5cdFx0XHRcdH0sIHNlc3Npb24pXHJcblx0XHRcdFx0OiB7fTtcclxuXHJcblx0XHRcdG1hdGNoID0gZXJyb3IgPyBudWxsIDogcGFnZS5wYXR0ZXJuLmV4ZWMocmVxLnBhdGgpO1xyXG5cclxuXHJcblx0XHRcdGxldCB0b1ByZWxvYWQgPSBbcm9vdF9wcmVsb2FkZWRdO1xyXG5cdFx0XHRpZiAoIWlzX3NlcnZpY2Vfd29ya2VyX2luZGV4KSB7XHJcblx0XHRcdFx0dG9QcmVsb2FkID0gdG9QcmVsb2FkLmNvbmNhdChwYWdlLnBhcnRzLm1hcChwYXJ0ID0+IHtcclxuXHRcdFx0XHRcdGlmICghcGFydCkgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0XHRcdFx0Ly8gdGhlIGRlZXBlc3QgbGV2ZWwgaXMgdXNlZCBiZWxvdywgdG8gaW5pdGlhbGlzZSB0aGUgc3RvcmVcclxuXHRcdFx0XHRcdHBhcmFtcyA9IHBhcnQucGFyYW1zID8gcGFydC5wYXJhbXMobWF0Y2gpIDoge307XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIHBhcnQucHJlbG9hZFxyXG5cdFx0XHRcdFx0XHQ/IHBhcnQucHJlbG9hZC5jYWxsKHByZWxvYWRfY29udGV4dCwge1xyXG5cdFx0XHRcdFx0XHRcdGhvc3Q6IHJlcS5oZWFkZXJzLmhvc3QsXHJcblx0XHRcdFx0XHRcdFx0cGF0aDogcmVxLnBhdGgsXHJcblx0XHRcdFx0XHRcdFx0cXVlcnk6IHJlcS5xdWVyeSxcclxuXHRcdFx0XHRcdFx0XHRwYXJhbXNcclxuXHRcdFx0XHRcdFx0fSwgc2Vzc2lvbilcclxuXHRcdFx0XHRcdFx0OiB7fTtcclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHByZWxvYWRlZCA9IGF3YWl0IFByb21pc2UuYWxsKHRvUHJlbG9hZCk7XHJcblx0XHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0aWYgKGVycm9yKSB7XHJcblx0XHRcdFx0cmV0dXJuIGJhaWwocmVxLCByZXMsIGVycilcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cHJlbG9hZF9lcnJvciA9IHsgc3RhdHVzQ29kZTogNTAwLCBtZXNzYWdlOiBlcnIgfTtcclxuXHRcdFx0cHJlbG9hZGVkID0gW107IC8vIGFwcGVhc2UgVHlwZVNjcmlwdFxyXG5cdFx0fVxyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChyZWRpcmVjdCkge1xyXG5cdFx0XHRcdGNvbnN0IGxvY2F0aW9uID0gVXJsLnJlc29sdmUoKHJlcS5iYXNlVXJsIHx8ICcnKSArICcvJywgcmVkaXJlY3QubG9jYXRpb24pO1xyXG5cclxuXHRcdFx0XHRyZXMuc3RhdHVzQ29kZSA9IHJlZGlyZWN0LnN0YXR1c0NvZGU7XHJcblx0XHRcdFx0cmVzLnNldEhlYWRlcignTG9jYXRpb24nLCBsb2NhdGlvbik7XHJcblx0XHRcdFx0cmVzLmVuZCgpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChwcmVsb2FkX2Vycm9yKSB7XHJcblx0XHRcdFx0aGFuZGxlX2Vycm9yKHJlcSwgcmVzLCBwcmVsb2FkX2Vycm9yLnN0YXR1c0NvZGUsIHByZWxvYWRfZXJyb3IubWVzc2FnZSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zdCBzZWdtZW50cyA9IHJlcS5wYXRoLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xyXG5cclxuXHRcdFx0Ly8gVE9ETyBtYWtlIHRoaXMgbGVzcyBjb25mdXNpbmdcclxuXHRcdFx0Y29uc3QgbGF5b3V0X3NlZ21lbnRzID0gW3NlZ21lbnRzWzBdXTtcclxuXHRcdFx0bGV0IGwgPSAxO1xyXG5cclxuXHRcdFx0cGFnZS5wYXJ0cy5mb3JFYWNoKChwYXJ0LCBpKSA9PiB7XHJcblx0XHRcdFx0bGF5b3V0X3NlZ21lbnRzW2xdID0gc2VnbWVudHNbaSArIDFdO1xyXG5cdFx0XHRcdGlmICghcGFydCkgcmV0dXJuIG51bGw7XHJcblx0XHRcdFx0bCsrO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGNvbnN0IHByb3BzID0ge1xyXG5cdFx0XHRcdHN0b3Jlczoge1xyXG5cdFx0XHRcdFx0cGFnZToge1xyXG5cdFx0XHRcdFx0XHRzdWJzY3JpYmU6IHdyaXRhYmxlKHtcclxuXHRcdFx0XHRcdFx0XHRob3N0OiByZXEuaGVhZGVycy5ob3N0LFxyXG5cdFx0XHRcdFx0XHRcdHBhdGg6IHJlcS5wYXRoLFxyXG5cdFx0XHRcdFx0XHRcdHF1ZXJ5OiByZXEucXVlcnksXHJcblx0XHRcdFx0XHRcdFx0cGFyYW1zXHJcblx0XHRcdFx0XHRcdH0pLnN1YnNjcmliZVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHByZWxvYWRpbmc6IHtcclxuXHRcdFx0XHRcdFx0c3Vic2NyaWJlOiB3cml0YWJsZShudWxsKS5zdWJzY3JpYmVcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRzZXNzaW9uOiB3cml0YWJsZShzZXNzaW9uKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c2VnbWVudHM6IGxheW91dF9zZWdtZW50cyxcclxuXHRcdFx0XHRzdGF0dXM6IGVycm9yID8gc3RhdHVzIDogMjAwLFxyXG5cdFx0XHRcdGVycm9yOiBlcnJvciA/IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvciA6IHsgbWVzc2FnZTogZXJyb3IgfSA6IG51bGwsXHJcblx0XHRcdFx0bGV2ZWwwOiB7XHJcblx0XHRcdFx0XHRwcm9wczogcHJlbG9hZGVkWzBdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRsZXZlbDE6IHtcclxuXHRcdFx0XHRcdHNlZ21lbnQ6IHNlZ21lbnRzWzBdLFxyXG5cdFx0XHRcdFx0cHJvcHM6IHt9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYgKCFpc19zZXJ2aWNlX3dvcmtlcl9pbmRleCkge1xyXG5cdFx0XHRcdGxldCBsID0gMTtcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2UucGFydHMubGVuZ3RoOyBpICs9IDEpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHBhcnQgPSBwYWdlLnBhcnRzW2ldO1xyXG5cdFx0XHRcdFx0aWYgKCFwYXJ0KSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0XHRwcm9wc1tgbGV2ZWwke2wrK31gXSA9IHtcclxuXHRcdFx0XHRcdFx0Y29tcG9uZW50OiBwYXJ0LmNvbXBvbmVudCxcclxuXHRcdFx0XHRcdFx0cHJvcHM6IHByZWxvYWRlZFtpICsgMV0gfHwge30sXHJcblx0XHRcdFx0XHRcdHNlZ21lbnQ6IHNlZ21lbnRzW2ldXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29uc3QgeyBodG1sLCBoZWFkLCBjc3MgfSA9IEFwcC5yZW5kZXIocHJvcHMpO1xyXG5cclxuXHRcdFx0Y29uc3Qgc2VyaWFsaXplZCA9IHtcclxuXHRcdFx0XHRwcmVsb2FkZWQ6IGBbJHtwcmVsb2FkZWQubWFwKGRhdGEgPT4gdHJ5X3NlcmlhbGl6ZShkYXRhKSkuam9pbignLCcpfV1gLFxyXG5cdFx0XHRcdHNlc3Npb246IHNlc3Npb24gJiYgdHJ5X3NlcmlhbGl6ZShzZXNzaW9uLCBlcnIgPT4ge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gc2VyaWFsaXplIHNlc3Npb24gZGF0YTogJHtlcnIubWVzc2FnZX1gKTtcclxuXHRcdFx0XHR9KSxcclxuXHRcdFx0XHRlcnJvcjogZXJyb3IgJiYgdHJ5X3NlcmlhbGl6ZShwcm9wcy5lcnJvcilcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGxldCBzY3JpcHQgPSBgX19TQVBQRVJfXz17JHtbXHJcblx0XHRcdFx0ZXJyb3IgJiYgYGVycm9yOiR7c2VyaWFsaXplZC5lcnJvcn0sc3RhdHVzOiR7c3RhdHVzfWAsXHJcblx0XHRcdFx0YGJhc2VVcmw6XCIke3JlcS5iYXNlVXJsfVwiYCxcclxuXHRcdFx0XHRzZXJpYWxpemVkLnByZWxvYWRlZCAmJiBgcHJlbG9hZGVkOiR7c2VyaWFsaXplZC5wcmVsb2FkZWR9YCxcclxuXHRcdFx0XHRzZXJpYWxpemVkLnNlc3Npb24gJiYgYHNlc3Npb246JHtzZXJpYWxpemVkLnNlc3Npb259YFxyXG5cdFx0XHRdLmZpbHRlcihCb29sZWFuKS5qb2luKCcsJyl9fTtgO1xyXG5cclxuXHRcdFx0aWYgKGhhc19zZXJ2aWNlX3dvcmtlcikge1xyXG5cdFx0XHRcdHNjcmlwdCArPSBgaWYoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvciluYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcignJHtyZXEuYmFzZVVybH0vc2VydmljZS13b3JrZXIuanMnKTtgO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zdCBmaWxlID0gW10uY29uY2F0KGJ1aWxkX2luZm8uYXNzZXRzLm1haW4pLmZpbHRlcihmaWxlID0+IGZpbGUgJiYgL1xcLmpzJC8udGVzdChmaWxlKSlbMF07XHJcblx0XHRcdGNvbnN0IG1haW4gPSBgJHtyZXEuYmFzZVVybH0vY2xpZW50LyR7ZmlsZX1gO1xyXG5cclxuXHRcdFx0aWYgKGJ1aWxkX2luZm8uYnVuZGxlciA9PT0gJ3JvbGx1cCcpIHtcclxuXHRcdFx0XHRpZiAoYnVpbGRfaW5mby5sZWdhY3lfYXNzZXRzKSB7XHJcblx0XHRcdFx0XHRjb25zdCBsZWdhY3lfbWFpbiA9IGAke3JlcS5iYXNlVXJsfS9jbGllbnQvbGVnYWN5LyR7YnVpbGRfaW5mby5sZWdhY3lfYXNzZXRzLm1haW59YDtcclxuXHRcdFx0XHRcdHNjcmlwdCArPSBgKGZ1bmN0aW9uKCl7dHJ5e2V2YWwoXCJhc3luYyBmdW5jdGlvbiB4KCl7fVwiKTt2YXIgbWFpbj1cIiR7bWFpbn1cIn1jYXRjaChlKXttYWluPVwiJHtsZWdhY3lfbWFpbn1cIn07dmFyIHM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTt0cnl7bmV3IEZ1bmN0aW9uKFwiaWYoMClpbXBvcnQoJycpXCIpKCk7cy5zcmM9bWFpbjtzLnR5cGU9XCJtb2R1bGVcIjtzLmNyb3NzT3JpZ2luPVwidXNlLWNyZWRlbnRpYWxzXCI7fWNhdGNoKGUpe3Muc3JjPVwiJHtyZXEuYmFzZVVybH0vY2xpZW50L3NoaW1wb3J0QCR7YnVpbGRfaW5mby5zaGltcG9ydH0uanNcIjtzLnNldEF0dHJpYnV0ZShcImRhdGEtbWFpblwiLG1haW4pO31kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHMpO30oKSk7YDtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c2NyaXB0ICs9IGB2YXIgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO3RyeXtuZXcgRnVuY3Rpb24oXCJpZigwKWltcG9ydCgnJylcIikoKTtzLnNyYz1cIiR7bWFpbn1cIjtzLnR5cGU9XCJtb2R1bGVcIjtzLmNyb3NzT3JpZ2luPVwidXNlLWNyZWRlbnRpYWxzXCI7fWNhdGNoKGUpe3Muc3JjPVwiJHtyZXEuYmFzZVVybH0vY2xpZW50L3NoaW1wb3J0QCR7YnVpbGRfaW5mby5zaGltcG9ydH0uanNcIjtzLnNldEF0dHJpYnV0ZShcImRhdGEtbWFpblwiLFwiJHttYWlufVwiKX1kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHMpYDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2NyaXB0ICs9IGA8L3NjcmlwdD48c2NyaXB0IHNyYz1cIiR7bWFpbn1cIj5gO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgc3R5bGVzO1xyXG5cclxuXHRcdFx0Ly8gVE9ETyBtYWtlIHRoaXMgY29uc2lzdGVudCBhY3Jvc3MgYXBwc1xyXG5cdFx0XHQvLyBUT0RPIGVtYmVkIGJ1aWxkX2luZm8gaW4gcGxhY2Vob2xkZXIudHNcclxuXHRcdFx0aWYgKGJ1aWxkX2luZm8uY3NzICYmIGJ1aWxkX2luZm8uY3NzLm1haW4pIHtcclxuXHRcdFx0XHRjb25zdCBjc3NfY2h1bmtzID0gbmV3IFNldCgpO1xyXG5cdFx0XHRcdGlmIChidWlsZF9pbmZvLmNzcy5tYWluKSBjc3NfY2h1bmtzLmFkZChidWlsZF9pbmZvLmNzcy5tYWluKTtcclxuXHRcdFx0XHRwYWdlLnBhcnRzLmZvckVhY2gocGFydCA9PiB7XHJcblx0XHRcdFx0XHRpZiAoIXBhcnQpIHJldHVybjtcclxuXHRcdFx0XHRcdGNvbnN0IGNzc19jaHVua3NfZm9yX3BhcnQgPSBidWlsZF9pbmZvLmNzcy5jaHVua3NbcGFydC5maWxlXTtcclxuXHJcblx0XHRcdFx0XHRpZiAoY3NzX2NodW5rc19mb3JfcGFydCkge1xyXG5cdFx0XHRcdFx0XHRjc3NfY2h1bmtzX2Zvcl9wYXJ0LmZvckVhY2goZmlsZSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0Y3NzX2NodW5rcy5hZGQoZmlsZSk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRzdHlsZXMgPSBBcnJheS5mcm9tKGNzc19jaHVua3MpXHJcblx0XHRcdFx0XHQubWFwKGhyZWYgPT4gYDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiY2xpZW50LyR7aHJlZn1cIj5gKVxyXG5cdFx0XHRcdFx0LmpvaW4oJycpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHN0eWxlcyA9IChjc3MgJiYgY3NzLmNvZGUgPyBgPHN0eWxlPiR7Y3NzLmNvZGV9PC9zdHlsZT5gIDogJycpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyB1c2VycyBjYW4gc2V0IGEgQ1NQIG5vbmNlIHVzaW5nIHJlcy5sb2NhbHMubm9uY2VcclxuXHRcdFx0Y29uc3Qgbm9uY2VfYXR0ciA9IChyZXMubG9jYWxzICYmIHJlcy5sb2NhbHMubm9uY2UpID8gYCBub25jZT1cIiR7cmVzLmxvY2Fscy5ub25jZX1cImAgOiAnJztcclxuXHJcblx0XHRcdGNvbnN0IGJvZHkgPSB0ZW1wbGF0ZSgpXHJcblx0XHRcdFx0LnJlcGxhY2UoJyVzYXBwZXIuYmFzZSUnLCAoKSA9PiBgPGJhc2UgaHJlZj1cIiR7cmVxLmJhc2VVcmx9L1wiPmApXHJcblx0XHRcdFx0LnJlcGxhY2UoJyVzYXBwZXIuc2NyaXB0cyUnLCAoKSA9PiBgPHNjcmlwdCR7bm9uY2VfYXR0cn0+JHtzY3JpcHR9PC9zY3JpcHQ+YClcclxuXHRcdFx0XHQucmVwbGFjZSgnJXNhcHBlci5odG1sJScsICgpID0+IGh0bWwpXHJcblx0XHRcdFx0LnJlcGxhY2UoJyVzYXBwZXIuaGVhZCUnLCAoKSA9PiBgPG5vc2NyaXB0IGlkPSdzYXBwZXItaGVhZC1zdGFydCc+PC9ub3NjcmlwdD4ke2hlYWR9PG5vc2NyaXB0IGlkPSdzYXBwZXItaGVhZC1lbmQnPjwvbm9zY3JpcHQ+YClcclxuXHRcdFx0XHQucmVwbGFjZSgnJXNhcHBlci5zdHlsZXMlJywgKCkgPT4gc3R5bGVzKTtcclxuXHJcblx0XHRcdHJlcy5zdGF0dXNDb2RlID0gc3RhdHVzO1xyXG5cdFx0XHRyZXMuZW5kKGJvZHkpO1xyXG5cdFx0fSBjYXRjaChlcnIpIHtcclxuXHRcdFx0aWYgKGVycm9yKSB7XHJcblx0XHRcdFx0YmFpbChyZXEsIHJlcywgZXJyKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRoYW5kbGVfZXJyb3IocmVxLCByZXMsIDUwMCwgZXJyKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIGZpbmRfcm91dGUocmVxLCByZXMsIG5leHQpIHtcclxuXHRcdGlmIChyZXEucGF0aCA9PT0gJy9zZXJ2aWNlLXdvcmtlci1pbmRleC5odG1sJykge1xyXG5cdFx0XHRjb25zdCBob21lUGFnZSA9IHBhZ2VzLmZpbmQocGFnZSA9PiBwYWdlLnBhdHRlcm4udGVzdCgnLycpKTtcclxuXHRcdFx0aGFuZGxlX3BhZ2UoaG9tZVBhZ2UsIHJlcSwgcmVzKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xyXG5cdFx0XHRpZiAocGFnZS5wYXR0ZXJuLnRlc3QocmVxLnBhdGgpKSB7XHJcblx0XHRcdFx0aGFuZGxlX3BhZ2UocGFnZSwgcmVxLCByZXMpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGhhbmRsZV9lcnJvcihyZXEsIHJlcywgNDA0LCAnTm90IGZvdW5kJyk7XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZF90ZW1wbGF0ZShkaXIgPSBidWlsZF9kaXIpIHtcclxuXHRyZXR1cm4gZnMucmVhZEZpbGVTeW5jKGAke2Rpcn0vdGVtcGxhdGUuaHRtbGAsICd1dGYtOCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0cnlfc2VyaWFsaXplKGRhdGEsIGZhaWwpIHtcclxuXHR0cnkge1xyXG5cdFx0cmV0dXJuIGRldmFsdWUoZGF0YSk7XHJcblx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRpZiAoZmFpbCkgZmFpbChlcnIpO1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBlc2NhcGVfaHRtbChodG1sKSB7XHJcblx0Y29uc3QgY2hhcnMgPSB7XHJcblx0XHQnXCInIDogJ3F1b3QnLFxyXG5cdFx0XCInXCI6ICcjMzknLFxyXG5cdFx0JyYnOiAnYW1wJyxcclxuXHRcdCc8JyA6ICdsdCcsXHJcblx0XHQnPicgOiAnZ3QnXHJcblx0fTtcclxuXHJcblx0cmV0dXJuIGh0bWwucmVwbGFjZSgvW1wiJyY8Pl0vZywgYyA9PiBgJiR7Y2hhcnNbY119O2ApO1xyXG59XHJcblxyXG52YXIgbWltZV9yYXcgPSBcImFwcGxpY2F0aW9uL2FuZHJldy1pbnNldFxcdFxcdFxcdGV6XFxuYXBwbGljYXRpb24vYXBwbGl4d2FyZVxcdFxcdFxcdFxcdGF3XFxuYXBwbGljYXRpb24vYXRvbSt4bWxcXHRcXHRcXHRcXHRhdG9tXFxuYXBwbGljYXRpb24vYXRvbWNhdCt4bWxcXHRcXHRcXHRcXHRhdG9tY2F0XFxuYXBwbGljYXRpb24vYXRvbXN2Yyt4bWxcXHRcXHRcXHRcXHRhdG9tc3ZjXFxuYXBwbGljYXRpb24vY2N4bWwreG1sXFx0XFx0XFx0XFx0Y2N4bWxcXG5hcHBsaWNhdGlvbi9jZG1pLWNhcGFiaWxpdHlcXHRcXHRcXHRjZG1pYVxcbmFwcGxpY2F0aW9uL2NkbWktY29udGFpbmVyXFx0XFx0XFx0Y2RtaWNcXG5hcHBsaWNhdGlvbi9jZG1pLWRvbWFpblxcdFxcdFxcdFxcdGNkbWlkXFxuYXBwbGljYXRpb24vY2RtaS1vYmplY3RcXHRcXHRcXHRcXHRjZG1pb1xcbmFwcGxpY2F0aW9uL2NkbWktcXVldWVcXHRcXHRcXHRcXHRjZG1pcVxcbmFwcGxpY2F0aW9uL2N1LXNlZW1lXFx0XFx0XFx0XFx0Y3VcXG5hcHBsaWNhdGlvbi9kYXZtb3VudCt4bWxcXHRcXHRcXHRkYXZtb3VudFxcbmFwcGxpY2F0aW9uL2RvY2Jvb2sreG1sXFx0XFx0XFx0XFx0ZGJrXFxuYXBwbGljYXRpb24vZHNzYytkZXJcXHRcXHRcXHRcXHRkc3NjXFxuYXBwbGljYXRpb24vZHNzYyt4bWxcXHRcXHRcXHRcXHR4ZHNzY1xcbmFwcGxpY2F0aW9uL2VjbWFzY3JpcHRcXHRcXHRcXHRcXHRlY21hXFxuYXBwbGljYXRpb24vZW1tYSt4bWxcXHRcXHRcXHRcXHRlbW1hXFxuYXBwbGljYXRpb24vZXB1Yit6aXBcXHRcXHRcXHRcXHRlcHViXFxuYXBwbGljYXRpb24vZXhpXFx0XFx0XFx0XFx0XFx0ZXhpXFxuYXBwbGljYXRpb24vZm9udC10ZHBmclxcdFxcdFxcdFxcdHBmclxcbmFwcGxpY2F0aW9uL2dtbCt4bWxcXHRcXHRcXHRcXHRnbWxcXG5hcHBsaWNhdGlvbi9ncHgreG1sXFx0XFx0XFx0XFx0Z3B4XFxuYXBwbGljYXRpb24vZ3hmXFx0XFx0XFx0XFx0XFx0Z3hmXFxuYXBwbGljYXRpb24vaHlwZXJzdHVkaW9cXHRcXHRcXHRcXHRzdGtcXG5hcHBsaWNhdGlvbi9pbmttbCt4bWxcXHRcXHRcXHRcXHRpbmsgaW5rbWxcXG5hcHBsaWNhdGlvbi9pcGZpeFxcdFxcdFxcdFxcdGlwZml4XFxuYXBwbGljYXRpb24vamF2YS1hcmNoaXZlXFx0XFx0XFx0amFyXFxuYXBwbGljYXRpb24vamF2YS1zZXJpYWxpemVkLW9iamVjdFxcdFxcdHNlclxcbmFwcGxpY2F0aW9uL2phdmEtdm1cXHRcXHRcXHRcXHRjbGFzc1xcbmFwcGxpY2F0aW9uL2phdmFzY3JpcHRcXHRcXHRcXHRcXHRqc1xcbmFwcGxpY2F0aW9uL2pzb25cXHRcXHRcXHRcXHRqc29uIG1hcFxcbmFwcGxpY2F0aW9uL2pzb25tbCtqc29uXFx0XFx0XFx0XFx0anNvbm1sXFxuYXBwbGljYXRpb24vbG9zdCt4bWxcXHRcXHRcXHRcXHRsb3N0eG1sXFxuYXBwbGljYXRpb24vbWFjLWJpbmhleDQwXFx0XFx0XFx0aHF4XFxuYXBwbGljYXRpb24vbWFjLWNvbXBhY3Rwcm9cXHRcXHRcXHRjcHRcXG5hcHBsaWNhdGlvbi9tYWRzK3htbFxcdFxcdFxcdFxcdG1hZHNcXG5hcHBsaWNhdGlvbi9tYXJjXFx0XFx0XFx0XFx0bXJjXFxuYXBwbGljYXRpb24vbWFyY3htbCt4bWxcXHRcXHRcXHRcXHRtcmN4XFxuYXBwbGljYXRpb24vbWF0aGVtYXRpY2FcXHRcXHRcXHRcXHRtYSBuYiBtYlxcbmFwcGxpY2F0aW9uL21hdGhtbCt4bWxcXHRcXHRcXHRcXHRtYXRobWxcXG5hcHBsaWNhdGlvbi9tYm94XFx0XFx0XFx0XFx0bWJveFxcbmFwcGxpY2F0aW9uL21lZGlhc2VydmVyY29udHJvbCt4bWxcXHRcXHRtc2NtbFxcbmFwcGxpY2F0aW9uL21ldGFsaW5rK3htbFxcdFxcdFxcdG1ldGFsaW5rXFxuYXBwbGljYXRpb24vbWV0YWxpbms0K3htbFxcdFxcdFxcdG1ldGE0XFxuYXBwbGljYXRpb24vbWV0cyt4bWxcXHRcXHRcXHRcXHRtZXRzXFxuYXBwbGljYXRpb24vbW9kcyt4bWxcXHRcXHRcXHRcXHRtb2RzXFxuYXBwbGljYXRpb24vbXAyMVxcdFxcdFxcdFxcdG0yMSBtcDIxXFxuYXBwbGljYXRpb24vbXA0XFx0XFx0XFx0XFx0XFx0bXA0c1xcbmFwcGxpY2F0aW9uL21zd29yZFxcdFxcdFxcdFxcdGRvYyBkb3RcXG5hcHBsaWNhdGlvbi9teGZcXHRcXHRcXHRcXHRcXHRteGZcXG5hcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cXHRiaW4gZG1zIGxyZiBtYXIgc28gZGlzdCBkaXN0eiBwa2cgYnBrIGR1bXAgZWxjIGRlcGxveVxcbmFwcGxpY2F0aW9uL29kYVxcdFxcdFxcdFxcdFxcdG9kYVxcbmFwcGxpY2F0aW9uL29lYnBzLXBhY2thZ2UreG1sXFx0XFx0XFx0b3BmXFxuYXBwbGljYXRpb24vb2dnXFx0XFx0XFx0XFx0XFx0b2d4XFxuYXBwbGljYXRpb24vb21kb2MreG1sXFx0XFx0XFx0XFx0b21kb2NcXG5hcHBsaWNhdGlvbi9vbmVub3RlXFx0XFx0XFx0XFx0b25ldG9jIG9uZXRvYzIgb25ldG1wIG9uZXBrZ1xcbmFwcGxpY2F0aW9uL294cHNcXHRcXHRcXHRcXHRveHBzXFxuYXBwbGljYXRpb24vcGF0Y2gtb3BzLWVycm9yK3htbFxcdFxcdFxcdHhlclxcbmFwcGxpY2F0aW9uL3BkZlxcdFxcdFxcdFxcdFxcdHBkZlxcbmFwcGxpY2F0aW9uL3BncC1lbmNyeXB0ZWRcXHRcXHRcXHRwZ3BcXG5hcHBsaWNhdGlvbi9wZ3Atc2lnbmF0dXJlXFx0XFx0XFx0YXNjIHNpZ1xcbmFwcGxpY2F0aW9uL3BpY3MtcnVsZXNcXHRcXHRcXHRcXHRwcmZcXG5hcHBsaWNhdGlvbi9wa2NzMTBcXHRcXHRcXHRcXHRwMTBcXG5hcHBsaWNhdGlvbi9wa2NzNy1taW1lXFx0XFx0XFx0XFx0cDdtIHA3Y1xcbmFwcGxpY2F0aW9uL3BrY3M3LXNpZ25hdHVyZVxcdFxcdFxcdHA3c1xcbmFwcGxpY2F0aW9uL3BrY3M4XFx0XFx0XFx0XFx0cDhcXG5hcHBsaWNhdGlvbi9wa2l4LWF0dHItY2VydFxcdFxcdFxcdGFjXFxuYXBwbGljYXRpb24vcGtpeC1jZXJ0XFx0XFx0XFx0XFx0Y2VyXFxuYXBwbGljYXRpb24vcGtpeC1jcmxcXHRcXHRcXHRcXHRjcmxcXG5hcHBsaWNhdGlvbi9wa2l4LXBraXBhdGhcXHRcXHRcXHRwa2lwYXRoXFxuYXBwbGljYXRpb24vcGtpeGNtcFxcdFxcdFxcdFxcdHBraVxcbmFwcGxpY2F0aW9uL3Bscyt4bWxcXHRcXHRcXHRcXHRwbHNcXG5hcHBsaWNhdGlvbi9wb3N0c2NyaXB0XFx0XFx0XFx0XFx0YWkgZXBzIHBzXFxuYXBwbGljYXRpb24vcHJzLmN3d1xcdFxcdFxcdFxcdGN3d1xcbmFwcGxpY2F0aW9uL3Bza2MreG1sXFx0XFx0XFx0XFx0cHNrY3htbFxcbmFwcGxpY2F0aW9uL3JkZit4bWxcXHRcXHRcXHRcXHRyZGZcXG5hcHBsaWNhdGlvbi9yZWdpbmZvK3htbFxcdFxcdFxcdFxcdHJpZlxcbmFwcGxpY2F0aW9uL3JlbGF4LW5nLWNvbXBhY3Qtc3ludGF4XFx0XFx0cm5jXFxuYXBwbGljYXRpb24vcmVzb3VyY2UtbGlzdHMreG1sXFx0XFx0XFx0cmxcXG5hcHBsaWNhdGlvbi9yZXNvdXJjZS1saXN0cy1kaWZmK3htbFxcdFxcdHJsZFxcbmFwcGxpY2F0aW9uL3Jscy1zZXJ2aWNlcyt4bWxcXHRcXHRcXHRyc1xcbmFwcGxpY2F0aW9uL3Jwa2ktZ2hvc3RidXN0ZXJzXFx0XFx0XFx0Z2JyXFxuYXBwbGljYXRpb24vcnBraS1tYW5pZmVzdFxcdFxcdFxcdG1mdFxcbmFwcGxpY2F0aW9uL3Jwa2ktcm9hXFx0XFx0XFx0XFx0cm9hXFxuYXBwbGljYXRpb24vcnNkK3htbFxcdFxcdFxcdFxcdHJzZFxcbmFwcGxpY2F0aW9uL3Jzcyt4bWxcXHRcXHRcXHRcXHRyc3NcXG5hcHBsaWNhdGlvbi9ydGZcXHRcXHRcXHRcXHRcXHRydGZcXG5hcHBsaWNhdGlvbi9zYm1sK3htbFxcdFxcdFxcdFxcdHNibWxcXG5hcHBsaWNhdGlvbi9zY3ZwLWN2LXJlcXVlc3RcXHRcXHRcXHRzY3FcXG5hcHBsaWNhdGlvbi9zY3ZwLWN2LXJlc3BvbnNlXFx0XFx0XFx0c2NzXFxuYXBwbGljYXRpb24vc2N2cC12cC1yZXF1ZXN0XFx0XFx0XFx0c3BxXFxuYXBwbGljYXRpb24vc2N2cC12cC1yZXNwb25zZVxcdFxcdFxcdHNwcFxcbmFwcGxpY2F0aW9uL3NkcFxcdFxcdFxcdFxcdFxcdHNkcFxcbmFwcGxpY2F0aW9uL3NldC1wYXltZW50LWluaXRpYXRpb25cXHRcXHRzZXRwYXlcXG5hcHBsaWNhdGlvbi9zZXQtcmVnaXN0cmF0aW9uLWluaXRpYXRpb25cXHRcXHRzZXRyZWdcXG5hcHBsaWNhdGlvbi9zaGYreG1sXFx0XFx0XFx0XFx0c2hmXFxuYXBwbGljYXRpb24vc21pbCt4bWxcXHRcXHRcXHRcXHRzbWkgc21pbFxcbmFwcGxpY2F0aW9uL3NwYXJxbC1xdWVyeVxcdFxcdFxcdHJxXFxuYXBwbGljYXRpb24vc3BhcnFsLXJlc3VsdHMreG1sXFx0XFx0XFx0c3J4XFxuYXBwbGljYXRpb24vc3Jnc1xcdFxcdFxcdFxcdGdyYW1cXG5hcHBsaWNhdGlvbi9zcmdzK3htbFxcdFxcdFxcdFxcdGdyeG1sXFxuYXBwbGljYXRpb24vc3J1K3htbFxcdFxcdFxcdFxcdHNydVxcbmFwcGxpY2F0aW9uL3NzZGwreG1sXFx0XFx0XFx0XFx0c3NkbFxcbmFwcGxpY2F0aW9uL3NzbWwreG1sXFx0XFx0XFx0XFx0c3NtbFxcbmFwcGxpY2F0aW9uL3RlaSt4bWxcXHRcXHRcXHRcXHR0ZWkgdGVpY29ycHVzXFxuYXBwbGljYXRpb24vdGhyYXVkK3htbFxcdFxcdFxcdFxcdHRmaVxcbmFwcGxpY2F0aW9uL3RpbWVzdGFtcGVkLWRhdGFcXHRcXHRcXHR0c2RcXG5hcHBsaWNhdGlvbi92bmQuM2dwcC5waWMtYnctbGFyZ2VcXHRcXHRwbGJcXG5hcHBsaWNhdGlvbi92bmQuM2dwcC5waWMtYnctc21hbGxcXHRcXHRwc2JcXG5hcHBsaWNhdGlvbi92bmQuM2dwcC5waWMtYnctdmFyXFx0XFx0XFx0cHZiXFxuYXBwbGljYXRpb24vdm5kLjNncHAyLnRjYXBcXHRcXHRcXHR0Y2FwXFxuYXBwbGljYXRpb24vdm5kLjNtLnBvc3QtaXQtbm90ZXNcXHRcXHRwd25cXG5hcHBsaWNhdGlvbi92bmQuYWNjcGFjLnNpbXBseS5hc29cXHRcXHRhc29cXG5hcHBsaWNhdGlvbi92bmQuYWNjcGFjLnNpbXBseS5pbXBcXHRcXHRpbXBcXG5hcHBsaWNhdGlvbi92bmQuYWN1Y29ib2xcXHRcXHRcXHRhY3VcXG5hcHBsaWNhdGlvbi92bmQuYWN1Y29ycFxcdFxcdFxcdFxcdGF0YyBhY3V0Y1xcbmFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5haXItYXBwbGljYXRpb24taW5zdGFsbGVyLXBhY2thZ2UremlwXFx0YWlyXFxuYXBwbGljYXRpb24vdm5kLmFkb2JlLmZvcm1zY2VudHJhbC5mY2R0XFx0XFx0ZmNkdFxcbmFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5meHBcXHRcXHRcXHRmeHAgZnhwbFxcbmFwcGxpY2F0aW9uL3ZuZC5hZG9iZS54ZHAreG1sXFx0XFx0XFx0eGRwXFxuYXBwbGljYXRpb24vdm5kLmFkb2JlLnhmZGZcXHRcXHRcXHR4ZmRmXFxuYXBwbGljYXRpb24vdm5kLmFoZWFkLnNwYWNlXFx0XFx0XFx0YWhlYWRcXG5hcHBsaWNhdGlvbi92bmQuYWlyemlwLmZpbGVzZWN1cmUuYXpmXFx0XFx0YXpmXFxuYXBwbGljYXRpb24vdm5kLmFpcnppcC5maWxlc2VjdXJlLmF6c1xcdFxcdGF6c1xcbmFwcGxpY2F0aW9uL3ZuZC5hbWF6b24uZWJvb2tcXHRcXHRcXHRhendcXG5hcHBsaWNhdGlvbi92bmQuYW1lcmljYW5keW5hbWljcy5hY2NcXHRcXHRhY2NcXG5hcHBsaWNhdGlvbi92bmQuYW1pZ2EuYW1pXFx0XFx0XFx0YW1pXFxuYXBwbGljYXRpb24vdm5kLmFuZHJvaWQucGFja2FnZS1hcmNoaXZlXFx0XFx0YXBrXFxuYXBwbGljYXRpb24vdm5kLmFuc2VyLXdlYi1jZXJ0aWZpY2F0ZS1pc3N1ZS1pbml0aWF0aW9uXFx0Y2lpXFxuYXBwbGljYXRpb24vdm5kLmFuc2VyLXdlYi1mdW5kcy10cmFuc2Zlci1pbml0aWF0aW9uXFx0ZnRpXFxuYXBwbGljYXRpb24vdm5kLmFudGl4LmdhbWUtY29tcG9uZW50XFx0XFx0YXR4XFxuYXBwbGljYXRpb24vdm5kLmFwcGxlLmluc3RhbGxlcit4bWxcXHRcXHRtcGtnXFxuYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmxcXHRcXHRcXHRtM3U4XFxuYXBwbGljYXRpb24vdm5kLmFyaXN0YW5ldHdvcmtzLnN3aVxcdFxcdHN3aVxcbmFwcGxpY2F0aW9uL3ZuZC5hc3RyYWVhLXNvZnR3YXJlLmlvdGFcXHRcXHRpb3RhXFxuYXBwbGljYXRpb24vdm5kLmF1ZGlvZ3JhcGhcXHRcXHRcXHRhZXBcXG5hcHBsaWNhdGlvbi92bmQuYmx1ZWljZS5tdWx0aXBhc3NcXHRcXHRtcG1cXG5hcHBsaWNhdGlvbi92bmQuYm1pXFx0XFx0XFx0XFx0Ym1pXFxuYXBwbGljYXRpb24vdm5kLmJ1c2luZXNzb2JqZWN0c1xcdFxcdFxcdHJlcFxcbmFwcGxpY2F0aW9uL3ZuZC5jaGVtZHJhdyt4bWxcXHRcXHRcXHRjZHhtbFxcbmFwcGxpY2F0aW9uL3ZuZC5jaGlwbnV0cy5rYXJhb2tlLW1tZFxcdFxcdG1tZFxcbmFwcGxpY2F0aW9uL3ZuZC5jaW5kZXJlbGxhXFx0XFx0XFx0Y2R5XFxuYXBwbGljYXRpb24vdm5kLmNsYXltb3JlXFx0XFx0XFx0Y2xhXFxuYXBwbGljYXRpb24vdm5kLmNsb2FudG8ucnA5XFx0XFx0XFx0cnA5XFxuYXBwbGljYXRpb24vdm5kLmNsb25rLmM0Z3JvdXBcXHRcXHRcXHRjNGcgYzRkIGM0ZiBjNHAgYzR1XFxuYXBwbGljYXRpb24vdm5kLmNsdWV0cnVzdC5jYXJ0b21vYmlsZS1jb25maWdcXHRcXHRjMTFhbWNcXG5hcHBsaWNhdGlvbi92bmQuY2x1ZXRydXN0LmNhcnRvbW9iaWxlLWNvbmZpZy1wa2dcXHRjMTFhbXpcXG5hcHBsaWNhdGlvbi92bmQuY29tbW9uc3BhY2VcXHRcXHRcXHRjc3BcXG5hcHBsaWNhdGlvbi92bmQuY29udGFjdC5jbXNnXFx0XFx0XFx0Y2RiY21zZ1xcbmFwcGxpY2F0aW9uL3ZuZC5jb3Ntb2NhbGxlclxcdFxcdFxcdGNtY1xcbmFwcGxpY2F0aW9uL3ZuZC5jcmljay5jbGlja2VyXFx0XFx0XFx0Y2xreFxcbmFwcGxpY2F0aW9uL3ZuZC5jcmljay5jbGlja2VyLmtleWJvYXJkXFx0XFx0Y2xra1xcbmFwcGxpY2F0aW9uL3ZuZC5jcmljay5jbGlja2VyLnBhbGV0dGVcXHRcXHRjbGtwXFxuYXBwbGljYXRpb24vdm5kLmNyaWNrLmNsaWNrZXIudGVtcGxhdGVcXHRcXHRjbGt0XFxuYXBwbGljYXRpb24vdm5kLmNyaWNrLmNsaWNrZXIud29yZGJhbmtcXHRcXHRjbGt3XFxuYXBwbGljYXRpb24vdm5kLmNyaXRpY2FsdG9vbHMud2JzK3htbFxcdFxcdHdic1xcbmFwcGxpY2F0aW9uL3ZuZC5jdGMtcG9zbWxcXHRcXHRcXHRwbWxcXG5hcHBsaWNhdGlvbi92bmQuY3Vwcy1wcGRcXHRcXHRcXHRwcGRcXG5hcHBsaWNhdGlvbi92bmQuY3VybC5jYXJcXHRcXHRcXHRjYXJcXG5hcHBsaWNhdGlvbi92bmQuY3VybC5wY3VybFxcdFxcdFxcdHBjdXJsXFxuYXBwbGljYXRpb24vdm5kLmRhcnRcXHRcXHRcXHRcXHRkYXJ0XFxuYXBwbGljYXRpb24vdm5kLmRhdGEtdmlzaW9uLnJkelxcdFxcdFxcdHJkelxcbmFwcGxpY2F0aW9uL3ZuZC5kZWNlLmRhdGFcXHRcXHRcXHR1dmYgdXZ2ZiB1dmQgdXZ2ZFxcbmFwcGxpY2F0aW9uL3ZuZC5kZWNlLnR0bWwreG1sXFx0XFx0XFx0dXZ0IHV2dnRcXG5hcHBsaWNhdGlvbi92bmQuZGVjZS51bnNwZWNpZmllZFxcdFxcdHV2eCB1dnZ4XFxuYXBwbGljYXRpb24vdm5kLmRlY2UuemlwXFx0XFx0XFx0dXZ6IHV2dnpcXG5hcHBsaWNhdGlvbi92bmQuZGVub3ZvLmZjc2VsYXlvdXQtbGlua1xcdFxcdGZlX2xhdW5jaFxcbmFwcGxpY2F0aW9uL3ZuZC5kbmFcXHRcXHRcXHRcXHRkbmFcXG5hcHBsaWNhdGlvbi92bmQuZG9sYnkubWxwXFx0XFx0XFx0bWxwXFxuYXBwbGljYXRpb24vdm5kLmRwZ3JhcGhcXHRcXHRcXHRcXHRkcGdcXG5hcHBsaWNhdGlvbi92bmQuZHJlYW1mYWN0b3J5XFx0XFx0XFx0ZGZhY1xcbmFwcGxpY2F0aW9uL3ZuZC5kcy1rZXlwb2ludFxcdFxcdFxcdGtweHhcXG5hcHBsaWNhdGlvbi92bmQuZHZiLmFpdFxcdFxcdFxcdFxcdGFpdFxcbmFwcGxpY2F0aW9uL3ZuZC5kdmIuc2VydmljZVxcdFxcdFxcdHN2Y1xcbmFwcGxpY2F0aW9uL3ZuZC5keW5hZ2VvXFx0XFx0XFx0XFx0Z2VvXFxuYXBwbGljYXRpb24vdm5kLmVjb3dpbi5jaGFydFxcdFxcdFxcdG1hZ1xcbmFwcGxpY2F0aW9uL3ZuZC5lbmxpdmVuXFx0XFx0XFx0XFx0bm1sXFxuYXBwbGljYXRpb24vdm5kLmVwc29uLmVzZlxcdFxcdFxcdGVzZlxcbmFwcGxpY2F0aW9uL3ZuZC5lcHNvbi5tc2ZcXHRcXHRcXHRtc2ZcXG5hcHBsaWNhdGlvbi92bmQuZXBzb24ucXVpY2thbmltZVxcdFxcdHFhbVxcbmFwcGxpY2F0aW9uL3ZuZC5lcHNvbi5zYWx0XFx0XFx0XFx0c2x0XFxuYXBwbGljYXRpb24vdm5kLmVwc29uLnNzZlxcdFxcdFxcdHNzZlxcbmFwcGxpY2F0aW9uL3ZuZC5lc3ppZ25vMyt4bWxcXHRcXHRcXHRlczMgZXQzXFxuYXBwbGljYXRpb24vdm5kLmV6cGl4LWFsYnVtXFx0XFx0XFx0ZXoyXFxuYXBwbGljYXRpb24vdm5kLmV6cGl4LXBhY2thZ2VcXHRcXHRcXHRlejNcXG5hcHBsaWNhdGlvbi92bmQuZmRmXFx0XFx0XFx0XFx0ZmRmXFxuYXBwbGljYXRpb24vdm5kLmZkc24ubXNlZWRcXHRcXHRcXHRtc2VlZFxcbmFwcGxpY2F0aW9uL3ZuZC5mZHNuLnNlZWRcXHRcXHRcXHRzZWVkIGRhdGFsZXNzXFxuYXBwbGljYXRpb24vdm5kLmZsb2dyYXBoaXRcXHRcXHRcXHRncGhcXG5hcHBsaWNhdGlvbi92bmQuZmx1eHRpbWUuY2xpcFxcdFxcdFxcdGZ0Y1xcbmFwcGxpY2F0aW9uL3ZuZC5mcmFtZW1ha2VyXFx0XFx0XFx0Zm0gZnJhbWUgbWFrZXIgYm9va1xcbmFwcGxpY2F0aW9uL3ZuZC5mcm9nYW5zLmZuY1xcdFxcdFxcdGZuY1xcbmFwcGxpY2F0aW9uL3ZuZC5mcm9nYW5zLmx0ZlxcdFxcdFxcdGx0ZlxcbmFwcGxpY2F0aW9uL3ZuZC5mc2Mud2VibGF1bmNoXFx0XFx0XFx0ZnNjXFxuYXBwbGljYXRpb24vdm5kLmZ1aml0c3Uub2FzeXNcXHRcXHRcXHRvYXNcXG5hcHBsaWNhdGlvbi92bmQuZnVqaXRzdS5vYXN5czJcXHRcXHRcXHRvYTJcXG5hcHBsaWNhdGlvbi92bmQuZnVqaXRzdS5vYXN5czNcXHRcXHRcXHRvYTNcXG5hcHBsaWNhdGlvbi92bmQuZnVqaXRzdS5vYXN5c2dwXFx0XFx0XFx0Zmc1XFxuYXBwbGljYXRpb24vdm5kLmZ1aml0c3Uub2FzeXNwcnNcXHRcXHRiaDJcXG5hcHBsaWNhdGlvbi92bmQuZnVqaXhlcm94LmRkZFxcdFxcdFxcdGRkZFxcbmFwcGxpY2F0aW9uL3ZuZC5mdWppeGVyb3guZG9jdXdvcmtzXFx0XFx0eGR3XFxuYXBwbGljYXRpb24vdm5kLmZ1aml4ZXJveC5kb2N1d29ya3MuYmluZGVyXFx0eGJkXFxuYXBwbGljYXRpb24vdm5kLmZ1enp5c2hlZXRcXHRcXHRcXHRmenNcXG5hcHBsaWNhdGlvbi92bmQuZ2Vub21hdGl4LnR1eGVkb1xcdFxcdHR4ZFxcbmFwcGxpY2F0aW9uL3ZuZC5nZW9nZWJyYS5maWxlXFx0XFx0XFx0Z2diXFxuYXBwbGljYXRpb24vdm5kLmdlb2dlYnJhLnRvb2xcXHRcXHRcXHRnZ3RcXG5hcHBsaWNhdGlvbi92bmQuZ2VvbWV0cnktZXhwbG9yZXJcXHRcXHRnZXggZ3JlXFxuYXBwbGljYXRpb24vdm5kLmdlb25leHRcXHRcXHRcXHRcXHRneHRcXG5hcHBsaWNhdGlvbi92bmQuZ2VvcGxhblxcdFxcdFxcdFxcdGcyd1xcbmFwcGxpY2F0aW9uL3ZuZC5nZW9zcGFjZVxcdFxcdFxcdGczd1xcbmFwcGxpY2F0aW9uL3ZuZC5nbXhcXHRcXHRcXHRcXHRnbXhcXG5hcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWVhcnRoLmttbCt4bWxcXHRcXHRrbWxcXG5hcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWVhcnRoLmttelxcdFxcdGttelxcbmFwcGxpY2F0aW9uL3ZuZC5ncmFmZXFcXHRcXHRcXHRcXHRncWYgZ3FzXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS1hY2NvdW50XFx0XFx0XFx0Z2FjXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS1oZWxwXFx0XFx0XFx0Z2hmXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS1pZGVudGl0eS1tZXNzYWdlXFx0XFx0Z2ltXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS1pbmplY3RvclxcdFxcdFxcdGdydlxcbmFwcGxpY2F0aW9uL3ZuZC5ncm9vdmUtdG9vbC1tZXNzYWdlXFx0XFx0Z3RtXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS10b29sLXRlbXBsYXRlXFx0XFx0dHBsXFxuYXBwbGljYXRpb24vdm5kLmdyb292ZS12Y2FyZFxcdFxcdFxcdHZjZ1xcbmFwcGxpY2F0aW9uL3ZuZC5oYWwreG1sXFx0XFx0XFx0XFx0aGFsXFxuYXBwbGljYXRpb24vdm5kLmhhbmRoZWxkLWVudGVydGFpbm1lbnQreG1sXFx0em1tXFxuYXBwbGljYXRpb24vdm5kLmhiY2lcXHRcXHRcXHRcXHRoYmNpXFxuYXBwbGljYXRpb24vdm5kLmhoZS5sZXNzb24tcGxheWVyXFx0XFx0bGVzXFxuYXBwbGljYXRpb24vdm5kLmhwLWhwZ2xcXHRcXHRcXHRcXHRocGdsXFxuYXBwbGljYXRpb24vdm5kLmhwLWhwaWRcXHRcXHRcXHRcXHRocGlkXFxuYXBwbGljYXRpb24vdm5kLmhwLWhwc1xcdFxcdFxcdFxcdGhwc1xcbmFwcGxpY2F0aW9uL3ZuZC5ocC1qbHl0XFx0XFx0XFx0XFx0amx0XFxuYXBwbGljYXRpb24vdm5kLmhwLXBjbFxcdFxcdFxcdFxcdHBjbFxcbmFwcGxpY2F0aW9uL3ZuZC5ocC1wY2x4bFxcdFxcdFxcdHBjbHhsXFxuYXBwbGljYXRpb24vdm5kLmh5ZHJvc3RhdGl4LnNvZi1kYXRhXFx0XFx0c2ZkLWhkc3R4XFxuYXBwbGljYXRpb24vdm5kLmlibS5taW5pcGF5XFx0XFx0XFx0bXB5XFxuYXBwbGljYXRpb24vdm5kLmlibS5tb2RjYXBcXHRcXHRcXHRhZnAgbGlzdGFmcCBsaXN0MzgyMFxcbmFwcGxpY2F0aW9uL3ZuZC5pYm0ucmlnaHRzLW1hbmFnZW1lbnRcXHRcXHRpcm1cXG5hcHBsaWNhdGlvbi92bmQuaWJtLnNlY3VyZS1jb250YWluZXJcXHRcXHRzY1xcbmFwcGxpY2F0aW9uL3ZuZC5pY2Nwcm9maWxlXFx0XFx0XFx0aWNjIGljbVxcbmFwcGxpY2F0aW9uL3ZuZC5pZ2xvYWRlclxcdFxcdFxcdGlnbFxcbmFwcGxpY2F0aW9uL3ZuZC5pbW1lcnZpc2lvbi1pdnBcXHRcXHRcXHRpdnBcXG5hcHBsaWNhdGlvbi92bmQuaW1tZXJ2aXNpb24taXZ1XFx0XFx0XFx0aXZ1XFxuYXBwbGljYXRpb24vdm5kLmluc29ycy5pZ21cXHRcXHRcXHRpZ21cXG5hcHBsaWNhdGlvbi92bmQuaW50ZXJjb24uZm9ybW5ldFxcdFxcdHhwdyB4cHhcXG5hcHBsaWNhdGlvbi92bmQuaW50ZXJnZW9cXHRcXHRcXHRpMmdcXG5hcHBsaWNhdGlvbi92bmQuaW50dS5xYm9cXHRcXHRcXHRxYm9cXG5hcHBsaWNhdGlvbi92bmQuaW50dS5xZnhcXHRcXHRcXHRxZnhcXG5hcHBsaWNhdGlvbi92bmQuaXB1bnBsdWdnZWQucmNwcm9maWxlXFx0XFx0cmNwcm9maWxlXFxuYXBwbGljYXRpb24vdm5kLmlyZXBvc2l0b3J5LnBhY2thZ2UreG1sXFx0XFx0aXJwXFxuYXBwbGljYXRpb24vdm5kLmlzLXhwclxcdFxcdFxcdFxcdHhwclxcbmFwcGxpY2F0aW9uL3ZuZC5pc2FjLmZjc1xcdFxcdFxcdGZjc1xcbmFwcGxpY2F0aW9uL3ZuZC5qYW1cXHRcXHRcXHRcXHRqYW1cXG5hcHBsaWNhdGlvbi92bmQuamNwLmphdmFtZS5taWRsZXQtcm1zXFx0XFx0cm1zXFxuYXBwbGljYXRpb24vdm5kLmppc3BcXHRcXHRcXHRcXHRqaXNwXFxuYXBwbGljYXRpb24vdm5kLmpvb3N0LmpvZGEtYXJjaGl2ZVxcdFxcdGpvZGFcXG5hcHBsaWNhdGlvbi92bmQua2Fob290elxcdFxcdFxcdFxcdGt0eiBrdHJcXG5hcHBsaWNhdGlvbi92bmQua2RlLmthcmJvblxcdFxcdFxcdGthcmJvblxcbmFwcGxpY2F0aW9uL3ZuZC5rZGUua2NoYXJ0XFx0XFx0XFx0Y2hydFxcbmFwcGxpY2F0aW9uL3ZuZC5rZGUua2Zvcm11bGFcXHRcXHRcXHRrZm9cXG5hcHBsaWNhdGlvbi92bmQua2RlLmtpdmlvXFx0XFx0XFx0Zmx3XFxuYXBwbGljYXRpb24vdm5kLmtkZS5rb250b3VyXFx0XFx0XFx0a29uXFxuYXBwbGljYXRpb24vdm5kLmtkZS5rcHJlc2VudGVyXFx0XFx0XFx0a3ByIGtwdFxcbmFwcGxpY2F0aW9uL3ZuZC5rZGUua3NwcmVhZFxcdFxcdFxcdGtzcFxcbmFwcGxpY2F0aW9uL3ZuZC5rZGUua3dvcmRcXHRcXHRcXHRrd2Qga3d0XFxuYXBwbGljYXRpb24vdm5kLmtlbmFtZWFhcHBcXHRcXHRcXHRodGtlXFxuYXBwbGljYXRpb24vdm5kLmtpZHNwaXJhdGlvblxcdFxcdFxcdGtpYVxcbmFwcGxpY2F0aW9uL3ZuZC5raW5hclxcdFxcdFxcdFxcdGtuZSBrbnBcXG5hcHBsaWNhdGlvbi92bmQua29hblxcdFxcdFxcdFxcdHNrcCBza2Qgc2t0IHNrbVxcbmFwcGxpY2F0aW9uL3ZuZC5rb2Rhay1kZXNjcmlwdG9yXFx0XFx0c3NlXFxuYXBwbGljYXRpb24vdm5kLmxhcy5sYXMreG1sXFx0XFx0XFx0bGFzeG1sXFxuYXBwbGljYXRpb24vdm5kLmxsYW1hZ3JhcGhpY3MubGlmZS1iYWxhbmNlLmRlc2t0b3BcXHRsYmRcXG5hcHBsaWNhdGlvbi92bmQubGxhbWFncmFwaGljcy5saWZlLWJhbGFuY2UuZXhjaGFuZ2UreG1sXFx0bGJlXFxuYXBwbGljYXRpb24vdm5kLmxvdHVzLTEtMi0zXFx0XFx0XFx0MTIzXFxuYXBwbGljYXRpb24vdm5kLmxvdHVzLWFwcHJvYWNoXFx0XFx0XFx0YXByXFxuYXBwbGljYXRpb24vdm5kLmxvdHVzLWZyZWVsYW5jZVxcdFxcdFxcdHByZVxcbmFwcGxpY2F0aW9uL3ZuZC5sb3R1cy1ub3Rlc1xcdFxcdFxcdG5zZlxcbmFwcGxpY2F0aW9uL3ZuZC5sb3R1cy1vcmdhbml6ZXJcXHRcXHRcXHRvcmdcXG5hcHBsaWNhdGlvbi92bmQubG90dXMtc2NyZWVuY2FtXFx0XFx0XFx0c2NtXFxuYXBwbGljYXRpb24vdm5kLmxvdHVzLXdvcmRwcm9cXHRcXHRcXHRsd3BcXG5hcHBsaWNhdGlvbi92bmQubWFjcG9ydHMucG9ydHBrZ1xcdFxcdHBvcnRwa2dcXG5hcHBsaWNhdGlvbi92bmQubWNkXFx0XFx0XFx0XFx0bWNkXFxuYXBwbGljYXRpb24vdm5kLm1lZGNhbGNkYXRhXFx0XFx0XFx0bWMxXFxuYXBwbGljYXRpb24vdm5kLm1lZGlhc3RhdGlvbi5jZGtleVxcdFxcdGNka2V5XFxuYXBwbGljYXRpb24vdm5kLm1mZXJcXHRcXHRcXHRcXHRtd2ZcXG5hcHBsaWNhdGlvbi92bmQubWZtcFxcdFxcdFxcdFxcdG1mbVxcbmFwcGxpY2F0aW9uL3ZuZC5taWNyb2dyYWZ4LmZsb1xcdFxcdFxcdGZsb1xcbmFwcGxpY2F0aW9uL3ZuZC5taWNyb2dyYWZ4LmlneFxcdFxcdFxcdGlneFxcbmFwcGxpY2F0aW9uL3ZuZC5taWZcXHRcXHRcXHRcXHRtaWZcXG5hcHBsaWNhdGlvbi92bmQubW9iaXVzLmRhZlxcdFxcdFxcdGRhZlxcbmFwcGxpY2F0aW9uL3ZuZC5tb2JpdXMuZGlzXFx0XFx0XFx0ZGlzXFxuYXBwbGljYXRpb24vdm5kLm1vYml1cy5tYmtcXHRcXHRcXHRtYmtcXG5hcHBsaWNhdGlvbi92bmQubW9iaXVzLm1xeVxcdFxcdFxcdG1xeVxcbmFwcGxpY2F0aW9uL3ZuZC5tb2JpdXMubXNsXFx0XFx0XFx0bXNsXFxuYXBwbGljYXRpb24vdm5kLm1vYml1cy5wbGNcXHRcXHRcXHRwbGNcXG5hcHBsaWNhdGlvbi92bmQubW9iaXVzLnR4ZlxcdFxcdFxcdHR4ZlxcbmFwcGxpY2F0aW9uL3ZuZC5tb3BodW4uYXBwbGljYXRpb25cXHRcXHRtcG5cXG5hcHBsaWNhdGlvbi92bmQubW9waHVuLmNlcnRpZmljYXRlXFx0XFx0bXBjXFxuYXBwbGljYXRpb24vdm5kLm1vemlsbGEueHVsK3htbFxcdFxcdFxcdHh1bFxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1hcnRnYWxyeVxcdFxcdFxcdGNpbFxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1jYWItY29tcHJlc3NlZFxcdFxcdGNhYlxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbFxcdFxcdFxcdHhscyB4bG0geGxhIHhsYyB4bHQgeGx3XFxuYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsLmFkZGluLm1hY3JvZW5hYmxlZC4xMlxcdFxcdHhsYW1cXG5hcHBsaWNhdGlvbi92bmQubXMtZXhjZWwuc2hlZXQuYmluYXJ5Lm1hY3JvZW5hYmxlZC4xMlxcdHhsc2JcXG5hcHBsaWNhdGlvbi92bmQubXMtZXhjZWwuc2hlZXQubWFjcm9lbmFibGVkLjEyXFx0XFx0eGxzbVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbC50ZW1wbGF0ZS5tYWNyb2VuYWJsZWQuMTJcXHR4bHRtXFxuYXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3RcXHRcXHRcXHRlb3RcXG5hcHBsaWNhdGlvbi92bmQubXMtaHRtbGhlbHBcXHRcXHRcXHRjaG1cXG5hcHBsaWNhdGlvbi92bmQubXMtaW1zXFx0XFx0XFx0XFx0aW1zXFxuYXBwbGljYXRpb24vdm5kLm1zLWxybVxcdFxcdFxcdFxcdGxybVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1vZmZpY2V0aGVtZVxcdFxcdFxcdHRobXhcXG5hcHBsaWNhdGlvbi92bmQubXMtcGtpLnNlY2NhdFxcdFxcdFxcdGNhdFxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1wa2kuc3RsXFx0XFx0XFx0c3RsXFxuYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnRcXHRcXHRcXHRwcHQgcHBzIHBvdFxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50LmFkZGluLm1hY3JvZW5hYmxlZC4xMlxcdFxcdHBwYW1cXG5hcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludC5wcmVzZW50YXRpb24ubWFjcm9lbmFibGVkLjEyXFx0cHB0bVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50LnNsaWRlLm1hY3JvZW5hYmxlZC4xMlxcdFxcdHNsZG1cXG5hcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludC5zbGlkZXNob3cubWFjcm9lbmFibGVkLjEyXFx0XFx0cHBzbVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50LnRlbXBsYXRlLm1hY3JvZW5hYmxlZC4xMlxcdFxcdHBvdG1cXG5hcHBsaWNhdGlvbi92bmQubXMtcHJvamVjdFxcdFxcdFxcdG1wcCBtcHRcXG5hcHBsaWNhdGlvbi92bmQubXMtd29yZC5kb2N1bWVudC5tYWNyb2VuYWJsZWQuMTJcXHRkb2NtXFxuYXBwbGljYXRpb24vdm5kLm1zLXdvcmQudGVtcGxhdGUubWFjcm9lbmFibGVkLjEyXFx0ZG90bVxcbmFwcGxpY2F0aW9uL3ZuZC5tcy13b3Jrc1xcdFxcdFxcdHdwcyB3a3Mgd2NtIHdkYlxcbmFwcGxpY2F0aW9uL3ZuZC5tcy13cGxcXHRcXHRcXHRcXHR3cGxcXG5hcHBsaWNhdGlvbi92bmQubXMteHBzZG9jdW1lbnRcXHRcXHRcXHR4cHNcXG5hcHBsaWNhdGlvbi92bmQubXNlcVxcdFxcdFxcdFxcdG1zZXFcXG5hcHBsaWNhdGlvbi92bmQubXVzaWNpYW5cXHRcXHRcXHRtdXNcXG5hcHBsaWNhdGlvbi92bmQubXV2ZWUuc3R5bGVcXHRcXHRcXHRtc3R5XFxuYXBwbGljYXRpb24vdm5kLm15bmZjXFx0XFx0XFx0XFx0dGFnbGV0XFxuYXBwbGljYXRpb24vdm5kLm5ldXJvbGFuZ3VhZ2Uubmx1XFx0XFx0bmx1XFxuYXBwbGljYXRpb24vdm5kLm5pdGZcXHRcXHRcXHRcXHRudGYgbml0ZlxcbmFwcGxpY2F0aW9uL3ZuZC5ub2JsZW5ldC1kaXJlY3RvcnlcXHRcXHRubmRcXG5hcHBsaWNhdGlvbi92bmQubm9ibGVuZXQtc2VhbGVyXFx0XFx0XFx0bm5zXFxuYXBwbGljYXRpb24vdm5kLm5vYmxlbmV0LXdlYlxcdFxcdFxcdG5ud1xcbmFwcGxpY2F0aW9uL3ZuZC5ub2tpYS5uLWdhZ2UuZGF0YVxcdFxcdG5nZGF0XFxuYXBwbGljYXRpb24vdm5kLm5va2lhLm4tZ2FnZS5zeW1iaWFuLmluc3RhbGxcXHRuLWdhZ2VcXG5hcHBsaWNhdGlvbi92bmQubm9raWEucmFkaW8tcHJlc2V0XFx0XFx0cnBzdFxcbmFwcGxpY2F0aW9uL3ZuZC5ub2tpYS5yYWRpby1wcmVzZXRzXFx0XFx0cnBzc1xcbmFwcGxpY2F0aW9uL3ZuZC5ub3ZhZGlnbS5lZG1cXHRcXHRcXHRlZG1cXG5hcHBsaWNhdGlvbi92bmQubm92YWRpZ20uZWR4XFx0XFx0XFx0ZWR4XFxuYXBwbGljYXRpb24vdm5kLm5vdmFkaWdtLmV4dFxcdFxcdFxcdGV4dFxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuY2hhcnRcXHRcXHRvZGNcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LmNoYXJ0LXRlbXBsYXRlXFx0b3RjXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5kYXRhYmFzZVxcdFxcdG9kYlxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuZm9ybXVsYVxcdFxcdG9kZlxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuZm9ybXVsYS10ZW1wbGF0ZVxcdG9kZnRcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LmdyYXBoaWNzXFx0XFx0b2RnXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5ncmFwaGljcy10ZW1wbGF0ZVxcdG90Z1xcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuaW1hZ2VcXHRcXHRvZGlcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LmltYWdlLXRlbXBsYXRlXFx0b3RpXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5wcmVzZW50YXRpb25cXHRcXHRvZHBcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnByZXNlbnRhdGlvbi10ZW1wbGF0ZVxcdG90cFxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuc3ByZWFkc2hlZXRcXHRcXHRvZHNcXG5hcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnNwcmVhZHNoZWV0LXRlbXBsYXRlXFx0b3RzXFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0XFx0XFx0XFx0b2R0XFxuYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0LW1hc3RlclxcdFxcdG9kbVxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQudGV4dC10ZW1wbGF0ZVxcdG90dFxcbmFwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQudGV4dC13ZWJcXHRcXHRvdGhcXG5hcHBsaWNhdGlvbi92bmQub2xwYy1zdWdhclxcdFxcdFxcdHhvXFxuYXBwbGljYXRpb24vdm5kLm9tYS5kZDIreG1sXFx0XFx0XFx0ZGQyXFxuYXBwbGljYXRpb24vdm5kLm9wZW5vZmZpY2VvcmcuZXh0ZW5zaW9uXFx0XFx0b3h0XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnByZXNlbnRhdGlvblxcdHBwdHhcXG5hcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwuc2xpZGVcXHRzbGR4XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnNsaWRlc2hvd1xcdHBwc3hcXG5hcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwudGVtcGxhdGVcXHRwb3R4XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXRcXHR4bHN4XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwudGVtcGxhdGVcXHR4bHR4XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnRcXHRkb2N4XFxuYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwudGVtcGxhdGVcXHRkb3R4XFxuYXBwbGljYXRpb24vdm5kLm9zZ2VvLm1hcGd1aWRlLnBhY2thZ2VcXHRcXHRtZ3BcXG5hcHBsaWNhdGlvbi92bmQub3NnaS5kcFxcdFxcdFxcdFxcdGRwXFxuYXBwbGljYXRpb24vdm5kLm9zZ2kuc3Vic3lzdGVtXFx0XFx0XFx0ZXNhXFxuYXBwbGljYXRpb24vdm5kLnBhbG1cXHRcXHRcXHRcXHRwZGIgcHFhIG9wcmNcXG5hcHBsaWNhdGlvbi92bmQucGF3YWFmaWxlXFx0XFx0XFx0cGF3XFxuYXBwbGljYXRpb24vdm5kLnBnLmZvcm1hdFxcdFxcdFxcdHN0clxcbmFwcGxpY2F0aW9uL3ZuZC5wZy5vc2FzbGlcXHRcXHRcXHRlaTZcXG5hcHBsaWNhdGlvbi92bmQucGljc2VsXFx0XFx0XFx0XFx0ZWZpZlxcbmFwcGxpY2F0aW9uL3ZuZC5wbWkud2lkZ2V0XFx0XFx0XFx0d2dcXG5hcHBsaWNhdGlvbi92bmQucG9ja2V0bGVhcm5cXHRcXHRcXHRwbGZcXG5hcHBsaWNhdGlvbi92bmQucG93ZXJidWlsZGVyNlxcdFxcdFxcdHBiZFxcbmFwcGxpY2F0aW9uL3ZuZC5wcmV2aWV3c3lzdGVtcy5ib3hcXHRcXHRib3hcXG5hcHBsaWNhdGlvbi92bmQucHJvdGV1cy5tYWdhemluZVxcdFxcdG1nelxcbmFwcGxpY2F0aW9uL3ZuZC5wdWJsaXNoYXJlLWRlbHRhLXRyZWVcXHRcXHRxcHNcXG5hcHBsaWNhdGlvbi92bmQucHZpLnB0aWQxXFx0XFx0XFx0cHRpZFxcbmFwcGxpY2F0aW9uL3ZuZC5xdWFyay5xdWFya3hwcmVzc1xcdFxcdHF4ZCBxeHQgcXdkIHF3dCBxeGwgcXhiXFxuYXBwbGljYXRpb24vdm5kLnJlYWx2bmMuYmVkXFx0XFx0XFx0YmVkXFxuYXBwbGljYXRpb24vdm5kLnJlY29yZGFyZS5tdXNpY3htbFxcdFxcdG14bFxcbmFwcGxpY2F0aW9uL3ZuZC5yZWNvcmRhcmUubXVzaWN4bWwreG1sXFx0XFx0bXVzaWN4bWxcXG5hcHBsaWNhdGlvbi92bmQucmlnLmNyeXB0b25vdGVcXHRcXHRcXHRjcnlwdG9ub3RlXFxuYXBwbGljYXRpb24vdm5kLnJpbS5jb2RcXHRcXHRcXHRcXHRjb2RcXG5hcHBsaWNhdGlvbi92bmQucm4tcmVhbG1lZGlhXFx0XFx0XFx0cm1cXG5hcHBsaWNhdGlvbi92bmQucm4tcmVhbG1lZGlhLXZiclxcdFxcdHJtdmJcXG5hcHBsaWNhdGlvbi92bmQucm91dGU2Ni5saW5rNjYreG1sXFx0XFx0bGluazY2XFxuYXBwbGljYXRpb24vdm5kLnNhaWxpbmd0cmFja2VyLnRyYWNrXFx0XFx0c3RcXG5hcHBsaWNhdGlvbi92bmQuc2VlbWFpbFxcdFxcdFxcdFxcdHNlZVxcbmFwcGxpY2F0aW9uL3ZuZC5zZW1hXFx0XFx0XFx0XFx0c2VtYVxcbmFwcGxpY2F0aW9uL3ZuZC5zZW1kXFx0XFx0XFx0XFx0c2VtZFxcbmFwcGxpY2F0aW9uL3ZuZC5zZW1mXFx0XFx0XFx0XFx0c2VtZlxcbmFwcGxpY2F0aW9uL3ZuZC5zaGFuYS5pbmZvcm1lZC5mb3JtZGF0YVxcdFxcdGlmbVxcbmFwcGxpY2F0aW9uL3ZuZC5zaGFuYS5pbmZvcm1lZC5mb3JtdGVtcGxhdGVcXHRpdHBcXG5hcHBsaWNhdGlvbi92bmQuc2hhbmEuaW5mb3JtZWQuaW50ZXJjaGFuZ2VcXHRpaWZcXG5hcHBsaWNhdGlvbi92bmQuc2hhbmEuaW5mb3JtZWQucGFja2FnZVxcdFxcdGlwa1xcbmFwcGxpY2F0aW9uL3ZuZC5zaW10ZWNoLW1pbmRtYXBwZXJcXHRcXHR0d2QgdHdkc1xcbmFwcGxpY2F0aW9uL3ZuZC5zbWFmXFx0XFx0XFx0XFx0bW1mXFxuYXBwbGljYXRpb24vdm5kLnNtYXJ0LnRlYWNoZXJcXHRcXHRcXHR0ZWFjaGVyXFxuYXBwbGljYXRpb24vdm5kLnNvbGVudC5zZGttK3htbFxcdFxcdFxcdHNka20gc2RrZFxcbmFwcGxpY2F0aW9uL3ZuZC5zcG90ZmlyZS5keHBcXHRcXHRcXHRkeHBcXG5hcHBsaWNhdGlvbi92bmQuc3BvdGZpcmUuc2ZzXFx0XFx0XFx0c2ZzXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi5jYWxjXFx0XFx0c2RjXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi5kcmF3XFx0XFx0c2RhXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi5pbXByZXNzXFx0XFx0c2RkXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi5tYXRoXFx0XFx0c21mXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi53cml0ZXJcXHRcXHRzZHcgdm9yXFxuYXBwbGljYXRpb24vdm5kLnN0YXJkaXZpc2lvbi53cml0ZXItZ2xvYmFsXFx0c2dsXFxuYXBwbGljYXRpb24vdm5kLnN0ZXBtYW5pYS5wYWNrYWdlXFx0XFx0c216aXBcXG5hcHBsaWNhdGlvbi92bmQuc3RlcG1hbmlhLnN0ZXBjaGFydFxcdFxcdHNtXFxuYXBwbGljYXRpb24vdm5kLnN1bi54bWwuY2FsY1xcdFxcdFxcdHN4Y1xcbmFwcGxpY2F0aW9uL3ZuZC5zdW4ueG1sLmNhbGMudGVtcGxhdGVcXHRcXHRzdGNcXG5hcHBsaWNhdGlvbi92bmQuc3VuLnhtbC5kcmF3XFx0XFx0XFx0c3hkXFxuYXBwbGljYXRpb24vdm5kLnN1bi54bWwuZHJhdy50ZW1wbGF0ZVxcdFxcdHN0ZFxcbmFwcGxpY2F0aW9uL3ZuZC5zdW4ueG1sLmltcHJlc3NcXHRcXHRcXHRzeGlcXG5hcHBsaWNhdGlvbi92bmQuc3VuLnhtbC5pbXByZXNzLnRlbXBsYXRlXFx0c3RpXFxuYXBwbGljYXRpb24vdm5kLnN1bi54bWwubWF0aFxcdFxcdFxcdHN4bVxcbmFwcGxpY2F0aW9uL3ZuZC5zdW4ueG1sLndyaXRlclxcdFxcdFxcdHN4d1xcbmFwcGxpY2F0aW9uL3ZuZC5zdW4ueG1sLndyaXRlci5nbG9iYWxcXHRcXHRzeGdcXG5hcHBsaWNhdGlvbi92bmQuc3VuLnhtbC53cml0ZXIudGVtcGxhdGVcXHRcXHRzdHdcXG5hcHBsaWNhdGlvbi92bmQuc3VzLWNhbGVuZGFyXFx0XFx0XFx0c3VzIHN1c3BcXG5hcHBsaWNhdGlvbi92bmQuc3ZkXFx0XFx0XFx0XFx0c3ZkXFxuYXBwbGljYXRpb24vdm5kLnN5bWJpYW4uaW5zdGFsbFxcdFxcdFxcdHNpcyBzaXN4XFxuYXBwbGljYXRpb24vdm5kLnN5bmNtbCt4bWxcXHRcXHRcXHR4c21cXG5hcHBsaWNhdGlvbi92bmQuc3luY21sLmRtK3dieG1sXFx0XFx0XFx0YmRtXFxuYXBwbGljYXRpb24vdm5kLnN5bmNtbC5kbSt4bWxcXHRcXHRcXHR4ZG1cXG5hcHBsaWNhdGlvbi92bmQudGFvLmludGVudC1tb2R1bGUtYXJjaGl2ZVxcdHRhb1xcbmFwcGxpY2F0aW9uL3ZuZC50Y3BkdW1wLnBjYXBcXHRcXHRcXHRwY2FwIGNhcCBkbXBcXG5hcHBsaWNhdGlvbi92bmQudG1vYmlsZS1saXZldHZcXHRcXHRcXHR0bW9cXG5hcHBsaWNhdGlvbi92bmQudHJpZC50cHRcXHRcXHRcXHR0cHRcXG5hcHBsaWNhdGlvbi92bmQudHJpc2NhcGUubXhzXFx0XFx0XFx0bXhzXFxuYXBwbGljYXRpb24vdm5kLnRydWVhcHBcXHRcXHRcXHRcXHR0cmFcXG5hcHBsaWNhdGlvbi92bmQudWZkbFxcdFxcdFxcdFxcdHVmZCB1ZmRsXFxuYXBwbGljYXRpb24vdm5kLnVpcS50aGVtZVxcdFxcdFxcdHV0elxcbmFwcGxpY2F0aW9uL3ZuZC51bWFqaW5cXHRcXHRcXHRcXHR1bWpcXG5hcHBsaWNhdGlvbi92bmQudW5pdHlcXHRcXHRcXHRcXHR1bml0eXdlYlxcbmFwcGxpY2F0aW9uL3ZuZC51b21sK3htbFxcdFxcdFxcdHVvbWxcXG5hcHBsaWNhdGlvbi92bmQudmN4XFx0XFx0XFx0XFx0dmN4XFxuYXBwbGljYXRpb24vdm5kLnZpc2lvXFx0XFx0XFx0XFx0dnNkIHZzdCB2c3MgdnN3XFxuYXBwbGljYXRpb24vdm5kLnZpc2lvbmFyeVxcdFxcdFxcdHZpc1xcbmFwcGxpY2F0aW9uL3ZuZC52c2ZcXHRcXHRcXHRcXHR2c2ZcXG5hcHBsaWNhdGlvbi92bmQud2FwLndieG1sXFx0XFx0XFx0d2J4bWxcXG5hcHBsaWNhdGlvbi92bmQud2FwLndtbGNcXHRcXHRcXHR3bWxjXFxuYXBwbGljYXRpb24vdm5kLndhcC53bWxzY3JpcHRjXFx0XFx0XFx0d21sc2NcXG5hcHBsaWNhdGlvbi92bmQud2VidHVyYm9cXHRcXHRcXHR3dGJcXG5hcHBsaWNhdGlvbi92bmQud29sZnJhbS5wbGF5ZXJcXHRcXHRcXHRuYnBcXG5hcHBsaWNhdGlvbi92bmQud29yZHBlcmZlY3RcXHRcXHRcXHR3cGRcXG5hcHBsaWNhdGlvbi92bmQud3FkXFx0XFx0XFx0XFx0d3FkXFxuYXBwbGljYXRpb24vdm5kLnd0LnN0ZlxcdFxcdFxcdFxcdHN0ZlxcbmFwcGxpY2F0aW9uL3ZuZC54YXJhXFx0XFx0XFx0XFx0eGFyXFxuYXBwbGljYXRpb24vdm5kLnhmZGxcXHRcXHRcXHRcXHR4ZmRsXFxuYXBwbGljYXRpb24vdm5kLnlhbWFoYS5odi1kaWNcXHRcXHRcXHRodmRcXG5hcHBsaWNhdGlvbi92bmQueWFtYWhhLmh2LXNjcmlwdFxcdFxcdGh2c1xcbmFwcGxpY2F0aW9uL3ZuZC55YW1haGEuaHYtdm9pY2VcXHRcXHRcXHRodnBcXG5hcHBsaWNhdGlvbi92bmQueWFtYWhhLm9wZW5zY29yZWZvcm1hdFxcdFxcdFxcdG9zZlxcbmFwcGxpY2F0aW9uL3ZuZC55YW1haGEub3BlbnNjb3JlZm9ybWF0Lm9zZnB2Zyt4bWxcXHRvc2ZwdmdcXG5hcHBsaWNhdGlvbi92bmQueWFtYWhhLnNtYWYtYXVkaW9cXHRcXHRzYWZcXG5hcHBsaWNhdGlvbi92bmQueWFtYWhhLnNtYWYtcGhyYXNlXFx0XFx0c3BmXFxuYXBwbGljYXRpb24vdm5kLnllbGxvd3JpdmVyLWN1c3RvbS1tZW51XFx0XFx0Y21wXFxuYXBwbGljYXRpb24vdm5kLnp1bFxcdFxcdFxcdFxcdHppciB6aXJ6XFxuYXBwbGljYXRpb24vdm5kLnp6YXp6LmRlY2sreG1sXFx0XFx0XFx0emF6XFxuYXBwbGljYXRpb24vdm9pY2V4bWwreG1sXFx0XFx0XFx0dnhtbFxcbmFwcGxpY2F0aW9uL3dhc21cXHRcXHRcXHRcXHR3YXNtXFxuYXBwbGljYXRpb24vd2lkZ2V0XFx0XFx0XFx0XFx0d2d0XFxuYXBwbGljYXRpb24vd2luaGxwXFx0XFx0XFx0XFx0aGxwXFxuYXBwbGljYXRpb24vd3NkbCt4bWxcXHRcXHRcXHRcXHR3c2RsXFxuYXBwbGljYXRpb24vd3Nwb2xpY3kreG1sXFx0XFx0XFx0d3Nwb2xpY3lcXG5hcHBsaWNhdGlvbi94LTd6LWNvbXByZXNzZWRcXHRcXHRcXHQ3elxcbmFwcGxpY2F0aW9uL3gtYWJpd29yZFxcdFxcdFxcdFxcdGFid1xcbmFwcGxpY2F0aW9uL3gtYWNlLWNvbXByZXNzZWRcXHRcXHRcXHRhY2VcXG5hcHBsaWNhdGlvbi94LWFwcGxlLWRpc2tpbWFnZVxcdFxcdFxcdGRtZ1xcbmFwcGxpY2F0aW9uL3gtYXV0aG9yd2FyZS1iaW5cXHRcXHRcXHRhYWIgeDMyIHUzMiB2b3hcXG5hcHBsaWNhdGlvbi94LWF1dGhvcndhcmUtbWFwXFx0XFx0XFx0YWFtXFxuYXBwbGljYXRpb24veC1hdXRob3J3YXJlLXNlZ1xcdFxcdFxcdGFhc1xcbmFwcGxpY2F0aW9uL3gtYmNwaW9cXHRcXHRcXHRcXHRiY3Bpb1xcbmFwcGxpY2F0aW9uL3gtYml0dG9ycmVudFxcdFxcdFxcdHRvcnJlbnRcXG5hcHBsaWNhdGlvbi94LWJsb3JiXFx0XFx0XFx0XFx0YmxiIGJsb3JiXFxuYXBwbGljYXRpb24veC1iemlwXFx0XFx0XFx0XFx0YnpcXG5hcHBsaWNhdGlvbi94LWJ6aXAyXFx0XFx0XFx0XFx0YnoyIGJvelxcbmFwcGxpY2F0aW9uL3gtY2JyXFx0XFx0XFx0XFx0Y2JyIGNiYSBjYnQgY2J6IGNiN1xcbmFwcGxpY2F0aW9uL3gtY2RsaW5rXFx0XFx0XFx0XFx0dmNkXFxuYXBwbGljYXRpb24veC1jZnMtY29tcHJlc3NlZFxcdFxcdFxcdGNmc1xcbmFwcGxpY2F0aW9uL3gtY2hhdFxcdFxcdFxcdFxcdGNoYXRcXG5hcHBsaWNhdGlvbi94LWNoZXNzLXBnblxcdFxcdFxcdFxcdHBnblxcbmFwcGxpY2F0aW9uL3gtY29uZmVyZW5jZVxcdFxcdFxcdG5zY1xcbmFwcGxpY2F0aW9uL3gtY3Bpb1xcdFxcdFxcdFxcdGNwaW9cXG5hcHBsaWNhdGlvbi94LWNzaFxcdFxcdFxcdFxcdGNzaFxcbmFwcGxpY2F0aW9uL3gtZGViaWFuLXBhY2thZ2VcXHRcXHRcXHRkZWIgdWRlYlxcbmFwcGxpY2F0aW9uL3gtZGdjLWNvbXByZXNzZWRcXHRcXHRcXHRkZ2NcXG5hcHBsaWNhdGlvbi94LWRpcmVjdG9yXFx0XFx0XFx0ZGlyIGRjciBkeHIgY3N0IGNjdCBjeHQgdzNkIGZnZCBzd2FcXG5hcHBsaWNhdGlvbi94LWRvb21cXHRcXHRcXHRcXHR3YWRcXG5hcHBsaWNhdGlvbi94LWR0Ym5jeCt4bWxcXHRcXHRcXHRuY3hcXG5hcHBsaWNhdGlvbi94LWR0Ym9vayt4bWxcXHRcXHRcXHRkdGJcXG5hcHBsaWNhdGlvbi94LWR0YnJlc291cmNlK3htbFxcdFxcdFxcdHJlc1xcbmFwcGxpY2F0aW9uL3gtZHZpXFx0XFx0XFx0XFx0ZHZpXFxuYXBwbGljYXRpb24veC1lbnZveVxcdFxcdFxcdFxcdGV2eVxcbmFwcGxpY2F0aW9uL3gtZXZhXFx0XFx0XFx0XFx0ZXZhXFxuYXBwbGljYXRpb24veC1mb250LWJkZlxcdFxcdFxcdFxcdGJkZlxcbmFwcGxpY2F0aW9uL3gtZm9udC1naG9zdHNjcmlwdFxcdFxcdFxcdGdzZlxcbmFwcGxpY2F0aW9uL3gtZm9udC1saW51eC1wc2ZcXHRcXHRcXHRwc2ZcXG5hcHBsaWNhdGlvbi94LWZvbnQtcGNmXFx0XFx0XFx0XFx0cGNmXFxuYXBwbGljYXRpb24veC1mb250LXNuZlxcdFxcdFxcdFxcdHNuZlxcbmFwcGxpY2F0aW9uL3gtZm9udC10eXBlMVxcdFxcdFxcdHBmYSBwZmIgcGZtIGFmbVxcbmFwcGxpY2F0aW9uL3gtZnJlZWFyY1xcdFxcdFxcdFxcdGFyY1xcbmFwcGxpY2F0aW9uL3gtZnV0dXJlc3BsYXNoXFx0XFx0XFx0c3BsXFxuYXBwbGljYXRpb24veC1nY2EtY29tcHJlc3NlZFxcdFxcdFxcdGdjYVxcbmFwcGxpY2F0aW9uL3gtZ2x1bHhcXHRcXHRcXHRcXHR1bHhcXG5hcHBsaWNhdGlvbi94LWdudW1lcmljXFx0XFx0XFx0XFx0Z251bWVyaWNcXG5hcHBsaWNhdGlvbi94LWdyYW1wcy14bWxcXHRcXHRcXHRncmFtcHNcXG5hcHBsaWNhdGlvbi94LWd0YXJcXHRcXHRcXHRcXHRndGFyXFxuYXBwbGljYXRpb24veC1oZGZcXHRcXHRcXHRcXHRoZGZcXG5hcHBsaWNhdGlvbi94LWluc3RhbGwtaW5zdHJ1Y3Rpb25zXFx0XFx0aW5zdGFsbFxcbmFwcGxpY2F0aW9uL3gtaXNvOTY2MC1pbWFnZVxcdFxcdFxcdGlzb1xcbmFwcGxpY2F0aW9uL3gtamF2YS1qbmxwLWZpbGVcXHRcXHRcXHRqbmxwXFxuYXBwbGljYXRpb24veC1sYXRleFxcdFxcdFxcdFxcdGxhdGV4XFxuYXBwbGljYXRpb24veC1semgtY29tcHJlc3NlZFxcdFxcdFxcdGx6aCBsaGFcXG5hcHBsaWNhdGlvbi94LW1pZVxcdFxcdFxcdFxcdG1pZVxcbmFwcGxpY2F0aW9uL3gtbW9iaXBvY2tldC1lYm9va1xcdFxcdFxcdHByYyBtb2JpXFxuYXBwbGljYXRpb24veC1tcy1hcHBsaWNhdGlvblxcdFxcdFxcdGFwcGxpY2F0aW9uXFxuYXBwbGljYXRpb24veC1tcy1zaG9ydGN1dFxcdFxcdFxcdGxua1xcbmFwcGxpY2F0aW9uL3gtbXMtd21kXFx0XFx0XFx0XFx0d21kXFxuYXBwbGljYXRpb24veC1tcy13bXpcXHRcXHRcXHRcXHR3bXpcXG5hcHBsaWNhdGlvbi94LW1zLXhiYXBcXHRcXHRcXHRcXHR4YmFwXFxuYXBwbGljYXRpb24veC1tc2FjY2Vzc1xcdFxcdFxcdFxcdG1kYlxcbmFwcGxpY2F0aW9uL3gtbXNiaW5kZXJcXHRcXHRcXHRcXHRvYmRcXG5hcHBsaWNhdGlvbi94LW1zY2FyZGZpbGVcXHRcXHRcXHRjcmRcXG5hcHBsaWNhdGlvbi94LW1zY2xpcFxcdFxcdFxcdFxcdGNscFxcbmFwcGxpY2F0aW9uL3gtbXNkb3dubG9hZFxcdFxcdFxcdGV4ZSBkbGwgY29tIGJhdCBtc2lcXG5hcHBsaWNhdGlvbi94LW1zbWVkaWF2aWV3XFx0XFx0XFx0bXZiIG0xMyBtMTRcXG5hcHBsaWNhdGlvbi94LW1zbWV0YWZpbGVcXHRcXHRcXHR3bWYgd216IGVtZiBlbXpcXG5hcHBsaWNhdGlvbi94LW1zbW9uZXlcXHRcXHRcXHRcXHRtbnlcXG5hcHBsaWNhdGlvbi94LW1zcHVibGlzaGVyXFx0XFx0XFx0cHViXFxuYXBwbGljYXRpb24veC1tc3NjaGVkdWxlXFx0XFx0XFx0c2NkXFxuYXBwbGljYXRpb24veC1tc3Rlcm1pbmFsXFx0XFx0XFx0dHJtXFxuYXBwbGljYXRpb24veC1tc3dyaXRlXFx0XFx0XFx0XFx0d3JpXFxuYXBwbGljYXRpb24veC1uZXRjZGZcXHRcXHRcXHRcXHRuYyBjZGZcXG5hcHBsaWNhdGlvbi94LW56YlxcdFxcdFxcdFxcdG56YlxcbmFwcGxpY2F0aW9uL3gtcGtjczEyXFx0XFx0XFx0XFx0cDEyIHBmeFxcbmFwcGxpY2F0aW9uL3gtcGtjczctY2VydGlmaWNhdGVzXFx0XFx0cDdiIHNwY1xcbmFwcGxpY2F0aW9uL3gtcGtjczctY2VydHJlcXJlc3BcXHRcXHRcXHRwN3JcXG5hcHBsaWNhdGlvbi94LXJhci1jb21wcmVzc2VkXFx0XFx0XFx0cmFyXFxuYXBwbGljYXRpb24veC1yZXNlYXJjaC1pbmZvLXN5c3RlbXNcXHRcXHRyaXNcXG5hcHBsaWNhdGlvbi94LXNoXFx0XFx0XFx0XFx0c2hcXG5hcHBsaWNhdGlvbi94LXNoYXJcXHRcXHRcXHRcXHRzaGFyXFxuYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcXHRcXHRcXHRzd2ZcXG5hcHBsaWNhdGlvbi94LXNpbHZlcmxpZ2h0LWFwcFxcdFxcdFxcdHhhcFxcbmFwcGxpY2F0aW9uL3gtc3FsXFx0XFx0XFx0XFx0c3FsXFxuYXBwbGljYXRpb24veC1zdHVmZml0XFx0XFx0XFx0XFx0c2l0XFxuYXBwbGljYXRpb24veC1zdHVmZml0eFxcdFxcdFxcdFxcdHNpdHhcXG5hcHBsaWNhdGlvbi94LXN1YnJpcFxcdFxcdFxcdFxcdHNydFxcbmFwcGxpY2F0aW9uL3gtc3Y0Y3Bpb1xcdFxcdFxcdFxcdHN2NGNwaW9cXG5hcHBsaWNhdGlvbi94LXN2NGNyY1xcdFxcdFxcdFxcdHN2NGNyY1xcbmFwcGxpY2F0aW9uL3gtdDN2bS1pbWFnZVxcdFxcdFxcdHQzXFxuYXBwbGljYXRpb24veC10YWRzXFx0XFx0XFx0XFx0Z2FtXFxuYXBwbGljYXRpb24veC10YXJcXHRcXHRcXHRcXHR0YXJcXG5hcHBsaWNhdGlvbi94LXRjbFxcdFxcdFxcdFxcdHRjbFxcbmFwcGxpY2F0aW9uL3gtdGV4XFx0XFx0XFx0XFx0dGV4XFxuYXBwbGljYXRpb24veC10ZXgtdGZtXFx0XFx0XFx0XFx0dGZtXFxuYXBwbGljYXRpb24veC10ZXhpbmZvXFx0XFx0XFx0XFx0dGV4aW5mbyB0ZXhpXFxuYXBwbGljYXRpb24veC10Z2lmXFx0XFx0XFx0XFx0b2JqXFxuYXBwbGljYXRpb24veC11c3RhclxcdFxcdFxcdFxcdHVzdGFyXFxuYXBwbGljYXRpb24veC13YWlzLXNvdXJjZVxcdFxcdFxcdHNyY1xcbmFwcGxpY2F0aW9uL3gteDUwOS1jYS1jZXJ0XFx0XFx0XFx0ZGVyIGNydFxcbmFwcGxpY2F0aW9uL3gteGZpZ1xcdFxcdFxcdFxcdGZpZ1xcbmFwcGxpY2F0aW9uL3gteGxpZmYreG1sXFx0XFx0XFx0XFx0eGxmXFxuYXBwbGljYXRpb24veC14cGluc3RhbGxcXHRcXHRcXHRcXHR4cGlcXG5hcHBsaWNhdGlvbi94LXh6XFx0XFx0XFx0XFx0eHpcXG5hcHBsaWNhdGlvbi94LXptYWNoaW5lXFx0XFx0XFx0XFx0ejEgejIgejMgejQgejUgejYgejcgejhcXG5hcHBsaWNhdGlvbi94YW1sK3htbFxcdFxcdFxcdFxcdHhhbWxcXG5hcHBsaWNhdGlvbi94Y2FwLWRpZmYreG1sXFx0XFx0XFx0eGRmXFxuYXBwbGljYXRpb24veGVuYyt4bWxcXHRcXHRcXHRcXHR4ZW5jXFxuYXBwbGljYXRpb24veGh0bWwreG1sXFx0XFx0XFx0XFx0eGh0bWwgeGh0XFxuYXBwbGljYXRpb24veG1sXFx0XFx0XFx0XFx0XFx0eG1sIHhzbFxcbmFwcGxpY2F0aW9uL3htbC1kdGRcXHRcXHRcXHRcXHRkdGRcXG5hcHBsaWNhdGlvbi94b3AreG1sXFx0XFx0XFx0XFx0eG9wXFxuYXBwbGljYXRpb24veHByb2MreG1sXFx0XFx0XFx0XFx0eHBsXFxuYXBwbGljYXRpb24veHNsdCt4bWxcXHRcXHRcXHRcXHR4c2x0XFxuYXBwbGljYXRpb24veHNwZit4bWxcXHRcXHRcXHRcXHR4c3BmXFxuYXBwbGljYXRpb24veHYreG1sXFx0XFx0XFx0XFx0bXhtbCB4aHZtbCB4dm1sIHh2bVxcbmFwcGxpY2F0aW9uL3lhbmdcXHRcXHRcXHRcXHR5YW5nXFxuYXBwbGljYXRpb24veWluK3htbFxcdFxcdFxcdFxcdHlpblxcbmFwcGxpY2F0aW9uL3ppcFxcdFxcdFxcdFxcdFxcdHppcFxcbmF1ZGlvL2FkcGNtXFx0XFx0XFx0XFx0XFx0YWRwXFxuYXVkaW8vYmFzaWNcXHRcXHRcXHRcXHRcXHRhdSBzbmRcXG5hdWRpby9taWRpXFx0XFx0XFx0XFx0XFx0bWlkIG1pZGkga2FyIHJtaVxcbmF1ZGlvL21wNFxcdFxcdFxcdFxcdFxcdG00YSBtcDRhXFxuYXVkaW8vbXBlZ1xcdFxcdFxcdFxcdFxcdG1wZ2EgbXAyIG1wMmEgbXAzIG0yYSBtM2FcXG5hdWRpby9vZ2dcXHRcXHRcXHRcXHRcXHRvZ2Egb2dnIHNweFxcbmF1ZGlvL3MzbVxcdFxcdFxcdFxcdFxcdHMzbVxcbmF1ZGlvL3NpbGtcXHRcXHRcXHRcXHRcXHRzaWxcXG5hdWRpby92bmQuZGVjZS5hdWRpb1xcdFxcdFxcdFxcdHV2YSB1dnZhXFxuYXVkaW8vdm5kLmRpZ2l0YWwtd2luZHNcXHRcXHRcXHRcXHRlb2xcXG5hdWRpby92bmQuZHJhXFx0XFx0XFx0XFx0XFx0ZHJhXFxuYXVkaW8vdm5kLmR0c1xcdFxcdFxcdFxcdFxcdGR0c1xcbmF1ZGlvL3ZuZC5kdHMuaGRcXHRcXHRcXHRcXHRkdHNoZFxcbmF1ZGlvL3ZuZC5sdWNlbnQudm9pY2VcXHRcXHRcXHRcXHRsdnBcXG5hdWRpby92bmQubXMtcGxheXJlYWR5Lm1lZGlhLnB5YVxcdFxcdHB5YVxcbmF1ZGlvL3ZuZC5udWVyYS5lY2VscDQ4MDBcXHRcXHRcXHRlY2VscDQ4MDBcXG5hdWRpby92bmQubnVlcmEuZWNlbHA3NDcwXFx0XFx0XFx0ZWNlbHA3NDcwXFxuYXVkaW8vdm5kLm51ZXJhLmVjZWxwOTYwMFxcdFxcdFxcdGVjZWxwOTYwMFxcbmF1ZGlvL3ZuZC5yaXBcXHRcXHRcXHRcXHRcXHRyaXBcXG5hdWRpby93ZWJtXFx0XFx0XFx0XFx0XFx0d2ViYVxcbmF1ZGlvL3gtYWFjXFx0XFx0XFx0XFx0XFx0YWFjXFxuYXVkaW8veC1haWZmXFx0XFx0XFx0XFx0XFx0YWlmIGFpZmYgYWlmY1xcbmF1ZGlvL3gtY2FmXFx0XFx0XFx0XFx0XFx0Y2FmXFxuYXVkaW8veC1mbGFjXFx0XFx0XFx0XFx0XFx0ZmxhY1xcbmF1ZGlvL3gtbWF0cm9za2FcXHRcXHRcXHRcXHRta2FcXG5hdWRpby94LW1wZWd1cmxcXHRcXHRcXHRcXHRcXHRtM3VcXG5hdWRpby94LW1zLXdheFxcdFxcdFxcdFxcdFxcdHdheFxcbmF1ZGlvL3gtbXMtd21hXFx0XFx0XFx0XFx0XFx0d21hXFxuYXVkaW8veC1wbi1yZWFsYXVkaW9cXHRcXHRcXHRcXHRyYW0gcmFcXG5hdWRpby94LXBuLXJlYWxhdWRpby1wbHVnaW5cXHRcXHRcXHRybXBcXG5hdWRpby94LXdhdlxcdFxcdFxcdFxcdFxcdHdhdlxcbmF1ZGlvL3htXFx0XFx0XFx0XFx0XFx0eG1cXG5jaGVtaWNhbC94LWNkeFxcdFxcdFxcdFxcdFxcdGNkeFxcbmNoZW1pY2FsL3gtY2lmXFx0XFx0XFx0XFx0XFx0Y2lmXFxuY2hlbWljYWwveC1jbWRmXFx0XFx0XFx0XFx0XFx0Y21kZlxcbmNoZW1pY2FsL3gtY21sXFx0XFx0XFx0XFx0XFx0Y21sXFxuY2hlbWljYWwveC1jc21sXFx0XFx0XFx0XFx0XFx0Y3NtbFxcbmNoZW1pY2FsL3gteHl6XFx0XFx0XFx0XFx0XFx0eHl6XFxuZm9udC9jb2xsZWN0aW9uXFx0XFx0XFx0XFx0XFx0dHRjXFxuZm9udC9vdGZcXHRcXHRcXHRcXHRcXHRvdGZcXG5mb250L3R0ZlxcdFxcdFxcdFxcdFxcdHR0ZlxcbmZvbnQvd29mZlxcdFxcdFxcdFxcdFxcdHdvZmZcXG5mb250L3dvZmYyXFx0XFx0XFx0XFx0XFx0d29mZjJcXG5pbWFnZS9ibXBcXHRcXHRcXHRcXHRcXHRibXBcXG5pbWFnZS9jZ21cXHRcXHRcXHRcXHRcXHRjZ21cXG5pbWFnZS9nM2ZheFxcdFxcdFxcdFxcdFxcdGczXFxuaW1hZ2UvZ2lmXFx0XFx0XFx0XFx0XFx0Z2lmXFxuaW1hZ2UvaWVmXFx0XFx0XFx0XFx0XFx0aWVmXFxuaW1hZ2UvanBlZ1xcdFxcdFxcdFxcdFxcdGpwZWcganBnIGpwZVxcbmltYWdlL2t0eFxcdFxcdFxcdFxcdFxcdGt0eFxcbmltYWdlL3BuZ1xcdFxcdFxcdFxcdFxcdHBuZ1xcbmltYWdlL3Bycy5idGlmXFx0XFx0XFx0XFx0XFx0YnRpZlxcbmltYWdlL3NnaVxcdFxcdFxcdFxcdFxcdHNnaVxcbmltYWdlL3N2Zyt4bWxcXHRcXHRcXHRcXHRcXHRzdmcgc3ZnelxcbmltYWdlL3RpZmZcXHRcXHRcXHRcXHRcXHR0aWZmIHRpZlxcbmltYWdlL3ZuZC5hZG9iZS5waG90b3Nob3BcXHRcXHRcXHRwc2RcXG5pbWFnZS92bmQuZGVjZS5ncmFwaGljXFx0XFx0XFx0XFx0dXZpIHV2dmkgdXZnIHV2dmdcXG5pbWFnZS92bmQuZGp2dVxcdFxcdFxcdFxcdFxcdGRqdnUgZGp2XFxuaW1hZ2Uvdm5kLmR2Yi5zdWJ0aXRsZVxcdFxcdFxcdFxcdHN1YlxcbmltYWdlL3ZuZC5kd2dcXHRcXHRcXHRcXHRcXHRkd2dcXG5pbWFnZS92bmQuZHhmXFx0XFx0XFx0XFx0XFx0ZHhmXFxuaW1hZ2Uvdm5kLmZhc3RiaWRzaGVldFxcdFxcdFxcdFxcdGZic1xcbmltYWdlL3ZuZC5mcHhcXHRcXHRcXHRcXHRcXHRmcHhcXG5pbWFnZS92bmQuZnN0XFx0XFx0XFx0XFx0XFx0ZnN0XFxuaW1hZ2Uvdm5kLmZ1aml4ZXJveC5lZG1pY3MtbW1yXFx0XFx0XFx0bW1yXFxuaW1hZ2Uvdm5kLmZ1aml4ZXJveC5lZG1pY3MtcmxjXFx0XFx0XFx0cmxjXFxuaW1hZ2Uvdm5kLm1zLW1vZGlcXHRcXHRcXHRcXHRtZGlcXG5pbWFnZS92bmQubXMtcGhvdG9cXHRcXHRcXHRcXHR3ZHBcXG5pbWFnZS92bmQubmV0LWZweFxcdFxcdFxcdFxcdG5weFxcbmltYWdlL3ZuZC53YXAud2JtcFxcdFxcdFxcdFxcdHdibXBcXG5pbWFnZS92bmQueGlmZlxcdFxcdFxcdFxcdFxcdHhpZlxcbmltYWdlL3dlYnBcXHRcXHRcXHRcXHRcXHR3ZWJwXFxuaW1hZ2UveC0zZHNcXHRcXHRcXHRcXHRcXHQzZHNcXG5pbWFnZS94LWNtdS1yYXN0ZXJcXHRcXHRcXHRcXHRyYXNcXG5pbWFnZS94LWNteFxcdFxcdFxcdFxcdFxcdGNteFxcbmltYWdlL3gtZnJlZWhhbmRcXHRcXHRcXHRcXHRmaCBmaGMgZmg0IGZoNSBmaDdcXG5pbWFnZS94LWljb25cXHRcXHRcXHRcXHRcXHRpY29cXG5pbWFnZS94LW1yc2lkLWltYWdlXFx0XFx0XFx0XFx0c2lkXFxuaW1hZ2UveC1wY3hcXHRcXHRcXHRcXHRcXHRwY3hcXG5pbWFnZS94LXBpY3RcXHRcXHRcXHRcXHRcXHRwaWMgcGN0XFxuaW1hZ2UveC1wb3J0YWJsZS1hbnltYXBcXHRcXHRcXHRcXHRwbm1cXG5pbWFnZS94LXBvcnRhYmxlLWJpdG1hcFxcdFxcdFxcdFxcdHBibVxcbmltYWdlL3gtcG9ydGFibGUtZ3JheW1hcFxcdFxcdFxcdHBnbVxcbmltYWdlL3gtcG9ydGFibGUtcGl4bWFwXFx0XFx0XFx0XFx0cHBtXFxuaW1hZ2UveC1yZ2JcXHRcXHRcXHRcXHRcXHRyZ2JcXG5pbWFnZS94LXRnYVxcdFxcdFxcdFxcdFxcdHRnYVxcbmltYWdlL3gteGJpdG1hcFxcdFxcdFxcdFxcdFxcdHhibVxcbmltYWdlL3gteHBpeG1hcFxcdFxcdFxcdFxcdFxcdHhwbVxcbmltYWdlL3gteHdpbmRvd2R1bXBcXHRcXHRcXHRcXHR4d2RcXG5tZXNzYWdlL3JmYzgyMlxcdFxcdFxcdFxcdFxcdGVtbCBtaW1lXFxubW9kZWwvaWdlc1xcdFxcdFxcdFxcdFxcdGlncyBpZ2VzXFxubW9kZWwvbWVzaFxcdFxcdFxcdFxcdFxcdG1zaCBtZXNoIHNpbG9cXG5tb2RlbC92bmQuY29sbGFkYSt4bWxcXHRcXHRcXHRcXHRkYWVcXG5tb2RlbC92bmQuZHdmXFx0XFx0XFx0XFx0XFx0ZHdmXFxubW9kZWwvdm5kLmdkbFxcdFxcdFxcdFxcdFxcdGdkbFxcbm1vZGVsL3ZuZC5ndHdcXHRcXHRcXHRcXHRcXHRndHdcXG5tb2RlbC92bmQubXRzXFx0XFx0XFx0XFx0XFx0bXRzXFxubW9kZWwvdm5kLnZ0dVxcdFxcdFxcdFxcdFxcdHZ0dVxcbm1vZGVsL3ZybWxcXHRcXHRcXHRcXHRcXHR3cmwgdnJtbFxcbm1vZGVsL3gzZCtiaW5hcnlcXHRcXHRcXHRcXHR4M2RiIHgzZGJ6XFxubW9kZWwveDNkK3ZybWxcXHRcXHRcXHRcXHRcXHR4M2R2IHgzZHZ6XFxubW9kZWwveDNkK3htbFxcdFxcdFxcdFxcdFxcdHgzZCB4M2R6XFxudGV4dC9jYWNoZS1tYW5pZmVzdFxcdFxcdFxcdFxcdGFwcGNhY2hlXFxudGV4dC9jYWxlbmRhclxcdFxcdFxcdFxcdFxcdGljcyBpZmJcXG50ZXh0L2Nzc1xcdFxcdFxcdFxcdFxcdGNzc1xcbnRleHQvY3N2XFx0XFx0XFx0XFx0XFx0Y3N2XFxudGV4dC9odG1sXFx0XFx0XFx0XFx0XFx0aHRtbCBodG1cXG50ZXh0L24zXFx0XFx0XFx0XFx0XFx0XFx0bjNcXG50ZXh0L3BsYWluXFx0XFx0XFx0XFx0XFx0dHh0IHRleHQgY29uZiBkZWYgbGlzdCBsb2cgaW5cXG50ZXh0L3Bycy5saW5lcy50YWdcXHRcXHRcXHRcXHRkc2NcXG50ZXh0L3JpY2h0ZXh0XFx0XFx0XFx0XFx0XFx0cnR4XFxudGV4dC9zZ21sXFx0XFx0XFx0XFx0XFx0c2dtbCBzZ21cXG50ZXh0L3RhYi1zZXBhcmF0ZWQtdmFsdWVzXFx0XFx0XFx0dHN2XFxudGV4dC90cm9mZlxcdFxcdFxcdFxcdFxcdHQgdHIgcm9mZiBtYW4gbWUgbXNcXG50ZXh0L3R1cnRsZVxcdFxcdFxcdFxcdFxcdHR0bFxcbnRleHQvdXJpLWxpc3RcXHRcXHRcXHRcXHRcXHR1cmkgdXJpcyB1cmxzXFxudGV4dC92Y2FyZFxcdFxcdFxcdFxcdFxcdHZjYXJkXFxudGV4dC92bmQuY3VybFxcdFxcdFxcdFxcdFxcdGN1cmxcXG50ZXh0L3ZuZC5jdXJsLmRjdXJsXFx0XFx0XFx0XFx0ZGN1cmxcXG50ZXh0L3ZuZC5jdXJsLm1jdXJsXFx0XFx0XFx0XFx0bWN1cmxcXG50ZXh0L3ZuZC5jdXJsLnNjdXJsXFx0XFx0XFx0XFx0c2N1cmxcXG50ZXh0L3ZuZC5kdmIuc3VidGl0bGVcXHRcXHRcXHRcXHRzdWJcXG50ZXh0L3ZuZC5mbHlcXHRcXHRcXHRcXHRcXHRmbHlcXG50ZXh0L3ZuZC5mbWkuZmxleHN0b3JcXHRcXHRcXHRcXHRmbHhcXG50ZXh0L3ZuZC5ncmFwaHZpelxcdFxcdFxcdFxcdGd2XFxudGV4dC92bmQuaW4zZC4zZG1sXFx0XFx0XFx0XFx0M2RtbFxcbnRleHQvdm5kLmluM2Quc3BvdFxcdFxcdFxcdFxcdHNwb3RcXG50ZXh0L3ZuZC5zdW4uajJtZS5hcHAtZGVzY3JpcHRvclxcdFxcdGphZFxcbnRleHQvdm5kLndhcC53bWxcXHRcXHRcXHRcXHR3bWxcXG50ZXh0L3ZuZC53YXAud21sc2NyaXB0XFx0XFx0XFx0XFx0d21sc1xcbnRleHQveC1hc21cXHRcXHRcXHRcXHRcXHRzIGFzbVxcbnRleHQveC1jXFx0XFx0XFx0XFx0XFx0YyBjYyBjeHggY3BwIGggaGggZGljXFxudGV4dC94LWZvcnRyYW5cXHRcXHRcXHRcXHRcXHRmIGZvciBmNzcgZjkwXFxudGV4dC94LWphdmEtc291cmNlXFx0XFx0XFx0XFx0amF2YVxcbnRleHQveC1uZm9cXHRcXHRcXHRcXHRcXHRuZm9cXG50ZXh0L3gtb3BtbFxcdFxcdFxcdFxcdFxcdG9wbWxcXG50ZXh0L3gtcGFzY2FsXFx0XFx0XFx0XFx0XFx0cCBwYXNcXG50ZXh0L3gtc2V0ZXh0XFx0XFx0XFx0XFx0XFx0ZXR4XFxudGV4dC94LXNmdlxcdFxcdFxcdFxcdFxcdHNmdlxcbnRleHQveC11dWVuY29kZVxcdFxcdFxcdFxcdFxcdHV1XFxudGV4dC94LXZjYWxlbmRhclxcdFxcdFxcdFxcdHZjc1xcbnRleHQveC12Y2FyZFxcdFxcdFxcdFxcdFxcdHZjZlxcbnZpZGVvLzNncHBcXHRcXHRcXHRcXHRcXHQzZ3BcXG52aWRlby8zZ3BwMlxcdFxcdFxcdFxcdFxcdDNnMlxcbnZpZGVvL2gyNjFcXHRcXHRcXHRcXHRcXHRoMjYxXFxudmlkZW8vaDI2M1xcdFxcdFxcdFxcdFxcdGgyNjNcXG52aWRlby9oMjY0XFx0XFx0XFx0XFx0XFx0aDI2NFxcbnZpZGVvL2pwZWdcXHRcXHRcXHRcXHRcXHRqcGd2XFxudmlkZW8vanBtXFx0XFx0XFx0XFx0XFx0anBtIGpwZ21cXG52aWRlby9tajJcXHRcXHRcXHRcXHRcXHRtajIgbWpwMlxcbnZpZGVvL21wNFxcdFxcdFxcdFxcdFxcdG1wNCBtcDR2IG1wZzRcXG52aWRlby9tcGVnXFx0XFx0XFx0XFx0XFx0bXBlZyBtcGcgbXBlIG0xdiBtMnZcXG52aWRlby9vZ2dcXHRcXHRcXHRcXHRcXHRvZ3ZcXG52aWRlby9xdWlja3RpbWVcXHRcXHRcXHRcXHRcXHRxdCBtb3ZcXG52aWRlby92bmQuZGVjZS5oZFxcdFxcdFxcdFxcdHV2aCB1dnZoXFxudmlkZW8vdm5kLmRlY2UubW9iaWxlXFx0XFx0XFx0XFx0dXZtIHV2dm1cXG52aWRlby92bmQuZGVjZS5wZFxcdFxcdFxcdFxcdHV2cCB1dnZwXFxudmlkZW8vdm5kLmRlY2Uuc2RcXHRcXHRcXHRcXHR1dnMgdXZ2c1xcbnZpZGVvL3ZuZC5kZWNlLnZpZGVvXFx0XFx0XFx0XFx0dXZ2IHV2dnZcXG52aWRlby92bmQuZHZiLmZpbGVcXHRcXHRcXHRcXHRkdmJcXG52aWRlby92bmQuZnZ0XFx0XFx0XFx0XFx0XFx0ZnZ0XFxudmlkZW8vdm5kLm1wZWd1cmxcXHRcXHRcXHRcXHRteHUgbTR1XFxudmlkZW8vdm5kLm1zLXBsYXlyZWFkeS5tZWRpYS5weXZcXHRcXHRweXZcXG52aWRlby92bmQudXZ2dS5tcDRcXHRcXHRcXHRcXHR1dnUgdXZ2dVxcbnZpZGVvL3ZuZC52aXZvXFx0XFx0XFx0XFx0XFx0dml2XFxudmlkZW8vd2VibVxcdFxcdFxcdFxcdFxcdHdlYm1cXG52aWRlby94LWY0dlxcdFxcdFxcdFxcdFxcdGY0dlxcbnZpZGVvL3gtZmxpXFx0XFx0XFx0XFx0XFx0ZmxpXFxudmlkZW8veC1mbHZcXHRcXHRcXHRcXHRcXHRmbHZcXG52aWRlby94LW00dlxcdFxcdFxcdFxcdFxcdG00dlxcbnZpZGVvL3gtbWF0cm9za2FcXHRcXHRcXHRcXHRta3YgbWszZCBta3NcXG52aWRlby94LW1uZ1xcdFxcdFxcdFxcdFxcdG1uZ1xcbnZpZGVvL3gtbXMtYXNmXFx0XFx0XFx0XFx0XFx0YXNmIGFzeFxcbnZpZGVvL3gtbXMtdm9iXFx0XFx0XFx0XFx0XFx0dm9iXFxudmlkZW8veC1tcy13bVxcdFxcdFxcdFxcdFxcdHdtXFxudmlkZW8veC1tcy13bXZcXHRcXHRcXHRcXHRcXHR3bXZcXG52aWRlby94LW1zLXdteFxcdFxcdFxcdFxcdFxcdHdteFxcbnZpZGVvL3gtbXMtd3Z4XFx0XFx0XFx0XFx0XFx0d3Z4XFxudmlkZW8veC1tc3ZpZGVvXFx0XFx0XFx0XFx0XFx0YXZpXFxudmlkZW8veC1zZ2ktbW92aWVcXHRcXHRcXHRcXHRtb3ZpZVxcbnZpZGVvL3gtc212XFx0XFx0XFx0XFx0XFx0c212XFxueC1jb25mZXJlbmNlL3gtY29vbHRhbGtcXHRcXHRcXHRcXHRpY2VcXG5cIjtcclxuXHJcbmNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcclxuXHJcbm1pbWVfcmF3LnNwbGl0KCdcXG4nKS5mb3JFYWNoKChyb3cpID0+IHtcclxuXHRjb25zdCBtYXRjaCA9IC8oLis/KVxcdCsoLispLy5leGVjKHJvdyk7XHJcblx0aWYgKCFtYXRjaCkgcmV0dXJuO1xyXG5cclxuXHRjb25zdCB0eXBlID0gbWF0Y2hbMV07XHJcblx0Y29uc3QgZXh0ZW5zaW9ucyA9IG1hdGNoWzJdLnNwbGl0KCcgJyk7XHJcblxyXG5cdGV4dGVuc2lvbnMuZm9yRWFjaChleHQgPT4ge1xyXG5cdFx0bWFwLnNldChleHQsIHR5cGUpO1xyXG5cdH0pO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGxvb2t1cChmaWxlKSB7XHJcblx0Y29uc3QgbWF0Y2ggPSAvXFwuKFteXFwuXSspJC8uZXhlYyhmaWxlKTtcclxuXHRyZXR1cm4gbWF0Y2ggJiYgbWFwLmdldChtYXRjaFsxXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1pZGRsZXdhcmUob3B0c1xyXG5cclxuXHJcbiA9IHt9KSB7XHJcblx0Y29uc3QgeyBzZXNzaW9uLCBpZ25vcmUgfSA9IG9wdHM7XHJcblxyXG5cdGxldCBlbWl0dGVkX2Jhc2VwYXRoID0gZmFsc2U7XHJcblxyXG5cdHJldHVybiBjb21wb3NlX2hhbmRsZXJzKGlnbm9yZSwgW1xyXG5cdFx0KHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcblx0XHRcdGlmIChyZXEuYmFzZVVybCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0bGV0IHsgb3JpZ2luYWxVcmwgfSA9IHJlcTtcclxuXHRcdFx0XHRpZiAocmVxLnVybCA9PT0gJy8nICYmIG9yaWdpbmFsVXJsW29yaWdpbmFsVXJsLmxlbmd0aCAtIDFdICE9PSAnLycpIHtcclxuXHRcdFx0XHRcdG9yaWdpbmFsVXJsICs9ICcvJztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJlcS5iYXNlVXJsID0gb3JpZ2luYWxVcmxcclxuXHRcdFx0XHRcdD8gb3JpZ2luYWxVcmwuc2xpY2UoMCwgLXJlcS51cmwubGVuZ3RoKVxyXG5cdFx0XHRcdFx0OiAnJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFlbWl0dGVkX2Jhc2VwYXRoICYmIHByb2Nlc3Muc2VuZCkge1xyXG5cdFx0XHRcdHByb2Nlc3Muc2VuZCh7XHJcblx0XHRcdFx0XHRfX3NhcHBlcl9fOiB0cnVlLFxyXG5cdFx0XHRcdFx0ZXZlbnQ6ICdiYXNlcGF0aCcsXHJcblx0XHRcdFx0XHRiYXNlcGF0aDogcmVxLmJhc2VVcmxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0ZW1pdHRlZF9iYXNlcGF0aCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChyZXEucGF0aCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0cmVxLnBhdGggPSByZXEudXJsLnJlcGxhY2UoL1xcPy4qLywgJycpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRuZXh0KCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ3NlcnZpY2Utd29ya2VyLmpzJykpICYmIHNlcnZlKHtcclxuXHRcdFx0cGF0aG5hbWU6ICcvc2VydmljZS13b3JrZXIuanMnLFxyXG5cdFx0XHRjYWNoZV9jb250cm9sOiAnbm8tY2FjaGUsIG5vLXN0b3JlLCBtdXN0LXJldmFsaWRhdGUnXHJcblx0XHR9KSxcclxuXHJcblx0XHRmcy5leGlzdHNTeW5jKHBhdGguam9pbihidWlsZF9kaXIsICdzZXJ2aWNlLXdvcmtlci5qcy5tYXAnKSkgJiYgc2VydmUoe1xyXG5cdFx0XHRwYXRobmFtZTogJy9zZXJ2aWNlLXdvcmtlci5qcy5tYXAnLFxyXG5cdFx0XHRjYWNoZV9jb250cm9sOiAnbm8tY2FjaGUsIG5vLXN0b3JlLCBtdXN0LXJldmFsaWRhdGUnXHJcblx0XHR9KSxcclxuXHJcblx0XHRzZXJ2ZSh7XHJcblx0XHRcdHByZWZpeDogJy9jbGllbnQvJyxcclxuXHRcdFx0Y2FjaGVfY29udHJvbDogZGV2ID8gJ25vLWNhY2hlJyA6ICdtYXgtYWdlPTMxNTM2MDAwLCBpbW11dGFibGUnXHJcblx0XHR9KSxcclxuXHJcblx0XHRnZXRfc2VydmVyX3JvdXRlX2hhbmRsZXIobWFuaWZlc3Quc2VydmVyX3JvdXRlcyksXHJcblxyXG5cdFx0Z2V0X3BhZ2VfaGFuZGxlcihtYW5pZmVzdCwgc2Vzc2lvbiB8fCBub29wKVxyXG5cdF0uZmlsdGVyKEJvb2xlYW4pKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcG9zZV9oYW5kbGVycyhpZ25vcmUsIGhhbmRsZXJzKSB7XHJcblx0Y29uc3QgdG90YWwgPSBoYW5kbGVycy5sZW5ndGg7XHJcblxyXG5cdGZ1bmN0aW9uIG50aF9oYW5kbGVyKG4sIHJlcSwgcmVzLCBuZXh0KSB7XHJcblx0XHRpZiAobiA+PSB0b3RhbCkge1xyXG5cdFx0XHRyZXR1cm4gbmV4dCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGhhbmRsZXJzW25dKHJlcSwgcmVzLCAoKSA9PiBudGhfaGFuZGxlcihuKzEsIHJlcSwgcmVzLCBuZXh0KSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gIWlnbm9yZVxyXG5cdFx0PyAocmVxLCByZXMsIG5leHQpID0+IG50aF9oYW5kbGVyKDAsIHJlcSwgcmVzLCBuZXh0KVxyXG5cdFx0OiAocmVxLCByZXMsIG5leHQpID0+IHtcclxuXHRcdFx0aWYgKHNob3VsZF9pZ25vcmUocmVxLnBhdGgsIGlnbm9yZSkpIHtcclxuXHRcdFx0XHRuZXh0KCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bnRoX2hhbmRsZXIoMCwgcmVxLCByZXMsIG5leHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG91bGRfaWdub3JlKHVyaSwgdmFsKSB7XHJcblx0aWYgKEFycmF5LmlzQXJyYXkodmFsKSkgcmV0dXJuIHZhbC5zb21lKHggPT4gc2hvdWxkX2lnbm9yZSh1cmksIHgpKTtcclxuXHRpZiAodmFsIGluc3RhbmNlb2YgUmVnRXhwKSByZXR1cm4gdmFsLnRlc3QodXJpKTtcclxuXHRpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbCh1cmkpO1xyXG5cdHJldHVybiB1cmkuc3RhcnRzV2l0aCh2YWwuY2hhckNvZGVBdCgwKSA9PT0gNDcgPyB2YWwgOiBgLyR7dmFsfWApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXJ2ZSh7IHByZWZpeCwgcGF0aG5hbWUsIGNhY2hlX2NvbnRyb2wgfVxyXG5cclxuXHJcblxyXG4pIHtcclxuXHRjb25zdCBmaWx0ZXIgPSBwYXRobmFtZVxyXG5cdFx0PyAocmVxKSA9PiByZXEucGF0aCA9PT0gcGF0aG5hbWVcclxuXHRcdDogKHJlcSkgPT4gcmVxLnBhdGguc3RhcnRzV2l0aChwcmVmaXgpO1xyXG5cclxuXHRjb25zdCBjYWNoZSA9IG5ldyBNYXAoKTtcclxuXHJcblx0Y29uc3QgcmVhZCA9IGRldlxyXG5cdFx0PyAoZmlsZSkgPT4gZnMucmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShidWlsZF9kaXIsIGZpbGUpKVxyXG5cdFx0OiAoZmlsZSkgPT4gKGNhY2hlLmhhcyhmaWxlKSA/IGNhY2hlIDogY2FjaGUuc2V0KGZpbGUsIGZzLnJlYWRGaWxlU3luYyhwYXRoLnJlc29sdmUoYnVpbGRfZGlyLCBmaWxlKSkpKS5nZXQoZmlsZSk7XHJcblxyXG5cdHJldHVybiAocmVxLCByZXMsIG5leHQpID0+IHtcclxuXHRcdGlmIChmaWx0ZXIocmVxKSkge1xyXG5cdFx0XHRjb25zdCB0eXBlID0gbG9va3VwKHJlcS5wYXRoKTtcclxuXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Y29uc3QgZmlsZSA9IGRlY29kZVVSSUNvbXBvbmVudChyZXEucGF0aC5zbGljZSgxKSk7XHJcblx0XHRcdFx0Y29uc3QgZGF0YSA9IHJlYWQoZmlsZSk7XHJcblxyXG5cdFx0XHRcdHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIHR5cGUpO1xyXG5cdFx0XHRcdHJlcy5zZXRIZWFkZXIoJ0NhY2hlLUNvbnRyb2wnLCBjYWNoZV9jb250cm9sKTtcclxuXHRcdFx0XHRyZXMuZW5kKGRhdGEpO1xyXG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0XHRyZXMuc3RhdHVzQ29kZSA9IDQwNDtcclxuXHRcdFx0XHRyZXMuZW5kKCdub3QgZm91bmQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bmV4dCgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vb3AoKXt9XHJcblxyXG5leHBvcnQgeyBtaWRkbGV3YXJlIH07XHJcbiIsImltcG9ydCBzaXJ2IGZyb20gJ3NpcnYnO1xyXG5pbXBvcnQgcG9sa2EgZnJvbSAncG9sa2EnO1xyXG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSAnY29tcHJlc3Npb24nO1xyXG5pbXBvcnQgKiBhcyBzYXBwZXIgZnJvbSAnQHNhcHBlci9zZXJ2ZXInO1xyXG5cclxuY29uc3QgeyBQT1JULCBOT0RFX0VOViB9ID0gcHJvY2Vzcy5lbnY7XHJcbmNvbnN0IGRldiA9IE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xyXG5cclxucG9sa2EoKSAvLyBZb3UgY2FuIGFsc28gdXNlIEV4cHJlc3NcclxuXHQudXNlKFxyXG5cdFx0Y29tcHJlc3Npb24oeyB0aHJlc2hvbGQ6IDAgfSksXHJcblx0XHRzaXJ2KCdzdGF0aWMnLCB7IGRldiB9KSxcclxuXHRcdHNhcHBlci5taWRkbGV3YXJlKClcclxuXHQpXHJcblx0Lmxpc3RlbihQT1JULCBlcnIgPT4ge1xyXG5cdFx0aWYgKGVycikgY29uc29sZS5sb2coJ2Vycm9yJywgZXJyKTtcclxuXHR9KTtcclxuIl0sIm5hbWVzIjpbImdldCIsInByZWxvYWQiLCJjb21wb25lbnRfMCIsImNvbXBvbmVudF8xIiwiY29tcG9uZW50XzIiLCJwcmVsb2FkXzIiLCJjb21wb25lbnRfMyIsInByZWxvYWRfMyIsInJvb3QiLCJlcnJvciIsImVzY2FwZWQiLCJsb29rdXAiLCJub29wIiwic2FwcGVyLm1pZGRsZXdhcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7QUFTQSxNQUFNLEtBQUssR0FBRztDQUNiO0VBQ0MsS0FBSyxFQUFFLGlCQUFpQjtFQUN4QixJQUFJLEVBQUUsZ0JBQWdCO0VBQ3RCLElBQUksRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7O0VBYVAsQ0FBQztFQUNEOztDQUVEO0VBQ0MsS0FBSyxFQUFFLG1CQUFtQjtFQUMxQixJQUFJLEVBQUUsbUJBQW1CO0VBQ3pCLElBQUksRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFrQlAsQ0FBQztFQUNEOztDQUVEO0VBQ0MsS0FBSyxFQUFFLGVBQWU7RUFDdEIsSUFBSSxFQUFFLGNBQWM7RUFDcEIsSUFBSSxFQUFFLENBQUM7Ozs7RUFJUCxDQUFDO0VBQ0Q7O0NBRUQ7RUFDQyxLQUFLLEVBQUUsdUNBQXVDO0VBQzlDLElB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
