import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button} from "reactstrap"

function LoginModal() {

  const [modal, setModal] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const toggle = ()=> {
    setModal(!modal)
  }

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin =()=> {
    dispatch(loginUser({email, password}))
    toggle()
    navigate('/daschboard')


  }

  return (
    <div>
      

       <NavLink  onClick={toggle} href="#">Login</NavLink>
         <Modal isOpen={modal}>
<ModalHeader toggle={toggle}>
    Login
</ModalHeader>
<ModalBody>
    <Form>
        <FormGroup>
            
             <Label>Email</Label>
            <Input 
            type="email"
            name="email"
            className='mb-3'
            onChange={(e)=> setEmail(e.target.value)}

            />
            
             <Label>Password</Label>
            <Input 
            type="password"
            name="password"
            className='mb-3'
            onChange={(e)=> setPassword(e.target.value)}
            />
            <Button 
            onClick={handleLogin}
            color="dark"
            
            >Login</Button>
        </FormGroup>
    </Form>
</ModalBody>
         </Modal>


    </div>
  )
}

export default LoginModal