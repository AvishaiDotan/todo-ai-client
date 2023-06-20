
interface ITableHeaderTitleProps {
    headerStr: string
}

export default function TableHeaderTitle(prop: ITableHeaderTitleProps) {
  return (
    <h3 className='secondary-font-family'>
        {prop.headerStr}
    </h3>
  )
}
