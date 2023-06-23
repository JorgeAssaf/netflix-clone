export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className='z-50 transition duration-300 bg-black/90 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0'>
      <div className='relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden'>
        <div
          className={`scale-100 transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
