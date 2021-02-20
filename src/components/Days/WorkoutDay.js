// import React from 'react';
// import { Link, useParams } from 'react-router-dom'

// import RenderEachExercise from './RenderEachExercise'

// const WorkoutDay = (props) => {
//     console.log(props);
//     //gives access to dynamic piece of URL, specifically my named :date
//     const date = useParams().date
//     //if URL id param matches with workout date, load it to screen
//     let loadedWorkout = props.items.filter(workout => workout.id === date)
//     console.log(loadedWorkout.length);

    

//     if (loadedWorkout) {
//         return (
//             <>
//                 <Link to={'/dailyworkouts'}>Back</Link>
//                 <div>
//                     {loadedWorkout.map((item) => {
//                         return (
//                             <div key={item.id}>
//                                 <h2 className="text-center mt-5">{item.date}</h2>
//                                 {item.exercises.map((exercise) =>{
//                                     return(
//                                         <RenderEachExercise
                                        
//                                         key={exercise.name}
//                                         name={exercise.name}
//                                         sets={exercise.sets}
//                                         reps={exercise.reps}
//                                         weight={exercise.weight}
//                                         />  
                                        
//                                     )
                                    
//                                 })}
//                             </div>
//                         )
                        
//                     })}
                
//                 </div>
//             </>
//             )
//     }
    
// }

// export default WorkoutDay