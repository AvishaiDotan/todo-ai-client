export default function TableHeaders() {
    const headers = ["Title", 'Status']
    return (
        <div className="headers grid-layout">
            {headers.map(h => <div key={h} className='second-font-family'>{h}</div>)}
        </div>
    )
}
