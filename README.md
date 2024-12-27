# Deepseek API Proxy

This is a Deno proxy server that forwards requests to Deepseek's API while
automatically changing the model parameter to "deepseek-chat".

This can be used to configure the Cursor to use Deepseek's API.

You can deploy this to Deno Deploy, then in Cursor Settings, change the OpenAI
API URL to your Deno Deploy URL and set your Deepseek API key. Then all the
requests to OpenAI API will be forwarded to Deepseek API.

# Deepseek API 代理

这是一个 Deno 代理服务器，它会将请求转发到 Deepseek 的
API，同时自动将模型参数更改为 "deepseek-chat"。

这个代理可以用于配置 Cursor 来使用 Deepseek 的 API。

你可以将这个代理部署到 Deno Deploy，然后在 Cursor 设置中，将 OpenAI API URL
更改为你的 Deno Deploy URL，并设置你的 Deepseek API 密钥。

然后所有 Cursor 对 OpenAI API 的请求都会被转发到 Deepseek API。
