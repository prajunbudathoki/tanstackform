import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {useForm} from '@tanstack/react-form'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { validatingUserName } from '@/user'

const SignUp = () => {
    const formData = useForm({
        defaultValues:{
            username: '',
            password: ''
        },
        onSubmit: ({value}) => {
            console.log(value)
        },
        validators: {
            onSubmit: ({value}) => {
                if(!value.username || !value.password) {
                    return "All fields required"
                }
            }
        }
    })

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }
  return (
    <Card className='w-[600px]'>
        <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Learning the concept of Tanstack Form.</CardDescription>
        </CardHeader>
        <CardContent>
            <form className='' onSubmit={handleSubmit}>
                <formData.Field name='username'
                validators={{
                    onChangeAsyncDebounceMs: 400,
                    onChangeAsync: ({value}) => validatingUserName(value),
                    onChange: ({value}) => {
                        if(value.length < 3) {
                            return "username must be at least 4 char long"
                        }
                    }
                }}
                children={(field) => (
                <div>
                    <Label htmlFor='username'>Username: </Label>
                    <Input id='username' type='username' value={field.state.value ?? ''} onChange={(e) => field.handleChange(e.target.value)} />
                    {field.state.meta.errors && (
                        <div className='text-red-500 text-sm'>
                            {field.state.meta.errors}
                        </div>
                    )}
                </div>
                )}/>
                <formData.Field name='password'
                validators={{
                    onChangeAsyncDebounceMs: 400,
                    onChange: ({value}) => {
                        if(value.length < 6) {
                            return "Password must be at least 6 char long"
                        }
                    }
                }}
                children={(field) => (
                <div>
                    <Label htmlFor='password'>password: </Label>
                    <Input id='password' type='password' value={field.state.value ?? ''} onChange={(e) => field.handleChange(e.target.value)} />
                    {field.state.meta.errors && (
                        <div className='text-red-500 text-sm'>
                            {field.state.meta.errors}
                        </div>
                    )}
                </div>
                )}/>
                <formData.Subscribe selector={(state) => state.errors}
                children={(errors) => errors.length > 0 && (
                    <Alert variant={'destructive'}>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errors}</AlertDescription>
                    </Alert>
                )}
                />
            </form>
        </CardContent>
        <CardFooter>
    <Button
        onClick={(e) => {
            e.preventDefault()
            formData.reset()
        }}
        variant='outline'
    >
        Reset
    </Button>
    <Button
        onClick={(e) => {
            e.preventDefault()
            formData.handleSubmit()
        }}
        variant='outline'
    >
        Sign Up
    </Button>
</CardFooter>
    </Card>
  )
}

export default SignUp