import React from 'react'
import NotificationImage from '../../assets/notification.svg'



const Notification: React.FC = () => {
    return (
        <div className='w-full h-full flex'>
            <div className='md:w-2/5 w-full bg-white shadow-[0px_0px_3px_#e2ccff] rounded-md'>
                <div className='border-b-[0.5px] py-3 border-textGrey'>

                    <h2 className='text-center text-lg font-inter font-semibold text-textBlack'>Notifications</h2>
                </div>
                <div className='overflow-y-scroll h-[calc(100vh-4.4rem)] md:h-[calc(100vh-5.5rem)] md:py-2'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae fuga minima, quidem labore voluptatem rerum dolores eum commodi modi nisi at amet sapiente odit. Quos, corrupti. Accusamus eveniet rem saepe. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus perspiciatis esse tenetur dicta aut at accusantium libero reprehenderit tempora vel assumenda, sequi cupiditate magni quasi corporis delectus dolore obcaecati. Vitae? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium corrupti fuga mollitia commodi, officiis similique voluptatem non dolor repudiandae. Provident illum porro quam tenetur fuga commodi dolore nobis minus ducimus.lorem

                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat inventore sapiente ex totam fugiat. Totam enim adipisci dolore nesciunt porro obcaecati natus maiores repellendus expedita ratione optio, quam neque architecto. Pariatur perferendis illo, est vero recusandae quae quis atque fuga vitae labore tempora vel dolor nesciunt quidem possimus neque temporibus totam maxime? Pariatur enim nam nobis quos laborum ducimus, amet dolores corrupti perferendis rerum non sunt sapiente dolor, unde qui dolore cupiditate dolorem? Velit porro possimus, beatae ratione modi perferendis ex delectus dolorum eius temporibus, commodi molestias autem enim maiores minima sapiente. Id veniam sed perferendis eius. Ipsam harum in vel odio odit cumque, necessitatibus enim tenetur adipisci itaque nesciunt, magnam natus saepe nisi voluptatum a repellat. Error a odio eius facilis, ea dolores accusamus ex nobis labore laboriosam nostrum, aliquam, ad perspiciatis. Unde ipsam, nobis illo maiores expedita similique exercitationem odit alias recusandae accusamus tenetur reiciendis laudantium quibusdam delectus quo quam natus ullam magni, repellat odio dolor. At, tempore corporis ipsa suscipit inventore voluptatem. Dolor voluptatibus nisi quos debitis soluta voluptate, minima adipisci temporibus voluptatem eaque placeat quidem. Beatae a amet quasi et laudantium tenetur sint reprehenderit quos optio perferendis debitis autem sunt temporibus corrupti culpa quibusdam, nisi cum.

























                </div>




            </div>
            <div className='hidden  w-3/5 md:flex justify-center items-center '>
                <img className='h-full w-full' src={NotificationImage} alt="" />
            </div>
        </div>
    )
}

export default Notification