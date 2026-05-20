const Student = (props) => {
    return (
        <div>
            <h2>
                {props.name.first} {props.name.last}
            </h2>
            <strong>{props.major}</strong>
            <p>
                {props.name.first} is taking {props.numCredits} and is{" "}
                {props.fromWisconsin ? "" : "NOT"} from Wisconsin
            </p>
            <p>They have {props.interests.length} interests including...</p>
            <ul>
                {props.interests.map((interest) => (
                    <li key={props.id + interest}>{interest}</li>
                ))}
            </ul>
        </div>
    );
};

export default Student;
