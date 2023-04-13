export const response = async function (ms1, ms2, mutation, refetch, q) {
  try {
    await mutation()
    q.notify({
      type: 'positive',
      message: ms1,
    })
    refetch()
  } catch (err) {
    console.log(err)
    q.notify({
      type: 'negative',
      message: ms2,
    })
  }
}
