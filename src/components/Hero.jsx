import { useSelector } from "react-redux";
import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-80'>
          {userInfo ? (
            <h1 className='text-center mb-4'>Welcome {userInfo?.name}</h1>
          ) : (
            <>
            <h1 className="text-center mb-4">Welcome to Portioabhi.</h1>
             <h2>Get Stareted By</h2>
              <div className='d-flex '>
                <LinkContainer to='/login'>
                  <Button variant='primary' className='me-3'>
                    Sign In
                  </Button>
                </LinkContainer>

                <LinkContainer to='/register'>
                  <Button variant='secondary'>Register</Button>
                </LinkContainer>
              </div>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
