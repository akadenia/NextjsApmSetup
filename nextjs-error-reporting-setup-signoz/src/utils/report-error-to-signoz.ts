import { SpanStatusCode, trace } from '@opentelemetry/api'

export function reportErrorToSignoz(error: Error): void {
  try {
    if (!window?.__OTEL_PROVIDER__) {
      console.warn(
        'No tracer provider found, cannot report the error to the apm.'
      )
      return
    }
    const tracer = trace.getTracer('Error Boundary')
    tracer.startActiveSpan('Error Boundary', (span) => {
      const stackTrace = error.stack ?? 'No stack trace available'

      span.recordException(error)
      span.setAttribute('stackTrace', stackTrace)
      span.setAttribute('errorMessage', error.message)
      span.setAttribute('environment', 'client')
      span.setStatus({
        code: SpanStatusCode.ERROR
      })
      console.log('Reporting error to the apm')

      span.end()
    })
  } catch (err) {
    console.error('Failed to report error to SignOz:', err)
    console.error('Original error:', error)
  }
}
