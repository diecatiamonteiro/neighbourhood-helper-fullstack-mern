import React from "react";

export default function OfferHelpModal({
  showModal,
  setShowModal,
  message,
  setMessage,
  isSubmitting,
  handleSubmitOffer,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-xl p-6 max-w-md w-full"
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h3 className="text-xl font-bold text-charcoal mb-4">Offer Help</h3>
        <form onSubmit={handleSubmitOffer}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message to your neighbor..."
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 min-h-[100px]"
            required
            autoFocus
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-brick hover:bg-brickHover text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Offer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
