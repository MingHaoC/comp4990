import React, { Component } from 'react';
import { withFormik, Form, Field } from 'formik';

const form_id = 'form_id';








class ProfileForm extends Component {

  //when edit button is clicked
  editOnClick = (event) => {
    event.preventDefault()
    const data = !(this.props.status.edit)
    this.props.setStatus({edit: data})
  }
  
  //when cancel button is clicked
  cancelOnClick = (event) => {
    event.preventDefault();
    this.props.resetForm();
    this.props.setStatus({edit: false});
  }


  _renderAction(){

    return(

      <React.Fragment>

        <div> 
        
        
          
        {
          this.props.status.edit? //....................
          <React.Fragment>
           <center><p>Edit and Save your profile information below</p></center> 
            <center><button className="btn btn-primary btn-sm" type="submit" form={form_id}>Save</button></center> <br></br>
            <center><button className="btn btn-danger btn-sm"onClick={this.cancelOnClick} >Cancel</button></center><br></br>
          </React.Fragment>
          :
          <center><button color="#E00034" className="btn btn-primary btn-sm" onClick={this.editOnClick}>Edit</button></center>
        }   


        </div>

      </React.Fragment>
    );
  }

  _renderFormView = () => {

    return (
      <React.Fragment>

        <div>

          <label>First Name</label>


          <div>
          <label type="text" name="name" className="form-control">
              {this.props.fields.first_name}
            </label><br></br>
          </div>


        </div>

        <div>

          <label>Last Name</label>


          <div>
          <label type="text" name="name" className="form-control">
              {this.props.fields.last_name}
            </label><br></br>
          </div>


        </div>




        <div >

          <label>Email</label>
          <div >
          <label type="text" name="brand_name" className="form-control"> 
              {this.props.fields.email}
            </label><br></br>
          </div>

        </div>
        



        <div >

          <label >Phone Number</label>
          <div >
            <label type="text" name="device_type" className="form-control">
              {this.props.fields.phone_no}
            </label><br></br>
          </div>

        </div>

        <div>

          <label>Address</label>


          <div>
          <label type="text" name="name" className="form-control">
              {this.props.fields.address}
            </label><br></br>
          </div>


        </div>

      </React.Fragment>
    );
  }








  _renderFormInput = () => {
    return (
      <React.Fragment>




        <div >

          <label>First Name</label>

          <div >
            <Field type="text" name="first_name" className="form-control" placeholder="First Name" /><br></br>
          </div>

        </div>


        

        <div>

          <label>Last Name</label>

          <div >
            <Field type="text" name="last_name" className="form-control" placeholder="Last Name" /><br></br>
          </div>

        </div>








        <div >

          <label >Email</label>

          <div >
            <Field type="text" name="email" className="form-control" placeholder="Email" /><br></br>
          </div>

        </div>




        <div >

          <label>Phone Number</label>

          <div>
            <Field type="text" name="phone_no" className="form-control" placeholder="Phone Number" />
          </div>

        </div>


        <div >

          <label>Address</label>

          <div>
            <Field type="text" name="address" className="form-control" placeholder="address" />
          </div>

        </div>



      </React.Fragment>        
    );
  }





  render() {
    return (
      <React.Fragment>

        <center><h1>Profile</h1></center>
        {this._renderAction()}

        <Form id={form_id}>
        {
          this.props.status.edit?this._renderFormInput():this._renderFormView()
        }
        </Form>

      </React.Fragment>
    );
  }
}

const FormikForm = withFormik({

  mapPropsToStatus: (props) =>  {
    return {
      edit: props.edit || false
    }
  },

  mapPropsToValues: (props) => {
    return {
      first_name: props.fields.first_name,
      last_name: props.fields.last_name,
      email: props.fields.email,
      phone_no: props.fields.phone_no,
      address: props.fields.address
    }
  }, 

  enableReinitialize: true,
  handleSubmit: (values, { props, actions }) => { //...
    props.updateFields(values);
    actions.setStatus({
      edit: false
    });
  }


})(ProfileForm);

export default FormikForm;