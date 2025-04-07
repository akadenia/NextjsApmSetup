import process from 'process'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import {
  ATTR_SERVICE_NAME,
  SEMRESATTRS_DEPLOYMENT_ENVIRONMENT
} from '@opentelemetry/semantic-conventions'

// Add otel logging when debugging
// import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const exporterOptions = (endpoint: 'traces' | 'metrics') => ({
  url: `${process.env.NEXT_PUBLIC_SIGNOZ_ENDPOINT}/${endpoint}`
})

if (
  !process.env.NEXT_PUBLIC_NODE_ENV ||
  !process.env.NEXT_PUBLIC_SIGNOZ_ENDPOINT
) {
  throw new Error('Some of the env variables are not set for instrumentation')
}

const resource = new Resource({
  [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: process.env.NEXT_PUBLIC_NODE_ENV,
  [ATTR_SERVICE_NAME]: 'nextjs-apm-setup-demo'
})

// Add trace exporter
const traceExporter = new OTLPTraceExporter(exporterOptions('traces'))

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  resource
})

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start()
// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0))
})
