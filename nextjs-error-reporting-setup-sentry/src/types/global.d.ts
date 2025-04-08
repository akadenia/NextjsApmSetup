import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'

declare global {
  interface Window {
    __OTEL_PROVIDER__?: WebTracerProvider
  }
}

export {}
