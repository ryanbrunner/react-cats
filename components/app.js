import React from 'react';
import $ from 'jquery';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      newImage: ''
    }

    this.updateNewImage = this.updateNewImage.bind(this);
    this.addNewImage = this.addNewImage.bind(this);
    this.refresh = this.refresh.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  render() {
    // Todo: Replace key with id
    return <div className='container'>
      <div className='thumbnails'>
        { this.state.images.map(image => {
          return <div className='col-md-3' key={ image._id }>
            <a href='#' className='thumbnail'>
              <img src={ image.url } />
            </a>
            <button className='btn btn-danger'
                    onClick={ (evt) => this.deleteImage(image._id) }>Delete</button>
          </div>
        })}
      </div>

      <div>
        <input type='text'
               placeholder="Add a cat..."
               className='form-control'
               value={ this.state.newImage }
               onChange={ (evt) => this.updateNewImage(evt.target.value) }  />

        <button className='btn btn-primary'
                onClick={ (evt) => this.addNewImage() }>Add this cat!</button>
      </div>
    </div>
  }

  deleteImage(id) {
    $.ajax({
      method: 'DELETE',
      url: '/api/images/' + id
    })
    .then(() => {
      this.refresh();
    });
  }

  addNewImage() {
    $.ajax({
      method: 'POST',
      url: '/api/images',
      data: JSON.stringify({ url: this.state.newImage }),
      contentType: 'application/json'
    })
    .then(image => {
      this.setState({ newImage: '' });
      this.refresh();
    })
  }

  updateNewImage(text) {
    this.setState({ newImage: text });
  }

  refresh() {
    $.get('/api/images')
    .then((images) => this.setState({images: images }))
    .catch((err) => this.setState({ error: err.message }))
  }

  componentDidMount() {
    this.refresh();
  }
}






export default App;
