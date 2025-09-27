import React from 'react';






const Management = ({ticket}) => {
    // const InfoData = useContext (ticket)
    console.log(ticket);
    return (
        <div>
{
    ticket.map(data=>
        <div key={data.id}> 
            <h1 className=''>{data.title}</h1>
            </div>
    )
}
        </div>
    
    )
};

export default Management;