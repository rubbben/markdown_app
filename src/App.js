import React, {Component} from 'react';
import './App.css';
import {sampleText} from './sampleText';
import marked from 'marked';

class App extends Component {
  state = {
    text: sampleText
  }



  componentDidMount() {
    // console.log('Je suis monté');
    const text = localStorage.getItem('text');

    if (text) {
      this.setState({text});
    } else {
      this.setState({text : sampleText});
    }
    
  }

  componentDidUpdate() {
    // console.log('Je suis mis a jour');
    const { text } = this.state;
    localStorage.setItem('text', text);
  }



  handleChange = event => {
    const text = event.target.value; //event = au moment où qqch change. target = dans quoi l'event s'effectue (textarea). value = la valeur dans notre textarea 
    this.setState({text});
  }

  renderText = text => {
    const __html = marked(text, {sanitize: true});
    return { __html };
  }


  render() {
    return (
      <div className='container'>
        <div className='row'>

          <div className='col-sm-6'>
            <textarea onChange={this.handleChange} value={this.state.text} className='form-control' rows='35' />
          </div>

          <div className='col-sm-6'>
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
          </div>

        </div>
      </div>
    );
  }
  
}

export default App;
