import React from 'react';
import { connect } from 'react-redux';
import { fetchService } from '../../actions/actionsCreaters';
import { postService } from '../../actions/actionsCreaters';
import Preloader from '../Preloader/Preloader';
import Error from '../Error/Error';
import { Link } from 'react-router-dom';

class ServiceEditor extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchService(`http://localhost:7070/api/services/${id}`)
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.props.changeInputContent(name, value)
  }

  onSaveBtn = () => {
    const { service } = this.props.service
    this.props.postService(`http://localhost:7070/api/services`, service)
  }


  render() {
    const { service, loading, error, saving } = this.props.service;
    console.log(service, loading, error, saving)

    if (loading) {
      return <Preloader />
    }

    if (error !== null) {
      return <Error error={error} />
    }

    return (
      <form className='service'>
        <fieldset className='service__fieldset' disabled={saving ? true : false}>

          <label className='service__label' htmlFor='name'>Название
        <input className='service__input' type="text" name='name' onChange={this.onInputChange} value={service.name} />
          </label>

          <label className='service__label' htmlFor="price">Стоимость
        <input className='service__input' type="text" name='price' onChange={this.onInputChange} value={service.price} />
          </label>

          <label className='service__label' htmlFor="content">Описание
        <input className='service__input' type="text" name='content' onChange={this.onInputChange} value={service.content} />
          </label>

          <div className="service__inner">
            <Link className="service__btn link-btn" to='/services'>Отмена</Link>
            {saving
              ? < Preloader class='mini-preloader mini-preloader_save' />
              : <button type='button' className="service__btn" onClick={this.onSaveBtn}>Сохранить</button>
            }

          </div>
        </fieldset>

      </form>
    )
  }
}

const mapStateToProps = (state) => {
  const { editServiceState } = state;
  return { service: editServiceState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchService: (url) => dispatch(fetchService(url)),
    changeInputContent: (name, value) => dispatch({
      type: 'CHANGE_INPUT_VALUE',
      payload: { name, value }
    }),
    postService: (url, service) => dispatch(postService(url, service))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceEditor);
