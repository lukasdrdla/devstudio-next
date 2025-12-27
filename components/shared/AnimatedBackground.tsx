'use client'

export function AnimatedBackground() {
  return (
    <>
      {/* Gradient blobs */}
      <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
        {/* Blob 1 - Indigo */}
        <div
          className="blob absolute w-[600px] h-[600px] rounded-full -top-[200px] -right-[100px]"
          style={{
            background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
            animationDelay: '0s'
          }}
        />
        {/* Blob 2 - Pink */}
        <div
          className="blob absolute w-[500px] h-[500px] rounded-full -bottom-[150px] -left-[100px]"
          style={{
            background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
            animationDelay: '-5s'
          }}
        />
        {/* Blob 3 - Green */}
        <div
          className="blob absolute w-[400px] h-[400px] rounded-full top-1/2 left-1/2"
          style={{
            background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
            animationDelay: '-10s'
          }}
        />
      </div>

      {/* Grid pattern */}
      <div className="fixed inset-0 z-[-1] bg-grid-pattern pointer-events-none" />
    </>
  )
}
