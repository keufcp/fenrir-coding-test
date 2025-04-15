export default function CloseIcon(props: any) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      className={props.className}
      viewBox='0 0 24 24'
    >
      <path stroke='none' d='M0 0h24v24H0z'></path>
      <path d='M18 6 6 18M6 6l12 12'></path>
    </svg>
  )
}
