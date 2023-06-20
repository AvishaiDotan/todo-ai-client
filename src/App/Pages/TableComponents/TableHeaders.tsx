export default function TableHeaders() {
    const headers = ["Title", 'Status']
    return (
        <div className="headers grid-layout">
            {headers.map(h => <div className='second-font-family'>{h}</div>)}
        </div>
    )
}
