# vite-plugin-ms-clarity

Vite plugin for [Microsoft Clarity](https://clarity.microsoft.com/).

## Usage

```js
// vite.config.js
import { defineConfig } from "vite";
import MsClarity from "vite-plugin-ms-clarity";

export default defineConfig({
  plugins: [MsClarity("YOUR-CLARITY-PROJECT-ID")],
});
```

If you only want to enable the plugin when an environment variable is set, you can use the plugin like this:

```js
defineConfig({
  plugins: [process.env.ENABLE_CLARITY && MsClarity("YOUR-CLARITY-PROJECT-ID")],
});
```

You can also use an object as the option:

```js
MsClarify({
  id: "YOUR-CLARITY-PROJECT-ID",
  enableInDevMode: true,
  // ...
});
```

## Options

### `id`

**Type**: `string | undefined`

**Example**: `k4vhy94oj3`

The ID of the project Clarity provides to you.

Can be found in the URL of your project.

### `script`

**Type**: `string | undefined`

**Default**: `undefined`

The code to inject in the HTML.

If provided, the `id` option will be ignored.

If not provided, the script provided by Clarity will be used, with the `id` provided.

### `enableInDevMode`

**Type**: `boolean`

**Default**: `false`

Whether to inject the script in development mode.

### `injectTo`

**Type**: [`vite.HtmlTagDescriptor["injectTo"]`](https://cn.vitejs.dev/guide/api-plugin#transformindexhtml)

**Default**: `"head-prepend"`

Where to inject the script.
