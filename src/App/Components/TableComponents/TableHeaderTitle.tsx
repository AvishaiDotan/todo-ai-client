interface ITableHeaderTitleProps {
  title?: string
}

export default function TableHeaderTitle(prop: ITableHeaderTitleProps) {
  return <h3 className='secondary-font-family'>{prop?.title}</h3>
}
