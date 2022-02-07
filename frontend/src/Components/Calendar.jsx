// import React, { useEffect, useState } from 'react';
// import Kalend, { CalendarEvent, CalendarView, OnEventDragFinish } from 'calend';
// import 'calend/dist/styles/index.css';
// import toast, { Toaster } from 'react-hot-toast';
// import { OnEventClickData } from 'calend';



// const CalendComponent = () => {

  // useEffect(() => {
  //   notify();
  // }, []);

//   const events = {
//     '01-11-2021': [
//         {
//         id: 1,
//         startAt: '2021-11-21T18:00:00.000Z',
//         endAt: '2021-11-21T19:00:00.000Z',
//         summary: 'test',
//         color: 'blue',
//         }
//     ],
//     '21-11-2021': [
//         {
//         id: 2,
//         startAt: '2021-11-21T18:00:00.000Z',
//         endAt: '2021-11-21T19:00:00.000Z',
//         summary: 'test',
//         color: 'blue',
//         }
//     ]
// }

// const notify = () => toast("Don't you worry, don't you worry, child \n See heaven's got a plan for you", {
//   icon: '🛩️',
// });

//   const [demoEvents, setDemoEvents] = useState(events);

//   const onNewEventClick = (demoEvents) => {
//     console.log(demoEvents);
//   };

//   const onShowMoreMonthClick = (demoEvents) => {
//     console.log(demoEvents);
//   };


//   const onEventClick = (demoEvents) => {
//     console.log(demoEvents);
//     //modal for this
//   };


//   return (
// //     <>
//       <Toaster
//         position="top-center"
//         reverseOrder={false}
//       />
//       <Kalend
//         onNewEventClick={onNewEventClick}
//         initialView={CalendarView.WEEK}
//         disabledViews={[]}
//         onEventClick={onEventClick}
//         events={demoEvents}
//         initialDate={new Date().toISOString()}
//         hourHeight={60}
//         showMoreMonth={onShowMoreMonthClick}
//         timezone={'Europe/Berlin'}
//         onEventDragFinish={OnEventDragFinish}
//       />
//     </>
//   );
// };


// export default CalendComponent;



import React, { useEffect, useState } from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { act } from '@testing-library/react';
import { NewReleasesTwoTone } from '@material-ui/icons';
import {parseISO} from 'date-fns';

export default function CalendarComponent() {

  const navigate = useNavigate();
  const notify = () => toast("Don't you worry, don't you worry, child \n See heaven's got a plan for you", {
    icon: '✈️',
  });

  const [events,setEvents] = useState([]);

  useEffect(() => {
    notify();
    axios.get('http://localhost:4000/event')
      // .then(res => res.json())
      .then(data => {
        data.data.events.forEach(eve => {
          eve.start = parseISO(eve.start); 
          eve.end = parseISO(eve.end);        
        });
        setEvents(prevEvents => {
          return [...prevEvents,...data.data.events];
        });
      });
    
  }, []);

  console.log(events);

  const onConfirm = async (event,action) => {
    console.log(action);
    if (action === "edit")
    {
      axios.patch(`http://localhost:4000/event/${event._id}`, event);
    }
    else
    {
      console.log(action)
      var rex = axios.post('http://localhost:4000/event/', event);

    }
    return new Promise((res,rej) => {res(event)})
  };

  const handleDelete = async (deletedId) => {
    console.log(deletedId);
    // axios.delete(`http://localhost:4000/event/${deletedId}`);
  }
  return ( <>
    <Toaster
    position="top-center"
    reverseOrder={false}
  />
    <Scheduler
      onConfirm={onConfirm}
      view="week"
      events={events}
      selectedDate={new Date()}
      onDelete = {handleDelete}
    />
    </>
  );
}
