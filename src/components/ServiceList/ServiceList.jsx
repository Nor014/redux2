import React from 'react';
import Error from '../Error/Error';
import Preloader from '../Preloader/Preloader';
import { connect } from 'react-redux';
import { fetchServicesData } from '../../actions/actionsCreaters';
import { deleteServicesData } from '../../actions/actionsCreaters';
import { Link } from 'react-router-dom';


class ServiceList extends React.Component {
  componentDidMount = () => {
    this.props.fetchServices('http://localhost:7070/api/services');
  }

  deleteService = (id) => {
    this.props.deleteService(`http://localhost:7070/api/services/${id}`, id)
  }

  render() {
    const { serviceItems, error, loading } = this.props.list;
    console.log(serviceItems, error, loading);

    if (loading) {
      return <Preloader />
    }

    if (error !== null) {
      return <Error error={error} />
    }

    return (
      <ul className="servise-list">
        {serviceItems.map(el =>
          <li key={el.id} className="servise-list__item">
            <p className='servise-list__text'>{el.name}: {el.price} руб.</p>
            <div className="service-list__inner">
              {el.deleting
                ? <Preloader class='mini-preloader' />
                : <>
                  <Link className="service-list__btn service-list_icon_edit" to={`/services/${el.id}`} />
                  <button type='button' className="service-list__btn service-list_icon_cancel" onClick={() => this.deleteService(el.id)} />
                </>}
            </div>
          </li>)}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  const { serviceListState } = state;
  return { list: serviceListState }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchServices: (url) => dispatch(fetchServicesData(url)),
    deleteService: (url, id) => dispatch(deleteServicesData(url, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);