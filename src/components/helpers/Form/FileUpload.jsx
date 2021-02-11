import React, { Component } from "react";
import Dropzone from "react-dropzone";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import CircularProgress from "@material-ui/core/CircularProgress";
import { uploadImage } from "../../../actions";
export default class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      filesUploaded: [],
      isLoading: false
    };
  }
  onDrop = e => {
    this.setState({ isLoading: true });
    console.log(e);
    uploadImage(e[0]).then(res => {
      this.setState(
        {
          isLoading: false,
          filesUploaded: [...this.state.filesUploaded, res]
        },
        () => {
          this.props.imagesHandler(this.state.filesUploaded);
        }
      );
    });
  };
  showUploadedimages = () => {};
  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone
              onDrop={e => this.onDrop(e)}
              multiple={false}
              className="dropzone_box"
            >
              <div className="wrap">
                <AddAPhoto />
              </div>
            </Dropzone>
            {this.showUploadedimages()}
            {this.state.isLoading ? (
              <div
                className="dropzone_box"
                style={{ textAlign: "center", paddingTop: "60px" }}
              >
                <CircularProgress style={{ color: "#00bcd4" }} thickness={7} />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}
