import { useForm } from 'react-hook-form'
import TextInput from '../../shared/components/inputs/TextInput';

export default function LoginForm({onSubmit}) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-3'>
                <TextInput
                    name={"email"}
                    placeholder={"Email"}
                    type={"email"}
                    register={register}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'Invalid email address'
                        }
                    }}
                    error={errors.email}
                />
            </div>
            <div className='mb-3'>
                <TextInput
                    name={"password"}
                    placeholder={"Password"}
                    type={"password"}
                    register={register}
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password should be atleast 6 characters long'
                        }
                    }}
                    error={errors.password}
                />
            </div>


            <button className=' my-3 btn btn-light'>Submit</button>
        </form>
    )
}
