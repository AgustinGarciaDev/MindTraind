const course = (props) => {
    return (
        <>
            <div className="courseCardContainer" style={{ backgroundImage: `url('${props.course.pictureRefence}')` }}>
                <h4>{props.course.nameCourse}</h4>
            </div>
        </>
    )
}

export default course