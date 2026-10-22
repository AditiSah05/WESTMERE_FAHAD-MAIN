import { ImageResponse } from 'next/og'

export const alt = 'Westmere | Growth & Creative Agency'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: 80, background: '#0f1b33', color: '#fff',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: '#c4943d' }}>WESTMERE</div>
        <div style={{ fontSize: 76, fontWeight: 600, marginTop: 24, lineHeight: 1.1 }}>
          We build digital experiences that drive real growth.
        </div>
      </div>
    ),
    size,
  )
}
