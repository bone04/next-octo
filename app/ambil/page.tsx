export default async function AmbilHomePage() {
  console.log("halaman ambil data")
  return (
    <>
      <h1>Octokit JSON fetch demo</h1>

      <p>Enter owner and repo, click "Fetch repo JSON". The backend calls Octokit and returns response.data which this page displays.</p>

    </>
  )
}
