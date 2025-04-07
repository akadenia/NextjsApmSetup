import { propagation } from '@opentelemetry/api'
import { ZoneContextManager } from '@opentelemetry/context-zone'
import {
  CompositePropagator,
  W3CTraceContextPropagator
} from '@opentelemetry/core'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load'
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch'
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request'
import { Resource } from '@opentelemetry/resources'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import {
  ATTR_SERVICE_NAME,
  SEMRESATTRS_DEPLOYMENT_ENVIRONMENT
} from '@opentelemetry/semantic-conventions'

const getExporterOptions = (endpoint: 'traces' | 'metrics') => ({
  url: `${process.env.NEXT_PUBLIC_SIGNOZ_ENDPOINT}/${endpoint}`,
  headers: {}
})

if (!process.env.NEXT_PUBLIC_SIGNOZ_ENDPOINT) {
  console.warn(
    'SignOz endpoint or node environment is not set. Telemetry will not be sent.'
  )
}

const appEnv = process.env.NEXT_PUBLIC_NODE_ENV || 'development'
const serviceName = `nextjs-apm-setup-demo-browser`
const sigNozEndpoint = process.env.NEXT_PUBLIC_SIGNOZ_ENDPOINT

// Initialize client-side OpenTelemetry
export function initBrowserTraceCollector() {
  if (
    typeof window === 'undefined' ||
    !appEnv ||
    !sigNozEndpoint ||
    window.__OTEL_PROVIDER__
  ) {
    return // Only run in browser environment and if appEnv and sigNozEndpoint are set and window.__OTEL_PROVIDER__ is not set
  }

  const traceResource = new Resource({
    [ATTR_SERVICE_NAME]: serviceName,
    [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: appEnv,
    application: serviceName
  })

  const traceExporter = new OTLPTraceExporter(getExporterOptions('traces'))

  const traceProvider = new WebTracerProvider({
    resource: traceResource,
    // Using SimpleSpanProcessor for lightweight processing
    spanProcessors: [new SimpleSpanProcessor(traceExporter)]
  })

  // Register instrumentations for common browser operations
  registerInstrumentations({
    instrumentations: [
      new DocumentLoadInstrumentation(),
      new FetchInstrumentation({
        clearTimingResources: true,
        propagateTraceHeaderCorsUrls: [/.*/]
      }),
      new XMLHttpRequestInstrumentation({
        clearTimingResources: true,
        propagateTraceHeaderCorsUrls: [/.*/]
      })
    ]
  })

  traceProvider.register({
    contextManager: new ZoneContextManager()
  })

  propagation?.setGlobalPropagator(
    new CompositePropagator({
      propagators: [new W3CTraceContextPropagator()]
    })
  )

  // Store provider for further checks if needed
  if (typeof window !== 'undefined') {
    window.__OTEL_PROVIDER__ = traceProvider
  }

  console.log('Browser OpenTelemetry collector and exporter initialized')
}
