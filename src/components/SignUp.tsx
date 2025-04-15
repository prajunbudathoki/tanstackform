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

const SignUp = () => {
    const formData = useForm({
        defaultValues:{
            email: '',
            password: ''
        },
        onSubmit: ({value}) => {
            console.log(value)
        }
    })

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
    }
  return (
    <Card className='w-[600px]'>
        <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Learning the concept of Tanstack Form.</CardDescription>
        </CardHeader>
        <CardContent>
            <form className='' onSubmit={handleSubmit}>
                <formData.Field name='email'
                children={(field) => (
                <div>
                    <Label htmlFor='email'>Email: </Label>
                    <Input id='email' type='email' value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                </div>
                )}/>
                <formData.Field name='password'
                children={(field) => (
                <div>
                    <Label htmlFor='password'>password: </Label>
                    <Input id='password' type='password' value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                </div>
                )}/>
            </form>
        </CardContent>
        <CardFooter>
            <Button 
            variant='outline'>
                Reset
            </Button>
            <Button onClick={formData.handleSubmit}
            variant='outline'>
                Sign Up
            </Button>
        </CardFooter>
    </Card>
  )
}

export default SignUp