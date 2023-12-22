import type { HtmlTagDescriptor, Plugin, ResolvedConfig } from "vite";

export interface MsClarityObjectOption {
  /**
   * The ID of the project Clarity provides to you.
   *
   * Can be found in the URL of your project.
   *
   * @example `k4vhy94oj3`
   */
  id?: string;

  /**
   * The code to inject in the HTML.
   *
   * If provided, the `id` option will be ignored.
   *
   * If not provided, the script provided by Clarity will be used, with the `id` provided.
   */
  script?: string;

  /**
   * Whether to inject the script in development mode.
   *
   * @default false
   */
  enableInDevMode?: boolean;

  /**
   * Where to inject the script.
   *
   * @default "head-prepend"
   */
  injectTo?: HtmlTagDescriptor["injectTo"];
}

export default function MsClarity(
  idOrOptions: string | MsClarityObjectOption
): Plugin {
  let config: ResolvedConfig;
  return {
    name: "ms-clarity",
    enforce: "pre",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    transformIndexHtml() {
      const options: MsClarityObjectOption =
        typeof idOrOptions === "string" ? { id: idOrOptions } : idOrOptions;

      if (config.command === "serve" && !options.enableInDevMode) {
        return;
      }

      if (!options.script && !options.id) {
        throw new Error(
          "[ms-clarity] No id provided. Please provide a id or a code to inject."
        );
      }

      const script = options.script ?? toClarityScript(options.id!);

      return [
        {
          tag: "script",
          attrs: {
            type: "text/javascript",
          },
          children: script,
          injectTo: options.injectTo,
        },
      ];
    },
  };
}

function toClarityScript(id: string) {
  return `(function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "${id}");`;
}
