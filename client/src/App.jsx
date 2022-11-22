import './App.css';
import { Form } from './components/Form';
import { Container } from './components/styles/Container.styled';
import { Header } from './components/Header'
import { GlobalStyles } from './components/styles/Global'
import { QuoteApi } from './components/QuoteApi';

function App() {

  return (
    <>
    <GlobalStyles />
    <Header />
    <QuoteApi />
    <Container>
      <Form />
    </Container>
    
    </>
  );  
}

export default App;
