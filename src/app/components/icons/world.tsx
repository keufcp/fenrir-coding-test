export default function WorldIcon(props: any) {
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
      <path d='M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0M3.6 9h16.8M3.6 15h16.8'></path>
      <path d='M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18'></path>
    </svg>
  )
}
