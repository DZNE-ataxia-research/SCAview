import React from 'react';

interface Props {}

const Home: React.FunctionComponent<Props> = props => {
  return (
    <div className="container">
      <h1>Clinical Data Viewer</h1>
      <p>
        SCAview aspires to provide a solution for visualization of datasets and graphical handling of all data processing. Therefore, the basis of all analysis is the browsing of data to give an idea of distribution and correlation of attributes of interest. A graphical selection defines single or multiple filter criteria which are applied to the population of patients available. The hereby confined subgroups can be further studied. It is not primarily meant to be an analyzing tool but an idea generator, where complex data is easy accessible. SCAview offers the unique opportunity to explore the distributions and correlations of attributes in SCA1, 2, 3 and 6.
      </p>
    </div>
  );
};

export default Home;
