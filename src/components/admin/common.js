export const FormError = (props) => {
    return (
      <div
        style={{
          color: "red",
          paddingTop: "5px",
          paddingBottom: "15px",
        }}
      >
        {props.msg}
      </div>
    )
  }