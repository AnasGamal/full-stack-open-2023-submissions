const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
      ) }
  
    const Header = ({ course }) => <h1>{course.name}</h1>
    const Content = ({ course }) => <Part parts={course.parts} />
    const Part = ({ parts }) => {
      return (
        parts.map(part => <p key = {part.id}>{part.name} {part.exercises}</p>)
      )
    }
    const Total = ({course}) => {
      const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
      return (
        <p><strong>total of {total} exercises</strong></p>
      )
    }

export default Course